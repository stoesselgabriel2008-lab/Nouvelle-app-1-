import { foldPhrase } from '../search/normalize';
import { searchAll } from '../search/engine';
import { COACH_LINES } from '../content/coach-lines';
import { SUBJECTS } from '../content/subjects';
import { METHODS } from '../content/methods/index';
import { SOS_PROTOCOLS } from '../content/sos';
import {
  ACK_NO,
  ACK_YES,
  GENERIC_MORE,
  INTENTS,
  type CoachLink,
  type Intent,
} from './kb';
import { LIFE_INTENTS } from './kb-vie';
import { KNOWLEDGE_INTENTS } from './kb-savoir';
import {
  CONCEPTS,
  CONCEPT_DEFAULT_INTENT,
  EXTRA_TRIGGERS,
  INTENT_CONCEPTS,
  SLANG,
} from './vocab';
import { MODES, SAFETY_INTENTS, type CoachMode } from './modes';
import type { AxelMood } from '../ui/Axel';

/**
 * Le moteur de compréhension d'Axel — 100 % local.
 *
 * Pipeline : normalisation (accents, casse, ponctuation) → détresse d'abord,
 * toujours → suivi de conversation (« ça n'a pas marché », « oui », « encore »)
 * → score pondéré des intentions (locutions > mots forts > indices, fautes de
 * frappe tolérées par distance d'édition) → entités (chaque fiche méthode et
 * SOS est connue par son titre ET ses alias étudiants) → réponse, avec un
 * second sujet ajouté quand le message mélange deux problèmes.
 */

export type { CoachLink };

export interface CoachReply {
  text: string;
  links: CoachLink[];
  mood: AxelMood;
  intent: string;
}

// ------------------------------------------------------------ Normalisation

function norm(input: string): string {
  return foldPhrase(input)
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Traduit l'argot/SMS token par token (« jpp » → « j en peux plus »).
    Garde anti-duplication : « c est » ne devient pas « c est est » quand
    « c » (→ « c est ») est déjà suivi de « est » dans le message. */
function expandSlang(tokens: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    const rep = SLANG[t];
    if (rep === undefined) {
      out.push(t);
      continue;
    }
    const parts = rep.split(' ');
    if (parts.length > 1 && parts[0] === t && tokens[i + 1] === parts[1]) {
      out.push(t);
      continue;
    }
    out.push(...parts);
  }
  return out;
}

function tokenize(input: string): string[] {
  return expandSlang(norm(input).split(' ').filter((t) => t.length > 0));
}

/** Distance de Damerau-Levenshtein bornée (transpositions comprises). */
function editDistanceAtMost(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  const m = a.length;
  const n = b.length;
  let prev2: number[] = [];
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, prev2[j - 2]! + cost);
      }
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return false;
    prev2 = prev;
    prev = cur;
  }
  return prev[n]! <= max;
}

/** Correspondance nette : identique, ou racine (« procrastin » → « procrastine »). */
function tokenExact(token: string, kw: string): boolean {
  if (token === kw) return true;
  return kw.length >= 6 && token.startsWith(kw);
}

/** Un token du message correspond-il à un mot-clé, faute de frappe comprise ? */
function tokenMatches(token: string, kw: string): boolean {
  if (tokenExact(token, kw)) return true;
  // Les mots courts exigent l'exactitude (évite « con » → « concours », etc.),
  // et la première lettre doit coïncider : les fautes de frappe touchent
  // rarement l'initiale, alors que « motivé »/« démotivé » ou « barre »/
  // « marre » changent le sens du tout au tout.
  if (kw.length < 5 || token.length < 4) return false;
  if (token[0] !== kw[0]) return false;
  return editDistanceAtMost(token, kw, kw.length >= 8 ? 2 : 1);
}

// ------------------------------------------------- Compilation des intentions

interface Compiled {
  intent: Intent;
  phrasesStrong: string[];
  phrasesWeak: string[];
  wordsStrong: string[];
  wordsWeak: string[];
}

/** La base complète : situations du concours + situations de vie + savoir. */
export const ALL_INTENTS: Intent[] = [...INTENTS, ...LIFE_INTENTS, ...KNOWLEDGE_INTENTS];

