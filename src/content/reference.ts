import type { AlgorithmStep, InfoTypeEntry, Myth, SourceEntry } from './types';

/**
 * Repères transversaux de la Source V2 :
 * §3 Algorithme universel d'un cours (p. 4-5)
 * §4 Matrice type d'information → méthode (p. 5-6)
 * §11 Mythes / versions sûres (p. 36-37)
 * §12 Sources et niveau de preuve (p. 37-38)
 */

export const ALGORITHM_FORMULA =
  'ORIENTER → COMPRENDRE → REPRÉSENTER → FERMER → RAPPELER → CORRIGER → APPLIQUER → ENTRETENIR';

export const ALGORITHM_STEPS: AlgorithmStep[] = [
  {
    name: '1. Orienter',
    action:
      '5 minutes : objectifs, plan, titres, tableaux, figures, vocabulaire. Formuler 2 à 3 questions auxquelles le cours doit répondre.',
    methods: ['pretest', 'liste-questions'],
  },
  {
    name: '2. Découper',
    action:
      'Travailler par unité logique : définition, mécanisme, tableau, schéma, formule, type d’exercice. Pas par nombre fixe de pages.',
    methods: ['chunking'],
  },
  {
    name: '3. Comprendre',
    action:
      'Simple → précis → formulation du poly. Réparer seulement le prérequis qui bloque.',
    methods: ['feynman', 'auto-explication'],
  },
  {
    name: '4. Représenter',
    action:
      'Choisir la représentation adaptée : chaîne causale, frise, tableau A/B, schéma spatial, arbre de décision, modèle + unités.',
    methods: ['chaine-causale', 'frise-chronologique', 'tableau-contraste', 'double-representation'],
  },
  {
    name: '5. Fermer',
    action:
      'Retirer le support avant que la familiarité ne donne une fausse impression de maîtrise.',
    methods: ['rappel-actif'],
  },
  {
    name: '6. Rappeler',
    action:
      'Produire : feuille blanche, oral de 2-3 min, schéma, réponse courte, formule et hypothèses.',
    methods: ['feuille-blanche', 'blurting', 'reconstruction-schema'],
  },
  {
    name: '7. Corriger',
    action:
      'Rouvrir uniquement pour les trous ; distinguer omission, inversion, confusion, mauvais modèle et détail arbitraire.',
    methods: ['correction-par-cause'],
  },
  {
    name: '8. Appliquer',
    action:
      'QCM, exercice, variation, « si… alors… », image nouvelle ou question reformulée.',
    methods: ['qcm-actif', 'exercice-a-froid', 'variation', 'perturbations'],
  },
  {
    name: '9. Entretenir',
    action:
      'Anki / FSRS pour les unités ciblées ; retests plus larges pour les mécanismes, problèmes, schémas et QCM.',
    methods: ['repetition-espacee', 'rappel-differe'],
  },
  {
    name: '10. Terminer',
    action:
      'Une notion n’est « faite » que si elle peut être rappelée, expliquée si nécessaire, distinguée d’une notion proche et appliquée.',
    methods: ['rappel-actif', 'feynman', 'tableau-contraste', 'qcm-actif'],
  },
];

