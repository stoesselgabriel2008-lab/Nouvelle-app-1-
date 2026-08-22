import { beforeEach, describe, expect, it } from 'vitest';
import { respond, _resetCoachForTests } from '../src/coach/engine';
import { INTENTS } from '../src/coach/kb';
import { foldPhrase } from '../src/search/normalize';
import { METHODS } from '../src/content/methods/index';
import { SOS_PROTOCOLS } from '../src/content/sos';
import { SUBJECTS } from '../src/content/subjects';

/**
 * Table d'évaluation du coach : chaque ligne est un message réel possible et
 * l'intention attendue. C'est elle qui garantit qu'Axel « comprend beaucoup
 * plus de choses » — et qu'il continuera après chaque modification.
 */

function seededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

beforeEach(() => {
  _resetCoachForTests();
});

/** [message, intention attendue] */
const EVAL: [string, string][] = [
  // --- démarrage / motivation
  ['je procrastine grave', 'procrastination'],
  ['jarrive pas a my mettre', 'procrastination'],
  ['grosse flemme ce soir', 'procrastination'],
  ['je remets tout à demain', 'procrastination'],
  ['aucune motivation', 'procrastination'],
  ['motive moi stp', 'motive-moi'],
  ['balance une citation', 'motive-moi'],

  // --- mémoire
  ['ça rentre pas du tout', 'ca-rentre-pas'],
  ['je retiens rien en anat', 'ca-rentre-pas'],
  ['joublie tout au bout de deux semaines', 'memoire-long-terme'],
  ['ça s’efface au bout de quelques jours', 'memoire-long-terme'],
  ['comment retenir sur le long terme', 'memoire-long-terme'],
  ['par coeur les classifications', 'par-coeur'],
  ['un moyen mnémotechnique pour les noms', 'par-coeur'],

  // --- comprendre
  ['je comprends rien à ce chapitre', 'comprends-rien'],
  ['je confonds les isoformes', 'confusion'],
  ['tout se mélange dans ma tête', 'confusion'],
  ['trop de détails je sais pas quoi retenir', 'trop-de-details'],
  ['comment aborder un nouveau chapitre', 'nouveau-chapitre'],

  // --- tester
  ['je rate tous mes qcm', 'qcm'],
  ['je tombe dans les pièges des items', 'qcm'],
  ['jai eu une mauvaise note au concours blanc', 'note-ratee'],
  ['je chute au classement', 'note-ratee'],
  ['trou noir pendant la colle', 'trou-noir-examen'],
  ['je sais chez moi mais pas en examen', 'trou-noir-examen'],
  ['jétais sûr de moi et cétait faux', 'illusion-maitrise'],

  // --- organisation
  ['je suis débordée jamais à jour', 'retard'],
  ['3 semaines de retard en biochimie', 'retard'],
  ['jai raté des cours la semaine dernière', 'absence'],
  ['comment organiser ma semaine', 'planning'],
  ['combien d’heures par jour il faut bosser', 'combien-heures'],
  ['je culpabilise quand je me repose', 'vacances-repos'],
  ['je peux prendre un jour off ?', 'vacances-repos'],

  // --- énergie / hygiène
  ['je suis épuisé', 'fatigue'],
  ['nuit blanche hier', 'fatigue'],
  ['je dors mal en ce moment', 'sommeil'],
  ['insomnie avant les exams', 'sommeil'],
  ['le café ça marche vraiment ?', 'cafe-energie'],
  ['gros coup de barre après manger', 'cafe-energie'],
  ['je devrais arrêter le sport pour bosser ?', 'sport'],
  ['jai tout le temps mal à la tête', 'sante-physique'],
  ['je suis malade cette semaine', 'sante-physique'],

  // --- focus
  ['je suis tout le temps distrait', 'concentration'],
  ['tiktok me bouffe mes soirées', 'concentration'],
  ['je peux bosser en musique ?', 'musique'],
  ['bibliothèque ou chez moi ?', 'lieu-travail'],
  ['chez moi j’y arrive pas', 'lieu-travail'],
  ['combien de temps de pause', 'pause'],

  // --- outils
  ['anki me déborde complètement', 'anki'],
  ['trop de cartes en retard', 'anki'],
  ['je dois faire des fiches ou pas ?', 'fiches'],
  ['je passe mon temps à recopier mon cours', 'fiches'],
  ['je relis mon cours 3 fois et rien', 'relecture-surlignage'],
  ['je surligne tout au stabilo', 'relecture-surlignage'],
  ['comment prendre des notes en amphi', 'prise-de-notes'],
  ['quel drive utiliser pour les fiches', 'ressources'],
  ['je regarde les replays en x2', 'cours-video'],

  // --- matières
  ['comment retenir les formules de physique', 'formules'],
  ['les schémas d’anatomie ne rentrent pas', 'schemas'],
  ['comment bosser la biochimie', 'matiere'],
  ['jai du mal en biostatistiques', 'matiere'],
  ['santé publique c’est imbitable', 'matiere'],

  // --- mental
  ['tout le monde est meilleur que moi', 'comparaison'],
  ['je me sens pas légitime ici', 'comparaison'],
  ['mes parents me mettent la pression', 'pression-famille'],
  ['je suis doublante', 'doublant'],
  ['je suis perfectionniste je recommence tout le temps', 'perfectionnisme'],
  ['je m’ennuie en révisant', 'ennui'],
  ['et si je rate mon année ?', 'peur-echec'],
  ['je sais plus pourquoi je fais médecine', 'pourquoi-medecine'],
  ['je stagne au même niveau depuis un mois', 'progres-stagne'],
  ['je suis trop lent en colle', 'lent'],
  ['je pense avoir un tdah', 'trouble-attention'],
  ['je suis plutôt visuel comme profil', 'styles-apprentissage'],

  // --- échéances
  ['exam demain je fais quoi', 'echeance-proche'],
  ['concours dans 3 jours', 'echeance-proche'],
  ['colle demain matin', 'echeance-proche'],

  // --- stress / sécurité
  ['je stresse énormément', 'stress'],
  ['boule au ventre en permanence', 'stress'],
  ['crise de panique ce matin', 'panique'],
  ['je vais craquer', 'detresse'],
  ['jai envie de tout abandonner', 'detresse'],
  ['je n’en peux plus', 'detresse'],

  // --- social / méta
  ['wesh', 'salut'],
  ['bonsoir', 'salut'],
  ['merci beaucoup', 'merci'],
  ['bonne nuit axel', 'au-revoir'],
  ['t’es qui toi ?', 'qui-es-tu'],
  ['raconte une blague', 'blague'],
  ['tu sais faire quoi ?', 'aide-app'],
  ['quelle méthode pour ce soir', 'quelle-methode'],
  ['mes amis me manquent', 'amis-sorties'],
];

