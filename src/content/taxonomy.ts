import type { CategoryId, InfoTypeId, ProblemId, SubjectId } from './types';

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  comprendre: 'Comprendre',
  structurer: 'Structurer',
  memoriser: 'Mémoriser',
  representer: 'Représenter',
  appliquer: 'Appliquer',
  'se-tester': 'Se tester',
  corriger: 'Corriger',
  anki: 'Anki / FSRS',
  mnemotechniques: 'Mnémotechniques',
  focus: 'Focus / reprise',
};

export const CATEGORY_ORDER: CategoryId[] = [
  'comprendre',
  'structurer',
  'representer',
  'memoriser',
  'mnemotechniques',
  'appliquer',
  'se-tester',
  'corriger',
  'anki',
  'focus',
];

export const CATEGORY_DESCRIPTIONS: Record<CategoryId, string> = {
  comprendre: 'Donner du sens avant de mémoriser : expliquer, questionner, relier.',
  structurer: 'Construire l’architecture avant les détails : hiérarchie, chaînes, contrastes.',
  representer: 'Choisir la bonne représentation : schéma, double codage, frise.',
  memoriser: 'Produire sans support et faire durer : rappel, espacement.',
  mnemotechniques: 'Des crochets ciblés pour l’arbitraire — jamais un substitut à la compréhension.',
  appliquer: 'Passer du cours à l’exercice : exemples, retrait d’aide, transfert.',
  'se-tester': 'Vérifier la maîtrise réelle sous conditions proches de l’épreuve.',
  corriger: 'Transformer chaque erreur en action ciblée.',
  anki: 'Entretenir les unités ciblées avec des cartes bien conçues.',
  focus: 'Démarrer, tenir, redémarrer : attention, énergie, retard, stress.',
};

export const PROBLEM_LABELS: Record<ProblemId, string> = {
  'comprends-pas': 'Je ne comprends pas',
  oublie: 'Je comprends mais j’oublie',
  'reconnais-seulement': 'Je reconnais mais je ne rappelle pas',
  melange: 'Je mélange / je confonds',
  'applique-pas': 'Je connais mais je n’arrive pas à appliquer',
  'choix-methode': 'Je ne sais pas quelle formule/méthode choisir',
  'verifier-maitrise': 'Je veux vérifier ma maîtrise',
  'apprendre-vite': 'Je veux apprendre vite une portion déjà comprise',
  demarrer: 'Je n’arrive pas à commencer',
  concentration: 'Je n’arrive pas à rester concentré·e',
  fatigue: 'Je suis très fatigué·e',
  retard: 'Je suis en retard / débordé·e',
  stress: 'Le stress monte / je panique',
  'qcm-rate': 'Je viens de rater des QCM',
  'anki-deborde': 'Anki déborde',
};

export const INFO_TYPE_LABELS: Record<InfoTypeId, string> = {
  definition: 'Définition exacte',
  'nom-arbitraire': 'Nom arbitraire',
  'association-arbitraire': 'Association arbitraire',
  'liste-ordonnee': 'Liste ordonnée',
  'liste-non-ordonnee': 'Liste non ordonnée',
  mecanisme: 'Mécanisme / voie / cascade',
  'notions-proches': 'Deux notions proches',
  tableau: 'Tableau / classification',
  schema: 'Schéma / image / spatial',
  chronologie: 'Chronologie / processus',
  formule: 'Formule',
  calcul: 'Calcul / problème',
  experience: 'Expérience',
  texte: 'Texte / SHS',
  'erreur-qcm': 'Erreur de QCM',
};

export const SUBJECT_LABELS: Record<SubjectId, string> = {
  biocell: 'Biologie cellulaire',
  biochimie: 'Biochimie',
  chimie: 'Chimie',
  physique: 'Physique',
  biophysique: 'Biophysique',
  biostats: 'Biostatistiques',
  anatomie: 'Anatomie',
  histologie: 'Histologie',
  embryologie: 'Embryologie',
  'sante-publique': 'Santé publique',
  medicament: 'Initiation au médicament',
  shs: 'SHS',
};

export const SUBJECT_ORDER: SubjectId[] = [
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