const COMPILED: Compiled[] = ALL_INTENTS.map((intent) => {
  const split = (list: string[] | undefined) => {
    const phrases: string[] = [];
    const words: string[] = [];
    for (const kw of list ?? []) {
      if (kw.includes(' ')) phrases.push(kw);
      else words.push(kw);
    }
    return { phrases, words };
  };
  const extra = EXTRA_TRIGGERS[intent.id];
  const s = split([...intent.strong, ...(extra?.strong ?? [])]);
  const w = split([...(intent.weak ?? []), ...(extra?.weak ?? [])]);
  return {
    intent,
    phrasesStrong: s.phrases,
    phrasesWeak: w.phrases,
    wordsStrong: s.words,
    wordsWeak: w.words,
  };
});

// Concepts compilés : une idée → toutes ses formes.
const CONCEPT_COMPILED = Object.entries(CONCEPTS).map(([id, forms]) => {
  const phrases: string[] = [];
  const words: string[] = [];
  for (const f of forms) {
    if (f.includes(' ')) phrases.push(f);
    else words.push(f);
  }
  return { id, phrases, words };
});

/** Concepts touchés par le message. */
function conceptHits(padded: string, tokens: string[]): Set<string> {
  const hits = new Set<string>();
  for (const c of CONCEPT_COMPILED) {
    let hit = c.phrases.some((p) => padded.includes(p));
    if (!hit) {
      hit = c.words.some((w) =>
        tokens.some((t) => tokenExact(t, w) || tokenMatches(t, w)),
      );
    }
    if (hit) hits.add(c.id);
  }
  return hits;
}

const DETRESSE = COMPILED.find((c) => c.intent.id === 'detresse')!;

/** La détresse se détecte sans tolérance aux fautes : exactitude requise. */
function detresseHit(padded: string, tokens: string[]): boolean {
  for (const p of DETRESSE.phrasesStrong) if (padded.includes(p)) return true;
  for (const w of DETRESSE.wordsStrong) {
    if (w.length <= 4) {
      if (tokens.includes(w)) return true;
    } else if (tokens.some((t) => t === w || (w === 'suicid' && t.startsWith('suicid')))) {
      return true;
    }
  }
  return false;
}

function scoreIntent(c: Compiled, padded: string, tokens: string[]): number {
  let s = 0;
  for (const p of c.phrasesStrong) if (padded.includes(p)) s += 6;
  for (const p of c.phrasesWeak) if (padded.includes(p)) s += 2;
  for (const w of c.wordsStrong) {
    if (tokens.some((t) => tokenExact(t, w))) s += 3;
    else if (tokens.some((t) => tokenMatches(t, w))) s += 2;
  }
  for (const w of c.wordsWeak) if (tokens.includes(w)) s += 1;
  return s;
}

// ------------------------------------------------------------------ Matières

/** Abréviations étudiantes courantes, en plus des noms et ids officiels. */
const SUBJECT_ABBREV: Record<string, string[]> = {
  anatomie: ['anat'],
  histologie: ['histo'],
  embryologie: ['embryo'],
  biostats: ['biostat', 'biostatistique', 'biostatistiques', 'stats'],
  'sante-publique': ['sp', 'spu'],
  medicament: ['pharma', 'pharmaco'],
  biocell: ['bio cell', 'biologie cellulaire'],
  biophysique: ['biophy'],
};

const SUBJECT_KEYS: { key: string; id: string; name: string }[] = SUBJECTS.flatMap((s) => {
  const keys = new Set<string>([norm(s.name), norm(s.id), ...(SUBJECT_ABBREV[s.id] ?? [])]);
  return Array.from(keys).map((key) => ({ key, id: s.id, name: s.name }));
});

function subjectHits(padded: string): { id: string; name: string }[] {
  const seen = new Set<string>();
  const out: { id: string; name: string }[] = [];
  for (const s of SUBJECT_KEYS) {
    const hit = s.key.includes(' ') ? padded.includes(s.key) : padded.includes(` ${s.key} `);
    if (hit && !seen.has(s.id)) {
      seen.add(s.id);
      out.push({ id: s.id, name: s.name });
    }
  }
  return out;
}

// ------------------------------------------------------------------ Entités

interface Entity {
  kind: 'method' | 'sos';
  id: string;
  title: string;
  summary: string;
  phrases: string[];
  words: string[];
  links: CoachLink[];
}