describe('table d’évaluation : compréhension large', () => {
  for (const [msg, expected] of EVAL) {
    it(`« ${msg} » → ${expected}`, () => {
      _resetCoachForTests();
      expect(respond(msg, seededRng(3)).intent).toBe(expected);
    });
  }

  it('fautes de frappe : la distance d’édition rattrape', () => {
    expect(respond('je procrastinne trop', seededRng(1)).intent).toBe('procrastination');
    expect(respond('je suis debordee', seededRng(1)).intent).toBe('retard');
    expect(respond('insomni depuis lundi', seededRng(1)).intent).toBe('sommeil');
    expect(respond('je confons deux molécules', seededRng(1)).intent).toBe('confusion');
  });

  it('« concours » seul ne déclenche jamais l’intention vexée', () => {
    expect(respond('peur du concours', seededRng(1)).intent).not.toBe('vexant');
  });
});

describe('entités : Axel connaît chaque fiche par son nom', () => {
  it('« c’est quoi X » répond avec le résumé réel de la fiche', () => {
    const r = respond('c’est quoi le blurting ?', seededRng(1));
    expect(r.intent).toBe('entite:blurting');
    const m = METHODS.find((x) => x.id === 'blurting')!;
    expect(r.text).toContain(m.summary.slice(0, 40));
    expect(r.links.map((l) => l.to)).toContain('/methode/blurting');
  });

  it('le nom seul suffit (« feynman », « pomodoro »)', () => {
    expect(respond('feynman', seededRng(1)).intent).toBe('entite:feynman');
    _resetCoachForTests();
    expect(respond('le palais mental', seededRng(1)).intent).toBe('entite:palais-mental');
  });

  it('les alias étudiants mènent à la bonne fiche', () => {
    const r = respond('explique la méthode de la feuille blanche', seededRng(1));
    expect(r.intent).toBe('entite:feuille-blanche');
  });

  it('une situation vécue garde la priorité sur l’entité', () => {
    expect(respond('je stresse trop', seededRng(1)).intent).toBe('stress');
  });
});