export const INFO_TYPE_MATRIX: InfoTypeEntry[] = [
  {
    id: 'definition',
    name: 'Définition exacte',
    route: 'Comprendre le sens → rappel libre → formulation exacte → carte Q/R ou cloze ciblé.',
    methods: ['rappel-actif', 'carte-qr', 'cloze-cible'],
  },
  {
    id: 'nom-arbitraire',
    name: 'Nom arbitraire',
    route: 'Contexte → association courte si nécessaire → rappel → Anki.',
    methods: ['imagerie-interactive', 'association-phonetique', 'rappel-actif', 'carte-qr'],
  },
  {
    id: 'association-arbitraire',
    name: 'Association arbitraire',
    route: 'Imagerie interactive / phonétique / histoire courte → rappel différé.',
    methods: ['imagerie-interactive', 'association-phonetique', 'histoire-chainage', 'rappel-differe'],
  },
  {
    id: 'liste-ordonnee',
    name: 'Liste ordonnée',
    route: 'Chaîne, frise ou histoire minimale → production dans l’ordre → carte seulement pour les maillons fragiles.',
    methods: ['frise-chronologique', 'histoire-chainage', 'acronyme', 'rappel-actif'],
  },
  {
    id: 'liste-non-ordonnee',
    name: 'Liste non ordonnée',
    route: 'Catégories / chunking → exhaustivité → mnémotechnique seulement si le coût est rentable.',
    methods: ['chunking', 'acronyme', 'palais-mental', 'feuille-blanche'],
  },
  {
    id: 'mecanisme',
    name: 'Mécanisme',
    route: 'État initial → événement → intermédiaires → conséquence → résultat → perturbations.',
    methods: ['chaine-causale', 'perturbations', 'feynman'],
  },
  {
    id: 'notions-proches',
    name: 'Deux notions proches',
    route: 'Tableau A/B → dimensions discriminantes → discriminant roi → alternance.',
    methods: ['tableau-contraste', 'carte-contraste', 'interleaving'],
  },
  {
    id: 'tableau',
    name: 'Tableau',
    route: 'Axes → invariants → oppositions → exceptions → rappel progressif des cellules.',
    methods: ['chunking', 'tableau-contraste', 'rappel-actif'],
  },
  {
    id: 'schema',
    name: 'Schéma / anatomie',
    route: 'Orientation → gros repères → relations → reconstruction → vue différente / image occlusion.',
    methods: ['reconstruction-schema', 'image-occlusion', 'double-representation'],
  },
  {
    id: 'chronologie',
    name: 'Chronologie / embryologie',
    route: 'Avant → transformation → après → frise → redessin → inversion / ordre.',
    methods: ['frise-chronologique', 'reconstruction-schema', 'rappel-differe'],
  },
  {
    id: 'formule',
    name: 'Formule',
    route: 'Signification → variables → unités → hypothèses → sens de variation → application.',
    methods: ['double-representation', 'exemple-resolu', 'carte-calcul', 'exercice-a-froid'],
  },
  {
    id: 'calcul',
    name: 'Calcul / problème',
    route: 'Données → inconnue → modèle → relation → unités → calcul → contrôle → interprétation.',
    methods: ['exemple-resolu', 'fading', 'exercice-a-froid', 'variation', 'interleaving'],
  },
  {
    id: 'experience',
    name: 'Expérience',
    route: 'Question → protocole → observation → conclusion permise → limites.',
    methods: ['auto-explication', 'liste-questions', 'perturbations'],
  },
  {
    id: 'texte',
    name: 'Texte / SHS',
    route: 'Définition → thèse → arguments → distinctions → plan → production.',
    methods: ['liste-questions', 'chunking', 'feuille-blanche', 'tableau-contraste'],
  },
  {
    id: 'erreur-qcm',
    name: 'Erreur de QCM',
    route: 'Cause → correction adaptée → retest ; pas automatiquement une carte.',
    methods: ['correction-par-cause', 'qcm-actif', 'rappel-differe'],
  },
];

