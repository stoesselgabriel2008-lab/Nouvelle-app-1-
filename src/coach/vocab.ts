/**
 * Le vocabulaire maximal d'Axel — trois couches :
 *
 * 1. SLANG : traduction du langage étudiant/SMS vers le français canonique,
 *    appliquée AVANT toute analyse (« jpp de l anat » → « j en peux plus de
 *    l anatomie »). Une entrée = un token normalisé (sans accents).
 * 2. CONCEPTS : une idée → toutes ses façons de la dire. Les intentions s'y
 *    abonnent (INTENT_CONCEPTS) : dire « ça s'imprime pas » touche le concept
 *    « oublier » qui pousse l'intention mémoire, sans mot-clé dédié.
 * 3. EXTRA_TRIGGERS : déclencheurs supplémentaires par intention, fusionnés
 *    avec la base au chargement (grossit la couverture sans réécrire kb.ts).
 *
 * Tout est en forme normalisée : minuscules, sans accents (test verrouillé).
 */

/** Token argot/SMS → remplacement canonique (peut être plusieurs mots). */
export const SLANG: Record<string, string> = {
  // pronoms / verbes contractés
  jsuis: 'je suis', chuis: 'je suis', chui: 'je suis', jsui: 'je suis',
  jetais: 'j etais', jai: 'j ai', javais: 'j avais', jarrive: 'j arrive',
  jarrete: 'j arrete', jcomprends: 'je comprends', jcomprend: 'je comprends',
  jconnais: 'je connais', jpense: 'je pense', jveux: 'je veux', jveu: 'je veux',
  jpeux: 'je peux', jpeut: 'je peux', jdois: 'je dois', jfais: 'je fais',
  jfait: 'je fais', jvais: 'je vais', jvai: 'je vais', jme: 'je me',
  jm: 'je me', jte: 'je te', tes: 't es', cest: 'c est', sest: 's est',
  jsais: 'je sais', chais: 'je sais', chai: 'je sais',
  ya: 'il y a', yavait: 'il y avait',
  // expressions
  jsp: 'je sais pas', jpp: 'j en peux plus', jenpeuxplus: 'j en peux plus',
  oklm: 'tranquille', flm: 'flemme', flem: 'flemme', askip: 'apparemment', osef: 'peu importe',
  blase: 'demotive', blasee: 'demotive',
  // abréviations SMS
  bcp: 'beaucoup', tt: 'tout', tte: 'toute', tts: 'tous', ts: 'tous',
  tjrs: 'toujours', tjs: 'toujours', tjr: 'toujours',
  pk: 'pourquoi', pq: 'pourquoi', prk: 'pourquoi',
  qd: 'quand', qq: 'quelque', qqch: 'quelque chose', qqc: 'quelque chose',
  qqn: 'quelqu un', dsl: 'desole', stp: 's il te plait', svp: 's il vous plait',
  vrmt: 'vraiment', vrm: 'vraiment', grv: 'grave', trkl: 'tranquille',
  tkt: 't inquiete', dcp: 'du coup', mtn: 'maintenant', auj: 'aujourd hui',
  ajd: 'aujourd hui', bjr: 'bonjour', bsr: 'bonsoir', slt: 'salut',
  cc: 'coucou', mdr: 'drole', ptdr: 'drole', lol: 'drole',
  nn: 'non', oe: 'ouais', wai: 'ouais', ui: 'oui', vs: 'vous',
  ns: 'nous', ms: 'mais', ds: 'dans', pr: 'pour', sn: 'sinon',
  ql: 'quel', qlq: 'quelque', bx: 'beaux', nv: 'niveau', pb: 'probleme',
  pbs: 'problemes', prob: 'probleme', probleme: 'probleme',
  rdv: 'rendez vous', wk: 'week end', we: 'week end',
  // études — « bu » reste ambigu (bibliothèque / boire) : on ne le traduit
  // PAS, les phrases décident (« a la bu » vs « trop bu »).
  fac: 'fac', bibli: 'bibliotheque',
  memo: 'mnemotechnique', flashcards: 'flashcard', qcms: 'qcm',
  chapitres: 'chapitre', chap: 'chapitre', exo: 'exercice', exos: 'exercices',
  ed: 'exercice dirige', cm: 'cours magistral', tp: 'travaux pratiques',
  kholle: 'colle', kholles: 'colles', partiels: 'partiel',
  // renforts
  jamais: 'jamais', ftg: 'silence', mm: 'meme', mnt: 'maintenant',
  pcq: 'parce que', pck: 'parce que', psk: 'parce que', parceque: 'parce que',
  ptn: 'zut', pff: 'zut', pfff: 'zut', rah: 'zut', raah: 'zut',
  cv: 'ca va', cava: 'ca va', bg: 'sympa',
  // v3 — SMS ultra-court (une lettre vaut un mot)
  g: 'j ai', c: 'c est', ct: 'c etait', cetait: 'c etait', pa: 'pas',
  ke: 'que', ki: 'qui', koi: 'quoi', kan: 'quand', keske: 'qu est ce que',
  kesk: 'qu est ce que', kel: 'quel', kelle: 'quelle',
  // v3 — contractions de verbes
  jcrois: 'je crois', jtrouve: 'je trouve', jgalere: 'je galere',
  jstresse: 'je stresse', jbosse: 'je bosse', jdors: 'je dors',
  jrevise: 'je revise', jrate: 'je rate', joublie: 'j oublie',
  jretiens: 'je retiens', jprocrastine: 'je procrastine', jv: 'je vais',
  jvx: 'je veux', jpx: 'je peux', jcapte: 'je capte', jpige: 'je pige',
  // v3 — argot courant
  vnr: 'enerve', nrv: 'enerve', seum: 'degoute', chelou: 'bizarre',
  cimer: 'merci', wallah: 'vraiment', nan: 'non', ouai: 'ouais',
  yep: 'oui', nope: 'non', vla: 'voila', tro: 'trop', deg: 'degoute',
  frr: 'frere', frero: 'frere', poto: 'ami', tmtc: 'tu sais',
  mdrr: 'drole', mdrrr: 'drole', ptdrr: 'drole', dodo: 'dormir',
  // v3 — abréviations supplémentaires
  pkoi: 'pourquoi', prq: 'pourquoi', aprem: 'apres midi', apm: 'apres midi',
  ojd: 'aujourd hui', qqun: 'quelqu un', kelkun: 'quelqu un',
  jms: 'jamais', lgtps: 'longtemps', lgt: 'longtemps', tlj: 'tous les jours',
  srx: 'serieux', vrmnt: 'vraiment', mtnt: 'maintenant', bn: 'bon',
  bne: 'bonne', slmt: 'seulement', qqs: 'quelques', ttes: 'toutes',
  toussa: 'tout ca',
};

