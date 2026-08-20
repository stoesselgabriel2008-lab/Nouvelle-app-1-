import { describe, expect, it } from 'vitest';
import { METHODS, METHODS_BY_ID } from '../src/content/methods/index';
import { SUBJECTS } from '../src/content/subjects';
import { SOS_PROTOCOLS, SOS_BY_ID } from '../src/content/sos';
import { PERSONAL_RULES, PROFILE_SIGNALS } from '../src/content/profile';
import { ALGORITHM_STEPS, INFO_TYPE_MATRIX, MYTHS, RESEARCH_SOURCES } from '../src/content/reference';
import { SHORTCUTS } from '../src/content/shortcuts';
import { APP_VERSION, CHANGELOG } from '../src/lib/version';
import { TIMER_CONFIGS } from '../src/ui/FocusTimer';

/**
 * Garantie de couverture : rien de la Source V2 ne doit disparaître
 * silencieusement. La liste ci-dessous est la bibliothèque complète (§6).
 */
const EXPECTED_METHOD_IDS = [
  'rappel-actif',
  'feuille-blanche',
  'blurting',
  'feynman',
  'auto-explication',
  'pretest',
  'liste-questions',
  'chunking',
  'mind-map',
  'carte-conceptuelle',
  'chaine-causale',
  'perturbations',
  'tableau-contraste',
  'frise-chronologique',
  'imagerie-interactive',
  'association-phonetique',
  'acronyme',
  'histoire-chainage',
  'palais-mental',
  'double-representation',
  'reconstruction-schema',
  'image-occlusion',
  'exemple-resolu',
  'fading',
  'exercice-a-froid',
  'variation',
  'interleaving',
  'qcm-actif',
  'correction-par-cause',
  'calibration-confiance',
  'rappel-differe',
  'repetition-espacee',
  'carte-qr',
  'cloze-cible',
  'carte-calcul',
  'carte-contraste',
  'audit-deck',
  'prise-de-notes',
  'relecture-surlignage',
  'pomodoro',
  'demarrage-10-minutes',
  'friction-numerique',
  'journee-minimale',
  'triage-retard',
  'nrar-stress',
  'revision-rapide',
  'simulation-examen',
];

const EXPECTED_SUBJECT_IDS = [
  'biocell',
  'biochimie',
  'chimie',
  'physique',
  'biophysique',
  'biostats',
  'anatomie',
  'histologie',
  'embryologie',
  'sante-publique',
  'medicament',
  'shs',
];

const EXPECTED_SOS_IDS = [
  'ca-rentre-pas',
  'commencer',
  'fatigue',
  'retard',
  'qcm-rates',
  'anki-deborde',
  'panique',
  'vingt-minutes',
  'comprends-plus-rien',
  'detresse',
];

describe('bibliothèque des méthodes', () => {
  it('contient les 47 méthodes de la Source V2, sans doublon d’ID', () => {
    expect(EXPECTED_METHOD_IDS).toHaveLength(47);
    const ids = METHODS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of EXPECTED_METHOD_IDS) {
      expect(ids, `méthode manquante : ${id}`).toContain(id);
    }
    expect(ids).toHaveLength(EXPECTED_METHOD_IDS.length);
  });

  it('chaque fiche est complète (résumé, quand, éviter, étapes, acquis, source)', () => {
    for (const m of METHODS) {
      expect(m.title.length, m.id).toBeGreaterThan(3);
      expect(m.summary.length, m.id).toBeGreaterThan(20);
      expect(m.whenToUse.length, m.id).toBeGreaterThanOrEqual(1);
      expect(m.avoid.length, m.id).toBeGreaterThanOrEqual(1);
      expect(m.quickSteps.length, `${m.id} quickSteps`).toBeGreaterThanOrEqual(3);
      expect(m.quickSteps.length, `${m.id} quickSteps`).toBeLessThanOrEqual(8);
      expect(m.procedure.length, m.id).toBeGreaterThanOrEqual(3);
      expect(m.mastery.length, m.id).toBeGreaterThanOrEqual(1);
      expect(m.aliases.length, m.id).toBeGreaterThanOrEqual(2);
      expect(m.categories.length, m.id).toBeGreaterThanOrEqual(1);
      expect(m.source, m.id).toMatch(/Source V2/);
    }
  });

  it('tous les liens « méthodes proches » résolvent', () => {
    for (const m of METHODS) {
      for (const r of m.related) {
        expect(METHODS_BY_ID.has(r), `${m.id} → ${r}`).toBe(true);
      }
    }
  });

  it('chaque fiche a un exemple PASS concret', () => {
    for (const m of METHODS) {
      expect(m.example !== undefined && m.example.length > 30, `${m.id} sans exemple`).toBe(
        true,
      );
    }
  });

  it('les liens « Ensuite » résolvent et ne bouclent pas sur eux-mêmes', () => {
    let count = 0;
    for (const m of METHODS) {
      if (m.next === undefined) continue;
      count++;
      expect(METHODS_BY_ID.has(m.next.id), `${m.id} → next ${m.next.id}`).toBe(true);
      expect(m.next.id, `${m.id} pointe sur lui-même`).not.toBe(m.id);
      expect(m.next.label.length, `${m.id} next sans label`).toBeGreaterThan(5);
    }
    expect(count).toBeGreaterThanOrEqual(25);
  });

  it('« Pourquoi ça marche » est présent sur les méthodes à preuve forte', () => {
    const expected = [
      'rappel-actif',
      'feuille-blanche',
      'rappel-differe',
      'repetition-espacee',
      'pretest',
      'auto-explication',
      'exemple-resolu',
      'interleaving',
      'feynman',
      'imagerie-interactive',
      'tableau-contraste',
      'calibration-confiance',
      'qcm-actif',
      'variation',
    ];
    for (const id of expected) {
      const m = METHODS_BY_ID.get(id);
      expect(
        m?.whyItWorks !== undefined && m.whyItWorks.length > 40,
        `${id} sans « pourquoi ça marche »`,
      ).toBe(true);
    }
  });
});

