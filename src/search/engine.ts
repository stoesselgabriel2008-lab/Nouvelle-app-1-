import MiniSearch from 'minisearch';
import type { SearchOptions } from 'minisearch';
import { METHODS } from '../content/methods/index';
import { SUBJECTS } from '../content/subjects';
import { SOS_PROTOCOLS } from '../content/sos';
import { PROFILE_SIGNALS, PERSONAL_RULES, PROFILE_NOTE } from '../content/profile';
import {
  ALGORITHM_STEPS,
  INFO_TYPE_MATRIX,
  MYTHS,
  RESEARCH_SOURCES,
} from '../content/reference';
import {
  CATEGORY_LABELS,
  INFO_TYPE_LABELS,
  PROBLEM_LABELS,
  SUBJECT_LABELS,
} from '../content/taxonomy';
import { foldPhrase, normalizeTerm } from './normalize';

export type SearchKind = 'method' | 'subject' | 'sos' | 'reference';

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  refId: string;
  title: string;
  subtitle: string;
  route: string;
  aliases: string;
  problems: string;
  infoTypes: string;
  subjects: string;
  tags: string;
  keywords: string;
  summary: string;
  content: string;
}

export interface SearchHit {
  kind: SearchKind;
  refId: string;
  title: string;
  subtitle: string;
  summary: string;
  route: string;
  score: number;
}

function buildDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const m of METHODS) {
    docs.push({
      id: `method:${m.id}`,
      kind: 'method',
      refId: m.id,
      title: m.title,
      subtitle: m.subtitle,
      route: `/methode/${m.id}`,
      aliases: m.aliases.join(' · '),
      problems: m.problems.map((p) => PROBLEM_LABELS[p]).join(' · '),
      infoTypes: m.infoTypes.map((t) => INFO_TYPE_LABELS[t]).join(' · '),
      subjects: m.subjects.map((s) => SUBJECT_LABELS[s]).join(' · '),
      tags: [...m.tags, ...m.categories.map((c) => CATEGORY_LABELS[c])].join(' · '),
      keywords: m.keywords.join(' · '),
      summary: m.summary,
      content: [
        ...m.whenToUse,
        ...m.avoid,
        ...m.quickSteps,
        ...m.procedure.map(
          (s) => `${s.text} ${s.detail ?? ''} ${s.micro?.join(' ') ?? ''}`,
        ),
        ...(m.personal ?? []),
        ...(m.anki ? [...m.anki.yes, ...m.anki.no, m.anki.note ?? ''] : []),
        ...m.mastery,
        ...(m.limits ?? []),
        m.example ?? '',
      ].join(' '),
    });
  }

  for (const s of SUBJECTS) {
    docs.push({
      id: `subject:${s.id}`,
      kind: 'subject',
      refId: s.id,
      title: s.name,
      subtitle: 'Protocole matière',
      route: `/matiere/${s.id}`,
      aliases: s.aliases.join(' · '),
      problems: '',
      infoTypes: '',
      subjects: s.name,
      tags: 'matière protocole',
      keywords: '',
      summary: s.intro,
      content: s.protocol.map((p) => p.text).join(' '),
    });
  }

  for (const p of SOS_PROTOCOLS) {
    docs.push({
      id: `sos:${p.id}`,
      kind: 'sos',
      refId: p.id,
      title: p.title,
      subtitle: 'Protocole SOS',
      route: `/sos/${p.id}`,
      aliases: p.aliases.join(' · '),
      problems: p.tagline,
      infoTypes: '',
      subjects: '',
      tags: 'sos urgence redémarrer',
      keywords: '',
      summary: p.tagline,
      content: [...p.doNow, ...(p.then ?? [])].join(' '),
    });
  }

  docs.push({
    id: 'reference:profil',
    kind: 'reference',
    refId: 'profil',
    title: 'Mon profil fonctionnel',
    subtitle: 'Règles personnalisées',
    route: '/',
    aliases: 'profil · règles personnalisées · adapté à moi · mes méthodes · pour moi',
    problems: '',
    infoTypes: '',
    subjects: '',
    tags: 'profil',
    keywords: 'imagerie structure reconnaissance rappel interférence',
    summary: PROFILE_NOTE,
    content: [
      ...PROFILE_SIGNALS.map((s) => `${s.signal} ${s.consequence}`),
      ...PERSONAL_RULES.map((r) => r.rule),
    ].join(' '),
  });

  docs.push({
    id: 'reference:algorithme',
    kind: 'reference',
    refId: 'algorithme',
    title: 'Algorithme universel d’un cours',
    subtitle: 'Repère',
    route: '/reperes/algorithme',
    aliases:
      'algorithme · orienter comprendre représenter fermer rappeler corriger appliquer entretenir · par où commencer un cours · nouvelle méthode de travail · comment travailler un cours',
    problems: '',
    infoTypes: '',
    subjects: '',
    tags: 'repère',
    keywords: 'étapes cours méthode globale',
    summary: 'Les 10 étapes qui transforment n’importe quel cours en maîtrise vérifiée.',
    content: ALGORITHM_STEPS.map((s) => `${s.name} ${s.action}`).join(' '),
  });

  docs.push({
    id: 'reference:matrice',
    kind: 'reference',
    refId: 'matrice',
    title: 'Quel outil pour quel type d’information ?',
    subtitle: 'Repère',
    route: '/reperes/matrice',
    aliases: 'matrice · type d’information · quel outil · quelle méthode pour',
    problems: '',
    infoTypes: INFO_TYPE_MATRIX.map((e) => e.name).join(' · '),
    subjects: '',
    tags: 'repère',
    keywords: 'correspondance choix méthode',
    summary: 'La méthode dominante pour chaque type d’information.',
    content: INFO_TYPE_MATRIX.map((e) => `${e.name} ${e.route}`).join(' '),
  });

  docs.push({
    id: 'reference:mythes',
    kind: 'reference',
    refId: 'mythes',
    title: 'Mythes et limites',
    subtitle: 'Repère',
    route: '/reperes/mythes',
    aliases:
      'mythes · idées reçues · fausses croyances · style d’apprentissage · visuel auditif · méthode miracle · méthode magique',
    problems: '',
    infoTypes: '',
    subjects: '',
    tags: 'repère nuances',
    keywords: 'limites prudence',
    summary: 'Dix idées trompeuses et leur version sûre.',
    content: MYTHS.map((m) => `${m.myth} ${m.truth}`).join(' '),
  });

  docs.push({
    id: 'reference:sources',
    kind: 'reference',
    refId: 'sources',
    title: 'Sources et niveau de preuve',
    subtitle: 'Repère',
    route: '/reperes/sources',
    aliases: 'sources · preuve · références · études',
    problems: '',
    infoTypes: '',
    subjects: '',
    tags: 'repère',
    keywords: 'recherche littérature évidence',
    summary: 'D’où vient le contenu, et avec quel niveau de confiance.',
    content: RESEARCH_SOURCES.map((s) => `${s.domain} ${s.reference}`).join(' '),
  });

  return docs;
}