/** Une idée → toutes ses formes (mots simples ET locutions, normalisés). */
export const CONCEPTS: Record<string, string[]> = {
  memoriser: [
    'retenir', 'memoriser', 'apprendre par coeur', 'rentrer dans la tete',
    'imprimer', 'assimiler', 'integrer', 'graver', 'enregistrer', 'ancrer',
    'faire rentrer', 'rester en tete', 'stocker',
  ],
  oublier: [
    'oublie', 'oublier', 'oublies', 'ressort pas', 's efface', 's envole',
    's evapore', 'rien ne reste', 'trou de memoire', 'me souviens plus',
    'souviens pas', 'rappelle plus', 'rappelle pas', 'passoire', 'imprime pas',
    'reste pas', 'retombe', 'disparait', 'part en fumee', 'memoire de poisson rouge',
    'zappe', 'zappes', 'sort de ma tete',
  ],
  travailler: [
    'bosser', 'taffer', 'reviser', 'etudier', 'charbonner', 'gratter',
    'travailler', 'plancher', 'grinder', 'reviser mes cours',
  ],
  bloquer: [
    'bloque', 'bloquee', 'coince', 'coincee', 'galere', 'rame', 'patauge',
    'a la ramasse', 'j y arrive pas', 'y arrive pas', 'n y arrive pas',
    'arrive a rien', 'impossible pour moi', 'ca passe pas', 'buge', 'bug',
  ],
  marre: [
    'marre', 'ras le bol', 'saoule', 'saoulee', 'soule', 'soulee', 'gonfle',
    'gonflee', 'insupportable', 'j en ai assez', 'me gave', 'relou', 'penible',
    'fatiguant', 'lassant', 'sature', 'saturee',
  ],
  triste: [
    'triste', 'moral a zero', 'moral dans les chaussettes', 'coup de mou',
    'pas le moral', 'moral en berne', 'demoralise', 'demoralisee', 'deprimant',
    'ca va pas fort', 'pas la forme', 'dur moralement', 'au fond du trou',
    'au bout de ma vie', 'plus le courage',
  ],
  vite: ['rapidement', 'vite', 'express', 'en urgence', 'au plus vite', 'dernier moment'],
  peur: ['peur', 'terrifie', 'terrifiee', 'flippe', 'flippee', 'angoissant', 'redoute', 'crains'],
  incomprehension: [
    'comprends pas', 'comprend pas', 'comprends rien', 'capte pas', 'capte rien',
    'pige pas', 'pige rien', 'suis pas', 'suis perdu', 'suis perdue', 'obscur',
    'flou', 'aucun sens', 'incomprehensible', 'imbitable', 'du chinois',
    'sais pas faire', 'trop complique', 'trop abstrait',
  ],
  echouer: [
    'rate', 'ratee', 'rates', 'rater', 'echoue', 'echouee', 'echouer', 'plante',
    'plantee', 'foire', 'foiree', 'loupe', 'loupee', 'louper', 'me viande',
    'casse la gueule', 'saque', 'mauvais resultat',
  ],
  reussir: ['reussir', 'reussis', 'progresser', 'm ameliorer', 'monter au classement', 'cartonner', 'majorer'],
  dormir: ['dormir', 'dors', 'sommeil', 'coucher', 'endormir', 'insomnie', 'mes nuits'],
  fatigue_c: ['fatigue', 'fatiguee', 'epuise', 'epuisee', 'creve', 'crevee', 'claque', 'claquee', 'mort de fatigue', 'plus d energie', 'a plat', 'lessive', 'lessivee', 'vide', 'nase', 'naze', 'hs'],
  distrait: [
    'distrait', 'distraite', 'deconcentre', 'deconcentree', 'dans la lune',
    'tete ailleurs', 'pense a autre chose', 'divague', 'decroche', 'zone',
    'procrastine sur le telephone',
  ],
  commencer_c: [
    'commencer', 'demarrer', 'lancer', 'm y mettre', 'my mettre', 's y mettre',
    'attaquer', 'entamer', 'me lancer', 'ouvrir mes cours', 'me mettre au travail',
    'motivation pour bosser',
  ],
  beaucoup_travail: [
    'trop de cours', 'trop de chapitres', 'trop de choses', 'montagne de travail',
    'charge enorme', 'des tonnes', 'une tonne', 'submerge', 'submergee',
    'deborde', 'debordee', 'noye', 'noyee', 'sous l eau', 'enorme quantite',
  ],
  stresser: [
    'stresse', 'stressee', 'angoisse', 'angoissee', 'anxieux', 'anxieuse',
    'boule au ventre', 'oppresse', 'oppressee', 'paniquer',
    'tendu', 'tendue', 'nerveux', 'nerveuse',
  ],
  colere_c: [
    'enerve', 'enervee', 'rage', 'fulmine', 'furax', 'furieux', 'furieuse',
    'agace', 'agacee', 'exaspere', 'exasperee', 'hors de moi', 'bouillonne',
  ],
  solitude_c: [
    'solitude', 'isolement', 'me sens seul', 'me sens seule', 'tout seul',
    'toute seule', 'esseule', 'esseulee',
  ],
  honte_c: [
    'honte', 'honteux', 'honteuse', 'coupable', 'm en veux', 'mauvaise conscience',
  ],
  ecran_c: [
    'ecran', 'ecrans', 'scroller', 'portable', 'smartphone', 'insta', 'reels',
    'shorts', 'notifs',
  ],
};