describe('nouveautés, version et minuteurs', () => {
  it('le journal des nouveautés commence par la version courante', () => {
    expect(CHANGELOG.length).toBeGreaterThanOrEqual(2);
    expect(CHANGELOG[0]?.version).toBe(APP_VERSION);
    for (const e of CHANGELOG) {
      expect(e.items.length, e.version).toBeGreaterThan(0);
      for (const item of e.items) expect(item.length, e.version).toBeGreaterThan(15);
    }
  });

  it('chaque minuteur est rattaché à une fiche ou un protocole existant', () => {
    for (const [id, cfg] of Object.entries(TIMER_CONFIGS)) {
      expect(
        METHODS_BY_ID.has(id) || SOS_BY_ID.has(id),
        `minuteur orphelin : ${id}`,
      ).toBe(true);
      expect(cfg.presets.length, id).toBeGreaterThan(0);
      for (const p of cfg.presets) {
        expect(p.minutes, `${id}/${p.label}`).toBeGreaterThan(0);
      }
    }
  });
});

describe('matières', () => {
  it('couvre les 12 matières du PDF avec un vrai protocole', () => {
    expect(SUBJECTS.map((s) => s.id).sort()).toEqual([...EXPECTED_SUBJECT_IDS].sort());
    for (const s of SUBJECTS) {
      expect(s.protocol.length, s.id).toBeGreaterThanOrEqual(5);
      expect(s.methods.length, s.id).toBeGreaterThanOrEqual(5);
      for (const id of s.methods) {
        expect(METHODS_BY_ID.has(id), `${s.id} → ${id}`).toBe(true);
      }
    }
  });
});

describe('SOS', () => {
  it('couvre les 10 protocoles du PDF', () => {
    expect(SOS_PROTOCOLS.map((s) => s.id).sort()).toEqual([...EXPECTED_SOS_IDS].sort());
  });

  it('chaque protocole commence par des actions immédiates et lie des méthodes valides', () => {
    for (const s of SOS_PROTOCOLS) {
      expect(s.doNow.length, s.id).toBeGreaterThanOrEqual(3);
      for (const id of s.methods) {
        expect(METHODS_BY_ID.has(id), `${s.id} → ${id}`).toBe(true);
      }
    }
  });

  it('la détresse persistante oriente vers un soutien humain, jamais vers un soin par l’app', () => {
    const d = SOS_PROTOCOLS.find((s) => s.id === 'detresse');
    expect(d?.careNotice).toBe(true);
    expect(d?.doNow.join(' ')).toMatch(/soutien humain/i);
  });
});

describe('profil, repères et raccourcis', () => {
  it('profil : 6 signaux, 6 règles, méthodes valides', () => {
    expect(PROFILE_SIGNALS).toHaveLength(6);
    expect(PERSONAL_RULES).toHaveLength(6);
    for (const r of PERSONAL_RULES) {
      for (const id of r.methods) {
        expect(METHODS_BY_ID.has(id), `${r.id} → ${id}`).toBe(true);
      }
    }
  });

  it('algorithme (10 étapes), matrice (15 types), mythes (10), sources (7)', () => {
    expect(ALGORITHM_STEPS).toHaveLength(10);
    expect(INFO_TYPE_MATRIX).toHaveLength(15);
    expect(MYTHS).toHaveLength(10);
    expect(RESEARCH_SOURCES).toHaveLength(7);
    for (const e of [...ALGORITHM_STEPS, ...INFO_TYPE_MATRIX, ...MYTHS]) {
      for (const id of e.methods) {
        expect(METHODS_BY_ID.has(id), `repère → ${id}`).toBe(true);
      }
    }
  });

  it('raccourcis « Pour moi » : 5 max, cibles valides', () => {
    expect(SHORTCUTS.length).toBeLessThanOrEqual(5);
    for (const s of SHORTCUTS) {
      const methodMatch = /^\/methode\/([a-z0-9-]+)$/.exec(s.to);
      if (methodMatch) {
        expect(METHODS_BY_ID.has(methodMatch[1]!), s.to).toBe(true);
      } else {
        expect(
          s.to.startsWith('/sos/') || s.to.startsWith('/diagnostic'),
          s.to,
        ).toBe(true);
      }
    }
  });

  it('les méthodes « pour moi » existent et portent une adaptation personnelle', () => {
    const forMe = METHODS.filter((m) => m.forMe === true);
    expect(forMe.length).toBeGreaterThanOrEqual(5);
    for (const m of forMe) {
      expect(m.personal !== undefined && m.personal.length > 0, m.id).toBe(true);
    }
  });
});
