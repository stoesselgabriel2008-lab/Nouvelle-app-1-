import { describe, expect, it } from 'vitest';
import { diagnose, nextQuestion } from '../src/diagnostic/engine';
import type { DiagAnswers } from '../src/diagnostic/model';
import { METHODS_BY_ID } from '../src/content/methods/index';
import { SOS_BY_ID } from '../src/content/sos';
import { searchAll } from '../src/search/engine';

function ids(a: DiagAnswers): string[] {
  return diagnose(a).steps.map((s) => s.methodId);
}

/** Simule un parcours complet en répondant à chaque question posée. */
function runFlow(seed: DiagAnswers, followUp: Record<string, string>): {
  questions: string[];
  answers: DiagAnswers;
} {
  const answers: DiagAnswers = {};
  const questions: string[] = [];
  for (let i = 0; i < 10; i++) {
    const q = nextQuestion(answers);
    if (q === null) break;
    questions.push(q.id);
    const preset = (seed as Record<string, string | undefined>)[q.id];
    const fallback = followUp[q.id] ?? q.options[0]!.value;
    (answers as Record<string, string>)[q.id] = preset ?? fallback;
  }
  return { questions, answers };
}

describe('diagnostic — scénarios obligatoires du prompt (§25)', () => {
  it('A. « Je comprends une voie mais je mélange les protéines » → contraste A/B → carte contraste → interleaving', () => {
    const out = diagnose({ itemType: 'mecanisme', problem: 'melange', subject: 'biocell' });
    expect(out.steps.map((s) => s.methodId)).toEqual([
      'tableau-contraste',
      'carte-contraste',
      'interleaving',
    ]);
    expect(out.subjectId).toBe('biocell');
    expect(out.reason.toLowerCase()).toContain('discriminant');
  });

  it('B. « Je ne sais pas quelle formule utiliser en physique » → exemple résolu → fading → exercice à froid (+ interleaving ensuite)', () => {
    const out = diagnose({ itemType: 'calcul', problem: 'choix-methode', subject: 'physique' });
    expect(out.steps.map((s) => s.methodId)).toEqual([
      'exemple-resolu',
      'fading',
      'exercice-a-froid',
    ]);
    expect(out.alsoSee).toContain('interleaving');
    expect(out.subjectId).toBe('physique');
  });

  it('C. « Je reconnais une définition en QCM mais ne peux pas la dire » → rappel actif → carte Q/R → QCM reformulé', () => {
    const out = diagnose({
      itemType: 'definition',
      problem: 'reconnais-seulement',
      subject: 'sante-publique',
    });
    expect(out.steps.map((s) => s.methodId)).toEqual([
      'rappel-actif',
      'carte-qr',
      'qcm-actif',
    ]);
    expect(out.caution).toBeDefined();
  });

  it('D. « Liste arbitraire à retenir » → structure → imagerie ciblée → Anki (rappel différé ensuite)', () => {
    const out = diagnose({
      itemType: 'liste',
      problem: 'oublie',
      subject: 'anatomie',
      ordre: 'non',
      arbitraire: 'oui',
    });
    expect(out.steps.map((s) => s.methodId)).toEqual([
      'chunking',
      'imagerie-interactive',
      'repetition-espacee',
    ]);
    expect(out.alsoSee).toContain('rappel-differe');
  });

  it('E. « Planche d’histologie non reconnue sur une autre image » → reconstruction → occlusion → vue nouvelle à distance', () => {
    const out = diagnose({
      itemType: 'schema',
      problem: 'reconnais-seulement',
      subject: 'histologie',
      position: 'oui',
    });
    const stepIds = out.steps.map((s) => s.methodId);
    expect(stepIds[0]).toBe('reconstruction-schema');
    expect(stepIds).toContain('image-occlusion');
    expect(out.subjectId).toBe('histologie');
  });

  it('F. « QCM raté à cause d’une négation » → correction par cause → QCM actif → retest différé', () => {
    const out = diagnose({ itemType: 'qcm', problem: 'applique-pas', subject: 'medicament' });
    expect(out.steps.map((s) => s.methodId)).toEqual([
      'correction-par-cause',
      'qcm-actif',
      'rappel-differe',
    ]);
  });

  it('G. « Je n’arrive pas à commencer » → SOS démarrage 10 minutes (protocole + recherche)', () => {
    const sos = SOS_BY_ID.get('commencer');
    expect(sos).toBeDefined();
    expect(sos?.methods).toContain('demarrage-10-minutes');
    const hits = searchAll('je n arrive pas a commencer', 3).map(
      (h) => `${h.kind}:${h.refId}`,
    );
    expect(
      hits.includes('sos:commencer') || hits.includes('method:demarrage-10-minutes'),
    ).toBe(true);
  });

  it('H. « Saturé et en retard » → SOS triage 24-72 h puis journée minimale', () => {
    const sos = SOS_BY_ID.get('retard');
    expect(sos).toBeDefined();
    expect(sos?.methods[0]).toBe('triage-retard');
    expect(sos?.methods).toContain('journee-minimale');
    const hits = searchAll('je suis deborde', 3).map((h) => `${h.kind}:${h.refId}`);
    expect(
      hits.includes('sos:retard') || hits.includes('method:triage-retard'),
    ).toBe(true);
  });
});