export const MYTHS: Myth[] = [
  {
    myth: '« Je suis visuel donc je dois tout apprendre en images »',
    truth:
      'Faux cadrage : utiliser l’imagerie lorsqu’elle sert la tâche ; certains contenus exigent calcul, texte, spatial ou mécanisme.',
    methods: ['imagerie-interactive', 'double-representation'],
  },
  {
    myth: '« Feynman prouve la maîtrise »',
    truth:
      'Expliquer aide, mais une explication fluide peut être fausse ; il faut vérifier et appliquer.',
    methods: ['feynman', 'qcm-actif'],
  },
  {
    myth: '« Mind map = meilleure méthode »',
    truth: 'Utile pour vue d’ensemble et relations ; mauvaise si décorative et copiée.',
    methods: ['mind-map'],
  },
  {
    myth: '« Relire jusqu’à connaître »',
    truth: 'La familiarité peut masquer un rappel libre faible.',
    methods: ['relecture-surlignage', 'rappel-actif'],
  },
  {
    myth: '« Toute erreur mérite une flashcard »',
    truth:
      'Non : certaines erreurs exigent explication, exercice, règle de lecture ou gestion du temps.',
    methods: ['correction-par-cause'],
  },
  {
    myth: '« Toute information mérite une mnémotechnique »',
    truth:
      'Non : si la relation est compréhensible, comprendre coûte souvent moins cher qu’une histoire artificielle.',
    methods: ['imagerie-interactive', 'association-phonetique'],
  },
  {
    myth: '« Pomodoro 25/5 est obligatoire »',
    truth: 'C’est un réglage. La durée dépend de la tâche et de la fatigue.',
    methods: ['pomodoro'],
  },
  {
    myth: '« Plus de cartes = plus de mémoire »',
    truth:
      'Les nouvelles cartes créent une dette future ; qualité et soutenabilité priment.',
    methods: ['repetition-espacee', 'audit-deck'],
  },
  {
    myth: '« QCM correct = je sais »',
    truth:
      'Un QCM peut tester la reconnaissance. Ajouter parfois un rappel sans propositions.',
    methods: ['qcm-actif', 'rappel-actif'],
  },
  {
    myth: '« Mélanger immédiatement est toujours mieux »',
    truth: 'L’entrelacement est utile après une acquisition initiale suffisante.',
    methods: ['interleaving'],
  },
];

export const SOURCE_HIERARCHY: string[] = [
  'Manuel PASS 2026-2027 : socle méthodologique et protocoles par matière.',
  'Prompt maître : règles de tutorat, adaptation, gestion des types d’information, critères de maîtrise et fidélité au poly.',
  'Recherche externe : utilisée seulement pour conforter ou compléter des mécanismes généraux ; elle n’est pas présentée comme contenu du poly d’un professeur.',
];

export const RESEARCH_SOURCES: SourceEntry[] = [
  {
    domain: 'Récupération / testing effect',
    reference:
      'Karpicke & Roediger (2008), Science ; revues ultérieures sur le testing effect.',
  },
  {
    domain: 'Techniques d’apprentissage',
    reference:
      'Dunlosky et al. (2013), Psychological Science in the Public Interest : pratique de test et pratique distribuée parmi les techniques à forte utilité.',
  },
  {
    domain: 'Auto-explication',
    reference:
      'Chi et al. (1989), Cognitive Science : les auto-explications pendant l’étude d’exemples favorisent la compréhension des principes.',
  },
  {
    domain: 'Exemples travaillés',
    reference:
      'Van Gog et al. / littérature worked-example : bénéfice surtout chez les novices ; retrait progressif de l’aide quand l’expertise augmente.',
  },
  {
    domain: 'Prétesting',
    reference:
      'Richland, Kornell & Kao (2009) : tenter avant l’étude peut orienter et améliorer l’apprentissage ultérieur.',
  },
  {
    domain: 'Entrelacement',
    reference:
      'Rohrer & Taylor (2007) : mélange de catégories / problèmes utile pour la discrimination et la rétention dans certains contextes.',
  },
  {
    domain: 'Manuel Anki',
    reference:
      'FSRS, règles de réponse, Image Occlusion et principes de conception de cartes.',
  },
];

export const PRUDENCE_NOTE =
  'Les effets moyens de recherche ne garantissent pas qu’une technique soit optimale pour chaque tâche ou chaque personne. L’app recommande une méthode selon le contenu, le problème observé et la performance — pas selon une étiquette fixe.';
