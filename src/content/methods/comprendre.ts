import type { Method } from '../types';

/** Comprendre : expliquer, questionner, orienter. Source V2, §6. */
export const comprendreMethods: Method[] = [
  {
    id: 'feynman',
    title: 'Méthode de Feynman / Teach-back vérifié',
    subtitle: 'Compréhension · Auto-explication',
    summary:
      'Explique la notion simplement, sans support, comme à quelqu’un d’autre — puis vérifie contre le poly et termine par une question de transfert. Expliquer ne suffit pas : il faut vérifier.',
    categories: ['comprendre', 'se-tester'],
    subjects: [],
    infoTypes: ['mecanisme', 'definition', 'texte', 'experience'],
    problems: ['comprends-pas', 'verifier-maitrise', 'reconnais-seulement'],
    aliases: [
      'feynman',
      'teach back',
      'teach-back',
      'expliquer à quelqu’un',
      'expliquer avec mes mots',
      'je récite sans comprendre',
      'expliquer simplement',
    ],
    keywords: ['explication', 'compréhension', 'vulgariser', 'enseigner', 'transmettre'],
    tags: ['compréhension'],
    whenToUse: [
      'Quand tu veux vérifier si tu peux expliquer une notion et relier cause, mécanisme et conséquence.',
    ],
    avoid: [
      'Une explication fluide peut être fausse. Feynman seul ne prouve pas la maîtrise : il faut vérifier contre le poly et appliquer.',
    ],
    quickSteps: [
      'Choisis une notion précise.',
      'Explique-la simplement, sans support.',
      'Repère les mots que tu utilises sans pouvoir les expliquer.',
      'Rouvre le poly et corrige.',
      'Réexplique avec le vocabulaire exact.',
      'Termine par une question ou un QCM de transfert.',
    ],
    procedure: [
      { text: 'Choisir une notion précise.' },
      { text: 'L’expliquer simplement sans support, comme à quelqu’un qui connaît les prérequis minimaux.' },
      { text: 'Repérer les endroits où tu utilises un mot sans pouvoir l’expliquer.', detail: 'Ces mots-écrans sont exactement les trous de compréhension.' },
      { text: 'Rouvrir le poly et corriger.' },
      { text: 'Réexpliquer avec le vocabulaire exact.', detail: 'La version simple ne remplace pas la formulation du poly : elle y conduit.' },
      { text: 'Faire une question / un QCM de transfert.', detail: 'C’est la vérification qui transforme une explication en maîtrise.' },
    ],
    example:
      'Explique l’osmose à voix haute sans le cours. Si « tonicité » sort sans définition possible, c’est là qu’il faut rouvrir le poly.',
    personal: [
      'Très utile pour transformer ton bon sens de la structure en explication — mais termine toujours par un contrôle des noms et détails exacts.',
    ],
    mastery: [
      'Ton explication est correcte au poly ET survit à une question reformulée.',
    ],
    limits: [
      'Expliquer aide, mais une explication fluide peut être fausse : Feynman ne prouve pas la maîtrise, il la prépare.',
    ],
    whyItWorks:
      'Reformuler simplement expose les mots que tu utilises sans les comprendre ; la vérification au poly transforme ensuite l’explication en vrai contrôle.',
    next: { id: 'qcm-actif', label: 'Vérifie par une question de transfert : c’est elle qui conclut un Feynman.' },
    related: ['auto-explication', 'rappel-actif', 'perturbations', 'qcm-actif'],
    source: 'Source V2 — §6 Bibliothèque, p. 10-11',
  },
  {
    id: 'auto-explication',
    title: 'Auto-explication',
    subtitle: 'Compréhension · Raisonnement',
    summary:
      'À chaque étape d’un exemple, d’un mécanisme ou d’une correction, demande-toi « pourquoi ? » et relie l’étape à une règle du cours. C’est ce qui distingue suivre de comprendre.',
    categories: ['comprendre', 'appliquer'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats', 'biocell', 'biochimie'],
    infoTypes: ['mecanisme', 'calcul', 'experience', 'erreur-qcm'],
    problems: ['comprends-pas', 'applique-pas'],
    aliases: [
      'auto-explication',
      'auto explication',
      'self explanation',
      'pourquoi cette étape',
      'raisonnement',
      'justifier les étapes',
    ],
    keywords: ['pourquoi', 'justification', 'règle', 'hypothèse', 'compréhension'],
    tags: ['raisonnement'],
    whenToUse: [
      'Pendant un exemple, un mécanisme ou une correction : quand tu veux comprendre pourquoi chaque étape est valide.',
    ],
    avoid: [
      'Ne produis pas des commentaires vagues du type « c’est logique » : chaque « pourquoi » doit renvoyer à une règle précise.',
    ],
    quickSteps: [
      'À chaque étape, demande : pourquoi ?',
      'Relie l’étape à une règle, une hypothèse ou une relation du cours.',
      'Précise ce qui aurait changé si la condition était différente.',
      'Identifie un résultat impossible ou un contre-exemple.',
      'Reprends sans le modèle.',
    ],
    procedure: [
      { text: 'À chaque étape demander : pourquoi ?' },
      { text: 'Relier l’étape à une règle, une hypothèse ou une relation du cours.', detail: '« On divise par la masse parce que… » — si la phrase ne peut pas être finie, c’est un trou.' },
      { text: 'Préciser ce qui aurait changé si la condition était différente.' },
      { text: 'Identifier un résultat impossible ou un contre-exemple.' },
      { text: 'Reprendre sans le modèle.' },
    ],
    personal: [
      'Excellent pour les calculs et mécanismes, où tu retiens souvent l’architecture mais peux perdre le détail du lien.',
    ],
    mastery: [
      'Tu peux justifier la transition sans regarder la correction.',
    ],
    whyItWorks:
      'Expliquer pourquoi chaque étape est valide relie l’exemple aux principes du cours — c’est ce qui distingue comprendre de suivre (Chi et al., 1989).',
    example:
      'Correction d’un exercice d’enzymologie : à chaque ligne, finis la phrase « on fait ça parce que… ». Si elle ne se finit pas, le trou est là.',
    next: { id: 'exercice-a-froid', label: 'Reprends un problème proche sans le modèle sous les yeux.' },
    related: ['feynman', 'exemple-resolu', 'chaine-causale', 'perturbations'],
    source: 'Source V2 — §6 Bibliothèque, p. 11',
  },
  {
    id: 'pretest',
    title: 'Prétest / Pretesting',
    subtitle: 'Orientation · Génération',
    summary:
      'Avant de lire ou d’écouter, tente de répondre à 2-5 questions sur le sujet — même en te trompant. Ton attention saura ensuite exactement quoi chercher.',
    categories: ['comprendre', 'structurer'],
    subjects: [],
    infoTypes: ['texte', 'definition', 'mecanisme'],
    problems: ['comprends-pas', 'concentration'],
    aliases: ['prétest', 'pretesting', 'pretest', 'avant de lire', 'question avant cours', 'mini test avant'],
    keywords: ['orientation', 'génération', 'préparation', 'lecture active'],
    tags: ['orientation'],
    whenToUse: [
      'Avant une explication ou une lecture, pour orienter l’attention vers les questions importantes.',
    ],
    avoid: [
      'N’en fais pas un examen punitif sur un sujet totalement inconnu : l’objectif est l’orientation, pas le score.',
    ],
    quickSteps: [
      'Formule 2 à 5 questions à partir des objectifs et des titres.',
      'Tente rapidement une réponse, même incertaine.',
      'Lis ou écoute ensuite avec ces questions en tête.',
      'Compare ta réponse initiale à la réponse apprise.',
      'Reteste plus tard.',
    ],
    procedure: [
      { text: 'Formuler 2 à 5 questions sur les objectifs / titres.' },
      { text: 'Tenter rapidement une réponse, même incertaine.', detail: 'Se tromper ici est utile : l’erreur prépare la correction.' },
      { text: 'Lire / écouter ensuite avec ces questions en tête.' },
      { text: 'Comparer la réponse initiale à la réponse apprise.' },
      { text: 'Retester plus tard.' },
    ],
    mastery: [
      'Le prétest t’aide à repérer et corriger les écarts, pas seulement à compter des erreurs.',
    ],
    whyItWorks:
      'Tenter une réponse avant d’étudier oriente l’attention et améliore la rétention — même quand la tentative est fausse (Richland, Kornell & Kao, 2009).',
    example:
      'Avant le cours sur le cycle cellulaire : « Qu’est-ce qui déclenche la mitose ? Qu’est-ce qui l’arrête ? » Deux réponses tentées en 1 minute, puis tu écoutes avec ces questions en tête.',
    next: { id: 'liste-questions', label: 'Transforme tout le chapitre en questions auxquelles répondre à froid.' },
    related: ['liste-questions', 'rappel-actif', 'relecture-surlignage'],
    source: 'Source V2 — §6 Bibliothèque, p. 11-12',
  },
  {
    id: 'liste-questions',
    title: 'Liste de questions',
    subtitle: 'Orientation · Rappel · Transfert',
    summary:
      'Transforme les objectifs et titres du cours en vraies questions auxquelles tu répondras sans support : définitions, causalités, contrastes, conditions, « et si… ? ».',
    categories: ['comprendre', 'se-tester', 'structurer'],
    subjects: ['shs', 'sante-publique'],
    infoTypes: ['texte', 'definition', 'mecanisme', 'experience'],
    problems: ['oublie', 'verifier-maitrise', 'comprends-pas'],
    aliases: ['liste de questions', 'questions cours', 'question bank', 'prompts', 'banque de questions'],
    keywords: ['questions', 'objectifs', 'titres', 'production', 'QROC'],
    tags: ['orientation'],
    whenToUse: [
      'Pour transformer objectifs et titres en prompts réellement utilisables sans support.',
    ],
    avoid: [
      'Ne copie pas chaque titre sous forme de question sans jamais répondre à froid : la liste sert à produire, pas à décorer.',
    ],
    quickSteps: [
      'Crée des questions de définition.',
      'Ajoute des questions de fonctionnement et de causalité.',
      'Ajoute des contrastes A/B.',
      'Ajoute conditions et limites.',
      'Ajoute « si une variable change ? ».',
      'Réponds sans support et corrige.',
    ],
    procedure: [
      { text: 'Créer des questions de définition.' },
      { text: 'Ajouter des questions de fonctionnement et causalité.', detail: '« Comment ? », « Pourquoi ? », « Qu’est-ce qui déclenche… ? »' },
      { text: 'Ajouter des contrastes A/B.', detail: '« Quelle différence entre X et Y ? Quel critère tranche ? »' },
      { text: 'Ajouter conditions / limites.' },
      { text: 'Ajouter « si une variable change ? ».' },
      { text: 'Répondre sans support et corriger.' },
    ],
    mastery: [
      'La liste déclenche des productions, pas une nouvelle lecture.',
    ],
    example:
      'Chapitre « indicateurs de santé » : une question de définition (incidence ?), une de causalité (pourquoi rapporter à une population ?), un contraste (incidence vs prévalence ?), une limite (quand l’indicateur trompe-t-il ?).',
    next: { id: 'rappel-actif', label: 'Réponds à ta liste sans support — c’est là que tout se joue.' },
    related: ['pretest', 'rappel-actif', 'perturbations', 'tableau-contraste'],
    source: 'Source V2 — §6 Bibliothèque, p. 12',
  },
];
