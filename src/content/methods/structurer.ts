import type { Method } from '../types';

/** Structurer et représenter : hiérarchie, chaînes, contrastes, frises. Source V2, §6. */
export const structurerMethods: Method[] = [
  {
    id: 'chunking',
    title: 'Chunking / Hiérarchisation',
    subtitle: 'Structure · Charge cognitive',
    summary:
      'Quand il y a trop d’éléments, dégage d’abord 3 à 7 grandes catégories, classe les détails dessous, et rappelle la structure avant les items isolés.',
    categories: ['structurer', 'comprendre'],
    subjects: [],
    infoTypes: ['liste-non-ordonnee', 'tableau', 'texte'],
    problems: ['oublie', 'comprends-pas'],
    aliases: [
      'chunking',
      'regrouper',
      'hiérarchie',
      'hiérarchisation',
      'catégories',
      'trop d’informations',
      'trop de choses à retenir',
    ],
    keywords: ['structure', 'organisation', 'branches', 'invariants', 'exceptions', 'charge cognitive'],
    tags: ['structure d’abord'],
    whenToUse: [
      'Quand il y a beaucoup d’éléments et que tu dois d’abord comprendre la hiérarchie.',
    ],
    avoid: [
      'N’invente pas des catégories qui n’existent pas dans le cours : la structure doit rester fidèle au poly.',
    ],
    quickSteps: [
      'Identifie 3 à 7 grandes catégories.',
      'Classe les détails sous ces branches.',
      'Nomme les invariants et les exceptions.',
      'Rappelle d’abord la structure.',
      'Ajoute progressivement les détails.',
    ],
    procedure: [
      {
        text: 'Identifier 3 à 7 grandes catégories.',
        micro: ['Parcours le plan et les titres du poly : les catégories y sont presque toujours déjà — n’en invente pas.'],
      },
      {
        text: 'Classer les détails sous ces branches.',
        micro: ['Au brouillon : une ligne par catégorie, ses membres listés dessous.'],
      },
      { text: 'Nommer les invariants et exceptions.', detail: 'Ce qui est toujours vrai structure ; ce qui fait exception se teste à part.' },
      {
        text: 'Rappeler d’abord la structure.',
        detail: 'Sans support : les branches avant les feuilles.',
        micro: ['Ferme et récite uniquement les 3-7 branches, dans l’ordre, avant tout détail.'],
      },
      { text: 'Ajouter progressivement les détails.', micro: ['Branche par branche : récite la branche, puis ses membres, puis passe à la suivante.'] },
    ],
    example:
      'Vingt acides aminés en vrac → 3 familles selon la chaîne latérale, puis les membres de chaque famille, puis les cas particuliers.',
    personal: [
      'Fort levier pour toi : structure d’abord, détails ensuite.',
    ],
    mastery: [
      'Tu peux reconstruire la hiérarchie avant les items isolés.',
    ],
    whyItWorks:
      'La mémoire de travail sature vite face à une liste plate ; regroupée en 3 à 7 blocs porteurs de sens, la même information devient tenable — et la structure sert ensuite d’index de rappel.',
    next: { id: 'feuille-blanche', label: 'Teste la hiérarchie sans support : branches d’abord, détails ensuite.' },
    related: ['mind-map', 'feuille-blanche', 'carte-conceptuelle', 'acronyme'],
    source: 'Source V2 — §6 Bibliothèque, p. 12-13',
    forMe: true,
  },
  {
    id: 'mind-map',
    title: 'Mind map de mémoire',
    subtitle: 'Vue d’ensemble · Relations',
    summary:
      'Une carte mentale construite support fermé, pour tester la hiérarchie et les relations d’un chapitre. Faite en copiant le cours, ce n’est plus un test — c’est de la décoration.',
    categories: ['structurer', 'representer', 'se-tester'],
    subjects: [],
    infoTypes: ['texte', 'liste-non-ordonnee', 'tableau'],
    problems: ['oublie', 'verifier-maitrise', 'comprends-pas'],
    aliases: ['mind map', 'mindmap', 'carte mentale', 'mind mapping', 'vue d’ensemble', 'schéma en branches'],
    keywords: ['hiérarchie', 'branches', 'relations', 'global', 'chapitre'],
    tags: ['vue d’ensemble'],
    whenToUse: [
      'Pour représenter hiérarchie, relations et vue globale d’un chapitre.',
    ],
    avoid: [
      'Une mind map esthétique copiée du cours est de la prise de notes, pas un test.',
    ],
    quickSteps: [
      'Ferme ou réduis le support.',
      'Place le concept central.',
      'Limite les branches principales.',
      'Ajoute seulement relations et mots discriminants.',
      'Compare au poly.',
      'Utilise la carte pour répondre à des questions.',
    ],
    procedure: [
      { text: 'Fermer ou réduire le support.', micro: ['Accorde-toi 30 secondes sur le plan du chapitre, puis ferme.'] },
      { text: 'Mettre le concept central.' },
      { text: 'Limiter les branches principales.', detail: '3 à 7 branches : au-delà, la hiérarchie se dilue.' },
      {
        text: 'Ajouter seulement relations et mots discriminants.',
        detail: 'Pas de phrases entières : des mots qui tranchent.',
        micro: ['Un à deux mots par nœud ; si tu écris une phrase, c’est de la prise de notes déguisée.'],
      },
      { text: 'Comparer au poly.', micro: ['Repère ce qui manque et où tu l’aurais accroché : c’est le trou à retravailler.'] },
      {
        text: 'Utiliser la map pour répondre à des questions.',
        micro: ['Pose-toi trois questions du chapitre et réponds en suivant les branches du doigt.'],
      },
    ],
    personal: [
      'Bonne pour exploiter ta structuration ; évite d’y passer du temps graphique.',
    ],
    mastery: [
      'La carte peut être reconstruite et sert de support à des réponses, pas de décoration.',
    ],
    limits: [
      'Utile pour la vue d’ensemble et les relations ; mauvaise si décorative et copiée.',
    ],
    example:
      'Fin d’un chapitre d’immunologie : support fermé, concept central au milieu, 5 branches maximum, uniquement les mots qui discriminent — puis comparaison au poly.',
    next: { id: 'liste-questions', label: 'Fais travailler ta carte : elle doit répondre à de vraies questions.' },
    related: ['chunking', 'carte-conceptuelle', 'feuille-blanche'],
    source: 'Source V2 — §6 Bibliothèque, p. 13',
  },
  {
    id: 'carte-conceptuelle',
    title: 'Carte conceptuelle',
    subtitle: 'Relations · Concepts',
    summary:
      'Relie chaque paire de concepts par un verbe précis (« active », « inhibe », « mesure »…). Chaque flèche doit pouvoir se lire comme une phrase scientifique correcte.',
    categories: ['structurer', 'representer', 'comprendre'],
    subjects: ['sante-publique', 'shs', 'biocell'],
    infoTypes: ['mecanisme', 'texte', 'experience'],
    problems: ['comprends-pas', 'melange'],
    aliases: ['carte conceptuelle', 'concept map', 'relations entre notions', 'réseau de concepts'],
    keywords: ['relations', 'verbes', 'liens', 'causalité', 'conditions'],
    tags: ['relations'],
    whenToUse: [
      'Quand la relation entre concepts importe plus qu’une hiérarchie radiale.',
    ],
    avoid: [
      'Ne multiplie pas des flèches sans préciser le sens de la relation : une flèche muette n’apprend rien.',
    ],
    quickSteps: [
      'Liste les concepts clés.',
      'Relie chaque paire pertinente par un verbe précis.',
      'Ajoute conditions et causalités.',
      'Retire les relations redondantes.',
      'Reconstruis à froid.',
    ],
    procedure: [
      { text: 'Lister les concepts clés.', micro: ['8 à 15 concepts maximum, tirés des termes en gras du poly.'] },
      {
        text: 'Relier chaque paire pertinente par un verbe précis.',
        detail: '« active », « inhibe », « transporte », « précède », « mesure »…',
        micro: ['Lis chaque flèche à voix haute comme une phrase complète : sujet → verbe → complément. Si la phrase est fausse ou vide, corrige la flèche.'],
      },
      { text: 'Ajouter conditions / causalités.' },
      { text: 'Retirer les relations redondantes.' },
      { text: 'Reconstruire à froid.', micro: ['Page vide : replace concepts et flèches verbalisées, puis compare.'] },
    ],
    mastery: [
      'Chaque flèche peut être lue comme une phrase scientifique correcte.',
    ],
    example:
      '« Hormone → stimule → glande cible », « rétrocontrôle → inhibe → sécrétion » : chaque flèche du chapitre d’endocrinologie devient une phrase vérifiable.',
    next: { id: 'feuille-blanche', label: 'Reconstruis le réseau à froid, verbes compris.' },
    related: ['mind-map', 'chaine-causale', 'double-representation'],
    source: 'Source V2 — §6 Bibliothèque, p. 13-14',
  },
  {
    id: 'chaine-causale',
    title: 'Chaîne causale',
    subtitle: 'Mécanisme · Biocell · Biochimie',
    summary:
      'Pour toute voie ou cascade : état initial → déclencheur → intermédiaires ordonnés → conséquence → résultat. Chaque flèche a une raison, et la logique s’apprend avant les noms.',
    categories: ['structurer', 'comprendre', 'representer'],
    subjects: ['biocell', 'biochimie', 'medicament'],
    infoTypes: ['mecanisme'],
    problems: ['comprends-pas', 'oublie', 'melange'],
    aliases: [
      'chaîne causale',
      'chaine causale',
      'mécanisme',
      'mecanisme',
      'voie',
      'cascade',
      'signalisation',
      'activation',
      'inhibition',
      'cause conséquence',
      'voie de signalisation',
    ],
    keywords: ['déclencheur', 'intermédiaires', 'phosphorylation', 'régulation', 'protéines', 'transduction'],
    tags: ['mécanisme'],
    whenToUse: [
      'Pour une voie, une signalisation, une régulation ou toute relation cause → conséquence.',
    ],
    avoid: [
      'Ne confonds pas ordre et causalité : chaque flèche doit avoir une raison, pas seulement une position.',
    ],
    quickSteps: [
      'Définis l’état initial.',
      'Identifie le déclencheur.',
      'Place les intermédiaires dans l’ordre.',
      'Nomme le type de chaque relation : active, inhibe, transporte, phosphoryle…',
      'Définis la conséquence et le résultat.',
      'Perturbe une étape.',
    ],
    procedure: [
      {
        text: 'Définir l’état initial.',
        detail: 'Où en est le système avant que rien ne se passe ? Quel compartiment, quel état ?',
        micro: ['Écris une ligne : lieu, acteurs présents, état (actif / inactif) avant le signal.'],
      },
      { text: 'Identifier le déclencheur.' },
      {
        text: 'Placer les intermédiaires dans l’ordre.',
        detail: 'D’abord la logique de la chaîne, ensuite seulement les noms exacts.',
        micro: [
          'Dessine d’abord des cases vides reliées par des flèches : la logique sans les noms.',
          'Remplis ensuite les cases avec les noms exacts, un par un.',
        ],
      },
      {
        text: 'Nommer le type de relation : active, inhibe, transporte, phosphoryle…',
        micro: ['Étiquette chaque flèche avec son verbe — une flèche muette est une flèche non comprise.'],
      },
      { text: 'Définir la conséquence et le résultat.' },
      {
        text: 'Perturber une étape.',
        detail: 'Acteur absent, bloqué, surexprimé : que devient la sortie ? (voir Perturbations « si… alors… »)',
        micro: ['Choisis un maillon, barre-le, écris la conséquence immédiate puis la conséquence secondaire.'],
      },
    ],
    example:
      'Voie de signalisation : ligand → récepteur → protéine relais → effecteur → réponse cellulaire. La logique d’abord, puis les noms exacts de chaque acteur, testés séparément.',
    personal: [
      'Sépare la logique des étiquettes : tu peux bien retenir la chaîne tout en mélangeant les noms. Reteste les noms exacts à distance.',
    ],
    anki: {
      yes: ['Les étiquettes fragiles : noms exacts des intermédiaires, couples acteur-fonction (cartes de contraste si deux voies se ressemblent).'],
      no: ['La chaîne entière : sa logique se reteste en feuille blanche et en perturbations.'],
    },
    mastery: [
      'Tu peux expliquer chaque transition et prédire un blocage.',
    ],
    whyItWorks:
      'Une voie apprise comme une suite de mots se récite ; une voie apprise comme une chaîne de causes se reconstruit — et résiste aux questions qui changent le point d’entrée.',
    next: { id: 'perturbations', label: 'Bloque un maillon et prédis : le test qui prouve que ce n’est pas une poésie.' },
    related: ['perturbations', 'tableau-contraste', 'feynman', 'reconstruction-schema', 'carte-contraste'],
    source: 'Source V2 — §6 Bibliothèque, p. 14',
    forMe: true,
  },
  {
    id: 'perturbations',
    title: 'Perturbation « si… alors… »',
    subtitle: 'Transfert · Mécanisme',
    summary:
      'Supprime, bloque ou amplifie un acteur de la chaîne et prédis la conséquence. Si tu ne peux prédire qu’en récitant tout, la chaîne est apprise comme une poésie.',
    categories: ['appliquer', 'se-tester', 'comprendre'],
    subjects: ['biocell', 'biochimie', 'biophysique', 'medicament'],
    infoTypes: ['mecanisme', 'experience'],
    problems: ['verifier-maitrise', 'applique-pas', 'comprends-pas'],
    aliases: [
      'perturbation',
      'perturbations',
      'si alors',
      'si x manque',
      'si inhibé',
      'si augmente',
      'et si on bloque',
      'transfert mécanisme',
    ],
    keywords: ['prédiction', 'blocage', 'knockout', 'conséquence', 'transfert'],
    tags: ['transfert'],
    whenToUse: [
      'Après avoir compris une chaîne, pour vérifier qu’elle n’est pas récitée comme une poésie.',
    ],
    avoid: [
      'N’invente pas des perturbations nécessitant des connaissances hors poly.',
    ],
    quickSteps: [
      'Choisis un acteur ou une variable.',
      'Supprime-le, inhibe-le, augmente-le ou change son compartiment.',
      'Prédis la conséquence immédiate.',
      'Puis la conséquence secondaire.',
      'Compare au modèle.',
    ],
    procedure: [
      { text: 'Choisir un acteur ou une variable.', micro: ['Prends ta chaîne écrite et entoure un acteur — au hasard, pas le plus facile.'] },
      { text: 'Le supprimer, l’inhiber, l’augmenter ou changer son compartiment selon le cours.' },
      {
        text: 'Prédire la conséquence immédiate.',
        micro: ['Écris ta prédiction AVANT toute vérification : « alors… », en une ligne.'],
      },
      { text: 'Puis la conséquence secondaire.', micro: ['Continue la chaîne : « et donc… », jusqu’à la sortie du système.'] },
      { text: 'Comparer au modèle.' },
    ],
    example:
      '« Si cette kinase est inhibée, que devient la réponse en aval ? » — réponse attendue sans réciter la voie entière.',
    mastery: [
      'Tu peux prédire sans réciter toute la chaîne.',
    ],
    whyItWorks:
      'Prédire la conséquence d’un blocage oblige à utiliser la causalité, pas l’ordre appris — c’est exactement la forme des questions de transfert en QCM.',
    next: { id: 'rappel-differe', label: 'Refais deux perturbations dans quelques jours, sans relire la voie.' },
    related: ['chaine-causale', 'auto-explication', 'variation', 'qcm-actif'],
    source: 'Source V2 — §6 Bibliothèque, p. 14-15',
  },
  {
    id: 'tableau-contraste',
    title: 'Tableau de contraste A/B',
    subtitle: 'Discrimination · Anti-confusion',
    summary:
      'Dès que deux notions se mélangent : mets-les côte à côte, choisis 3 à 6 dimensions qui les distinguent, identifie le « discriminant roi », puis alterne des questions A/B.',
    categories: ['structurer', 'corriger', 'se-tester'],
    subjects: ['biocell', 'biochimie', 'medicament', 'sante-publique', 'histologie'],
    infoTypes: ['notions-proches', 'tableau'],
    problems: ['melange'],
    aliases: [
      'je confonds',
      'je mélange',
      'je melange',
      'a vs b',
      'a/b',
      'anti confusion',
      'anti-confusion',
      'discriminant',
      'deux notions proches',
      'tableau comparatif',
      'protéines proches',
      'interférence',
      'différence entre',
    ],
    keywords: ['contraste', 'comparaison', 'dimensions', 'discriminant roi', 'confusion'],
    tags: ['anti-confusion', 'prioritaire'],
    whenToUse: [
      'Dès que deux notions, molécules, voies, modèles ou structures commencent à se mélanger.',
    ],
    avoid: [
      'Ne fais pas un tableau de 20 lignes : garde uniquement les dimensions qui discriminent.',
    ],
    quickSteps: [
      'Mets A et B côte à côte.',
      'Choisis 3 à 6 dimensions discriminantes.',
      'Identifie le « discriminant roi ».',
      'Produis A puis B sans support.',
      'Alterne des questions A/B.',
      'Crée éventuellement une carte de contraste.',
    ],
    procedure: [
      {
        text: 'Mettre A et B côte à côte.',
        detail: 'Arrête l’apprentissage séparé : c’est la comparaison directe qui désamorce l’interférence.',
        micro: ['Trace deux colonnes A et B sur une page ; remplis-les à livre ouvert cette première fois.'],
      },
      {
        text: 'Choisir 3 à 6 dimensions discriminantes.',
        micro: [
          'Garde les lignes qui séparent vraiment A de B : localisation, activateur, cible, effet…',
          'Supprime toute ligne où A et B sont identiques : elle n’aide pas à trancher.',
        ],
      },
      {
        text: 'Identifier le « discriminant roi ».',
        detail: 'LE critère qui tranche à coup sûr, celui que tu vérifieras en premier en QCM.',
        micro: ['Entoure cette ligne — c’est elle que tu réciteras en premier à chaque confusion.'],
      },
      {
        text: 'Produire A puis B sans support.',
        micro: ['Ferme, refais le tableau de mémoire : colonne A complète, puis colonne B.'],
      },
      {
        text: 'Alterner des questions A/B.',
        micro: ['Fais-toi six questions en alternance aléatoire : « ceci : A ou B ? pourquoi ? »'],
      },
      { text: 'Créer éventuellement une carte de contraste.', detail: 'Une carte Anki qui teste le critère qui tranche (voir Carte piège / contraste).' },
    ],
    example:
      'Deux protéines de voies voisines qui se mélangent : tableau à 4 lignes (localisation, activateur, cible, effet), discriminant roi = la cible, puis questions alternées.',
    personal: [
      'Prioritaire pour toi à cause de l’interférence observée entre noms de mécanismes proches.',
    ],
    anki: {
      yes: ['Le discriminant roi sous forme de carte piège / contraste.'],
      no: ['Le tableau entier recopié dans une seule carte.'],
    },
    mastery: [
      'Tu peux justifier rapidement pourquoi un item est A et pas B.',
    ],
    whyItWorks:
      'L’interférence naît de l’apprentissage séparé de notions semblables ; la comparaison directe fait ressortir ce qui les distingue, et le « discriminant roi » devient ton réflexe de vérification en QCM.',
    next: { id: 'carte-contraste', label: 'Fixe le discriminant roi dans une carte piège / contraste.' },
    related: ['carte-contraste', 'interleaving', 'chaine-causale', 'qcm-actif'],
    source: 'Source V2 — §6 Bibliothèque, p. 15',
    forMe: true,
  },
  {
    id: 'frise-chronologique',
    title: 'Frise chronologique',
    subtitle: 'Séquence · Embryologie · Processus',
    summary:
      'Quand l’ordre et les transformations comptent : place les événements, écris « ce qui change » sur chaque flèche, reconstruis de mémoire, puis teste une inversion.',
    categories: ['structurer', 'representer', 'memoriser'],
    subjects: ['embryologie', 'histologie', 'biocell'],
    infoTypes: ['chronologie', 'liste-ordonnee'],
    problems: ['oublie', 'melange'],
    aliases: ['frise', 'frise chronologique', 'chronologie', 'ordre', 'timeline', 'avant après', 'étapes dans l’ordre'],
    keywords: ['séquence', 'transformation', 'stades', 'étapes', 'temps'],
    tags: ['séquence'],
    whenToUse: [
      'Quand l’ordre et les transformations temporelles comptent.',
    ],
    avoid: [
      'Ne mémorise pas seulement des dates sans comprendre ce qui change entre les étapes.',
    ],
    quickSteps: [
      'Place l’état initial.',
      'Ajoute les événements majeurs.',
      'Écris « ce qui change » sur chaque flèche.',
      'Relie chaque transformation à son résultat.',
      'Reconstruis de mémoire.',
      'Teste une inversion ou un décalage.',
    ],
    procedure: [
      { text: 'Placer l’état initial.', micro: ['Ligne horizontale, état de départ à gauche, en un mot.'] },
      { text: 'Ajouter les événements majeurs.' },
      {
        text: 'Pour chaque flèche écrire « ce qui change ».',
        detail: 'La flèche porte la transformation, pas seulement l’ordre.',
        micro: ['Au-dessus de chaque flèche, un verbe de transformation : se creuse, migre, fusionne, se ferme…'],
      },
      { text: 'Relier chaque transformation à son résultat.' },
      { text: 'Reconstruire de mémoire.', micro: ['Ferme, retrace la frise entière — événements, flèches ET verbes.'] },
      {
        text: 'Tester une inversion ou un décalage.',
        detail: '« Que se passe-t-il si cette étape est retardée ? » — le test de compréhension de la séquence.',
        micro: ['Choisis une étape et réponds par écrit : « si elle est retardée ou absente, alors… »'],
      },
    ],
    example:
      'Semaine de développement embryonnaire : chaque flèche porte la transformation (« se creuse », « migre », « fusionne »), pas juste un numéro de jour.',
    personal: [
      'Ton ordre immédiat est bon ; le défi est la rétention différée des détails, donc re-teste la frise à distance.',
    ],
    anki: {
      yes: ['Dates, dérivés, noms et associations arbitraires accrochés à la frise.'],
      no: ['La frise entière dans une seule carte.'],
    },
    mastery: [
      'Tu peux reconstruire l’ordre et expliquer les transformations.',
    ],
    next: { id: 'rappel-differe', label: 'Reteste l’ordre à distance : c’est lui qui glisse en différé.' },
    related: ['histoire-chainage', 'reconstruction-schema', 'rappel-differe', 'chaine-causale'],
    source: 'Source V2 — §6 Bibliothèque, p. 15-16',
  },
  {
    id: 'double-representation',
    title: 'Double représentation : mots + schéma',
    subtitle: 'Représentation · Compréhension',
    summary:
      'Écris l’idée en une phrase ET dessine la relation en schéma minimal. Masque l’un, reconstruis l’autre : chaque format doit pouvoir régénérer l’autre.',
    categories: ['representer', 'comprendre'],
    subjects: ['biophysique', 'physique', 'biocell'],
    infoTypes: ['mecanisme', 'schema', 'formule'],
    problems: ['comprends-pas', 'oublie'],
    aliases: ['dual coding', 'double codage', 'mots plus schéma', 'mots et schéma', 'diagramme', 'texte et dessin'],
    keywords: ['représentation', 'verbal', 'spatial', 'schéma minimal'],
    tags: ['double codage'],
    whenToUse: [
      'Quand une information possède à la fois une structure verbale et spatiale/causale.',
    ],
    avoid: [
      'N’ajoute pas une image décorative qui n’apporte aucune relation utile.',
    ],
    quickSteps: [
      'Écris l’idée en une phrase.',
      'Construis un schéma minimal qui montre la relation.',
      'Aligne les mêmes concepts dans les deux formats.',
      'Masque l’un et reconstruis l’autre.',
      'Teste sur une formulation nouvelle.',
    ],
    procedure: [
      { text: 'Écrire l’idée en une phrase.', micro: ['Une phrase complète, avec les termes exacts du poly.'] },
      {
        text: 'Construire un schéma minimal qui montre la relation.',
        micro: ['Trois formes maximum : boîtes, flèches, axes. C’est un outil, pas un dessin.'],
      },
      { text: 'Aligner les mêmes concepts dans les deux formats.', micro: ['Chaque mot-clé de la phrase doit se retrouver quelque part sur le schéma.'] },
      {
        text: 'Masquer l’un et reconstruire l’autre.',
        micro: ['Cache la phrase et redis-la depuis le schéma ; puis cache le schéma et retrace-le depuis la phrase.'],
      },
      { text: 'Tester sur une formulation nouvelle.' },
    ],
    mastery: [
      'Chaque représentation peut reconstruire l’autre.',
    ],
    example:
      'Potentiel d’action : la phrase (« dépolarisation puis repolarisation par… ») ET la courbe tracée à main levée. Cache la courbe, redonne la phrase — et inversement.',
    next: { id: 'rappel-differe', label: 'Masque un format et régénère l’autre, quelques jours plus tard.' },
    related: ['reconstruction-schema', 'carte-conceptuelle', 'chaine-causale'],
    source: 'Source V2 — §6 Bibliothèque, p. 19',
  },
];