describe('conversation : mémoire du contexte', () => {
  it('« ça n’a pas marché » approfondit le dernier sujet', () => {
    const rng = seededRng(5);
    respond('je procrastine', rng);
    const r = respond('ça marche pas', rng);
    expect(r.intent).toBe('suivi');
    expect(r.text.length).toBeGreaterThan(40);
  });

  it('« oui » encourage à exécuter, « non » propose de reformuler', () => {
    const rng = seededRng(5);
    respond('je rate mes qcm', rng);
    expect(respond('oui', rng).intent).toBe('suivi');
    _resetCoachForTests();
    respond('je rate mes qcm', rng);
    const no = respond('non', rng);
    expect(no.intent).toBe('suivi');
    expect(no.links.map((l) => l.to)).toContain('/diagnostic');
  });

  it('« encore » après motive-moi sert une nouvelle phrase', () => {
    const rng = seededRng(9);
    const a = respond('motive moi', rng);
    const b = respond('encore', rng);
    expect(b.intent).toBe('suivi');
    expect(b.text).not.toBe(a.text);
  });

  it('un nouveau sujet net interrompt le suivi', () => {
    const rng = seededRng(5);
    respond('je procrastine', rng);
    expect(respond('non mais surtout je rate mes qcm', rng).intent).toBe('qcm');
  });
});

describe('multi-intentions : deux problèmes, une réponse complète', () => {
  it('« crevé et débordé » traite la fatigue ET mentionne le retard', () => {
    const r = respond('je suis crevé et complètement débordé', seededRng(2));
    expect(r.intent).toBe('fatigue');
    expect(r.text).toMatch(/retard|triage/i);
    expect(r.links.map((l) => l.to)).toContain('/sos/fatigue');
    expect(r.links.map((l) => l.to)).toContain('/sos/retard');
  });

  it('« je stresse et je confonds tout » chaîne les deux sujets', () => {
    const r = respond('je stresse et je confonds tout', seededRng(2));
    expect(r.intent).toBe('stress');
    expect(r.text).toMatch(/contraste|confonds/i);
  });
});

describe('intégrité de la base de connaissances', () => {
  const routes = new Set<string>([
    '/diagnostic', '/bibliotheque', '/sos', '/recherche', '/citations/plein-ecran',
    '/reperes/algorithme', '/reperes/matrice', '/reperes/mythes', '/reperes/sources',
    ...METHODS.map((m) => `/methode/${m.id}`),
    ...SOS_PROTOCOLS.map((s) => `/sos/${s.id}`),
    ...SUBJECTS.map((s) => `/matiere/${s.id}`),
  ]);

  it('ids uniques, au moins 3 variantes partout, base large (≥ 50 situations)', () => {
    const ids = new Set(INTENTS.map((i) => i.id));
    expect(ids.size).toBe(INTENTS.length);
    expect(INTENTS.length).toBeGreaterThanOrEqual(50);
    for (const i of INTENTS) {
      expect(i.variants.length, i.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('tous les liens pointent vers des routes réelles', () => {
    for (const i of INTENTS) {
      for (const l of i.links ?? []) {
        expect(routes.has(l.to), `${i.id} → ${l.to}`).toBe(true);
      }
    }
  });

  it('tous les mots-clés sont déjà normalisés (minuscules, sans accents)', () => {
    for (const i of INTENTS) {
      for (const kw of [...i.strong, ...(i.weak ?? [])]) {
        expect(kw, `${i.id} : « ${kw} »`).toBe(
          foldPhrase(kw).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(),
        );
      }
    }
  });

  it('les textes des variantes sont substantiels et uniques', () => {
    const seen = new Set<string>();
    for (const i of INTENTS) {
      for (const v of i.variants) {
        expect(v.length, i.id).toBeGreaterThan(45);
        expect(seen.has(v), `doublon dans ${i.id}`).toBe(false);
        seen.add(v);
      }
    }
  });
});
