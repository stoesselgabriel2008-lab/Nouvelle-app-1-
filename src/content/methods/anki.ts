import type { Method } from '../types';

/** Anki / FSRS : entretenir des unités ciblées avec des cartes bien conçues. Source V2, §6. */
export const ankiMethods: Method[] = [
  {
    id: 'repetition-espacee',
    title: 'Répétition espacée / FSRS',
    subtitle: 'Entretien · Anki',
    summary:
      'Comprends d’abord, crée une carte claire et atomique, laisse FSRS planifier — et réponds honnêtement. Pour entretenir des unités ciblées, pas pour avaler le cours entier.',
    categories: ['anki', 'memoriser'],
    subjects: [],
    infoTypes: ['definition', 'nom-arbitraire', 'association-arbitraire', 'notions-proches'],
    problems: ['oublie', 'anki-deborde'],
    aliases: [
      'fsrs',
      'anki',
      'spaced repetition',
      'répétition espacée',
      'repetition espacee',
      'anki intervalles',
      'est-ce que je mets ça dans anki',
      'anki quoi mettre',
      'quoi mettre dans anki',
      'flashcards',
    ],
    keywords: ['espacement', 'intervalles', 'again', 'hard', 'cartes', 'entretien', 'planification'],
    tags: ['anki', 'entretien'],
    whenToUse: [
      'Pour maintenir des unités ciblées : définitions, distinctions, images, chiffres, petites relations.',
    ],
    avoid: [
      'N’utilise pas un calendrier rigide pour tout le cours, et ne transforme pas chaque phrase en carte.',
    ],
    quickSteps: [
      'Comprends d’abord.',
      'Crée une carte claire et atomique.',
      'Laisse FSRS planifier les rappels.',
      'Réponds honnêtement : oubli = Again, rappel correct difficile = Hard.',
      'Réécris les cartes ambiguës.',
    ],
    procedure: [
      { text: 'Comprendre d’abord.', detail: 'Une carte sur une notion incomprise fabrique du par-cœur fragile.' },
      {
        text: 'Créer une carte claire et atomique.',
        detail: 'Une seule décision mentale par carte : Q/R, cloze ciblé, calcul court, contraste — selon le contenu.',
        micro: ['Si le verso dépasse deux lignes, découpe en plusieurs cartes.'],
      },
      { text: 'Laisser FSRS planifier les rappels.', detail: 'Pas de calendrier manuel : l’algorithme espace mieux que la méthode des J.' },
      {
        text: 'Répondre honnêtement : oubli = Again, rappel correct difficile = Hard.',
        micro: ['Oublié = Again, même si « c’était tout bête » ; correct mais lent = Hard.'],
      },
      { text: 'Réécrire les cartes ambiguës.', micro: ['Une carte ratée trois fois de suite est presque toujours mal écrite : réécris-la au lieu de la subir.'] },
    ],
    example:
      '« Quelle est la localisation de X ? » → une carte. « Résume la voie Y » → pas une carte : une feuille blanche.',
    anki: {
      yes: [
        'Définitions exactes, noms arbitraires (après contexte), distinctions, chiffres, exceptions, petites relations, légendes visuelles (Image Occlusion).',
      ],
      no: [
        'La logique des mécanismes entiers, le choix de modèle en exercice, les plans de chapitres : à retester en production et en exercices.',
      ],
      note: 'Règle simple : Anki entretient des unités ciblées déjà comprises ; il ne remplace ni la compréhension ni la pratique.',
    },
    mastery: [
      'Les cartes restent soutenables et améliorent le rappel des détails ciblés.',
    ],
    limits: [
      'Plus de cartes ≠ plus de mémoire : les nouvelles cartes créent une dette future ; qualité et soutenabilité priment.',
    ],
    whyItWorks:
      'Espacer les rappels au moment où tu es sur le point d’oublier maximise l’effet de chaque révision — c’est la pratique distribuée, l’une des deux techniques les mieux établies (Dunlosky et al., 2013), et FSRS calcule ce moment pour toi.',
    related: ['carte-qr', 'cloze-cible', 'carte-calcul', 'carte-contraste', 'image-occlusion', 'audit-deck'],
    source: 'Source V2 — §6 Bibliothèque, p. 25',
  },
  {
    id: 'carte-qr',
    title: 'Carte Question / Réponse',
    subtitle: 'Anki · Définitions',
    summary:
      'Une question non ambiguë, une réponse principale courte, une seule décision mentale testée. Réécris toute carte dont plusieurs réponses seraient défendables.',
    categories: ['anki'],
    subjects: [],
    infoTypes: ['definition', 'nom-arbitraire'],
    problems: ['oublie', 'reconnais-seulement'],
    aliases: ['carte question réponse', 'anki question réponse', 'flashcard', 'q/r', 'carte basique', 'carte anki'],
    keywords: ['question', 'réponse', 'atomique', 'critère', 'exception'],
    tags: ['anki'],
    whenToUse: [
      'Pour une définition, une relation, un critère, une exception ou une causalité courte.',
    ],
    avoid: [
      'Pas de questions vagues ni de réponses de paragraphe.',
    ],
    quickSteps: [
      'Pose une question non ambiguë.',
      'Une réponse principale courte.',
      'Ajoute une explication seulement en complément.',
      'Teste avant d’afficher le verso.',
      'Réécris si plusieurs réponses sont défendables.',
    ],
    procedure: [
      {
        text: 'Poser une question non ambiguë.',
        micro: ['Relis ta question seule : une seule réponse doit être défendable.'],
      },
      { text: 'Une réponse principale courte.', micro: ['Un mot, un chiffre, une phrase courte — pas un paragraphe.'] },
      { text: 'Ajouter une explication seulement en complément.', detail: 'Le champ extra explique ; le verso tranche.' },
      { text: 'Tester avant d’afficher le verso.', micro: ['Réponds à voix haute AVANT de retourner la carte.'] },
      { text: 'Réécrire si plusieurs réponses sont défendables.' },
    ],
    mastery: [
      'Une seule décision mentale nette est testée.',
    ],
    example:
      'Recto : « Localisation de la synthèse des protéines membranaires ? » Verso : « Réticulum endoplasmique granuleux » — une décision, une réponse, l’explication en extra.',
    next: { id: 'repetition-espacee', label: 'Laisse FSRS planifier — et réponds honnêtement.' },
    related: ['repetition-espacee', 'cloze-cible', 'carte-contraste'],
    source: 'Source V2 — §6 Bibliothèque, p. 25',
  },
  {
    id: 'cloze-cible',
    title: 'Cloze ciblé',
    subtitle: 'Anki · Formulation',
    summary:
      'Masque LE terme discriminant d’une phrase structurante en gardant assez de contexte. Le trou doit tester la connaissance — pas la grammaire de la phrase.',
    categories: ['anki'],
    subjects: [],
    infoTypes: ['definition', 'nom-arbitraire'],
    problems: ['oublie'],
    aliases: ['cloze', 'texte à trous', 'anki cloze', 'trou', 'phrase à trous'],
    keywords: ['masquer', 'contexte', 'discriminant', 'formulation'],
    tags: ['anki'],
    whenToUse: [
      'Pour une phrase structurante, une relation ou une petite séquence où le contexte est utile.',
    ],
    avoid: [
      'Pas de cloze géant, pas de trous multiples dépendants, pas de réponse devinable uniquement par la grammaire.',
    ],
    quickSteps: [
      'Choisis le terme discriminant.',
      'Conserve assez de contexte.',
      'Masque un élément cohérent.',
      'Vérifie que la réponse est unique.',
      'Réécris si le trou donne un indice grammatical.',
    ],
    procedure: [
      {
        text: 'Choisir le terme discriminant.',
        micro: ['Masque le mot qui porte la connaissance — jamais un mot de liaison ni un article.'],
      },
      { text: 'Conserver assez de contexte.', micro: ['La phrase doit rester compréhensible trou compris.'] },
      { text: 'Masquer un élément cohérent.' },
      { text: 'Vérifier que la réponse est unique.', micro: ['Relis la phrase trouée : si deux réponses collent, réécris.'] },
      { text: 'Réécrire si le trou donne un indice grammatical.', detail: 'Si l’article ou l’accord trahit la réponse, la carte teste la langue, pas le cours.' },
    ],
    mastery: [
      'Le trou teste la connaissance, pas la forme de la phrase.',
    ],
    example:
      '« Le surfactant est sécrété par les pneumocytes de type {{c1::II}} » — le contexte aide, le trou porte le discriminant, la réponse est unique.',
    next: { id: 'repetition-espacee', label: 'Une carte n’existe que planifiée.' },
    related: ['carte-qr', 'repetition-espacee'],
    source: 'Source V2 — §6 Bibliothèque, p. 26',
  },
  {
    id: 'carte-calcul',
    title: 'Carte calcul',
    subtitle: 'Anki · Formule',
    summary:
      'Données minimales au recto, valeur ou décision demandée avec unité exigée, verso en étapes minimales + contrôle. Pour automatiser les petites applications — pas remplacer les vrais problèmes.',
    categories: ['anki', 'appliquer'],
    subjects: ['physique', 'chimie', 'biophysique', 'biostats'],
    infoTypes: ['formule', 'calcul'],
    problems: ['applique-pas', 'oublie'],
    aliases: ['carte calcul', 'anki formule', 'mini calcul', 'carte formule', 'formule unité'],
    keywords: ['unités', 'application courte', 'transformation', 'automatisation'],
    tags: ['anki', 'calcul'],
    whenToUse: [
      'Pour automatiser une petite application de formule, les unités ou une transformation courte.',
    ],
    avoid: [
      'Ne remplace pas les problèmes longs et le choix de modèle par des cartes de calcul répétitives.',
    ],
    quickSteps: [
      'Donne des données minimales.',
      'Demande une valeur ou une décision.',
      'Exige l’unité et éventuellement le signe.',
      'Verso : étapes minimales + résultat + contrôle.',
    ],
    procedure: [
      { text: 'Donner des données minimales.', micro: ['Deux ou trois données chiffrées, avec unités — pas un énoncé complet.'] },
      { text: 'Demander une valeur ou une décision.' },
      { text: 'Exiger unité et éventuellement signe.', micro: ['Sans l’unité, la réponse compte fausse — comme en QCM.'] },
      {
        text: 'Verso : étapes minimales + résultat + contrôle.',
        detail: 'Le contrôle (dimension, ordre de grandeur) fait partie de la réponse attendue.',
        micro: ['Verso en trois lignes : étapes clés, résultat avec unité, contrôle attendu.'],
      },
    ],
    mastery: [
      'Tu sais calculer ET reconnaître quand ce mini-format est pertinent.',
    ],
    example:
      'Recto : « 0,9 g de NaCl dans 100 mL — concentration massique, avec l’unité ? » Verso : « 9 g/L », plus le contrôle attendu. L’application courte devient un réflexe.',
    next: { id: 'exercice-a-froid', label: 'Les cartes automatisent ; les problèmes entiers restent des problèmes.' },
    related: ['exemple-resolu', 'exercice-a-froid', 'repetition-espacee'],
    source: 'Source V2 — §6 Bibliothèque, p. 26',
  },
  {
    id: 'carte-contraste',
    title: 'Carte piège / contraste',
    subtitle: 'Anki · Discrimination',
    summary:
      'Quand le problème est la confusion, la carte doit tester le critère qui tranche — pas re-poser deux faits séparés. Verso : discriminant + mini-justification.',
    categories: ['anki', 'corriger'],
    subjects: ['biocell', 'biochimie', 'medicament', 'sante-publique'],
    infoTypes: ['notions-proches', 'erreur-qcm'],
    problems: ['melange', 'qcm-rate'],
    aliases: [
      'carte contraste',
      'carte piège',
      'piège anki',
      'a vs b anki',
      'carte confusion',
      'carte discriminant',
    ],
    keywords: ['discriminant', 'exception', 'absolu', 'opposition', 'confusion'],
    tags: ['anki', 'anti-confusion'],
    whenToUse: [
      'Pour une confusion récurrente, un absolu, une exception ou une opposition A/B.',
    ],
    avoid: [
      'Ne crée pas une carte factuelle séparée si le problème est justement la discrimination.',
    ],
    quickSteps: [
      'Nomme les deux notions, ou la règle et son exception.',
      'Pose une question sur le critère qui tranche.',
      'Verso : discriminant + mini-justification.',
      'Reteste dans les deux sens si utile.',
    ],
    procedure: [
      { text: 'Nommer les deux notions ou la règle / exception.' },
      {
        text: 'Poser une question sur le critère qui tranche.',
        detail: '« Qu’est-ce qui distingue A de B ? » ou « Dans quel cas la règle ne s’applique-t-elle pas ? »',
        micro: ['La question porte sur CE QUI DISTINGUE — pas deux cartes factuelles séparées.'],
      },
      { text: 'Verso : discriminant + mini-justification.', micro: ['Une ligne de discriminant, une ligne de pourquoi.'] },
      { text: 'Retester dans les deux sens si utile.' },
    ],
    personal: [
      'Très rentable pour tes interférences de noms et de mécanismes proches.',
    ],
    mastery: [
      'Le critère décisif revient plus vite que la confusion.',
    ],
    example:
      'Recto : « Qu’est-ce qui distingue à coup sûr ces deux transporteurs ? » Verso : le discriminant roi + une ligne de justification — pas deux cartes factuelles séparées.',
    next: { id: 'interleaving', label: 'Alterne des questions A/B pour stabiliser la discrimination.' },
    related: ['tableau-contraste', 'carte-qr', 'repetition-espacee', 'interleaving'],
    source: 'Source V2 — §6 Bibliothèque, p. 26-27',
    forMe: true,
  },
  {
    id: 'audit-deck',
    title: 'Audit d’un deck partagé',
    subtitle: 'Anki · Gain de temps',
    summary:
      'Un deck de prépa peut faire gagner du temps — à condition de le comparer au poly, supprimer le hors-programme, corriger l’ambigu, suspendre le trop lourd, et n’ajouter que tes lacunes.',
    categories: ['anki'],
    subjects: [],
    infoTypes: ['definition'],
    problems: ['anki-deborde', 'retard'],
    aliases: [
      'deck prépa',
      'deck prepa',
      'cartes partagées',
      'import anki',
      'utiliser cartes prépa',
      'deck partagé',
      'shared deck',
    ],
    keywords: ['audit', 'périmètre', 'poly', 'suspendre', 'import'],
    tags: ['anki', 'gain de temps'],
    whenToUse: [
      'Quand une prépa fournit des cartes et que tu veux éviter de tout recréer.',
    ],
    avoid: [
      'N’importe pas en masse sans vérifier le périmètre ni les formulations du poly.',
    ],
    quickSteps: [
      'Compare le deck au poly officiel.',
      'Supprime le hors-programme.',
      'Corrige les formulations ambiguës.',
      'Suspends les cartes trop lourdes.',
      'Ajoute seulement tes lacunes personnelles.',
    ],
    procedure: [
      {
        text: 'Comparer le deck au poly officiel.',
        detail: 'C’est le poly de TA fac qui fait foi, pas celui d’une autre.',
        micro: ['Échantillonne une vingtaine de cartes : combien sortent du périmètre de ton poly ?'],
      },
      { text: 'Supprimer le hors-programme.' },
      { text: 'Corriger les formulations ambiguës.', micro: ['Réécris avec les mots exacts de ton poly, pas ceux du deck.'] },
      { text: 'Suspendre les cartes trop lourdes.', micro: ['Suspends (ne supprime pas) : c’est réversible si le chapitre le réclame.'] },
      { text: 'Ajouter seulement tes lacunes personnelles.' },
    ],
    mastery: [
      'Le deck fait gagner du temps sans ajouter d’erreurs ni de dette inutile.',
    ],
    example:
      'Deck de prépa reçu en début de semestre : demi-heure d’audit — suppression du hors-poly de TA fac, réécriture des cartes ambiguës, suspension des pavés, ajout de tes seules lacunes.',
    next: { id: 'repetition-espacee', label: 'Un deck audité se travaille ensuite comme le tien.' },
    related: ['repetition-espacee', 'carte-qr', 'triage-retard'],
    source: 'Source V2 — §6 Bibliothèque, p. 27',
  },
];