const STOPWORDS = new Set(
  'le la les un une des de du d l c ca cest je tu il on nous vous ils j y en et ou mais donc or ni car a au aux pour par avec sans sur sous dans que qui quoi quel quelle quels quelles est es suis sont etre avoir ai as ont fait faire faut il me te se moi toi lui mon ma mes ton ta tes son sa ses ce cet cette ces plus moins tres bien mal pas ne non oui si comment pourquoi quand combien explique moi'
    .split(' '),
);

function entityWordOk(w: string): boolean {
  return w.length >= 5 && !STOPWORDS.has(w);
}

const ENTITIES: Entity[] = [
  ...METHODS.map((m): Entity => {
    const phrases = new Set<string>();
    const words = new Set<string>();
    for (const part of m.title.split('/')) {
      const p = norm(part);
      if (p.includes(' ')) phrases.add(p);
      else if (entityWordOk(p)) words.add(p);
    }
    for (const alias of m.aliases) {
      const p = norm(alias);
      if (p.includes(' ')) phrases.add(p);
      else if (entityWordOk(p)) words.add(p);
    }
    return {
      kind: 'method',
      id: m.id,
      title: m.title,
      summary: m.summary,
      phrases: Array.from(phrases),
      words: Array.from(words),
      links: [{ label: `Fiche complète : ${m.title}`, to: `/methode/${m.id}` }],
    };
  }),
  ...SOS_PROTOCOLS.map((s): Entity => {
    const p = norm(s.title);
    return {
      kind: 'sos',
      id: s.id,
      title: s.title,
      summary:
        'C’est un protocole SOS : très court, à suivre tel quel dans le moment chaud — il commence par « Fais ça maintenant ».',
      phrases: p.includes(' ') ? [p] : [],
      words: !p.includes(' ') && entityWordOk(p) ? [p] : [],
      links: [{ label: `Protocole SOS : ${s.title}`, to: `/sos/${s.id}` }],
    };
  }),
];

const INFO_PATTERN =
  /(c est quoi|cest quoi|c est koi|quest ce que|qu est ce que|explique|definition|resume moi|parle moi de|ca consiste|comment faire (le|la|un|une)|comment marche|ca marche comment|en quoi consiste)/;

function findEntity(padded: string, tokens: string[]): Entity | null {
  let best: Entity | null = null;
  let bestLen = 0;
  for (const e of ENTITIES) {
    for (const p of e.phrases) {
      if (padded.includes(p) && p.length > bestLen) {
        best = e;
        bestLen = p.length;
      }
    }
    for (const w of e.words) {
      const hit = tokens.some((t) => t === w || tokenMatches(t, w));
      if (hit && w.length > bestLen) {
        best = e;
        bestLen = w.length;
      }
    }
  }
  return best;
}

/** Le message est-il essentiellement le nom de l'entité (± mots outils) ?
    Correspondance exacte seulement : « je stresse » ne doit pas devenir la
    fiche anti-stress par approximation. */
function isBareEntity(tokens: string[], e: Entity): boolean {
  const entityTokens = new Set<string>();
  for (const p of e.phrases) for (const t of p.split(' ')) entityTokens.add(t);
  for (const w of e.words) entityTokens.add(w);
  const meaningful = tokens.filter((t) => !STOPWORDS.has(t));
  if (meaningful.length === 0) return false;
  return meaningful.every((t) => entityTokens.has(t));
}

const ENTITY_TEMPLATES: ((e: Entity) => string)[] = [
  (e) => `${e.title} — en 20 secondes : ${e.summary}\n\nLa fiche complète ci-dessous détaille quand l’utiliser, quand l’éviter, et la procédure pas à pas.`,
  (e) => `Voilà l’essentiel. ${e.title} : ${e.summary}\n\nOuvre la fiche pour la procédure exacte — et le mode « Suivre pas à pas » te tient la main.`,
  (e) => `${e.summary}\n\nC’est ça, ${e.title}. Tout le détail (conditions, pièges, étapes) est dans la fiche ci-dessous.`,
];

// ----------------------------------------------------------------- Suivi

const FOLLOW_NOT_WORKED = [
  'ca marche pas', 'ca ne marche pas', 'marche pas', 'ca n a pas marche', 'ca a pas marche',
  'toujours pareil', 'ca change rien', 'deja essaye', 'j ai deja essaye', 'ca aide pas',
];
const FOLLOW_EXPLAIN = ['explique', 'dis m en plus', 'developpe', 'plus de details', 'precise', 'comment ca'];
const FOLLOW_YES = ['oui', 'ok', 'okay', 'd accord', 'daccord', 'vas y', 'ca marche', 'bien recu', 'compris'];
const FOLLOW_NO = ['non', 'pas ca', 'pas vraiment', 'bof', 'pas convaincu'];
const FOLLOW_AGAIN = ['encore', 'une autre', 'autre', 'encore une', 'la suivante'];

