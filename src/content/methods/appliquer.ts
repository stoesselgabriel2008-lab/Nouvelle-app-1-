import type { Method } from '../types';

/** Appliquer : du cours à l'exercice, avec retrait progressif de l'aide. Source V2, §6. */
export const appliquerMethods: Method[] = [
  {
    id: 'exemple-resolu',
    title: 'Exemple entièrement résolu',
    subtitle: 'Calcul · Novice · Worked example',
    summary:
      'Au début d’une famille de problèmes : étudie une solution complète en expliquant pourquoi chaque étape est choisie, reproduis-en une partie, puis passe à un exemple à trous.',
    categories: ['appliquer', 'comprendre'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats'],
    infoTypes: ['calcul', 'formule'],
    problems: ['applique-pas', 'choix-methode', 'comprends-pas'],
    aliases: [
      'worked example',
      'exemple résolu',
      'exemple corrigé',
      'correction détaillée',
      'début exercice',
      'je sais pas commencer un exo',
    ],
    keywords: ['solution', 'stratégie', 'novice', 'modèle', 'étapes'],
    tags: ['novice'],
    whenToUse: [
      'Au début d’une famille de problèmes, ou quand tu ne sais pas encore quelle stratégie choisir.',
    ],
    avoid: [
      'Ne reste pas indéfiniment à regarder des corrections : l’aide doit diminuer.',
    ],
    quickSteps: [
      'Étudie la solution complète.',
      'À chaque étape, explique pourquoi cette loi ou ce test est choisi.',
      'Relie les étapes aux données et hypothèses.',
      'Reproduis une partie sans regarder.',
      'Passe à un exemple à trous.',
    ],
    procedure: [
      { text: 'Étudier la solution complète.' },
      { text: 'À chaque étape, expliquer pourquoi cette loi / ce test / cette transformée est choisie.', detail: 'C’est l’auto-explication qui rend l’exemple utile : sans « pourquoi », tu mémorises une correction.' },
      { text: 'Relier les étapes aux données et hypothèses.' },
      { text: 'Reproduire une partie sans regarder.' },
      { text: 'Passer à un exemple à trous.', detail: 'La suite logique : Complétion / Fading, puis l’exercice à froid.' },
    ],
    example:
      'Nouvelle famille d’exos de dilution : lis la correction en te demandant à chaque ligne « pourquoi cette relation ? », puis refais la fin seul.',
    anki: {
      yes: ['Une carte calcul pour l’application courte qui doit devenir automatique (unités, transformation).'],
      no: ['La correction entière : le choix de modèle s’entraîne en exercices, pas en cartes.'],
    },
    mastery: [
      'Tu peux expliquer la stratégie sans mémoriser la correction.',
    ],
    limits: [
      'Bénéfice surtout chez les novices : quand l’expertise augmente, l’aide doit se retirer (fading, exercice à froid).',
    ],
    whyItWorks:
      'Chez le débutant, étudier une solution expliquée charge moins la mémoire de travail que chercher à l’aveugle — c’est l’effet worked-example, qui s’inverse quand l’expertise monte : d’où le retrait progressif de l’aide.',
    next: { id: 'fading', label: 'Passe aux exemples à trous : l’aide doit commencer à se retirer.' },
    related: ['fading', 'auto-explication', 'exercice-a-froid', 'carte-calcul'],
    source: 'Source V2 — §6 Bibliothèque, p. 20-21',
  },
  {
    id: 'fading',
    title: 'Complétion / Fading',
    subtitle: 'Calcul · Transition',
    summary:
      'Le pont entre l’exemple résolu et le problème à froid : masque une étape clé, complète-la et justifie, puis masque davantage à chaque exemple suivant.',
    categories: ['appliquer'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats'],
    infoTypes: ['calcul', 'formule'],
    problems: ['applique-pas', 'choix-methode'],
    aliases: ['fading', 'complétion', 'completion', 'exemple à trous', 'retirer aide', 'exercice à trous'],
    keywords: ['transition', 'étapes masquées', 'aide dégressive', 'autonomie'],
    tags: ['transition'],
    whenToUse: [
      'Entre l’exemple résolu et le problème à froid.',
    ],
    avoid: [
      'Ne laisse pas toujours les mêmes étapes visibles : fais tourner ce qui est masqué.',
    ],
    quickSteps: [
      'Prends un exemple similaire.',
      'Masque une étape clé.',
      'Complète et justifie.',
      'Sur l’exemple suivant, masque davantage.',
      'Finis par un problème entièrement autonome.',
    ],
    procedure: [
      { text: 'Prendre un exemple similaire.' },
      { text: 'Masquer une étape clé.' },
      { text: 'Compléter et justifier.' },
      { text: 'Sur l’exemple suivant masquer davantage.' },
      { text: 'Finir par un problème entièrement autonome.' },
    ],
    mastery: [
      'Tu reconstruis progressivement toute la procédure.',
    ],
    example:
      'Série de biophysique : premier exemple complet, deuxième sans l’étape « choix de la loi », troisième sans la mise en équation, quatrième entièrement seul.',
    next: { id: 'exercice-a-froid', label: 'Dernier palier : plus aucune aide visible.' },
    related: ['exemple-resolu', 'exercice-a-froid', 'variation'],
    source: 'Source V2 — §6 Bibliothèque, p. 21',
  },
  {
    id: 'exercice-a-froid',
    title: 'Exercice à froid',
    subtitle: 'Application · Calcul · Transfert',
    summary:
      'Formule et correction cachées : identifie données et inconnue, choisis le modèle, écris unités et prédiction, résous, contrôle. Le test de la stratégie autonome.',
    categories: ['appliquer', 'se-tester'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats'],
    infoTypes: ['calcul', 'formule'],
    problems: ['applique-pas', 'choix-methode', 'verifier-maitrise'],
    aliases: [
      'exercice à froid',
      'exo à froid',
      'sans correction',
      'autonome',
      'problem solving',
      'exo sans aide',
      'exo physique',
    ],
    keywords: ['données', 'inconnue', 'modèle', 'unités', 'contrôle', 'interprétation'],
    tags: ['transfert'],
    whenToUse: [
      'Après compréhension et pratique guidée, pour tester la stratégie autonome.',
    ],
    avoid: [
      'Trop tôt chez un novice sans modèle : cela peut devenir du tâtonnement improductif.',
    ],
    quickSteps: [
      'Cache formule et correction.',
      'Identifie données et inconnue.',
      'Choisis le modèle.',
      'Écris unités et prédiction qualitative.',
      'Résous.',
      'Contrôle et interprète.',
      'Code l’erreur si échec.',
    ],
    procedure: [
      { text: 'Cacher formule / correction.' },
      { text: 'Identifier données et inconnue.' },
      { text: 'Choisir le modèle.', detail: 'C’est le vrai test : quelle loi, quelles hypothèses, pourquoi celle-ci ?' },
      { text: 'Écrire unités et prédiction qualitative.', detail: 'Prédire le sens du résultat avant de calculer protège des absurdités.' },
      { text: 'Résoudre.' },
      { text: 'Contrôler et interpréter.', detail: 'Contrôle dimensionnel, signe, ordre de grandeur, cas limites.' },
      { text: 'Coder l’erreur si échec.', detail: 'Voir Correction par cause : K/C/T/L/F/Tps/G.' },
    ],
    mastery: [
      'Tu choisis et appliques la méthode sans indice du chapitre.',
    ],
    example:
      'Un exercice de chimie jamais vu, formulaire fermé : données, inconnue, choix du modèle justifié, unités posées, prédiction du sens, résolution, contrôle dimensionnel.',
    next: { id: 'variation', label: 'Change une donnée ou la formulation, et vérifie que la stratégie tient.' },
    related: ['fading', 'variation', 'interleaving', 'correction-par-cause'],
    source: 'Source V2 — §6 Bibliothèque, p. 21-22',
  },
  {
    id: 'variation',
    title: 'Variation de problème',
    subtitle: 'Transfert · Calcul',
    summary:
      'Garde le principe, change une seule chose — donnée, inconnue, unité, hypothèse ou formulation — et prédis ce qui reste invariant. Vérifie la stratégie, pas la correction mémorisée.',
    categories: ['appliquer', 'se-tester'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats'],
    infoTypes: ['calcul', 'formule'],
    problems: ['applique-pas', 'verifier-maitrise'],
    aliases: ['variation', 'problème nouveau', 'transfert', 'changer données', 'changer l’énoncé'],
    keywords: ['invariant', 'formulation', 'données', 'stratégie'],
    tags: ['transfert'],
    whenToUse: [
      'Quand tu réussis un exemple connu mais veux vérifier que tu n’as pas mémorisé la correction.',
    ],
    avoid: [
      'Ne change pas toutes les dimensions en même temps au début.',
    ],
    quickSteps: [
      'Conserve le principe.',
      'Change une donnée, l’inconnue, l’unité, l’hypothèse ou la formulation.',
      'Prédis ce qui reste invariant.',
      'Résous.',
      'Compare la stratégie, pas seulement le résultat.',
    ],
    procedure: [
      { text: 'Conserver le principe.' },
      { text: 'Changer une donnée, l’inconnue, l’unité, l’hypothèse ou la formulation.' },
      { text: 'Prédire ce qui reste invariant.' },
      { text: 'Résoudre.' },
      { text: 'Comparer la stratégie, pas seulement le résultat.' },
    ],
    mastery: [
      'Tu réussis malgré une formulation ou des données nouvelles.',
    ],
    whyItWorks:
      'Réussir sous variation prouve que tu as appris la stratégie, pas mémorisé la correction — c’est la différence entre refaire et savoir faire.',
    example:
      'Le même problème d’osmolarité, mais on te donne la concentration et on demande le volume : le principe est identique, la mémoire de la correction ne suffit plus.',
    next: { id: 'interleaving', label: 'Mélange maintenant les familles : le choix fait partie de la maîtrise.' },
    related: ['exercice-a-froid', 'perturbations', 'interleaving', 'rappel-differe'],
    source: 'Source V2 — §6 Bibliothèque, p. 22',
  },
  {
    id: 'interleaving',
    title: 'Entrelacement / Interleaving',
    subtitle: 'Discrimination · Calcul · QCM',
    summary:
      'Après avoir acquis plusieurs familles, mélange-les dans une même série sans annoncer la méthode attendue : tu apprends à choisir, pas seulement à exécuter.',
    categories: ['appliquer', 'se-tester', 'corriger'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats', 'medicament'],
    infoTypes: ['calcul', 'notions-proches', 'erreur-qcm'],
    problems: ['melange', 'choix-methode', 'verifier-maitrise'],
    aliases: [
      'interleaving',
      'entrelacement',
      'mélanger exercices',
      'melanger exercices',
      'mix practice',
      'séries mélangées',
      'exos mélangés',
    ],
    keywords: ['discrimination', 'catégories', 'choix', 'familles', 'mélange'],
    tags: ['discrimination'],
    whenToUse: [
      'Après acquisition initiale de plusieurs catégories, pour apprendre à choisir entre elles.',
    ],
    avoid: [
      'Ne mélange pas prématurément des notions que tu ne comprends pas encore.',
    ],
    quickSteps: [
      'Apprends chaque famille suffisamment.',
      'Crée une série contenant plusieurs familles.',
      'Cache le nom de la méthode attendue.',
      'Pour chaque item, justifie le choix de stratégie.',
      'Analyse les confusions de catégorie.',
    ],
    procedure: [
      { text: 'Apprendre chaque famille suffisamment.', detail: 'L’entrelacement vient après l’acquisition initiale, pas à la place.' },
      { text: 'Créer une série contenant plusieurs familles.' },
      { text: 'Cacher le nom de la méthode attendue.', detail: 'Si l’énoncé annonce le chapitre, le choix est déjà fait pour toi.' },
      { text: 'Pour chaque item, justifier le choix de stratégie.' },
      { text: 'Analyser les confusions de catégorie.' },
    ],
    personal: [
      'Très utile pour limiter ton interférence entre notions proches.',
    ],
    mastery: [
      'Tu identifies la bonne catégorie avant d’exécuter la procédure.',
    ],
    limits: [
      'Mélanger immédiatement n’est pas toujours mieux : l’entrelacement est utile après une acquisition initiale suffisante.',
    ],
    whyItWorks:
      'Mélanger les familles force à choisir la méthode à chaque item — la compétence que les séries homogènes ne travaillent jamais (Rohrer & Taylor, 2007).',
    example:
      'Dix exercices tirés de trois chapitres de physique, dans le désordre et sans titre de chapitre : avant chaque résolution, écris quelle famille c’est et pourquoi.',
    next: { id: 'simulation-examen', label: 'Puis teste en conditions réelles : temps, grille, mélange complet.' },
    related: ['tableau-contraste', 'exercice-a-froid', 'variation', 'simulation-examen'],
    source: 'Source V2 — §6 Bibliothèque, p. 22-23',
    forMe: true,
  },
];
