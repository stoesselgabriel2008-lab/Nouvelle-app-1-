import type { SubjectId } from '../content/types';

/** Réponses possibles à la question 1 — « Qu'as-tu devant toi ? » (Source V2, §7). */
export type DiagItemType =
  | 'mecanisme'
  | 'definition'
  | 'liste'
  | 'tableau'
  | 'schema'
  | 'chronologie'
  | 'calcul'
  | 'texte'
  | 'qcm'
  | 'inconnu';

/** Réponses possibles à la question 2 — « Ton problème principal ? ». */
export type DiagProblem =
  | 'comprends-pas'
  | 'oublie'
  | 'reconnais-seulement'
  | 'melange'
  | 'applique-pas'
  | 'choix-methode'
  | 'verifier-maitrise'
  | 'apprendre-vite';

/** « Le problème est-il surtout… » (question conditionnelle). */
export type DiagNature = 'nom' | 'relation' | 'calcul' | 'chronologie' | 'confusion';

export interface DiagAnswers {
  itemType?: DiagItemType;
  problem?: DiagProblem;
  subject?: SubjectId | 'autre';
  /** L'ordre compte-t-il ? (listes) */
  ordre?: 'oui' | 'non';
  /** La position dans le schéma compte-t-elle ? */
  position?: 'oui' | 'non';
  /** L'information est-elle arbitraire ou déductible ? */
  arbitraire?: 'oui' | 'non';
  /** As-tu déjà réussi à la produire sans support ? */
  dejaProduit?: 'oui' | 'non';
  /** Nature dominante du problème (si type inconnu ou mécanisme oublié). */
  nature?: DiagNature;
}

export type DiagQuestionId = keyof DiagAnswers;

export interface DiagOption {
  value: string;
  label: string;
}

export interface DiagQuestion {
  id: DiagQuestionId;
  title: string;
  options: DiagOption[];
}

export interface RecoStep {
  methodId: string;
  why: string;
}

export interface Recommendation {
  steps: RecoStep[];
  /** Justification très courte de l'ordre. */
  reason: string;
  /** Lien vers le protocole matière si pertinent. */
  subjectId?: SubjectId;
  /** Méthodes complémentaires, après les 1-3 principales. */
  alsoSee?: string[];
  /** Rappel de prudence éventuel (nuances de la Source V2). */
  caution?: string;
}