/** Intention → concepts qui la poussent (poids par toucher de concept). */
export const INTENT_CONCEPTS: Record<string, { c: string; w: number }[]> = {
  'ca-rentre-pas': [
    { c: 'oublier', w: 3 },
    { c: 'memoriser', w: 2 },
  ],
  procrastination: [{ c: 'commencer_c', w: 2 }, { c: 'distrait', w: 1 }],
  concentration: [{ c: 'distrait', w: 3 }],
  fatigue: [{ c: 'fatigue_c', w: 3 }],
  sommeil: [{ c: 'dormir', w: 2 }],
  retard: [{ c: 'beaucoup_travail', w: 3 }],
  stress: [{ c: 'stresser', w: 3 }, { c: 'peur', w: 2 }],
  'comprends-rien': [{ c: 'incomprehension', w: 3 }, { c: 'bloquer', w: 3 }],
  'note-ratee': [{ c: 'echouer', w: 2 }],
  ennui: [{ c: 'marre', w: 3 }],
  'moral-bas': [{ c: 'triste', w: 3 }, { c: 'marre', w: 1 }],
  'echeance-proche': [{ c: 'vite', w: 1 }],
  'progres-stagne': [{ c: 'reussir', w: 1 }],
  colere: [{ c: 'colere_c', w: 3 }],
  solitude: [{ c: 'solitude_c', w: 3 }],
  culpabilite: [{ c: 'honte_c', w: 3 }],
  'addiction-ecrans': [{ c: 'ecran_c', w: 2 }],
};

