import type { Method } from '../types';

/** Se tester et corriger : QCM, causes d'erreur, calibration, simulation. Source V2, §6. */
export const testerMethods: Method[] = [
  {
    id: 'qcm-actif',
    title: 'QCM actif proposition par proposition',
    subtitle: 'Examen · Application · Feedback',
    summary:
      'Réponds sans corrigé, puis traite chaque proposition : repère le mot décisif, corrige aussi les hésitations et les bonnes réponses chanceuses, et code la cause de chaque erreur.',
    categories: ['se-tester', 'appliquer', 'corriger'],
    subjects: ['medicament', 'sante-publique', 'histologie'],
    infoTypes: ['erreur-qcm', 'definition', 'notions-proches'],
    problems: ['verifier-maitrise', 'qcm-rate', 'reconnais-seulement'],
    aliases: [
      'qcm',
      'qcm actif',
      'vrai faux',
      'corriger proposition',
      'piège',
      'propositions',
      'items qcm',
      'entraînement qcm',
    ],
    keywords: ['propositions', 'mot décisif', 'négation', 'absolu', 'confiance', 'feedback'],
    tags: ['examen'],
    whenToUse: [
      'Tôt après une notion comprise, puis en cumulatif.',
    ],
    avoid: [
      'Ne compte pas seulement la bonne réponse globale : chaque proposition est un test à part entière.',
    ],
    quickSteps: [
      'Réponds sans correction.',
      'Déclare éventuellement ta confiance.',
      'Pour chaque proposition, repère le mot ou la relation décisive.',
      'Corrige erreurs, hésitations et bonnes réponses chanceuses.',
      'Code la cause.',
      'Reteste plus tard.',
    ],
    procedure: [
      { text: 'Répondre sans correction.' },
      { text: 'Déclarer éventuellement la confiance.', detail: 'Faible / moyenne / forte suffit (voir Calibration de confiance).' },
      { text: 'Pour chaque proposition, repérer le mot / la relation décisive.', detail: 'Négations, absolus (« toujours », « jamais »), inversions cible/effet : les pièges classiques.' },
      { text: 'Corriger erreurs, hésitations et bonnes réponses chanceuses.' },
      { text: 'Coder la cause.', detail: 'K/C/T/L/F/Tps/G — voir Correction par cause.' },
      { text: 'Retester plus tard.' },
    ],
    example:
      'Item raté sur une négation : transforme la proposition fausse en phrase exacte, note « L » (lecture) au carnet, reteste la semaine suivante.',
    mastery: [
      'Tu peux justifier vrai / faux sans dépendre du corrigé.',
    ],
    limits: [
      'Un QCM correct peut tester la reconnaissance seulement : ajoute parfois un rappel sans propositions.',
    ],
    whyItWorks:
      'Chaque proposition est une décision vrai/faux à part entière : c’est elle qu’il faut corriger — le score global cache autant qu’il montre.',
    next: { id: 'correction-par-cause', label: 'Code chaque erreur : la correction dépend de la cause.' },
    related: ['correction-par-cause', 'calibration-confiance', 'simulation-examen', 'rappel-actif'],
    source: 'Source V2 — §6 Bibliothèque, p. 23',
  },
  {
    id: 'correction-par-cause',
    title: 'Correction par cause / Carnet d’erreurs',
    subtitle: 'Feedback · Métacognition',
    summary:
      'Après un échec, ne « travaille pas plus » au hasard : reconstruis ton raisonnement, choisis LA cause principale (K/C/T/L/F/Tps/G), applique l’action correspondante, et reteste.',
    categories: ['corriger', 'se-tester'],
    subjects: [],
    infoTypes: ['erreur-qcm', 'calcul'],
    problems: ['qcm-rate', 'applique-pas'],
    aliases: [
      'carnet d’erreurs',
      'carnet erreurs',
      'journal erreurs',
      'code erreur',
      'k c t l f',
      'kctlf',
      'pourquoi je me trompe',
      'analyse erreurs',
      'erreurs récurrentes',
    ],
    keywords: ['cause', 'action', 'signal manqué', 'retest', 'métacognition'],
    tags: ['feedback'],
    whenToUse: [
      'Après QCM, exercice ou simulation — surtout pour les erreurs récurrentes.',
    ],
    avoid: [
      'Ne collectionne pas chaque erreur sans action ni retest : le carnet doit réduire une famille d’erreurs, pas grossir.',
    ],
    quickSteps: [
      'Note l’item et la réponse attendue.',
      'Reconstruis ton raisonnement initial.',
      'Choisis une cause principale : K/C/T/L/F/Tps/G.',
      'Choisis l’action correspondante.',
      'Note le signal manqué.',
      'Reteste plus tard.',
    ],
    procedure: [
      { text: 'Noter l’item et la réponse attendue.' },
      { text: 'Reconstruire ton raisonnement initial.', detail: 'Qu’as-tu pensé au moment de répondre ? C’est le raisonnement qu’on corrige, pas la trace.' },
      {
        text: 'Choisir une cause principale : K/C/T/L/F/Tps/G.',
        detail:
          'K = connaissance manquante · C = confusion entre notions · T = transfert/application · L = lecture (négation, absolu, inversion) · F = formule/calcul · Tps = gestion du temps · G = guess, bonne réponse chanceuse.',
      },
      {
        text: 'Choisir l’action correspondante.',
        detail:
          'K → réapprendre + carte ciblée · C → tableau A/B + carte contraste · T → exercices/variations · L → règle de lecture (souligner négations/absolus) · F → carte calcul + exercice · Tps → simulation chronométrée · G → retester sans indice.',
      },
      { text: 'Noter le signal manqué.' },
      { text: 'Retester plus tard.' },
    ],
    mastery: [
      'Le carnet réduit une famille d’erreurs, pas seulement le nombre de pages écrites.',
    ],
    limits: [
      'Toute erreur ne mérite pas une flashcard : certaines exigent explication, exercice, règle de lecture ou gestion du temps.',
    ],
    whyItWorks:
      '« Travailler plus » ne corrige rien si la cause reste inconnue : une confusion se répare par un contraste, une erreur de lecture par une règle de lecture — jamais par une relecture générale.',
    example:
      'Item raté : tu avais lu « toujours » sans le voir. Code L (lecture), règle : souligner chaque absolu avant de répondre. Retest sur 10 items la semaine suivante.',
    next: { id: 'rappel-differe', label: 'Reteste la famille d’erreurs à distance — c’est le vrai critère.' },
    related: ['qcm-actif', 'calibration-confiance', 'tableau-contraste', 'rappel-differe'],
    source: 'Source V2 — §6 Bibliothèque, p. 23',
  },
  {
    id: 'calibration-confiance',
    title: 'Calibration de confiance',
    subtitle: 'Métacognition · QCM',
    summary:
      'Avant de vérifier, note ta confiance. Compare-la ensuite à l’exactitude et traque en priorité les erreurs commises avec forte confiance : ce sont les plus dangereuses.',
    categories: ['se-tester', 'corriger'],
    subjects: [],
    infoTypes: ['erreur-qcm'],
    problems: ['verifier-maitrise', 'reconnais-seulement', 'qcm-rate'],
    aliases: [
      'confiance',
      'calibration',
      'surestimation',
      'bonne réponse hasard',
      'métacognition',
      'sûr de moi',
      'je croyais savoir',
    ],
    keywords: ['certitude', 'exactitude', 'illusion de maîtrise'],
    tags: ['métacognition'],
    whenToUse: [
      'Quand tu risques de confondre certitude, hésitation et bonne réponse chanceuse.',
    ],
    avoid: [
      'Ne demande pas la confiance après chaque micro-question si ça ralentit trop.',
    ],
    quickSteps: [
      'Réponds.',
      'Note faible / moyenne / forte, ou un pourcentage simple.',
      'Compare confiance et exactitude.',
      'Priorise les erreurs commises avec forte confiance.',
      'Reteste ces erreurs.',
    ],
    procedure: [
      { text: 'Répondre.' },
      { text: 'Noter faible / moyenne / forte ou un pourcentage simple.' },
      { text: 'Comparer confiance et exactitude.' },
      { text: 'Prioriser les erreurs fausses avec forte confiance.', detail: 'Une erreur sûre d’elle-même reviendra à l’examen ; une hésitation juste, rarement.' },
      { text: 'Retester ces erreurs.' },
    ],
    personal: [
      'Utile pour toi parce qu’une forte reconnaissance peut donner une impression de maîtrise.',
    ],
    mastery: [
      'Ta confiance devient mieux calibrée à ta performance réelle.',
    ],
    whyItWorks:
      'On révise mal ce qu’on croit déjà savoir : comparer confiance et exactitude remet le tri à l’endroit — les erreurs sûres d’elles-mêmes d’abord.',
    example:
      'Sur 20 items, note F/M/F… puis compare : deux erreurs en confiance forte valent plus de travail que cinq hésitations justes.',
    next: { id: 'correction-par-cause', label: 'Traite en priorité les erreurs à forte confiance.' },
    related: ['qcm-actif', 'correction-par-cause', 'rappel-differe'],
    source: 'Source V2 — §6 Bibliothèque, p. 24',
  },
  {
    id: 'revision-rapide',
    title: 'Révision rapide',
    subtitle: 'Révision · Rendement',
    summary:
      'Temps court, portion déjà travaillée : rappel actif, erreurs antérieures, distinctions, chiffres et exceptions, quelques QCM ciblés. Pas de nouvelle fiche longue.',
    categories: ['memoriser', 'se-tester', 'focus'],
    subjects: [],
    infoTypes: ['definition', 'notions-proches', 'erreur-qcm'],
    problems: ['apprendre-vite', 'retard', 'verifier-maitrise'],
    aliases: [
      'révision rapide',
      'revision rapide',
      'j’ai 30 min',
      'j’ai 20 minutes',
      'vite',
      'dernier moment',
      'réviser vite',
      'peu de temps',
    ],
    keywords: ['rendement', 'court', 'ciblé', 'consolidation'],
    tags: ['rendement'],
    whenToUse: [
      'Quand le temps est court et qu’une partie a déjà été travaillée.',
    ],
    avoid: [
      'Ne reconstruis pas tout le cours et ne crée pas de nouvelles fiches longues.',
    ],
    quickSteps: [
      'Rappel actif.',
      'Erreurs antérieures.',
      'Distinctions et confusions.',
      'Chiffres, conditions, exceptions.',
      'QCM ciblés.',
      'Arrête les nouvelles cartes à faible rendement.',
    ],
    procedure: [
      { text: 'Rappel actif.', detail: 'Produis d’abord : plans, mécanismes, formules — sans support.' },
      { text: 'Erreurs antérieures.', detail: 'Ton carnet d’erreurs est la liste de révision la plus rentable qui existe.' },
      { text: 'Distinctions et confusions.', detail: 'Reprends les discriminants rois de tes tableaux A/B.' },
      { text: 'Chiffres / conditions / exceptions.' },
      { text: 'QCM ciblés.' },
      { text: 'Arrêter les nouvelles cartes à faible rendement.' },
    ],
    mastery: [
      'Tu consolides les points fragiles plutôt que de relire tout le programme.',
    ],
    example:
      '25 minutes avant un ED : blurting du chapitre, reprise de tes trois dernières erreurs, relecture des discriminants rois, cinq QCM ciblés. Rien de nouveau, rien de long.',
    related: ['rappel-actif', 'blurting', 'correction-par-cause', 'tableau-contraste'],
    source: 'Source V2 — §6 Bibliothèque, p. 31-32',
  },
  {
    id: 'simulation-examen',
    title: 'Simulation / Mode examen',
    subtitle: 'Transfert · Performance',
    summary:
      'Format réel, chronomètre, zéro indice, correction seulement à la fin — puis analyse score, temps, confiance et causes. Le test des conditions, pas seulement du contenu.',
    categories: ['se-tester', 'appliquer'],
    subjects: [],
    infoTypes: ['erreur-qcm', 'calcul'],
    problems: ['verifier-maitrise', 'stress'],
    aliases: [
      'mode examen',
      'simulation',
      'annales',
      'chronométré',
      'conditions réelles',
      'examen blanc',
      'colle',
    ],
    keywords: ['temps', 'grille', 'mélange', 'performance', 'épreuve'],
    tags: ['performance'],
    whenToUse: [
      'Quand le contenu est suffisamment acquis et qu’il faut tester temps, lecture, grille et mélange.',
    ],
    avoid: [
      'Ne l’utilise pas trop tôt comme unique méthode d’apprentissage si les concepts de base ne sont pas compris.',
    ],
    quickSteps: [
      'Reproduis le format réel.',
      'Aucun indice.',
      'Chronomètre.',
      'Corrige seulement après la série prévue.',
      'Analyse score, temps, confiance et causes.',
      'Reteste les familles d’erreurs.',
    ],
    procedure: [
      { text: 'Reproduire le format réel.', detail: 'Même nombre d’items, même grille, même ordre de matières si possible.' },
      { text: 'Pas d’indices.' },
      { text: 'Chronométrer.' },
      { text: 'Corriger seulement après la série prévue.' },
      { text: 'Analyser score, temps, confiance et causes.' },
      { text: 'Retester les familles d’erreurs.', detail: 'Chaque famille d’erreurs repart dans le circuit Correction par cause.' },
    ],
    mastery: [
      'La performance tient sous contraintes proches de l’épreuve.',
    ],
    example:
      'Un sujet d’annale complet, chronométré, grille papier, sans pause et sans correction avant la fin — puis analyse : score, temps par matière, confiance, codes d’erreur.',
    next: { id: 'correction-par-cause', label: 'Chaque famille d’erreurs repart dans le circuit de correction.' },
    related: ['qcm-actif', 'correction-par-cause', 'interleaving', 'nrar-stress'],
    source: 'Source V2 — §6 Bibliothèque, p. 32',
  },
];