describe('diagnostic — routes complémentaires du PDF (§7)', () => {
  it('mécanisme + incompréhension → chaîne causale → Feynman → perturbations', () => {
    expect(ids({ itemType: 'mecanisme', problem: 'comprends-pas', subject: 'biocell' })).toEqual([
      'chaine-causale',
      'feynman',
      'perturbations',
    ]);
  });

  it('mécanisme + oubli des noms → imagerie ciblée puis retest à distance', () => {
    const out = diagnose({
      itemType: 'mecanisme',
      problem: 'oublie',
      subject: 'biochimie',
      nature: 'nom',
    });
    expect(out.steps[0]?.methodId).toBe('imagerie-interactive');
    expect(out.steps.map((s) => s.methodId)).toContain('rappel-differe');
  });

  it('« je ne sais pas » + « c’est une confusion » → route anti-confusion sans re-demander le problème', () => {
    const { questions, answers } = runFlow(
      { itemType: 'inconnu', nature: 'confusion', subject: 'biocell' },
      {},
    );
    expect(questions).not.toContain('problem');
    expect(ids(answers)[0]).toBe('tableau-contraste');
  });

  it('vérification de maîtrise (défaut) → production + QCM + calibration', () => {
    expect(ids({ itemType: 'texte', problem: 'verifier-maitrise', subject: 'shs' })).toContain(
      'feuille-blanche',
    );
  });
});

describe('diagnostic — adaptatif, borné et toujours conclusif', () => {
  const itemTypes = [
    'mecanisme',
    'definition',
    'liste',
    'tableau',
    'schema',
    'chronologie',
    'calcul',
    'texte',
    'qcm',
    'inconnu',
  ] as const;
  const problems = [
    'comprends-pas',
    'oublie',
    'reconnais-seulement',
    'melange',
    'applique-pas',
    'choix-methode',
    'verifier-maitrise',
    'apprendre-vite',
  ] as const;

  it('pose entre 3 et 5 questions puis recommande 1 à 3 méthodes valides, pour toutes les combinaisons', () => {
    const followUpVariants: Record<string, string>[] = [
      {},
      { ordre: 'oui', position: 'oui', arbitraire: 'oui', dejaProduit: 'oui', nature: 'nom' },
      { ordre: 'non', position: 'non', arbitraire: 'non', dejaProduit: 'non', nature: 'relation' },
    ];
    for (const itemType of itemTypes) {
      for (const problem of problems) {
        for (const fu of followUpVariants) {
          const { questions, answers } = runFlow(
            { itemType, problem, subject: 'autre' },
            fu,
          );
          expect(questions.length, `${itemType}/${problem}`).toBeGreaterThanOrEqual(3);
          expect(questions.length, `${itemType}/${problem}`).toBeLessThanOrEqual(5);
          const out = diagnose(answers);
          expect(out.steps.length, `${itemType}/${problem}`).toBeGreaterThanOrEqual(1);
          expect(out.steps.length, `${itemType}/${problem}`).toBeLessThanOrEqual(3);
          expect(out.reason.length, `${itemType}/${problem}`).toBeGreaterThan(10);
          for (const s of out.steps) {
            expect(METHODS_BY_ID.has(s.methodId), `${itemType}/${problem} → ${s.methodId}`).toBe(
              true,
            );
            expect(s.why.length).toBeGreaterThan(5);
          }
          const unique = new Set(out.steps.map((s) => s.methodId));
          expect(unique.size, `${itemType}/${problem} doublons`).toBe(out.steps.length);
        }
      }
    }
  });

  it('est déterministe : mêmes réponses, même recommandation', () => {
    const a: DiagAnswers = { itemType: 'calcul', problem: 'choix-methode', subject: 'physique' };
    expect(diagnose(a)).toEqual(diagnose(a));
  });
});