type FollowKind = 'notWorked' | 'explain' | 'yes' | 'no' | 'again' | null;

function followKind(padded: string, tokens: string[]): FollowKind {
  const t = padded.trim();
  const short = tokens.length <= 5;
  const inList = (list: string[]) =>
    list.some((p) => (p.includes(' ') ? padded.includes(p) : short && tokens.includes(p)));
  if (inList(FOLLOW_NOT_WORKED)) return 'notWorked';
  if (short && inList(FOLLOW_AGAIN)) return 'again';
  if (short && inList(FOLLOW_EXPLAIN)) return 'explain';
  if (tokens.length <= 3 && inList(FOLLOW_YES)) return 'yes';
  if (tokens.length <= 3 && inList(FOLLOW_NO)) return 'no';
  void t;
  return null;
}

// ------------------------------------------------------------------ État

const lastVariant = new Map<string, number>();
let lastIntentId: string | null = null;
let lastLinks: CoachLink[] = [];

function pickVariant(id: string, variants: string[], rng: () => number): string {
  let idx = Math.floor(rng() * variants.length);
  const last = lastVariant.get(id);
  if (variants.length > 1 && idx === last) idx = (idx + 1) % variants.length;
  lastVariant.set(id, idx);
  return variants[idx]!;
}

function fillSlots(text: string, rng: () => number): string {
  if (!text.includes('{line}')) return text;
  const line = COACH_LINES[Math.floor(rng() * COACH_LINES.length)]!.text;
  // Espaces insécables : le guillemet ne se retrouve jamais orphelin.
  return text.replace('{line}', `« ${line} »`);
}

export function _resetCoachForTests(): void {
  lastVariant.clear();
  lastIntentId = null;
  lastLinks = [];
}

// ------------------------------------------------------------------ Accueil

export const QUICK_CHIPS: string[] = [
  'Motive-moi',
  'J’arrive pas à commencer',
  'Ça ne rentre pas',
  'Je stresse',
  'C’est quoi le rappel actif ?',
  'Je confonds deux notions',
  'Je rate mes QCM',
  'Je dors mal',
  'Je suis débordé·e',
  'Quelle méthode ce soir ?',
];

export function greet(
  rng: () => number = Math.random,
  mode: CoachMode = 'classique',
): CoachReply {
  return {
    text: pickVariant(`greet:${mode}`, MODES[mode].greetings, rng),
    links: [],
    mood: 'happy',
    intent: 'greet',
  };
}

/** Intentions sociales/méta : ni second sujet, ni ton de personnalité forcé. */

// ------------------------------------------------------------------ Réponse

const NO_SECONDARY = new Set([
  'salut', 'merci', 'au-revoir', 'vexant', 'blague', 'qui-es-tu', 'aide-app',
  'motive-moi', 'quelle-methode', 'sos', 'detresse',
]);

function remember(id: string, links: CoachLink[]): void {
  lastIntentId = id;
  lastLinks = links;
}

