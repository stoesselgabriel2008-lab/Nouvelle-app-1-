import type { Method } from '../types';

/** Socle mémoire : produire sans support, faire durer. Source V2, §6. */
export const socleMethods: Method[] = [
  {
    id: 'rappel-actif',
    title: 'Rappel actif / Retrieval practice',
    subtitle: 'Socle · Mémoire · Preuve forte',
    summary:
      'Ferme le support et produis la réponse toi-même. C’est le test le plus honnête de ce qui reste vraiment — et l’acte même de récupérer consolide la mémoire.',
    categories: ['memoriser', 'se-tester'],
    subjects: [],
    infoTypes: ['definition', 'mecanisme', 'liste-ordonnee', 'liste-non-ordonnee', 'formule'],
    problems: ['oublie', 'reconnais-seulement', 'verifier-maitrise'],
    aliases: [
      'rappel actif',
      'retrieval',
      'retrieval practice',
      'active recall',
      'réciter sans regarder',
      'ça revient pas',
      'je reconnais seulement',
      'produire sans support',
      'sans le cours',
    ],
    keywords: ['récupération', 'testing effect', 'mémoire', 'rappel', 'reconnaissance', 'par coeur', 'retenir'],
    tags: ['socle', 'preuve forte'],
    whenToUse: [
      'Quand tu veux savoir ce qui reste réellement sans le support et consolider la récupération.',
      'Après avoir compris une unité courte, avant de conclure « je connais ».',
    ],
    avoid: [
      'Ne transforme pas chaque minute d’apprentissage initial en interrogation si le prérequis n’est pas compris : comprendre d’abord, récupérer ensuite.',
    ],
    quickSteps: [
      'Étudie ou comprends une unité courte.',
      'Ferme ou masque le support.',
      'Produis la réponse, le plan, le schéma ou la formule sans indice.',
      'Compare au support et corrige uniquement les trous.',
      'Reteste plus tard sous une formulation différente.',
    ],
    procedure: [
      { text: 'Étudier / comprendre une unité courte.', detail: 'Une unité logique : une définition, un mécanisme, un tableau, un schéma, une formule — pas un nombre fixe de pages.' },
      { text: 'Fermer ou masquer le support.', detail: 'Retire-le avant que la familiarité ne donne une fausse impression de maîtrise.' },
      { text: 'Produire la réponse, le plan, le schéma ou la formule sans indice.' },
      { text: 'Comparer au support.' },
      { text: 'Corriger uniquement les trous.', detail: 'Distingue omission, inversion, confusion, mauvais modèle et détail arbitraire : chaque type d’écart appelle une correction différente.' },
      { text: 'Retester plus tard sous une formulation différente.', detail: 'Un rappel qui survit au délai et au changement de formulation est un vrai rappel.' },
    ],
    example:
      'Après un paragraphe sur la mitochondrie : ferme le poly et récite ses rôles, puis vérifie. Ne surligne pas « une deuxième fois » à la place.',
    personal: [
      'Indispensable pour toi : ta reconnaissance peut être meilleure que ton rappel libre. La lecture seule risque donc de surestimer ta maîtrise.',
    ],
    anki: {
      yes: ['Les unités ciblées qui ont résisté au rappel : définitions, distinctions, chiffres, petites relations.'],
      no: ['La logique d’un mécanisme entier — reteste-la en feuille blanche ou en perturbations plutôt qu’en cartes.'],
    },
    mastery: [
      'Tu produis la réponse avant de la reconnaître dans des propositions.',
    ],
    limits: [
      'Un QCM correct peut ne tester que la reconnaissance : ajoute régulièrement un rappel sans propositions.',
      'La familiarité de relecture peut masquer un rappel libre faible.',
    ],
    whyItWorks:
      'Récupérer une information en mémoire la renforce davantage que la relire : c’est l’effet test, un des résultats les plus solides de la recherche sur l’apprentissage (Karpicke & Roediger, 2008).',
    next: { id: 'rappel-differe', label: 'Valide à distance ce que tu as produit aujourd’hui.' },
    related: ['feuille-blanche', 'blurting', 'rappel-differe', 'repetition-espacee', 'qcm-actif'],
    source: 'Source V2 — §6 Bibliothèque, p. 8-9',
    forMe: true,
  },
  {
    id: 'feuille-blanche',
    title: 'Feuille blanche',
    subtitle: 'Rappel libre · Structure · Très rentable',
    summary:
      'Sur une page vide, restitue de mémoire un plan, un mécanisme, un tableau ou une formule — puis compare au poly et retravaille uniquement ce qui manque.',
    categories: ['memoriser', 'se-tester', 'structurer'],
    subjects: [],
    infoTypes: ['mecanisme', 'tableau', 'liste-ordonnee', 'liste-non-ordonnee', 'formule', 'schema'],
    problems: ['oublie', 'verifier-maitrise', 'reconnais-seulement'],
    aliases: [
      'feuille blanche',
      'page blanche',
      'blank page',
      'brain dump',
      'rappel libre',
      'tout écrire de mémoire',
      'restituer le plan',
    ],
    keywords: ['rappel', 'restitution', 'production', 'structure', 'plan', 'mémoire'],
    tags: ['socle', 'très rentable'],
    whenToUse: [
      'Quand tu veux tester un plan, un schéma, une chaîne causale, une liste de critères ou une formule avec ses unités.',
    ],
    avoid: [
      'Ne recopie pas immédiatement après lecture : ce serait de la copie, pas du rappel.',
      'Ne refais pas chaque cours entier tous les jours — cible.',
    ],
    quickSteps: [
      'Définis une cible précise : plan, mécanisme, tableau ou formule.',
      'Ferme le support.',
      'Écris ou dessine tout ce qui revient.',
      'Compare au poly.',
      'Code les omissions et inversions.',
      'Refais seulement la zone défaillante.',
    ],
    procedure: [
      { text: 'Définir une cible précise : plan, mécanisme, tableau, formule.', detail: 'Une cible floue (« le chapitre ») produit une restitution floue.' },
      { text: 'Fermer le support.' },
      { text: 'Écrire / dessiner tout ce qui revient.', detail: 'Commence par la structure : les grands blocs d’abord, les détails ensuite.' },
      { text: 'Comparer au poly.' },
      { text: 'Coder les omissions / inversions.', detail: 'Omission ≠ inversion ≠ confusion : note lequel, la correction n’est pas la même.' },
      { text: 'Refaire seulement la zone défaillante.', detail: 'Rouvrir uniquement pour les trous, pas pour tout relire.' },
    ],
    example:
      'Cible : « les 3 grandes étapes de la glycolyse et leurs bilans ». Page vide, restitution, comparaison — puis seules les enzymes manquantes sont retravaillées.',
    personal: [
      'Commence par la structure : ton profil conserve bien l’ossature, puis révèle quels détails exacts manquent.',
    ],
    anki: {
      yes: ['Les maillons précis qui manquent de façon répétée à la restitution.'],
      no: ['La restitution complète elle-même : elle se reteste en feuille blanche, pas en cartes.'],
    },
    mastery: [
      'La restitution est structurée et les omissions importantes disparaissent au retest.',
    ],
    whyItWorks:
      'Le rappel libre force ta mémoire à reconstruire sans aucun indice — exactement ce que la reconnaissance en QCM ne teste jamais.',
    next: { id: 'rappel-differe', label: 'La même restitution, dans deux ou trois jours, sans prévenir.' },
    related: ['rappel-actif', 'blurting', 'reconstruction-schema', 'mind-map', 'rappel-differe'],
    source: 'Source V2 — §6 Bibliothèque, p. 9-10',
    forMe: true,
  },
  {
    id: 'blurting',
    title: 'Blurting',
    subtitle: 'Variante · Rappel libre',
    summary:
      'La version rapide et brute de la feuille blanche : écris très vite tout ce qui revient sur une petite section déjà comprise, sans mise en page, puis compare.',
    categories: ['memoriser', 'se-tester'],
    subjects: [],
    infoTypes: ['definition', 'liste-non-ordonnee', 'mecanisme'],
    problems: ['oublie', 'apprendre-vite', 'verifier-maitrise'],
    aliases: ['blurting', 'brain dump rapide', 'rappel brut', 'tout écrire', 'vider sa tête'],
    keywords: ['rappel', 'rapide', 'révision', 'production'],
    tags: ['variante'],
    whenToUse: [
      'Quand tu veux une version rapide et brute de la feuille blanche sur une portion déjà comprise.',
    ],
    avoid: [
      'Ne « blurte » pas un cours que tu ne comprends pas : ce serait seulement constater le vide.',
    ],
    quickSteps: [
      'Choisis une petite section.',
      'Ferme le support.',
      'Écris très vite tout ce qui revient, sans mise en page.',
      'Compare.',
      'Surligne seulement les trous et erreurs.',
      'Refais à distance.',
    ],
    procedure: [
      { text: 'Choisir une petite section.' },
      { text: 'Fermer le support.' },
      { text: 'Écrire très vite tout ce qui revient, sans mise en page.', detail: 'La vitesse est le but : pas de belle copie, pas de couleurs.' },
      { text: 'Comparer.' },
      { text: 'Surligner seulement les trous / erreurs.' },
      { text: 'Refaire à distance.' },
    ],
    personal: [
      'Utile en révision rapide, mais garde ensuite une question de précision sur les noms et conditions exacts.',
    ],
    mastery: [
      'Tu récupères rapidement l’essentiel sans transformer l’exercice en copie décorative.',
    ],
    example:
      'Fin de journée, 5 minutes : tout ce qui te revient du chapitre du matin sur les jonctions cellulaires, en vrac, sans mise en page — puis comparaison et surlignage des trous.',
    next: { id: 'feuille-blanche', label: 'La version structurée, quand tu veux tester l’architecture complète.' },
    related: ['feuille-blanche', 'rappel-actif', 'revision-rapide'],
    source: 'Source V2 — §6 Bibliothèque, p. 10',
  },
  {
    id: 'rappel-differe',
    title: 'Rappel différé',
    subtitle: 'Mémoire · Validation',
    summary:
      'Une réussite immédiate ne prouve rien : laisse passer du temps, puis reteste sans prévenir et sous une autre formulation. C’est le vrai verdict.',
    categories: ['memoriser', 'se-tester', 'corriger'],
    subjects: [],
    infoTypes: ['definition', 'nom-arbitraire', 'liste-ordonnee', 'chronologie', 'mecanisme'],
    problems: ['oublie', 'verifier-maitrise'],
    aliases: ['rappel différé', 'retest', 'retester plus tard', 'espacement', 'à distance', 'le lendemain'],
    keywords: ['délai', 'consolidation', 'validation', 'mémoire', 'oubli'],
    tags: ['validation'],
    whenToUse: [
      'Après une correction ou une réussite immédiate, pour vérifier qu’elle survit au délai.',
    ],
    avoid: [
      'Ne reteste pas immédiatement et toujours avec les mêmes mots : tu mesurerais l’écho, pas la mémoire.',
    ],
    quickSteps: [
      'Corrige la notion.',
      'Laisse-la disparaître de ton attention.',
      'Réintroduis-la plus tard sans annoncer le retest.',
      'Change la formulation ou le contexte.',
      'Corrige à nouveau si nécessaire.',
    ],
    procedure: [
      { text: 'Corriger la notion.' },
      { text: 'La laisser disparaître de l’attention.', detail: 'Passe à autre chose : le délai fait partie du test.' },
      { text: 'La réintroduire plus tard sans annoncer le retest.' },
      { text: 'Changer la formulation ou le contexte.', detail: 'Même contenu, autre angle : question inverse, cas concret, QCM reformulé.' },
      { text: 'Corriger à nouveau si nécessaire.' },
    ],
    personal: [
      'Très important pour toi : tes performances immédiates sur l’ordre ont parfois chuté en différé. La réussite du jour ne suffit pas.',
    ],
    mastery: [
      'La notion revient après délai et sous une forme différente.',
    ],
    whyItWorks:
      'Ce qui est récupéré après un délai se consolide bien mieux : la difficulté du rappel espacé est précisément ce qui renforce la trace (pratique distribuée, Dunlosky et al., 2013).',
    example:
      'Tu as su réciter les dérivés des feuillets embryonnaires ce matin. Le vrai test : les redonner jeudi, à partir de la question inverse (« d’où vient ce tissu ? »).',
    related: ['rappel-actif', 'repetition-espacee', 'variation', 'calibration-confiance'],
    source: 'Source V2 — §6 Bibliothèque, p. 24',
    forMe: true,
  },
];
