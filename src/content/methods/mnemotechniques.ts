import type { Method } from '../types';

/**
 * Mnémotechniques : des crochets ciblés pour l'arbitraire.
 * Règle personnalisée n°6 (Source V2, §2) : ne jamais les industrialiser.
 */
export const mnemotechniquesMethods: Method[] = [
  {
    id: 'imagerie-interactive',
    title: 'Imagerie mentale interactive',
    subtitle: 'Mnémotechnique · Associations arbitraires · Très adaptée',
    summary:
      'Transforme les deux éléments d’une association arbitraire en images concrètes qui interagissent de façon exagérée. Le levier le plus net observé dans ton profil — à utiliser de façon ciblée.',
    categories: ['mnemotechniques', 'memoriser'],
    subjects: ['biocell', 'biochimie', 'anatomie'],
    infoTypes: ['association-arbitraire', 'nom-arbitraire', 'liste-non-ordonnee'],
    problems: ['oublie', 'reconnais-seulement'],
    aliases: [
      'image mentale',
      'imagerie',
      'visualisation',
      'association image',
      'ça rentre pas nom',
      'mémoire visuelle',
      'imagerie interactive',
      'image bizarre',
    ],
    keywords: ['association', 'arbitraire', 'concret', 'interaction', 'mnémotechnique'],
    tags: ['très adaptée', 'ciblée'],
    whenToUse: [
      'Pour une association arbitraire, un nom qui résiste, un couple terme-fonction ou une liste difficile à accrocher.',
    ],
    avoid: [
      'Ne crée pas une histoire complexe pour une relation qu’on peut comprendre : le coût doit rester inférieur au gain.',
    ],
    quickSteps: [
      'Transforme les deux éléments en images concrètes.',
      'Fais-les interagir de façon exagérée.',
      'Vérifie que l’image mène sans ambiguïté à la cible.',
      'Rappelle sans regarder.',
      'Reteste plus tard.',
    ],
    procedure: [
      {
        text: 'Transformer les deux éléments en images concrètes.',
        micro: ['Prends la première image concrète que chaque élément t’évoque — la première est en général la bonne.'],
      },
      {
        text: 'Les faire interagir de façon exagérée.',
        detail: 'L’interaction (choc, fusion, action) accroche mieux que deux images posées côte à côte.',
        micro: ['Fais-les se percuter, se transformer, agir l’une sur l’autre — une action, pas une juxtaposition.'],
      },
      {
        text: 'Vérifier que l’image mène sans ambiguïté à la cible.',
        detail: 'Règle personnalisée : l’association n’est valable que si elle rappelle la cible sans hésitation possible.',
        micro: ['Test immédiat : depuis l’image, redonnes-tu LE terme exact, sans hésiter entre deux candidats ?'],
      },
      { text: 'Rappeler sans regarder.' },
      { text: 'Retester plus tard.' },
    ],
    example:
      'Un transporteur membranaire au nom opaque : donne-lui une image (un portier) qui exécute sa fonction (fait passer le glucose) — puis vérifie que l’image redonne le nom exact.',
    personal: [
      'C’est le levier le plus net observé dans ton test. Utilise-le de façon ciblée, pas sur chaque phrase.',
    ],
    anki: {
      yes: ['L’association une fois créée : une carte qui demande la cible exacte (l’image reste dans ta tête, pas au recto).'],
      no: ['Les relations compréhensibles : comprendre coûte moins cher qu’une image artificielle.'],
    },
    mastery: [
      'L’image déclenche la bonne information et ne crée pas de confusion.',
    ],
    limits: [
      'Une mnémotechnique est un crochet pour l’arbitraire, pas une façon de remplacer une relation compréhensible.',
    ],
    whyItWorks:
      'Quand rien ne relie logiquement deux éléments, une interaction imagée fabrique l’indice de récupération qui manque — d’où sa force sur l’arbitraire, et son inutilité sur le compréhensible.',
    next: { id: 'rappel-differe', label: 'Vérifie que l’image redonne la cible exacte, à distance.' },
    related: ['association-phonetique', 'histoire-chainage', 'palais-mental', 'carte-qr'],
    source: 'Source V2 — §6 Bibliothèque, p. 16-17',
    forMe: true,
  },
  {
    id: 'association-phonetique',
    title: 'Association phonétique',
    subtitle: 'Mnémotechnique · Noms',
    summary:
      'Trouve une sonorité familière proche du nom arbitraire, relie-la à la fonction par une petite scène — puis répète et reteste le terme scientifique exact, pas le surnom.',
    categories: ['mnemotechniques', 'memoriser'],
    subjects: ['biocell', 'biochimie', 'medicament'],
    infoTypes: ['nom-arbitraire', 'association-arbitraire'],
    problems: ['oublie'],
    aliases: [
      'phonétique',
      'sonorité',
      'nom protéine',
      'nom arbitraire',
      'mnémo',
      'mnemo',
      'mnémotechnique',
      'moyen mnémotechnique',
      'ça ressemble à',
    ],
    keywords: ['son', 'ressemblance', 'indice', 'nom', 'terme exact'],
    tags: ['ciblée'],
    whenToUse: [
      'Pour transformer un nom arbitraire en indice familier, surtout s’il ressemble à un mot ou un personnage connu.',
    ],
    avoid: [
      'Ne choisis pas un indice phonétique trop éloigné ou partagé par plusieurs cibles : il rappellerait n’importe laquelle.',
    ],
    quickSteps: [
      'Trouve une sonorité proche.',
      'Crée une image ou une action courte qui relie cet indice à la fonction.',
      'Répète la cible scientifique exacte.',
      'Reteste sans l’indice écrit.',
    ],
    procedure: [
      {
        text: 'Trouver une sonorité proche.',
        micro: ['Dis le nom à voix haute deux ou trois fois : quel mot familier entends-tu dedans ?'],
      },
      { text: 'Créer une image / action courte qui relie cet indice à la fonction.' },
      {
        text: 'Répéter la cible scientifique exacte.',
        detail: 'Le surnom n’est qu’un pont : c’est le terme exact qui sera exigé.',
        micro: ['Redis trois fois le terme scientifique complet — orthographe comprise si elle est piégeuse.'],
      },
      { text: 'Retester sans l’indice écrit.' },
    ],
    personal: [
      'Tu l’utilises spontanément (sonorité + scène), ce qui la rend peu coûteuse chez toi.',
    ],
    mastery: [
      'Tu rappelles le terme exact, pas seulement l’image ou le surnom.',
    ],
    limits: [
      'Toute information ne mérite pas une mnémotechnique : si la relation est compréhensible, comprendre coûte souvent moins cher.',
    ],
    example:
      'Un nom d’enzyme qui sonne comme un mot familier : construis une mini-scène où ce mot exécute la fonction de l’enzyme — puis récite le nom scientifique exact, pas le surnom.',
    next: { id: 'rappel-differe', label: 'Reteste le terme exact sans l’indice écrit.' },
    related: ['imagerie-interactive', 'carte-qr', 'rappel-differe'],
    source: 'Source V2 — §6 Bibliothèque, p. 17',
  },
  {
    id: 'acronyme',
    title: 'Acronyme / Acrostiche',
    subtitle: 'Mnémotechnique · Listes',
    summary:
      'Pour une petite liste arbitraire où ordre ou exhaustivité comptent : forme un mot ou une phrase avec les initiales, une lettre = un item, et reteste l’exhaustivité.',
    categories: ['mnemotechniques', 'memoriser'],
    subjects: ['anatomie', 'sante-publique'],
    infoTypes: ['liste-ordonnee', 'liste-non-ordonnee'],
    problems: ['oublie'],
    aliases: ['acronyme', 'acrostiche', 'initiales', 'liste par coeur', 'liste par cœur', 'moyen pour liste'],
    keywords: ['liste', 'lettres', 'exhaustivité', 'ordre'],
    tags: ['listes'],
    whenToUse: [
      'Pour une petite liste arbitraire lorsque l’ordre ou l’exhaustivité compte.',
    ],
    avoid: [
      'Si l’acronyme est plus dur à mémoriser que la liste, ou si l’ordre n’a aucune importance, il ne sert à rien.',
    ],
    quickSteps: [
      'Extrais les initiales.',
      'Forme un mot ou une phrase courte.',
      'Associe chaque lettre à un seul item.',
      'Rappelle la liste sans support.',
      'Reteste l’exhaustivité.',
    ],
    procedure: [
      { text: 'Extraire les initiales.' },
      {
        text: 'Former un mot ou une phrase courte.',
        micro: ['Si rien ne sort en deux minutes, abandonne l’acronyme : la liste brute coûtera moins cher.'],
      },
      { text: 'Associer chaque lettre à un seul item.', detail: 'Une lettre qui peut rappeler deux items différents créera une confusion.' },
      {
        text: 'Rappeler la liste sans support.',
        micro: ['Récite en développant chaque lettre en item complet — pas seulement l’acronyme.'],
      },
      {
        text: 'Retester l’exhaustivité.',
        detail: 'Le risque des listes : l’omission silencieuse. Compte les items.',
        micro: ['Compte à chaque récitation : huit attendus, huit récités.'],
      },
    ],
    mastery: [
      'L’acronyme rappelle toute la liste sans omission ni permutation importante.',
    ],
    example:
      'Huit os du carpe à donner dans l’ordre : une phrase dont chaque initiale rappelle un os — puis récitation complète et comptage (huit, pas sept).',
    next: { id: 'rappel-differe', label: 'Reteste l’exhaustivité à distance : l’omission est silencieuse.' },
    related: ['histoire-chainage', 'chunking', 'palais-mental'],
    source: 'Source V2 — §6 Bibliothèque, p. 17-18',
  },
  {
    id: 'histoire-chainage',
    title: 'Histoire / Chaînage narratif',
    subtitle: 'Mnémotechnique · Ordre',
    summary:
      'Pour une petite suite arbitraire ordonnée : transforme chaque item en image et enchaîne-les dans une histoire courte et étrange, où chacun appelle le suivant.',
    categories: ['mnemotechniques', 'memoriser'],
    subjects: ['embryologie', 'anatomie'],
    infoTypes: ['liste-ordonnee', 'association-arbitraire'],
    problems: ['oublie'],
    aliases: ['histoire', 'chaînage', 'chainage', 'story method', 'ordre liste', 'histoire pour retenir'],
    keywords: ['narration', 'suite', 'ordre', 'images'],
    tags: ['ordre'],
    whenToUse: [
      'Pour une petite suite arbitraire où l’ordre doit être conservé.',
    ],
    avoid: [
      'Ne raconte pas une histoire pour un mécanisme causal réel : comprendre la causalité est meilleur.',
    ],
    quickSteps: [
      'Transforme chaque item en image.',
      'Crée une interaction de l’un au suivant.',
      'Garde l’histoire courte et étrange.',
      'Récite la suite.',
      'Reteste plus tard.',
    ],
    procedure: [
      { text: 'Transformer chaque item en image.' },
      {
        text: 'Créer une interaction de l’un au suivant.',
        micro: ['Chaque image doit DÉCLENCHER la suivante par son action — sinon c’est une liste déguisée.'],
      },
      { text: 'Garder l’histoire courte et étrange.', detail: 'L’étrangeté accroche ; la longueur coûte.' },
      { text: 'Réciter la suite.', micro: ['Récite les items réels, pas les images : l’histoire est l’échafaudage, pas la réponse.'] },
      { text: 'Retester plus tard.' },
    ],
    mastery: [
      'L’histoire restitue l’ordre sans ajouter d’éléments faux.',
    ],
    example:
      'Une suite de stades à garder dans l’ordre : chaque stade devient une image, chaque image déclenche la suivante — histoire courte, étrange, et récitée sans support.',
    next: { id: 'rappel-differe', label: 'Récite la suite complète dans quelques jours.' },
    related: ['imagerie-interactive', 'acronyme', 'frise-chronologique', 'palais-mental'],
    source: 'Source V2 — §6 Bibliothèque, p. 18',
  },
  {
    id: 'palais-mental',
    title: 'Palais mental / Méthode des loci',
    subtitle: 'Mnémotechnique · Listes longues',
    summary:
      'Place une image interactive par étape d’un trajet très familier, puis parcours-le mentalement pour rappeler. Puissant mais coûteux : réserve-le aux listes longues, stables et vraiment importantes.',
    categories: ['mnemotechniques', 'memoriser'],
    subjects: ['anatomie'],
    infoTypes: ['liste-ordonnee', 'liste-non-ordonnee', 'association-arbitraire'],
    problems: ['oublie'],
    aliases: [
      'palais mental',
      'loci',
      'méthode des loci',
      'memory palace',
      'trajet mental',
      'palais de mémoire',
    ],
    keywords: ['spatial', 'trajet', 'lieux', 'parcours', 'liste longue'],
    tags: ['coût élevé'],
    whenToUse: [
      'Pour une liste arbitraire plus longue, stable et vraiment importante, lorsque l’imagerie spatiale est rentable.',
    ],
    avoid: [
      'Coût de création élevé : évite pour des détails à faible rendement ou des mécanismes compréhensibles.',
    ],
    quickSteps: [
      'Choisis un trajet très familier.',
      'Définis des loci fixes dans l’ordre.',
      'Place une image interactive par locus.',
      'Parcours mentalement le trajet pour rappeler.',
      'Reteste dans le sens normal, puis éventuellement inverse.',
    ],
    procedure: [
      { text: 'Choisir un trajet très familier.', detail: 'Ta chambre, ton trajet vers la fac : des lieux que tu peux parcourir les yeux fermés.' },
      {
        text: 'Définir des loci fixes dans l’ordre.',
        micro: ['Liste 8 à 12 points dans l’ordre de marche (porte, escalier, arrêt de bus…) — toujours les mêmes.'],
      },
      {
        text: 'Placer une image interactive par locus.',
        detail: 'Même règle que l’imagerie interactive : l’image doit mener sans ambiguïté à la cible.',
        micro: ['L’élément AGIT sur le lieu (il bloque la porte, inonde l’escalier…) — pas posé dessus.'],
      },
      {
        text: 'Parcourir mentalement le trajet pour rappeler.',
        micro: ['Ferme les yeux, avance station par station, nomme l’item exact à chacune.'],
      },
      { text: 'Retester dans le sens normal puis éventuellement inverse.' },
    ],
    personal: [
      'Ton imagerie est forte, donc cette méthode peut fonctionner — mais seulement pour des ensembles à forte valeur.',
    ],
    mastery: [
      'Tu récupères la liste sans dépendre du support et sans confusion entre loci.',
    ],
    limits: [
      'Ne remplace jamais la compréhension d’un mécanisme : c’est un rangement pour l’arbitraire.',
    ],
    example:
      'Ton trajet vers la fac, dix repères fixes : un par élément d’une liste longue à forte valeur (classification exigée par le poly, par exemple) — puis parcours mental complet.',
    next: { id: 'rappel-differe', label: 'Refais le parcours mental à distance, dans les deux sens.' },
    related: ['imagerie-interactive', 'histoire-chainage', 'acronyme'],
    source: 'Source V2 — §6 Bibliothèque, p. 18-19',
  },
];