export function respond(
  input: string,
  rng: () => number = Math.random,
  mode: CoachMode = 'classique',
): CoachReply {
  const tokens = tokenize(input);
  const padded = ` ${tokens.join(' ')} `;

  // 1. La détresse d'abord, toujours — sans tolérance approximative.
  if (detresseHit(padded, tokens)) {
    const d = DETRESSE.intent;
    const reply: CoachReply = {
      text: pickVariant(d.id, d.variants, rng),
      links: d.links ?? [],
      mood: d.mood ?? 'care',
      intent: d.id,
    };
    remember(d.id, reply.links);
    return reply;
  }

  // 2. Scores des intentions : mots-clés + concepts touchés + matière citée.
  const subjects = subjectHits(padded);
  const concepts = conceptHits(padded, tokens);
  const scored = COMPILED.map((c) => {
    let score =
      c.intent.id === 'matiere'
        ? subjects.length > 0
          ? 6
          : 0
        : scoreIntent(c, padded, tokens);
    const subs = INTENT_CONCEPTS[c.intent.id];
    if (subs !== undefined) {
      for (const s of subs) if (concepts.has(s.c)) score += s.w;
    }
    return { c, score };
  }).filter((s) => s.score > 0);
  // Le SCORE décide, la priorité ne fait que départager : une correspondance
  // précise bat toujours une correspondance vague, quel que soit le sujet.
  // (La détresse, elle, court-circuite tout en amont.)
  scored.sort(
    (a, b) =>
      (b.score * 100 + (b.c.intent.priority ?? 10)) -
      (a.score * 100 + (a.c.intent.priority ?? 10)),
  );
  // La matière seule est un choix par défaut : tout signal précis la bat
  // (elle reste ajoutée en lien dans tous les cas).
  if (
    scored.length > 1 &&
    scored[0]!.c.intent.id === 'matiere' &&
    scored.some((s) => s.c.intent.id !== 'matiere' && s.score >= 3)
  ) {
    const idx = scored.findIndex((s) => s.c.intent.id !== 'matiere' && s.score >= 3);
    const [promoted] = scored.splice(idx, 1);
    scored.unshift(promoted!);
  }
  const best = scored[0];

  // 3. Suivi de conversation — seulement si le message n'est pas un nouveau
  //    sujet net par lui-même.
  const follow = followKind(padded, tokens);
  if (follow !== null && lastIntentId !== null && (best === undefined || best.score < 6)) {
    const lastIntent = ALL_INTENTS.find((i) => i.id === lastIntentId);
    if (follow === 'yes') {
      const r: CoachReply = { text: pickVariant('ack-yes', ACK_YES, rng), links: lastLinks, mood: 'cheer', intent: 'suivi' };
      return r;
    }
    if (follow === 'no') {
      const r: CoachReply = {
        text: pickVariant('ack-no', ACK_NO, rng),
        links: [{ label: 'Lancer le diagnostic', to: '/diagnostic' }],
        mood: 'think',
        intent: 'suivi',
      };
      return r;
    }
    // notWorked / explain / again → l'approfondissement du dernier sujet.
    const pool =
      lastIntent?.more !== undefined && lastIntent.more.length > 0
        ? lastIntent.more
        : GENERIC_MORE;
    const r: CoachReply = {
      text: fillSlots(pickVariant(`${lastIntentId}:more`, pool, rng), rng),
      links: lastLinks,
      mood: lastIntent?.mood ?? 'think',
      intent: 'suivi',
    };
    return r;
  }

  // 4. Entités : « c'est quoi X », message réduit au nom d'une fiche, ou
  //    rien d'autre ne matche. Une vraie situation vécue garde la priorité —
  //    et une QUESTION précise (locution à 6+, ex. couche savoir) bat la
  //    carte d'identité générique de la fiche.
  const entity = findEntity(padded, tokens);
  const asksInfo = INFO_PATTERN.test(padded);
  if (
    entity !== null &&
    ((asksInfo && (best === undefined || best.score < 6)) ||
      (isBareEntity(tokens, entity) && (best === undefined || best.score < 3)) ||
      best === undefined)
  ) {
    const tpl = ENTITY_TEMPLATES[Math.floor(rng() * ENTITY_TEMPLATES.length)]!;
    const reply: CoachReply = {
      text: tpl(entity),
      links: entity.links,
      mood: 'happy',
      intent: `entite:${entity.id}`,
    };
    remember(reply.intent, reply.links);
    return reply;
  }

  // 5. Filet de sécurité conceptuel : une idée reconnue sans mot-clé d'intention.
  let resolved = best;
  if (resolved === undefined || resolved.score < 2) {
    for (const c of concepts) {
      const target = CONCEPT_DEFAULT_INTENT[c];
      if (target !== undefined) {
        const comp = COMPILED.find((x) => x.intent.id === target);
        if (comp !== undefined) {
          resolved = { c: comp, score: 4 };
          break;
        }
      }
    }
  }

  // 6. Dernier filet : la recherche de l'app trouve presque toujours des pistes.
  if (resolved === undefined || resolved.score < 2) {
    const hits = searchAll(input, 4).slice(0, 3);
    if (hits.length > 0) {
      const SEARCH_VARIANTS = [
        'Je n’ai pas de réponse toute prête à ça — mais la recherche de l’app trouve des pistes sérieuses, je te les mets ci-dessous. Si aucune ne colle, dis-le moi avec d’autres mots.',
        'Pas d’intention claire de mon côté, alors j’ai fait tourner la recherche : voilà ce qu’elle propose de plus proche. Sinon, reformule en une phrase simple, je réessaie.',
        'Je préfère être honnête : je ne suis pas sûr de la demande. En attendant, la recherche remonte ces fiches — l’une d’elles est peut-être exactement ce que tu cherches.',
      ];
      const reply: CoachReply = {
        text: pickVariant('recherche', SEARCH_VARIANTS, rng),
        links: hits.map((h) => ({ label: h.title, to: h.route })),
        mood: 'think',
        intent: 'recherche',
      };
      return reply;
    }
    const FALLBACK_VARIANTS = [
      'Je ne suis pas sûr d’avoir bien compris — et je préfère te le dire que répondre à côté. Reformule en une phrase simple (« je n’arrive pas à… », « comment retenir… »), ou lance le diagnostic ci-dessous.',
      'Hmm, ça dépasse mes mots-clés. Essaie avec d’autres mots — ou plus efficace : le diagnostic ci-dessous pose 3 à 5 questions et trouve la méthode exacte, sans se tromper.',
      'Là je sèche (ça arrive aux meilleurs neurones). Dis-le autrement — « je bloque sur… », « je confonds… », « je stresse pour… » — ou passe par la recherche, elle comprend même les fautes de frappe.',
      'Pas certain de te suivre. Donne-moi le problème brut, sans faire de belles phrases : « anat rentre pas », « pas motivé », « QCM ratés »… Je parle couramment le raccourci.',
    ];
    const reply: CoachReply = {
      text: pickVariant('fallback', FALLBACK_VARIANTS, rng),
      links: [
        { label: 'Lancer le diagnostic (il pose les questions)', to: '/diagnostic' },
        { label: 'Chercher dans les méthodes', to: '/recherche' },
      ],
      mood: 'think',
      intent: 'fallback',
    };
    return reply;
  }

  // 6. Réponse principale + éventuel second sujet si le message en mélange deux.
  const intent = resolved.c.intent;
  let links: CoachLink[] =
    intent.id === 'matiere'
      ? subjects.map((s) => ({ label: `Protocole ${s.name}`, to: `/matiere/${s.id}` }))
      : [...(intent.links ?? [])];
  // La personnalité choisie parle — sauf sur les sujets sensibles, qui
  // gardent toujours la voix bienveillante de base.
  const modeCfg = MODES[mode];
  const safe = SAFETY_INTENTS.has(intent.id);
  const override = safe ? undefined : modeCfg.overrides[intent.id];
  let text = fillSlots(
    pickVariant(
      override !== undefined ? `${intent.id}:${mode}` : intent.id,
      override ?? intent.variants,
      rng,
    ),
    rng,
  );

  if (!NO_SECONDARY.has(intent.id)) {
    const second = scored.find(
      (s) =>
        s.c.intent.id !== intent.id &&
        s.c.intent.id !== 'matiere' &&
        s.score >= 3 &&
        s.c.intent.also !== undefined &&
        !NO_SECONDARY.has(s.c.intent.id),
    );
    if (second !== undefined) {
      text += `\n\n${second.c.intent.also}`;
      const extra = (second.c.intent.links ?? []).filter(
        (l) => !links.some((x) => x.to === l.to),
      );
      links = [...links, ...extra].slice(0, 5);
    }
    // Une matière citée en passant devient un raccourci en plus.
    if (intent.id !== 'matiere' && subjects.length > 0) {
      const extras = subjects
        .map((s) => ({ label: `Protocole ${s.name}`, to: `/matiere/${s.id}` }))
        .filter((l) => !links.some((x) => x.to === l.to));
      if (extras.length > 0 && links.length < 5) {
        links = [...links, ...extras].slice(0, 5);
      }
    }
  }

  // Signature du mode sur les réponses de base (jamais sur les sujets sûrs
  // ni les échanges sociaux) : le ton reste présent partout.
  if (
    !safe &&
    override === undefined &&
    modeCfg.closers.length > 0 &&
    !NO_SECONDARY.has(intent.id)
  ) {
    text += `\n\n${pickVariant(`closer:${mode}`, modeCfg.closers, rng)}`;
  }

  const reply: CoachReply = {
    text,
    links,
    mood: intent.mood ?? 'happy',
    intent: intent.id,
  };
  remember(intent.id, links);
  return reply;
}