const SEARCH_FIELDS = [
  'title',
  'aliases',
  'problems',
  'infoTypes',
  'subjects',
  'tags',
  'keywords',
  'summary',
  'content',
] as const;

/** Ranking demandé : titre > alias > problème > type > matière > tags > contenu. */
const FIELD_BOOSTS: Record<(typeof SEARCH_FIELDS)[number], number> = {
  title: 12,
  aliases: 10,
  problems: 6,
  infoTypes: 5,
  subjects: 4.5,
  tags: 4,
  keywords: 3.5,
  summary: 2,
  content: 1,
};

let mini: MiniSearch<SearchDoc> | null = null;
let docsById: Map<string, SearchDoc> | null = null;

function ensureIndex(): MiniSearch<SearchDoc> {
  if (mini) return mini;
  const docs = buildDocs();
  docsById = new Map(docs.map((d) => [d.id, d]));
  mini = new MiniSearch<SearchDoc>({
    fields: [...SEARCH_FIELDS],
    storeFields: ['kind', 'refId', 'title', 'subtitle', 'summary', 'route'],
    processTerm: (term) => {
      const t = normalizeTerm(term);
      return t.length > 0 ? t : null;
    },
  });
  mini.addAll(docs);
  return mini;
}

const BASE_OPTIONS: SearchOptions = {
  boost: FIELD_BOOSTS,
  prefix: true,
  fuzzy: 0.2,
  combineWith: 'OR',
};

/**
 * Bonus d'exactitude : une requête qui est exactement un titre ou un alias
 * (après normalisation) remonte franchement, conformément au ranking demandé.
 */
function exactBonus(doc: SearchDoc, folded: string): number {
  if (folded.length === 0) return 0;
  if (foldPhrase(doc.title) === folded) return 100;
  const aliases = doc.aliases.split(' · ').map((a) => foldPhrase(a));
  if (aliases.includes(folded)) return 80;
  if (aliases.some((a) => a.startsWith(folded) && folded.length >= 3)) return 20;
  return 0;
}

export function searchAll(query: string, limit = 20): SearchHit[] {
  const trimmed = query.trim();
  if (trimmed.length === 0) return [];
  const index = ensureIndex();
  const folded = foldPhrase(trimmed);
  const raw = index.search(trimmed, BASE_OPTIONS);
  const hits: SearchHit[] = raw.map((r) => {
    const doc = docsById?.get(String(r.id));
    const bonus = doc ? exactBonus(doc, folded) : 0;
    return {
      kind: r['kind'] as SearchKind,
      refId: r['refId'] as string,
      title: r['title'] as string,
      subtitle: r['subtitle'] as string,
      summary: r['summary'] as string,
      route: r['route'] as string,
      score: r.score + bonus,
    };
  });
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Pour les tests : reconstruit l'index à la demande. */
export function _resetIndexForTests(): void {
  mini = null;
  docsById = null;
}