/** Concept → intention par défaut quand une matière est citée avec.
    (« l'anat + oublier » → mémoire, même sans autre mot-clé.) */
export const CONCEPT_DEFAULT_INTENT: Record<string, string> = {
  oublier: 'ca-rentre-pas',
  memoriser: 'ca-rentre-pas',
  incomprehension: 'comprends-rien',
  bloquer: 'comprends-rien',
  marre: 'ennui',
  echouer: 'note-ratee',
  beaucoup_travail: 'retard',
  triste: 'moral-bas',
  stresser: 'stress',
  fatigue_c: 'fatigue',
  commencer_c: 'procrastination',
  distrait: 'concentration',
  travailler: 'quelle-methode',
  colere_c: 'colere',
  solitude_c: 'solitude',
  honte_c: 'culpabilite',
  ecran_c: 'addiction-ecrans',
};

/** Déclencheurs supplémentaires par intention (fusionnés au chargement). */
export const EXTRA_TRIGGERS: Record<string, { strong?: string[]; weak?: string[] }> = {
  procrastination: {
    strong: [
      'repousse tout', 'je repousse', 'toujours plus tard', 'j y vais dans 5 minutes',
      'encore rien fait', 'rien fait aujourd hui', 'rien fait de la journee',
      'perdu ma journee', 'gache ma journee', 'pas ouvert un cours', 'pas encore bosse',
      'zero motivation', 'aucune motivation', 'plus de motivation', 'demotive',
      'pas envie de bosser', 'pas envie de reviser', 'la flemme', 'grosse flemme',
      'je glandouille', 'je traine sur', 'me bouger', 'coup de pied',
      'lance un truc', 'aide moi a commencer', 'faire le premier pas',
    ],
  },
  'ca-rentre-pas': {
    strong: [
      'ca rentre pas', 'rien ne rentre', 'ca veut pas rentrer', 'rentre pas dans ma tete',
      'ma memoire est nulle', 'aucune memoire', 'memoire horrible', 'tete comme une passoire',
      'je retiens que dalle', 'retiens rien du tout', 'ca tient pas', 'rien ne tient',
      'apprendre mes cours', 'connaitre mon cours', 'su par coeur et oublie',
    ],
  },
  'comprends-rien': {
    strong: [
      'rien compris', 'pas compris', 'j ai rien capte', 'capte rien', 'pige que dalle',
      'trop complexe pour moi', 'depasse par le cours', 'largue', 'larguee',
      'decroche en cours', 'plus rien ne suit', 'ca me depasse',
    ],
  },
  confusion: {
    strong: [
      'tout se ressemble', 'impossible de differencier', 'differencier', 'distinguer',
      'lesquels vont ensemble', 'inverse les deux', 'jumeaux', 'trop proches',
      'je swap les deux', 'confusion totale',
    ],
  },
  qcm: {
    strong: [
      'faux aux qcm', 'tombe toujours dans le panneau', 'items pieges', 'je coche faux',
      'hesite entre deux reponses', 'toujours la mauvaise reponse', 'zero aux qcm',
      'annales', 'les colles', 'entrainements rates',
    ],
  },
  'note-ratee': {
    strong: [
      'note de merde', 'note catastrophique', 'resultat horrible', 'ecroule au classement',
      'dernier de la promo', 'sous la moyenne', 'note qui fait mal', 'grosse claque',
      'pris une claque', 'humiliant', 'catastrophe au concours blanc',
    ],
  },
  retard: {
    strong: [
      'en retard sur tout', 'course contre la montre',
      'pile de cours', 'montagne de retard', 'accumule trop', 'je coule',
      'la tete sous l eau', 'depassee par la masse', 'depasse par la masse',
      'rattrapage impossible', 'trop a rattraper',
    ],
  },
  fatigue: {
    strong: [
      'plus de batterie', 'cerveau grille', 'cerveau qui fume', 'tiens plus debout',
      'm endors sur mes cours', 'somnole', 'yeux qui se ferment', 'cerne',
      'dormi 4 heures', 'dormi 3 heures', 'dormi 5 heures',
    ],
  },
  sommeil: {
    strong: [
      'me couche a 2h', 'me couche a 3h', 'me couche trop tard', 'nuits trop courtes',
      'reveil a 5h', 'cauchemars', 'reve des cours', 'pense aux cours la nuit',
      'sommeil pourri', 'nuits horribles', 'decale', 'rythme decale',
    ],
  },
  concentration: {
    strong: [
      'deux minutes et je decroche', 'tiens pas 10 minutes', 'zapping mental',
      'pense a tout sauf', 'reste pas focus', 'perds le fil', 'attention de poisson rouge',
      'notifications', 'discord', 'youtube', 'snap', 'insta',
    ],
  },
  stress: {
    strong: [
      'stresse de ouf', 'stress permanent', 'stress enorme', 'creve de peur',
      'peur de l echec', 'terrorise par le concours', 'pression du concours',
      'coeur qui s emballe', 'estomac noue', 'mange plus a cause du stress',
      'stress pour la colle', 'flippe pour demain',
    ],
  },
  panique: {
    strong: ['je fais une crise', 'hyperventile', 'etouffe', 'vertige', 'tourne de l oeil'],
  },
  planning: {
    strong: [
      'm organiser', 'organise ma journee', 'journee type', 'structurer mes journees',
      'repartir les matieres', 'quel ordre pour les matieres', 'routine de travail',
      'emploi du temps ideal', 'organiser la semaine',
    ],
  },
  'combien-heures': {
    strong: [
      'assez bosse aujourd hui', 'suffisant comme travail', 'trop peu d heures',
      'pas assez travaille', 'nombre d heures', 'temps de travail ideal',
      'je bosse 6 heures', 'je bosse 8 heures', 'je bosse 10 heures',
    ],
  },
  'lieu-travail': {
    strong: ['a la bibliotheque', 'places a la bu', 'travailler au lit', 'sur mon lit', 'dans ma chambre', 'bu', 'bu pleine', 'pas de place a la bu'],
  },
  musique: { strong: ['bruit blanc', 'lofi', 'lo fi', 'playlist pour reviser', 'avec ou sans musique'] },
  fiches: {
    strong: [
      'mes fiches', 'faire une fiche', 'ficher tout le cours', 'temps a ficher',
      'fiches trop longues', 'resume mes cours', 'tout resumer', 'notion ou papier',
    ],
  },
  'relecture-surlignage': {
    strong: [
      'relire suffit', 'relis en boucle', 'relire encore', 'lire et relire',
      'surligne tout', 'fluo', 'quatre couleurs', 'code couleur',
    ],
  },
  anki: {
    strong: [
      'mes cartes', 'faire des cartes', 'cartes en retard', 'pile de revisions',
      '500 cartes', '1000 cartes', 'ankidroid', 'espacement des cartes',
    ],
  },
  formules: {
    strong: ['formules de biophy', 'formules par coeur', 'retiens pas les formules', 'melange les formules', 'unites'],
  },
  schemas: {
    strong: ['coupes anatomiques', 'legendes', 'retenir les planches', 'atlas', 'dessiner les schemas'],
  },
  'echeance-proche': {
    strong: [
      'plus que 3 jours', 'plus que 2 jours', 'plus qu une semaine', 'dans une semaine',
      'concours approche', 'exam approche', 'colle approche', 'bientot le concours',
      'derniers jours', 'veille de colle', 'veille d exam', 'veille du concours',
      'reviser au dernier moment', 'trop tard pour tout revoir',
    ],
  },
  'trou-noir-examen': {
    strong: ['perds tous mes moyens', 'panique en colle', 'cerveau vide devant la copie', 'tout su la veille'],
  },
  'illusion-maitrise': {
    strong: ['je connaissais pourtant', 'je pensais maitriser', 'revise et pourtant rate', 'je revise mais je rate', 'bosse mais ca paye pas'],
  },
  comparaison: {
    strong: [
      'meilleurs que moi', 'plus intelligents que moi', 'je me sens nul', 'je me sens nulle',
      'je suis nul', 'je suis nulle', 'moins intelligent', 'pas fait pour ca',
      'pas fait pour medecine', 'pas le niveau', 'niveau des autres', 'major de promo',
      'tout le monde y arrive sauf moi',
    ],
  },
  'pression-famille': {
    strong: ['ma mere', 'mon pere', 'mes proches attendent', 'fierte de la famille', 'famille qui met la pression', 'decevoir mes parents'],
  },
  doublant: { strong: ['deja fait une pass', 'deuxieme pass', 'redoublement', 'l an dernier j ai rate'] },
  perfectionnisme: {
    strong: ['jamais parfait', 'peaufine trop', 'passe trop de temps sur les details', 'refais tout', 'tout refaire au propre'],
  },
  ennui: { strong: ['aucun plaisir', 'zero interet', 'mortellement ennuyeux', 'lassitude'] },
  'peur-echec': {
    strong: ['peur de redoubler', 'peur de la las', 'peur de tout perdre', 'si ca marche pas', 'angoisse de l echec', 'terreur de rater'],
  },
  'pourquoi-medecine': {
    strong: ['perdu le sens', 'plus envie de medecine', 'doute de mon choix', 'me demande si c est fait pour moi', 'remets tout en question'],
  },
  'sante-physique': {
    strong: ['mal au ventre', 'mal au cou', 'nuque', 'tendinite', 'yeux fatigues', 'vision floue', 'perds du poids', 'prends du poids'],
  },
  sport: { strong: ['plus le temps pour le sport', 'reprendre le sport', 'seance de sport'] },
  'cafe-energie': { strong: ['trop de cafe', 'litres de cafe', 'guronsan', 'vitamines', 'complement alimentaire'] },
  'amis-sorties': {
    strong: ['plus de vie', 'aucune vie sociale', 'mes potes sortent', 'rate les soirees', 'fomo', 'seule dans ma chambre', 'seul dans ma chambre'],
  },
  'vacances-repos': {
    strong: ['pause ce week end', 'reposer ce week end', 'un jour sans bosser', 'journee off', 'couper une journee'],
  },
  'styles-apprentissage': { strong: ['apprends mieux en ecoutant', 'apprends mieux en ecrivant', 'memoire photographique'] },
  'progres-stagne': { strong: ['bloque au meme niveau', 'toujours les memes notes', 'aucun progres visible', 'pas de progression'] },
  lent: { strong: ['finis jamais dans les temps', 'manque toujours de temps en colle', 'trop lent pour finir'] },
  'nouveau-chapitre': { strong: ['premier passage sur un cours', 'commencer un nouveau cours', 'decouvrir un chapitre'] },
  'trop-de-details': { strong: ['tout apprendre par coeur', 'tout est a savoir', 'chaque detail compte', 'par coeur integral'] },
  'quelle-methode': {
    strong: [
      'je fais comment', 'comment je fais', 'comment faire pour', 'des conseils',
      'un conseil', 'aide pour reviser', 'astuces', 'tips', 'technique de travail',
      'methode de travail', 'ta methode', 'la meilleure facon',
    ],
  },
  'aide-app': { strong: ['tutoriel', 'mode d emploi', 'par ou commencer dans l app', 'presentation de l app'] },
  'motive-moi': { strong: ['un boost', 'remotive moi', 'redonne moi envie', 'phrase de motivation', 'punchline'] },
  merci: { strong: ['t es le meilleur', 'tu gere', 'tu geres', 'trop fort', 'je t adore', 'je t aime', 'excellent'] },
  salut: { strong: ['ca va et toi', 'tu vas bien', 'quoi de neuf', 'ca dit quoi', 'bien ou bien'] },
  detresse: {
    strong: [
      'idees noires', 'je me fais peur', 'automutilation', 'scarification',
      'plus envie de vivre', 'envie d en finir', 'tout le monde serait mieux sans moi',
      'je sers a rien dans la vie', 'ma vie ne vaut rien',
    ],
  },
  // ------------------------------------------------ v3 : situations de vie
  'moral-bas': {
    strong: ['degoute', 'degoutee', 'le seum', 'trop deg'],
  },
  colere: {
    strong: ['ca m enerve', 'je rage', 'ca me met hors de moi', 'enerve contre le prof', 'trop la rage', 'je suis furax'],
  },
  solitude: {
    strong: ['je me sens abandonne', 'je me sens abandonnee', 'aucun ami ici', 'personne pour me soutenir'],
  },
  culpabilite: {
    strong: ['je m en veux tellement', 'je me sens nul de ne pas', 'honte de ne pas y arriver'],
  },
  surmenage: {
    strong: ['au bord du burn out', 'j en fais trop', 'je tire sur la corde', 'plus aucune coupure'],
  },
  'bonne-note': {
    strong: ['ma meilleure note', 'meilleure colle de ma vie', 'je monte au classement', 'enfin bien classe', 'enfin bien classee', 'ca y est j ai reussi'],
  },
  'addiction-ecrans': {
    strong: ['je perds des heures sur', 'aspire par mon telephone', 'bloque sur les reseaux', 'je scrolle toute la journee', 'lache pas insta'],
  },
  'jeux-video': {
    strong: ['envie de jouer', 'ma console me tente', 'une game', 'lancer une partie'],
  },
  'series-films': {
    strong: ['finir ma saison', 'enchaine les episodes', 'accro a ma serie'],
  },
  meditation: {
    strong: ['apprendre a mediter', 'ca marche la meditation', 'exercices pour me calmer'],
  },
  'groupe-travail': {
    strong: ['on revise ensemble', 'bosser en duo', 'trouver un binome', 'reviser en binome'],
  },
  'materiel-etude': {
    strong: ['acheter un ipad', 'vaut le coup l ipad', 'changer de materiel', 'prendre une tablette'],
  },
  rentree: {
    strong: ['je debute en pass', 'premiere semaine de cours', 'nouvelle en medecine', 'nouveau en medecine', 'des conseils pour demarrer'],
  },
  'amphi-ou-replay': {
    strong: ['je vais plus en cours', 'j y vais plus en amphi', 'cours a la maison ou en amphi'],
  },
  'changer-methode': {
    strong: ['tout changer dans ma facon de bosser', 'repartir de zero sur la methode', 'ma facon de travailler ne marche pas'],
  },
  'jour-colle': {
    strong: ['des conseils pour le jour j', 'comment gerer le jour du concours', 'la strategie pendant l epreuve'],
  },
  'apres-colle': {
    strong: ['je ressasse mes reponses', 'refais la colle dans ma tete', 'attends mes resultats'],
  },
  'hors-champ': {
    strong: ['telecharge', 'installe une appli', 'mets de la musique', 'lance un chrono', 'ouvre une video'],
  },
  'axel-perso': {
    strong: ['parle moi de toi', 'tu me connais', 'raconte ta vie', 't es mignon', 'tu es mignon'],
  },
  'correction-axel': {
    strong: ['t es pas fiable', 'tu inventes', 'c est pas ce que dit mon prof'],
  },
  // v3 : couche savoir — formulations naturelles supplémentaires
  'k-intervalles': {
    strong: ['tous les combien je revois mes cours', 'quand est ce que je dois reviser', 'le bon rythme de reprise'],
  },
  'k-duree-pomodoro': {
    strong: ['c est long un pomodoro', 'temps de travail par bloc'],
  },
  'k-heures-sommeil': {
    strong: ['6h de sommeil', 'dormir 6 heures', 'nuits de 6 heures ca va'],
  },
  'k-source-corpus': {
    strong: ['c est prouve scientifiquement', 'y a des etudes derriere', 'c est valide par la science'],
  },
  'k-cartes-par-jour': {
    strong: ['limite de nouvelles cartes anki', 'je cree combien de cartes'],
  },
  'k-mode-degrade': {
    strong: ['travailler un cours a moitie', 'faire le minimum sur un chapitre'],
  },
};
