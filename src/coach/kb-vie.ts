import type { Intent } from './kb';

/**
 * KB Vie — les situations de vie autour du concours (v3).
 * Émotions fines, relations, habitudes, moments-clés du calendrier PASS,
 * et les limites assumées d'Axel (hors-champ, corrections).
 *
 * Mêmes règles que kb.ts : mots-clés normalisés (minuscules, sans accents),
 * ≥ 3 variantes substantielles, contenu fidèle au corpus, et pour tout sujet
 * sensible : orienter vers de vrais humains, jamais jouer au soignant.
 * Les intentions émotionnelles d'ici sont inscrites dans SAFETY_INTENTS
 * (modes.ts) : voix bienveillante de base quel que soit le mode choisi.
 */

export const LIFE_INTENTS: Intent[] = [
  // ============================================================= ÉMOTIONS
  {
    id: 'colere',
    priority: 20,
    strong: [
      'enerve', 'enervee', 'rage', 'colere', 'furieux', 'furieuse', 'hors de moi',
      'tout casser', 'pete un cable', 'petage de cable', 'pete les plombs',
      'm enerve contre moi', 'enerve contre moi', 'rage contre', 'vener',
      'ca me rend fou', 'ca me rend folle', 'je fulmine',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'La colère, c’est de l’énergie à haute tension — ni bonne ni mauvaise, juste inflammable. On ne travaille pas bien EN colère : d’abord la faire retomber d’un cran (marche rapide de 5 minutes, ou le NRAR ci-dessous), ensuite seulement décider. Et si elle vise une vraie injustice, note-la pour la traiter à froid — pas à chaud.',
      'D’accord, ça bouillonne. Deux règles d’or : on n’envoie aucun message et on ne prend aucune décision tant que c’est chaud (la colère écrit des choses qu’on regrette) ; et on la décharge par le corps, pas par la rumination — 10 minutes de marche ou quelques étages d’escaliers font tomber la pression mieux que ressasser.',
      'Être en colère contre soi-même est le piège classique du concours : ça ressemble à de l’exigence, mais ça détruit l’énergie sans corriger une seule erreur. Le deal : tu as le droit d’être frustré·e 10 minutes, chrono. Ensuite, la question utile : « qu’est-ce que je corrige, concrètement ? » — et là, je peux t’aider.',
    ],
    more: [
      'Si la colère revient tous les jours et déborde sur tout, ce n’est plus une émotion passagère — c’est un signal de surcharge. On en parle à quelqu’un de vrai (proche, médecin), et on allège la semaine. Un moteur qui surchauffe, on ne l’accélère pas.',
    ],
    also: 'Et pour la colère : on décharge par le corps d’abord, on décide ensuite.',
  },
  {
    id: 'culpabilite',
    priority: 20,
    strong: [
      'culpabilise', 'culpabilite', 'je m en veux', 'm en veux enormement',
      'me sens coupable', 'mauvaise conscience', 'honte', 'honte de moi',
      'j ai honte', 'me deteste quand', 'me pardonne pas',
    ],
    mood: 'care',
    links: [{ label: 'Journée minimale (repartir proprement)', to: '/methode/journee-minimale' }],
    variants: [
      'La culpabilité est le pire carburant qui existe : elle épuise sans faire avancer d’une page. Regarde le mécanisme : elle te punit pour hier, ce qui abîme aujourd’hui, ce qui donnera une nouvelle raison de culpabiliser demain. On casse la boucle par un acte minuscule et réel — une unité de travail, maintenant — pas par une punition.',
      'Écoute ce principe simple : hier est un dossier classé, tu n’y as plus accès en écriture. Ce que tu contrôles, c’est la prochaine heure. La Journée minimale ci-dessous existe exactement pour ces moments : un socle réduit, fait proprement, et la journée compte — la culpabilité perd son procès.',
      'La honte pousse à se cacher, et c’est exactement l’inverse de ce qui aide. Tu n’as rien fait de honteux : tu traverses une année dure, avec des hauts et des bas comme tout le monde — ceux qui te semblent parfaits cachent les leurs. Une petite victoire concrète aujourd’hui, et si ce poids revient souvent, dis-le à quelqu’un de confiance : dit à voix haute, il rétrécit.',
    ],
    also: 'Et pour la culpabilité : un acte minuscule maintenant vaut mieux que toutes les punitions.',
  },
  {
    id: 'solitude',
    priority: 20,
    strong: [
      'me sens seul', 'me sens seule', 'tout seul', 'toute seule', 'solitude',
      'personne a qui parler', 'besoin de parler', 'personne ne me comprend',
      'me sens isole', 'me sens isolee', 'abandonne de tous',
    ],
    mood: 'care',
    links: [
      { label: 'Une citation pour la route', to: '/citations/plein-ecran' },
      { label: 'Si c’est plus lourd : protocole Détresse', to: '/sos/detresse' },
    ],
    variants: [
      'Merci de le dire ici — mais je vais être honnête : je suis un coach de méthodes, pas une présence humaine, et c’est d’humains dont la solitude se soigne. Un message à UNE personne ce soir (un proche, un ancien ami — « je pense à toi, ça me ferait du bien de parler ») change plus que dix conversations avec moi. Le PASS isole tout le monde ; presque personne n’ose faire le premier pas — fais-le, tu seras surpris·e.',
      'La solitude en PASS est quasi universelle et quasi invisible : chacun la vit en pensant être le seul. Trois pistes concrètes : réviser EN PRÉSENCE d’autres (BU, tutorat — même sans parler, ça compte), un appel court mais régulier avec quelqu’un qui t’aime bien, et une activité hebdo à heure fixe où on te connaît. Et si le vide devient lourd, le protocole Détresse a les bons contacts — des vrais.',
      'Je suis là pour discuter méthodes à toute heure — mais tu mérites mieux qu’un neurone : de vraies personnes. Commence petit : un message ce soir, un déjeuner cette semaine. Et sache un truc : dans ta promo, des dizaines de personnes ressentent exactement ça en ce moment. Deux solitudes qui se croisent au tutorat, ça fait deux personnes de moins seules.',
    ],
    also: 'Et pour la solitude : un vrai message à une vraie personne, ce soir.',
  },
  {
    id: 'mal-du-pays',
    priority: 20,
    strong: [
      'mal du pays', 'ma famille me manque', 'mes parents me manquent', 'ma mere me manque',
      'mon pere me manque', 'loin de chez moi', 'loin de ma famille', 'ma maison me manque',
      'mon chez moi me manque', 'envie de rentrer chez moi', 'chez mes parents me manque',
    ],
    mood: 'care',
    links: [{ label: 'Journée minimale (les jours lourds)', to: '/methode/journee-minimale' }],
    variants: [
      'Le mal du pays est une vraie douleur, pas un caprice — surtout la première année loin de chez soi, avec la pression en plus. Ce qui aide vraiment : des rendez-vous réguliers et COURTS avec ta famille (un appel de 15 minutes tous les deux jours vaut mieux qu’une heure triste le dimanche), un retour planifié dans le calendrier (savoir QUAND on rentre change tout), et ta chambre rendue un peu tienne — photos, odeur, objets.',
      'C’est dur d’être loin, et c’est normal que ça pèse. Deux pièges à éviter : t’interdire d’appeler « pour ne pas perdre de temps » (le manque non traité coûte plus cher en concentration que 15 minutes d’appel), et vivre la valise à la main sans t’installer nulle part. Pose tes affaires, pose tes rituels — le lieu devient moins étranger, le travail moins lourd.',
      'Programme le prochain retour, même lointain, et écris la date quelque part visible : le cerveau supporte bien mieux une absence avec une fin qu’un exil flou. En attendant, garde le lien vivant en petites doses régulières, et construis-toi un mini-quotidien qui te ressemble ici. Et si la tristesse déborde sur tout, parle-le à quelqu’un — famille comprise : ils préfèrent le savoir.',
    ],
    also: 'Et pour le manque de chez toi : des appels courts réguliers + une date de retour écrite.',
  },
  {
    id: 'rupture-amoureuse',
    priority: 22,
    strong: [
      'rupture', 'm a quitte', 'm a quittee', 'm a largue', 'm a larguee',
      'largue par mon', 'largue par ma', 'larguee par mon', 'larguee par ma',
      'coeur brise', 'chagrin d amour', 'separation', 'une rupture',
      'mon ex', 'plus avec mon copain', 'plus avec ma copine', 'on s est separes',
    ],
    mood: 'care',
    links: [
      { label: 'Journée minimale (traverser la semaine)', to: '/methode/journee-minimale' },
      { label: 'Si ça déborde : protocole Détresse', to: '/sos/detresse' },
    ],
    variants: [
      'Une rupture en pleine année de concours, c’est deux séismes en même temps — je ne vais pas minimiser. Ce qui protège les deux : le mode Journée minimale pendant une à deux semaines (un socle réduit, ZÉRO culpabilité — c’est prévu pour exactement ça), du sommeil défendu bec et ongles, et des gens autour de toi. Le chagrin se traverse accompagné, pas en apnée entre deux QCM.',
      'D’abord : ce que tu ressens est légitime, et non, tu n’as pas à « juste te concentrer sur le concours » — le cœur ne prend pas d’ordres. Le deal réaliste : des journées réduites mais non nulles (la chaîne de travail intacte te protège aussi moralement), les rappels espacés en pilote automatique, et le gros chagrin déposé chez de vraies personnes — amis, famille. Les semaines passent, la capacité revient. Toujours.',
      'Conseil pratique au milieu de la tempête : évite les grandes décisions (arrêter l’année, déménager, tout couper) pendant les deux premières semaines — le chagrin est un très mauvais conseiller stratégique. Vis en mode minimal assumé, entoure-toi, dors. Et si tu sens que ça creuse plus profond que la tristesse normale, le protocole Détresse est là — l’utiliser est un réflexe intelligent, pas un drame.',
    ],
    also: 'Et pour la rupture : mode minimal quelques semaines, entouré·e, sans grande décision.',
  },
  {
    id: 'dispute-amis',
    priority: 18,
    strong: [
      'dispute avec', 'me suis dispute', 'me suis disputee', 'embrouille avec',
      'fache avec', 'fachee avec', 'en froid avec', 'engueule avec',
      'me suis engueule', 'me suis engueulee', 'clash avec', 'plus en bons termes',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'Une embrouille qui tourne en boucle dans la tête coûte des heures de concentration — donc on la gère, on ne la laisse pas infuser. Règle des 24 heures : rien d’important ne s’écrit à chaud. Demain, un message simple et honnête (« je tiens à nous, on peut se parler calmement ? ») règle la majorité des disputes. En attendant : le NRAR pour faire redescendre, et UNE unité de travail pour reprendre la main sur ta journée.',
      'Les frictions explosent en période de pression — tout le monde est à cran, et les mots dépassent les pensées. Deux questions pour y voir clair : est-ce un vrai désaccord ou deux fatigues qui se sont percutées ? Et cette relation compte-t-elle pour toi en juillet ? Si oui : un pas vers l’autre, simple, sans procès. Si c’est une relation qui te coûte en continu, la mettre à distance cette année est un choix légitime.',
      'Tu n’as pas à choisir entre « régler ça maintenant » et « bosser » : la rumination fait les deux mal. Pose l’affaire par écrit en cinq lignes (ce qui s’est passé, ce que je ressens, ce que je veux), décide UNE action (message demain, ou pause assumée), puis referme le dossier pour ce soir. Le cerveau lâche ce qui a un plan.',
    ],
    also: 'Et pour la dispute : rien à chaud, un message simple demain, et on referme le dossier ce soir.',
  },
  {
    id: 'deuil',
    priority: 40,
    strong: [
      'deces', 'un deces', 'enterrement', 'obseques', 'est decede', 'est decedee',
      'est mort', 'est morte', 'perdu mon grand pere', 'perdu ma grand mere',
      'perdu mon pere', 'perdu ma mere', 'perdu un proche', 'perdu quelqu un',
      'en deuil', 'le deuil',
    ],
    mood: 'care',
    links: [
      { label: 'Protocole Détresse (les bons contacts)', to: '/sos/detresse' },
      { label: 'Journée minimale (quand tu reprendras)', to: '/methode/journee-minimale' },
    ],
    variants: [
      'Je suis sincèrement désolé. Là, on ne parle plus de méthodes — un deuil se vit avec des humains : ta famille, tes proches, et si le poids est trop lourd, le service de santé de ton université (les universités ont des psychologues, c’est gratuit et fait pour ça). Côté études, une absence se justifie et se rattrape — le protocole existe, il attendra. Prends les jours qu’il faut. Vraiment.',
      'Toutes mes condoléances. Ne demande pas à ton cerveau d’apprendre de la biochimie en plein deuil — il est occupé à quelque chose de plus important, et c’est normal. Ce qui se fait : prévenir la scolarité (une absence pour deuil est légitime), t’entourer, dormir ce que tu peux. La reprise se fera en douceur, Journée minimale d’abord — et j’y serai. Mais cette semaine, ta place est avec les tiens.',
      'Je suis de tout cœur avec toi — et je vais rester à ma place : aucune méthode ne s’applique à ça. Entoure-toi, parle, pleure si ça vient. Si tu te sens démuni·e ou trop seul·e face à ce qui arrive, le protocole Détresse liste de vraies personnes à contacter, et le service santé de ta fac sait accompagner les étudiants endeuillés. Les cours attendront le temps qu’il faudra.',
    ],
    also: 'Et surtout : le deuil passe avant tout le reste — entoure-toi, les cours attendront.',
  },
  {
    id: 'harcelement',
    priority: 30,
    strong: [
      'harcele', 'harcelee', 'harcelement', 'se moquent de moi', 'se moque de moi', 'moque de moi', 'moqueries',
      'humilie', 'humiliee', 'rabaisse', 'rabaissee', 'critique tout le temps',
      'cyberharcelement', 'menace', 'menacee', 'intimide en cours',
    ],
    mood: 'care',
    links: [{ label: 'Protocole Détresse (contacts et démarches)', to: '/sos/detresse' }],
    variants: [
      'Ce que tu décris est sérieux, et ce n’est pas à toi de le porter seul·e. Le harcèlement n’est ni une blague ni une fatalité : parle-le à quelqu’un de vrai dès aujourd’hui — un proche de confiance, et le service de santé ou la cellule d’écoute de ton université (elles existent, sont confidentielles et savent agir). Garde des traces (messages, dates, témoins) : elles serviront si tu décides de signaler. Tu n’as rien fait pour mériter ça.',
      'Merci de m’en parler — maintenant il faut le dire à des humains qui peuvent agir. Toutes les universités ont un dispositif contre le harcèlement (cellule d’écoute, référent, service santé) : c’est confidentiel et c’est exactement leur rôle. En attendant, protège ton quotidien : réduis les contacts avec ces personnes, révise là où tu es tranquille, et appuie-toi sur les gens qui te font du bien. Le protocole Détresse a aussi les bons numéros si ça pèse trop lourd.',
      'Personne ne devrait réviser un concours en se faisant rabaisser — ta priorité n°1 est de te mettre à l’abri, pas d’encaisser en silence. Trois gestes concrets : documente (captures, dates), parle (un proche + la cellule d’écoute de la fac — les deux), et coupe ce qui peut l’être (réseaux, groupes toxiques). Tu as le droit d’être défendu·e, et des gens sont payés pour ça. Ne reste pas seul·e avec ça.',
    ],
    also: 'Et pour le harcèlement : documente, parle-le à la cellule d’écoute de ta fac — ne reste pas seul·e.',
  },
  {
    id: 'maladie-proche',
    priority: 30,
    strong: [
      'ma mere est malade', 'mon pere est malade', 'est a l hopital', 'hospitalise',
      'hospitalisee', 'malade dans ma famille', 'proche est malade', 'a un cancer',
      'gravement malade', 'ma grand mere est malade', 'mon grand pere est malade',
      's inquiete pour ma mere', 's inquiete pour mon pere',
    ],
    mood: 'care',
    links: [
      { label: 'Journée minimale (tenir pendant la tempête)', to: '/methode/journee-minimale' },
      { label: 'Si le poids est trop lourd : Détresse', to: '/sos/detresse' },
    ],
    variants: [
      'Je suis désolé que ta famille traverse ça. Réviser avec un proche malade, c’est porter deux charges — alors on allège ce qui peut l’être : mode Journée minimale sans culpabilité les jours difficiles, des nouvelles à heures fixes plutôt qu’une inquiétude en continu (appelle après ta session, pas pendant), et quelqu’un à qui en parler — ami, famille, ou le service santé de ta fac. Prendre soin de toi n’est pas trahir ton proche : c’est ce qu’il ou elle voudrait.',
      'C’est une épreuve, et ton inquiétude est la preuve que tu aimes — pas une faiblesse. Concrètement : définis avec ta famille un canal d’information clair (« appelez-moi s’il y a du nouveau ») pour libérer ta tête entre deux nouvelles, garde un socle de travail minimal qui te maintient debout, et si tu dois t’absenter pour être présent·e, la scolarité comprend ces situations — préviens-la. Les deux comptent : ton proche, et toi.',
      'On va être réaliste ensemble : certaines semaines, le concours passera au second plan, et ce sera la bonne décision. Pour les autres jours, le travail peut devenir un refuge sain — des blocs courts, concrets, qui reposent la tête de l’inquiétude. Alterne sans culpabilité : présence quand il faut, unités de travail quand tu peux. Et ne porte pas ça seul·e — parle, ici et surtout ailleurs.',
    ],
    also: 'Et pour ton proche malade : des nouvelles à heures fixes, un socle minimal, du soutien autour de toi.',
  },
  {
    id: 'anxiete-sociale',
    priority: 15,
    strong: [
      'j ose pas', 'n ose pas', 'ose pas demander', 'ose pas poser de question',
      'timide', 'timidite', 'peur de deranger', 'peur du regard des autres',
      'peur de passer pour', 'gene de demander', 'trop gene', 'peur de parler au prof',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'D’abord une vérité qui soulage : la question que tu n’oses pas poser, dix autres personnes se la posent en silence — celui ou celle qui la pose rend service à tout l’amphi. Ensuite, la technique : passe par l’écrit quand c’est possible (mail au prof, question au tutorat en ligne) — l’écrit enlève 80 % du coût social. Et prépare ta question en une phrase avant : « je n’ai pas compris X à l’étape Y ». Courte, précise, personne n’a jamais jugé ça.',
      'La gêne de demander coûte cher en PASS : un point de cours non éclairci, c’est des QCM perdus en janvier. Stratégie d’exposition douce : commence par les canaux faciles (formulaire anonyme du tutorat, mail, un·e autre étudiant·e), puis monte d’un cran quand c’est devenu banal. Chaque question posée rend la suivante plus facile — c’est mécanique.',
      'Être réservé·e n’est pas un défaut à corriger — mais ne laisse pas la timidité décider de ta compréhension. Le contournement : note tes « ?? » pendant le cours, et traite-les par écrit dans les 24 h (poly, annales, mail, tutorat). Si l’anxiété sociale te bloque au quotidien bien au-delà des cours, le service santé de la fac accompagne très bien ça — c’est fréquent et ça se travaille.',
    ],
    also: 'Et pour oser demander : passe par l’écrit — une phrase précise, zéro jugement.',
  },
  {
    id: 'surmenage',
    priority: 22,
    strong: [
      'travaille trop', 'je bosse trop', 'fais que bosser', 'fais que travailler',
      'jamais de pause', 'aucun jour off', 'sans m arreter', 'm arrete jamais',
      'surmene', 'surmenee', 'surmenage', 'quatorze heures par jour',
      '14h par jour', 'aucune coupure depuis',
    ],
    mood: 'care',
    links: [
      { label: 'Journée minimale (redéfinir le socle)', to: '/methode/journee-minimale' },
      { label: 'Pomodoro (des blocs et de vraies pauses)', to: '/methode/pomodoro' },
    ],
    variants: [
      'Attention — je vais te dire un truc que peu de gens osent dire en PASS : travailler TROP est un vrai danger, pas une preuve de sérieux. Sans pauses ni jours de respiration, la mémoire consolide moins, les erreurs montent, et tu t’approches de la panne sèche de novembre. Un plan tenable bat un plan héroïque : blocs nets, vraies pauses, une demi-journée OFF par semaine — non négociable, comme un médicament.',
      'Le surmenage a un signe qui ne trompe pas : les heures augmentent et les résultats stagnent. C’est que la qualité s’est effondrée sous la quantité. On inverse : moins d’heures mais actives (rappels, QCM — zéro relecture molle), du sommeil complet, du vrai repos. Tu vas probablement progresser en travaillant MOINS — je sais que c’est contre-intuitif, c’est pourtant le pari le plus documenté qui soit.',
      'Une année de concours est un marathon couru sur dix mois — et tu es en train de le sprinter. Ce qui casse les étudiants sérieux, ce n’est presque jamais le manque de travail : c’est l’absence de récupération. Écoute les signaux (sommeil, humeur, plaisir à zéro) : si plusieurs clignotent depuis des semaines, réduis MAINTENANT et parles-en à quelqu’un — ton médecin compris. Mieux vaut lever le pied que casser le moteur.',
    ],
    more: [
      'Test simple pour te situer : sur tes 3 dernières semaines, combien de demi-journées SANS aucun cours ni culpabilité ? Si la réponse est zéro, ton premier chantier n’est pas une méthode de plus — c’est d’installer la récupération dans l’emploi du temps, au même rang que les révisions.',
    ],
    also: 'Et sur le rythme : la récupération fait partie de l’entraînement — installe-la, sinon elle s’imposera.',
  },
  {
    id: 'cigarette-vape',
    priority: 15,
    strong: [
      'cigarette', 'cigarettes', 'clope', 'clopes', 'je fume', 'fume trop',
      'vape', 'vapote', 'puff', 'nicotine', 'tabac', 'arreter de fumer',
    ],
    mood: 'care',
    links: [{ label: 'SOS Fatigue (l’énergie sans béquilles)', to: '/sos/fatigue' }],
    variants: [
      'Sujet santé — donc je reste à ma place de coach : pour arrêter ou réduire, les vrais interlocuteurs sont ton médecin (substituts nicotiniques, accompagnement — ça marche bien mieux qu’à la volonté) et Tabac info service (le 39 89). Ce que je peux te dire côté révisions : la clope-pause structure tes journées autour d’un besoin, pas autour du travail — remplace le déclencheur (vraie pause : marcher, boire, respirer) plutôt que de lutter à mains nues.',
      'Pas de morale ici — juste de la stratégie. Une année de concours n’est pas toujours le moment idéal pour un sevrage total (le stress de manque + le stress du concours, ça fait beaucoup) : ton médecin saura t’aider à choisir entre réduire maintenant et arrêter après — avec des substituts, c’est beaucoup plus simple. En attendant, évite au moins la cigarette « de bureau » en continu : garde-la hors de la pièce de travail, comme le téléphone.',
      'Ce que la nicotine te vend comme une pause n’en est pas vraiment une — mais je ne vais pas te faire la leçon : c’est une dépendance, pas un choix de caractère, et ça se traite avec de l’aide réelle. Médecin, ou le 39 89 (Tabac info service) : gratuits, efficaces, sans jugement. Côté méthré : cale tes vraies pauses (5 minutes, dehors, sans écran) pour que le rythme de travail ne dépende plus du paquet.',
    ],
    also: 'Et côté tabac : médecin ou le 39 89 — et des pauses qui n’appartiennent pas au paquet.',
  },

  // ======================================================== BONNES NOUVELLES
  {
    id: 'bonne-note',
    priority: 12,
    strong: [
      'bonne note', 'j ai reussi ma colle', 'reussi mon concours blanc', 'meilleure note',
      'cartonne a la colle', 'cartonne au concours', 'bien reussi', 'fier de moi',
      'fiere de moi', 'remonte au classement', 'gagne des places', 'meilleur classement',
      'ca a paye', 'enfin une bonne note', 'super note', 'trop content de ma note',
      'trop contente de ma note',
    ],
    mood: 'cheer',
    links: [
      { label: 'Correction par cause (même les réussites)', to: '/methode/correction-par-cause' },
      { label: 'Calibration de confiance', to: '/methode/calibration-confiance' },
    ],
    variants: [
      'OUI ! Savoure — vraiment, prends dix minutes pour être fier·e, c’est mérité et c’est important pour la suite. Puis le réflexe des tout meilleurs : analyser la réussite comme un échec. Qu’est-ce qui a payé exactement (méthode ? régularité ? sommeil ?) — et note-le noir sur blanc : c’est TA recette, elle doit survivre aux semaines molles. Attention aussi aux bonnes réponses chanceuses : la Correction par cause les débusque.',
      'Excellente nouvelle — bravo ! Deux dangers de la bonne note, pour rester lucide : le relâchement (« j’ai de l’avance ») qui rend la moitié des points le mois suivant, et l’illusion (« j’ai tout compris ») qu’une réussite partielle installe. La parade est la même : continue EXACTEMENT ce qui a marché, même volume, mêmes méthodes. On ne change pas une machine qui gagne — on la protège.',
      'Voilà ce qu’on aime voir ! Fête ça proprement (une vraie récompense, décidée, ce soir), et remercie la bonne personne : pas la chance — ton travail et ta méthode. Ensuite, une chose à vérifier : es-tu bon·ne partout ou excellent·e quelque part et fragile ailleurs ? Le classement final aime la solidité d’ensemble. La Calibration te dit où le vernis est fin.',
    ],
    also: 'Et pour ta réussite : bravo — analyse ce qui a payé et surtout, ne change rien.',
  },

  // ========================================================== HABITUDES / ÉCRANS
  {
    id: 'addiction-ecrans',
    strong: [
      'accro', 'accro a mon telephone', 'addict', 'dependant du telephone',
      'dependante du telephone', 'temps d ecran', 'desintox', 'detox',
      'heures sur mon telephone', 'heures d ecran', 'dopamine', 'doomscrolling',
      'lache pas mon telephone',
    ],
    mood: 'think',
    links: [
      { label: 'Réduction de friction numérique', to: '/methode/friction-numerique' },
      { label: 'Pomodoro (blocs protégés)', to: '/methode/pomodoro' },
    ],
    variants: [
      'Bonne nouvelle contre-intuitive : tu n’as pas un problème de volonté, tu affrontes des applis conçues par des milliers d’ingénieurs pour capter l’attention — à mains nues, tout le monde perd. La parade n’est donc pas « résister » mais rendre l’accès CHER : téléphone dans une autre pièce pendant les blocs, notifications rasées, applis les plus voraces désinstallées la semaine (réinstaller prend 2 minutes le samedi — c’est exactement le but : de la friction).',
      'La fiche Friction numérique ci-dessous dit une chose importante : pas besoin de « détox dopamine » mystique ni de culpabilité — juste de la mécanique. Trois gestes ce soir : 1) une fenêtre de consultation DÉCIDÉE (par ex. 13 h et 19 h, 15 minutes) au lieu du grignotage continu ; 2) l’écran en niveaux de gris (ça marche étonnamment bien) ; 3) le chargeur exilé hors de la chambre. Le temps d’écran fond quand l’accès coûte.',
      'Mesure d’abord, sans te juger : regarde ton temps d’écran réel de la semaine. C’est souvent un choc — et un excellent carburant. Puis attaque le moment le plus toxique en premier (en général : le matin au réveil et les pauses de travail). Réveil sans téléphone la première heure + pauses sans écran = les deux plus gros gains, et le reste suit. La friction fait le travail que la volonté ne peut pas faire.',
    ],
    also: 'Et pour l’écran : ne résiste pas — renchéris l’accès (autre pièce, fenêtres décidées, gris).',
  },
  {
    id: 'jeux-video',
    strong: [
      'jeux video', 'jeu video', 'console', 'manette', 'fortnite', 'valorant',
      'league of legends', 'gaming', 'jouer au lieu de bosser', 'une partie',
      'ranked', 'twitch',
    ],
    mood: 'think',
    links: [{ label: 'Réduction de friction numérique', to: '/methode/friction-numerique' }],
    variants: [
      'Les jeux ne sont pas le mal — mais en PASS ils ont un défaut structurel : ils ne finissent jamais tout seuls, et « une partie » n’existe pas. La règle qui marche : le jeu devient une RÉCOMPENSE planifiée (après la journée validée, créneau décidé, minuteur), jamais un bouche-trou d’ennui ou de flemme. Et pour les jeux à parties longues ou classées : honnêtement, c’est saison morte jusqu’au concours — ils demandent un investissement que l’année ne peut pas payer.',
      'Le vrai coût d’une session de jeu n’est pas sa durée — c’est l’excitation résiduelle qui traîne une heure après et rend la reprise très dure. D’où deux réglages : jouer APRÈS le travail du jour (jamais au milieu), et prévoir un sas de 15 minutes avant de dormir ou de reprendre (marche, douche). Si tu n’arrives pas à cadrer, applique la friction : console débranchée et rangée, compte déconnecté — la flemme de réinstaller protège mieux que la volonté.',
      'Question honnête à te poser : le jeu te détend-il vraiment, ou est-ce qu’il t’aspire puis te laisse coupable ? S’il détend : garde-le, cadré (créneau fixe, après le socle du jour — c’est une vraie récompense qui tient la motivation). S’il aspire : traite-le comme le téléphone, par la friction — hors de portée pendant les blocs, sessions décidées à l’avance. Et les soirs de veille de colle, la réponse est simple : non.',
    ],
    also: 'Et pour les jeux : récompense planifiée après le socle du jour — jamais bouche-trou.',
  },
  {
    id: 'series-films',
    strong: [
      'series', 'une serie', 'des series', 'binge', 'un episode de plus',
      'encore un episode', 'regarder des series', 'ma serie', 'netflix',
      'prime video', 'disney plus',
    ],
    mood: 'think',
    links: [{ label: 'Réduction de friction numérique', to: '/methode/friction-numerique' }],
    variants: [
      'Le piège des séries n’est pas l’épisode — c’est l’enchaînement automatique : le suivant se lance tout seul, et la soirée disparaît. Trois parades concrètes : désactive la lecture automatique (le réglage existe, il change tout), regarde en mangeant plutôt qu’en soirée ouverte (le repas borne l’épisode), et garde les séries à suspense pour les vacances — une intrigue qui obsède est une taxe sur la concentration du lendemain.',
      'Un épisode choisi, c’est du vrai repos — un binge subi, c’est du temps volé qui laisse coupable. La différence tient à UNE décision prise avant de lancer : combien d’épisodes, et qu’est-ce qui suit (« un épisode, puis douche et dodo »). Décide avant, parce que pendant, l’algorithme décide pour toi. Et si une série te tient trop fort en ce moment : pause assumée jusqu’à la prochaine coupure — elle t’attendra, le concours non.',
      'Réponse de coach assumée : oui aux séries comme récompense bornée (c’est même un bon outil de décompression), non aux séries comme fond de soirée par défaut. Le test : si tu ne te souviens pas d’avoir DÉCIDÉ de regarder, c’est l’autoplay qui a décidé. Reprends la main : fin d’épisode = écran fermé physiquement, et la suite se mérite demain. Ton sommeil — donc ta mémoire — te dira merci.',
    ],
    also: 'Et pour les séries : décide le nombre d’épisodes AVANT de lancer, autoplay coupé.',
  },
  {
    id: 'meditation',
    strong: [
      'mediter', 'meditation', 'coherence cardiaque', 'pleine conscience',
      'respiration', 'exercice de respiration', 'yoga', 'petit bambou',
      'relaxation', 'sophrologie',
    ],
    mood: 'happy',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'Réponse honnête : pas besoin d’un stage de méditation pour en tirer les bénéfices utiles au concours. L’essentiel tient en deux outils gratuits : la respiration à expiration longue (inspire 4 s, expire 6 s, quelques minutes — c’est le cœur du NRAR, efficace sur le stress aigu), et 5-10 minutes de calme SANS écran par jour, réguliers. Si une appli t’aide à tenir la régularité, très bien — mais c’est la pratique qui agit, pas l’abonnement.',
      'La méditation aide vraiment certaines personnes (stress, sommeil, recentrage) — et n’est pas obligatoire pour autant. Version minimale qui marche : avant ta session la plus dure, 2 minutes assis·e, yeux fermés, à suivre ta respiration en allongeant l’expiration. C’est court, gratuit, et ça met le cerveau dans de bonnes conditions. La cohérence cardiaque (5 minutes, 6 respirations/minute) est la version cadrée du même principe.',
      'Deux usages rentables en PASS : le micro-calme avant une session ou une colle (2-3 minutes de respiration lente — le NRAR le structure très bien), et la transition vers le sommeil (10 minutes de calme, lumière basse, respiration longue — bien plus efficace que le téléphone au lit). Au-delà, si la pratique te plaît, c’est un excellent rituel de pause. Mais garde l’ordre des priorités : sommeil et pauses d’abord, techniques ensuite.',
    ],
    also: 'Et pour te poser : expiration longue, 2 minutes — gratuit et immédiat.',
  },
  {
    id: 'sieste',
    strong: [
      'sieste', 'siestes', 'micro sieste', 'faire une sieste', 'dormir l apres midi',
      'sieste de combien', 'm endormir l apres midi',
    ],
    mood: 'happy',
    links: [{ label: 'SOS Fatigue', to: '/sos/fatigue' }],
    variants: [
      'La sieste est un outil légitime — bien réglée : 15 à 20 minutes MAXIMUM (au-delà tu entres en sommeil profond et tu te réveilles dans le brouillard pour une heure), avant 16 h (plus tard, elle vole la nuit), allongé·e ou calé·e, minuteur obligatoire. Bien utilisée, elle rachète une après-midi entière après une nuit moyenne.',
      'Règle des deux siestes : la bonne (15-20 min, début d’après-midi, réveil net et productivité relancée) et la mauvaise (1 h 30 à 17 h, réveil pâteux, nuit décalée, cercle vicieux). Le minuteur fait toute la différence. Et si tu t’endors TOUS les jours malgré de vraies nuits, le signal est ailleurs : sommeil de mauvaise qualité ou surcharge — ça se vérifie avec un médecin.',
      'Astuce validée par l’usage : la sieste courte juste après le déjeuner tombe sur le creux physiologique naturel — c’est le créneau parfait. 15-20 minutes, puis un verre d’eau, deux minutes debout, et attaque par une tâche ACTIVE (QCM, rappel) pour relancer la machine. Ne culpabilise pas : c’est de la gestion d’énergie, pas de la paresse.',
    ],
    also: 'Et pour la sieste : 15-20 minutes max, avant 16 h, minuteur obligatoire.',
  },
  {
    id: 'canicule',
    strong: [
      'canicule', 'trop chaud', 'il fait trop chaud', 'chaleur', '35 degres',
      '40 degres', 'chaud pour bosser', 'etouffant',
    ],
    mood: 'think',
    links: [{ label: 'Journée minimale (adapter le format)', to: '/methode/journee-minimale' }],
    variants: [
      'La chaleur dégrade réellement la concentration — ce n’est pas dans ta tête. Stratégie d’été : décale le travail exigeant aux heures fraîches (tôt le matin — c’est là que se gagnent les journées de canicule — et le soir), garde les heures chaudes pour les tâches légères (cartes, relecture d’erreurs), et cherche les lieux climatisés : BU, médiathèque. Eau en continu, volets fermés le jour, aération la nuit.',
      'Plan canicule du réviseur : lever avancé (2 heures de travail au frais du matin valent 4 heures de lutte à 15 h), sessions raccourcies avec plus de pauses, hydratation réelle (l’eau, pas les sodas), et la sieste courte assumée au pic de chaleur. Le corps dépense de l’énergie à se refroidir — réduis l’exigence des heures chaudes sans culpabilité.',
      'Deux conseils qui changent tout par forte chaleur : dors avec la chambre ventilée et rafraîchie AVANT le coucher (douche tiède, volets fermés dès le matin — la nuit fait la récupération, elle est prioritaire), et déplace-toi vers le frais plutôt que de lutter chez toi : une après-midi en BU climatisée est un investissement, pas une fuite.',
    ],
    also: 'Et par canicule : le dur au frais du matin, le léger aux heures chaudes, l’eau en continu.',
  },

  // ================================================== ÉTUDES : FORMATS & MOMENTS
  {
    id: 'groupe-travail',
    strong: [
      'travailler en groupe', 'en groupe', 'binome', 'groupe de travail',
      'reviser a plusieurs', 'a plusieurs', 'seul ou en groupe', 'reviser avec un ami',
      'reviser avec une amie', 'bosser avec quelqu un', 'groupe de revision',
    ],
    mood: 'think',
    links: [
      { label: 'QCM actif (le meilleur format de groupe)', to: '/methode/qcm-actif' },
      { label: 'Feynman (expliquer à l’autre)', to: '/methode/feynman' },
    ],
    variants: [
      'Le groupe est un amplificateur : il amplifie le bon format comme le mauvais. Version rentable : chacun apprend SEUL d’abord, puis le groupe sert à se TESTER mutuellement — questions croisées, QCM commentés à voix haute, chacun explique une notion à l’autre (Feynman à deux, redoutable). Version piège : « réviser ensemble » côte à côte qui devient une conversation avec des polys ouverts.',
      'Le bon binôme vaut de l’or, aux bonnes conditions : mêmes ambitions de régularité (sinon l’un tire l’autre vers le bas), sessions structurées (20 minutes de test croisé valent mieux que 2 heures floues), et un format qui force la récupération : l’un interroge, l’autre répond cours fermé, puis on échange. Expliquer à quelqu’un est un des tests de compréhension les plus honnêtes qui existent.',
      'Règle de répartition : l’apprentissage initial en solo (c’est un travail intime, à ton rythme), la vérification en groupe (tests croisés, confrontation des réponses d’annales, chasse aux pièges à deux). Et un garde-fou : si après chaque session de groupe tu ne sais pas dire ce que TU as récupéré de mémoire, le groupe te fait réviser l’illusion — resserre le format ou reviens au solo.',
    ],
    also: 'Et pour le groupe : seul pour apprendre, à plusieurs pour se tester.',
  },
  {
    id: 'materiel-etude',
    strong: [
      'ipad', 'tablette', 'goodnotes', 'notability', 'papier ou ipad', 'ipad ou papier',
      'quel materiel', 'ordinateur portable', 'imprimer', 'imprimante',
      'imprimer les cours', 'numerique ou papier', 'sur ecran ou sur papier',
    ],
    mood: 'think',
    links: [{ label: 'Prise de notes ciblée', to: '/methode/prise-de-notes' }],
    variants: [
      'Vérité d’abord : aucun matériel ne classe personne — des majors bossent tout papier, d’autres tout iPad. Le support change le confort, la MÉTHODE change le classement. Cela dit, quelques réels avantages : l’iPad centralise (polys, annotations, cartes) et évite l’imprimante ; le papier réduit les tentations (pas de notifications) et force à condenser. Choisis selon TON risque principal : distraction → papier ; désorganisation → numérique.',
      'La question à te poser n’est pas « iPad ou papier » mais « est-ce que mon support me pousse vers le rappel actif ou vers la relecture confortable ? ». Un iPad rempli de polys surlignés = relecture de luxe. Un iPad utilisé pour masquer des schémas, dérouler des cartes et écrire de mémoire = excellent outil. Le même raisonnement vaut pour le papier. L’outil est neutre — l’usage ne l’est pas.',
      'Conseil budget et bon sens : n’achète pas de matériel pour « relancer la motivation » — c’est un achat de procrastination classique (une semaine d’enthousiasme, puis retour au réel). Si ton système actuel te permet de : lire le poly, écrire de mémoire, faire des QCM et réviser tes erreurs — il est complet. Investis ton énergie dans les méthodes, pas dans la vitrine.',
    ],
    also: 'Et pour le matériel : l’outil est neutre — c’est l’usage (rappel ou relecture) qui compte.',
  },
  {
    id: 'jour-colle',
    priority: 12,
    strong: [
      'jour de la colle', 'jour du concours', 'le jour j', 'jour j', 'matin de l epreuve',
      'matin du concours', 'matin de la colle', 'juste avant l epreuve',
      'strategie le jour du concours', 'quoi faire le matin du concours',
      'quoi faire le jour du concours',
    ],
    mood: 'think',
    links: [
      { label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' },
      { label: 'SOS Panique (si ça monte dans le couloir)', to: '/sos/panique' },
    ],
    variants: [
      'Protocole du jour J, éprouvé : petit-déjeuner NORMAL (pas de nouveauté alimentaire), aucune notion nouvelle (elle écraserait les anciennes — au mieux, relis TON document d’erreurs, 20 minutes max), arrivée en avance pour éviter le stress logistique, et le NRAR en poche pour le couloir. Pendant l’épreuve : d’abord tous les points sûrs et rapides, les gouffres à temps en dernier — finir « dans l’ordre » est une habitude scolaire, pas une obligation.',
      'Le matin d’une épreuve, ton niveau est déjà fixé — la seule variable restante, c’est l’état dans lequel tu le livres. Donc tout vise la stabilité : routine habituelle, affaires préparées la veille, téléphone en mode avion tôt (le groupe de promo qui panique est contagieux), respiration longue avant d’entrer. Et si un blanc arrive en pleine épreuve : question suivante, l’accès revient presque toujours en travaillant sur autre chose.',
      'Trois erreurs classiques du jour J, à éviter : réviser du neuf jusqu’à la dernière minute (ça brasse et ça angoisse), écouter les pronostics des autres devant la salle (leur stress devient le tien — mets les écouteurs), et refaire l’épreuve mentalement entre deux matières (c’est fini, ça ne change plus rien — la matière suivante, elle, se joue encore). Chaque épreuve est un match neuf.',
    ],
    also: 'Et le jour J : routine stable, zéro notion nouvelle, les points sûrs d’abord.',
  },
  {
    id: 'apres-colle',
    priority: 12,
    strong: [
      'apres la colle', 'apres l exam', 'apres le concours blanc', 'sortie de colle',
      'attendre les resultats', 'attente des resultats', 'resultats demain',
      'ressasse la colle', 'refais le sujet dans ma tete', 'repense a mes reponses',
    ],
    mood: 'think',
    links: [
      { label: 'Correction par cause (à froid, demain)', to: '/methode/correction-par-cause' },
      { label: 'Journée minimale (l’après-midi d’après)', to: '/methode/journee-minimale' },
    ],
    variants: [
      'Sortie d’épreuve, le cerveau adore rejouer le match en boucle — c’est normal et c’est inutile : tes réponses sont posées, la rumination n’en changera aucune. Le bon enchaînement : une vraie coupure le reste de la journée (tu l’as gagnée), puis DEMAIN, à froid, la Correction par cause sur ce dont tu te souviens. L’analyse à chaud est mauvaise : trop d’émotion, pas assez de recul.',
      'Règle anti-rumination : on ne compare pas ses réponses à la sortie. Ce rituel de couloir (« t’as mis quoi à la 12 ? ») fabrique de l’angoisse à partir d’informations non vérifiées — les gens sûrs d’eux se trompent aussi. Rentre, coupe, récompense-toi. La colle a déjà rempli son rôle : générer de la matière à analyser. Ça se fera demain, proprement, avec la fiche ci-dessous.',
      'L’attente des résultats est un vide que l’angoisse adore remplir. Remplis-le TOI, avec du concret : le lendemain de l’épreuve, note ce dont tu te souviens (questions difficiles, hésitations) pendant que c’est frais — c’est la matière première de ta Correction par cause. Puis reprends le rythme normal : le résultat est derrière toi, la préparation de la suite est devant. C’est elle qui se travaille.',
    ],
    also: 'Et après l’épreuve : coupure aujourd’hui, analyse à froid demain — zéro comparaison de couloir.',
  },
  {
    id: 'rentree',
    priority: 12,
    strong: [
      'la rentree', 'rentree', 'debut d annee', 'premiere semaine', 'je commence la pass',
      'commence pass', 'nouveau en pass', 'nouvelle en pass', 'debut de semestre',
      'conseils pour commencer', 'bien demarrer l annee', 'premiere annee de medecine',
    ],
    mood: 'happy',
    links: [
      { label: 'L’algorithme universel d’un cours', to: '/reperes/algorithme' },
      { label: 'Rappel actif — la méthode socle', to: '/methode/rappel-actif' },
      { label: 'Lancer le diagnostic', to: '/diagnostic' },
    ],
    variants: [
      'Bienvenue — et bravo d’installer la méthode dès le départ : c’est LE meilleur moment. Trois fondations avant tout le reste : 1) le cours du jour travaillé LE JOUR MÊME (jamais de dette dès septembre) ; 2) le rappel actif comme geste par défaut (dès la première page — pas « quand j’aurai fini de tout lire ») ; 3) un rythme TENABLE avec de vraies nuits — l’année est un marathon, ceux qui sprintent septembre le paient en novembre.',
      'Le conseil que les doublants donnent le plus souvent : « j’aurais dû me tester dès le début au lieu de lire et fiche pendant deux mois ». Alors prends l’avance qu’ils n’ont pas eue : l’algorithme universel ci-dessous te donne la séquence exacte pour chaque cours (survol → pré-test → lecture active → rappel immédiat), et le diagnostic t’oriente dès qu’un blocage précis apparaît. Commence simple, commence actif.',
      'Plan des deux premières semaines : installe le SYSTÈME avant de viser le volume — une heure de coucher stable, des blocs de travail nets (Pomodoro), le téléphone hors de la pièce, et chaque cours suivi d’un rappel de mémoire le jour même. Le volume montera naturellement sur un système solide ; l’inverse s’effondre. Et explore la bibliothèque de méthodes tôt : dix minutes de lecture y économisent des semaines d’errance.',
    ],
    also: 'Et pour la rentrée : cours du jour le jour même, rappel actif dès la première page.',
  },
  {
    id: 'amphi-ou-replay',
    strong: [
      'aller en amphi', 'amphi ou replay', 'en presentiel', 'presentiel ou distanciel',
      'aller en cours ou pas', 'secher les cours', 'secher l amphi', 'amphi',
      'cours en direct ou replay', 'assister au cours',
    ],
    mood: 'think',
    links: [
      { label: 'Prise de notes ciblée', to: '/methode/prise-de-notes' },
      { label: 'Le replay bien utilisé', to: '/methode/rappel-actif' },
    ],
    variants: [
      'Réponse sans dogme : le bon format est celui qui garantit un TRAITEMENT ACTIF le jour même. L’amphi t’impose un horaire (précieux si ta discipline flotte), permet les questions, et cale ton rythme. Le replay permet pause et retour (précieux sur les cours denses), mais exige une discipline de fer : sans créneau fixe, « je le regarderai » devient une dette invisible. Choisis par lucidité sur toi-même, pas par confort du matin.',
      'Le critère qui tranche : compare tes résultats réels sur les deux formats (rappel de mémoire post-cours, QCM). Beaucoup découvrent qu’ils retiennent mieux en amphi — l’effort d’y aller, la prise de notes en direct et l’absence de pause forcent l’attention. D’autres traitent mieux en replay maîtrisé. Les deux existent ; ce qui n’existe pas, c’est le replay « plus tard » qui s’accumule. Si tu choisis le replay : créneau fixe, comme un vrai cours.',
      'Piège du tout-replay à connaître : l’isolement s’installe (plus de contact avec la promo, le tutorat, l’ambiance de travail) et le rythme circadien dérive (lever à 11 h, travail de nuit). Si tu passes au distanciel, compense activement : des créneaux fixes, des sessions en BU pour garder un cadre social, et le lever stable. Le format est un outil — la régularité et le traitement actif restent les patrons.',
    ],
    also: 'Et pour amphi/replay : le format qui garantit un traitement actif LE JOUR MÊME gagne.',
  },
  {
    id: 'changer-methode',
    priority: 12,
    strong: [
      'changer de methode', 'ma methode marche pas', 'ma methode ne marche pas',
      'remettre en cause ma methode', 'mauvaise methode', 'changer de strategie',
      'changer ma facon de travailler', 'revoir ma methode', 'ma methode est nulle',
    ],
    mood: 'think',
    links: [
      { label: 'Calibration (mesurer avant de changer)', to: '/methode/calibration-confiance' },
      { label: 'Lancer le diagnostic', to: '/diagnostic' },
    ],
    variants: [
      'Bonne question — mais on change une méthode comme on change un traitement : UNE variable à la fois, mesurée deux semaines. Tout casser d’un coup, c’est repartir de zéro sans savoir ce qui marchait. Le protocole : identifie le maillon faible précis (compréhension ? rétention ? application ? le diagnostic le localise), remplace CE maillon, garde le reste, et compare tes rappels avant/après. La Calibration te donne la mesure objective.',
      'Avant de tout changer, vérifie le diagnostic : « ma méthode ne marche pas » cache souvent « ma méthode n’a pas encore eu le temps de marcher » (le rappel espacé se juge à 3 semaines, pas à 3 jours) ou « je n’applique que la moitié de la méthode » (relire les fiches ≠ les suivre). Relis la fiche de ta méthode principale, applique-la À LA LETTRE dix jours, mesure. Souvent, la méthode allait bien — l’exécution fuyait.',
      'Le changement permanent de méthode est une procrastination déguisée en optimisation : chaque nouveau système offre deux jours d’enthousiasme et zéro consolidation. La stabilité prime : un système simple (rappel actif + espacement + analyse d’erreurs) appliqué dix semaines bat dix systèmes essayés une semaine. Si un blocage précis persiste, on ajuste chirurgicalement — dis-moi lequel, ou lance le diagnostic.',
    ],
    also: 'Et pour la méthode : une variable à la fois, mesurée deux semaines — jamais tout d’un coup.',
  },
  {
    id: 'numerus-places',
    priority: 12,
    strong: [
      'numerus', 'nombre de places', 'places en medecine', 'combien de places',
      'taux de reussite', 'pourcentage de reussite', 'chances de reussir',
      'statistiques de reussite', 'combien passent en deuxieme annee',
    ],
    mood: 'think',
    links: [{ label: 'Calibration (la seule statistique utile : la tienne)', to: '/methode/calibration-confiance' }],
    variants: [
      'Honnêteté d’abord : les chiffres exacts (places, taux) varient selon les facs et les années, et je suis 100 % hors ligne — je refuse de te donner un nombre potentiellement faux. La source fiable : le site de TON université et le service scolarité. Mais surtout : ce chiffre ne change RIEN à ta stratégie. Qu’il y ait 15 % ou 30 % de places, le chemin est identique — méthodes actives, régularité, analyse d’erreurs. Le taux global n’est pas TA probabilité.',
      'Je comprends le réflexe de regarder les statistiques — mais regarde ce qu’elles font : elles nourrissent l’angoisse sans donner un seul point. Le taux de réussite moyen mélange ceux qui bossent avec méthode et ceux qui abandonnent en novembre — ta probabilité personnelle dépend de ton travail, pas de la moyenne. La seule stat qui mérite ton attention : ta courbe de progression sur les colles. Elle, tu peux l’améliorer ce soir.',
      'Le concours est sélectif, c’est un fait — et le vivre par les pourcentages est le meilleur moyen de se paralyser. Remets les chiffres à leur place : tu ne joues pas contre un taux, tu construis un niveau. Chaque unité validée, chaque erreur corrigée déplace TA position réelle. Les infos officielles (places par filière) sont à la scolarité si tu en as besoin pour tes choix — pour le reste, retour au processus : c’est lui qui décide.',
    ],
    also: 'Et pour les stats : la seule courbe qui compte, c’est la tienne — le reste angoisse sans classer.',
  },
  {
    id: 'autres-filieres',
    priority: 12,
    strong: [
      'kine', 'kinesitherapie', 'dentaire', 'odontologie', 'pharmacie', 'sage femme',
      'maieutique', 'choisir ma filiere', 'quelle filiere', 'medecine ou kine',
      'medecine ou dentaire', 'medecine ou pharmacie', 'hesiter entre les filieres',
    ],
    mood: 'think',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'Grande question — et je vais rester à ma place : les modalités de choix de filière (vœux, classements par filière, places) sont réglementaires et locales, donc tes sources fiables sont le service scolarité/orientation de TA fac et les étudiants de ces filières (les assos font souvent des soirées découverte — vas-y). Ce que je peux te dire : hésiter est normal et sain, ce sont tous de beaux métiers de soin, et ton travail actuel sert TOUTES les portes. Le choix se précisera en avançant.',
      'Bonne nouvelle : cette hésitation n’a aucun impact sur ta préparation d’aujourd’hui — les méthodes et le niveau que tu construis servent toutes les filières. Donc pas besoin de trancher ce soir. Pour nourrir la réflexion sans angoisse : rencontre des étudiants de chaque filière (leurs quotidiens diffèrent plus qu’on ne croit), renseigne-toi sur les métiers réels (pas les clichés), et note tes vœux provisoires quelque part — tu les affineras avec les vraies infos de ta scolarité.',
      'Un conseil pour décider sereinement le moment venu : compare les MÉTIERS (quotidien, gestes, relation aux patients, rythme de vie), pas les prestiges supposés — un·e kiné épanoui·e bat un médecin qui s’est choisi par défaut. Et méfie-toi des choix par stratégie de classement pur : quatre ans d’études dans une filière non désirée coûtent plus cher qu’un classement. Les infos officielles sont à ta scolarité ; le reste est une conversation à avoir avec toi-même — et elle a le droit de prendre du temps.',
    ],
    also: 'Et pour la filière : compare les métiers réels, pas les prestiges — et la scolarité a les règles exactes.',
  },
  {
    id: 'dictaphone-audio',
    strong: [
      'dictaphone', 'enregistrer les cours', 'ecouter mes cours', 'en audio',
      'version audio', 'reecouter le cours', 'cours en podcast', 'm enregistrer',
    ],
    mood: 'think',
    links: [
      { label: 'Rappel actif (la version audio utile)', to: '/methode/rappel-actif' },
      { label: 'Répétition espacée (le format trajet)', to: '/methode/repetition-espacee' },
    ],
    variants: [
      'L’audio a un piège et une pépite. Le piège : réécouter le cours en fond sonore — ça donne une impression de travail pour presque zéro rétention (l’attention décroche sans qu’on s’en rende compte). La pépite : T’ENREGISTRER en train de réciter de mémoire (un rappel actif sonore), puis réécouter en trajet pour vérifier et compléter mentalement. Le même outil, deux rentabilités opposées.',
      'Si tu veux exploiter l’audio intelligemment : enregistre tes propres synthèses de 3-5 minutes par chapitre (de mémoire, cours fermé — l’enregistrement EST déjà un rappel actif), et fais-en ta bibliothèque de trajet. Réécouter SA voix résumer SON cours bat tous les podcasts : c’est calibré sur ce que tu dois savoir, et chaque écoute déclenche des micro-rappels (« et la suite, c’était quoi déjà ? »).',
      'Sur la réécoute intégrale des cours enregistrés : à réserver aux passages précis mal compris (retour ciblé sur 5 minutes), jamais en boucle de fond — un cours de 2 h réécouté passivement coûte 2 h pour un gain minuscule. L’oreille est excellente pour VÉRIFIER (après un rappel) et pour ancrer des séquences orales, mauvaise pour apprendre du dense en première intention. Actif d’abord, audio en appui.',
    ],
    also: 'Et pour l’audio : enregistre TES rappels de mémoire, réécoute en trajet — jamais le cours en fond sonore.',
  },

  // ============================================================ MÉTA / AXEL
  {
    id: 'axel-perso',
    priority: 8,
    strong: [
      'quel age', 'ton age', 'tu manges quoi', 'tu manges', 'tu dors ou', 'tu dors quand',
      'ta couleur preferee', 'tu aimes quoi', 't aimes quoi', 'chante', 'une chanson',
      'tu habites ou', 'ta famille', 't es un garcon', 't es une fille',
      'tu ressembles a quoi', 'ton plat prefere', 'tu fais quoi de tes journees',
      'tu t ennuies jamais', 'raconte moi ta vie',
    ],
    mood: 'cheer',
    variants: [
      'Fiche d’identité complète : Axel, neurone, âge inconnu (le temps ne passe pas pareil dans une app), domicile : ta poche, régime alimentaire : glucose et questions bien posées, passion : les rappels actifs réussis. Je ne dors jamais — c’est pour ça que je sais que TOI tu devrais. Bon, assez parlé de moi : c’est quoi ton blocage du jour ?',
      'Moi ? Je vis ici, entre tes fiches et tes citations. Couleur préférée : le bleu synapse (mais je me teins en rouge ou en vert selon l’humeur que tu me choisis). Talent caché : je ne me vexe jamais et je ne raconte rien à personne — tout reste sur ton appareil. Talent que je n’ai pas : chanter. Allez, à toi : qu’est-ce qui coince aujourd’hui ?',
      'J’adorerais te raconter ma vie, mais elle tient en une phrase : je suis un neurone qui attend tes questions en faisant des pompes synaptiques. Le plus intéressant de nous deux, c’est toi — et ton concours. Dis-moi où tu en es, ou touche une suggestion en bas : c’est là que je deviens vraiment bavard.',
    ],
  },
  {
    id: 'hors-champ',
    priority: 8,
    strong: [
      'cherche sur internet', 'va sur internet', 'sur google', 'google', 'chatgpt',
      'envoie un message', 'appelle', 'passe un appel', 'connecte toi',
      'quelle heure il est', 'quelle heure', 'la meteo', 'quel temps il fait',
      'mets une alarme', 'mets un rappel', 'envoie un mail', 'gpt',
    ],
    mood: 'think',
    links: [
      { label: 'Chercher dans les méthodes', to: '/recherche' },
      { label: 'La bibliothèque complète', to: '/bibliotheque' },
    ],
    variants: [
      'Là, je dois être honnête sur mes limites : je suis 100 % local — aucun internet, aucun appel, aucun accès à ton téléphone. C’est un choix (rien ne sort de ton appareil, jamais), et ça veut dire que je ne peux ni chercher en ligne, ni envoyer quoi que ce soit, ni te donner l’heure ou la météo. Ce que je fais très bien en revanche : méthodes, blocages, moral de concours. Et pour un minuteur : chaque fiche chronométrée en a un intégré.',
      'Pas possible pour moi, et je préfère te le dire clairement : pas de connexion, pas de messages, pas d’alarmes — je vis entièrement hors ligne dans ton appareil, c’est ma garantie de confidentialité. Pour ça, ton téléphone fait mieux que moi. Pour la méthode de travail, le bon protocole au bon moment et un coup de moral à 2 h du matin — là, je suis ton neurone.',
      'Je vais te décevoir sur ce coup : zéro internet ici — ni recherche en ligne, ni IA distante, ni messagerie. Tout ce que je sais tient dans l’app : 47 méthodes, 12 protocoles de matière, 10 SOS, et pas mal de répartie. Si ta question porte sur les révisions, reformule-la moi ; si c’est une vraie recherche web, ton navigateur s’en chargera mieux que moi — puis reviens, je garde ta place.',
    ],
  },
  {
    id: 'correction-axel',
    priority: 8,
    strong: [
      'tu te trompes', 'tu as tort', 'c est faux ce que tu dis', 'tu dis n importe quoi',
      'tu racontes n importe quoi', 'faux ce que tu racontes', 'c est pas vrai ce que tu dis',
      'tu es sur de ca', 't es sur de ca', 'tu es sur de toi', 'source de ce que tu dis',
      'tes sources',
    ],
    mood: 'think',
    links: [
      { label: 'Sources et niveau de preuve du corpus', to: '/reperes/sources' },
      { label: 'Chercher la fiche exacte', to: '/recherche' },
    ],
    variants: [
      'Tu as raison de vérifier — c’est exactement le réflexe que le corpus t’apprend. Deux précisions honnêtes : mes réponses viennent des fiches de l’app (bâties sur la science de l’apprentissage — la page Sources détaille les niveaux de preuve), et je peux mal COMPRENDRE ta question et répondre à côté. Si c’est un fait de COURS qui nous oppose : ton poly gagne, toujours — c’est lui qui note. Si c’est une méthode : dis-moi ce qui te semble faux, on regarde la fiche ensemble.',
      'Possible ! Je ne suis pas infaillible — surtout si j’ai mal saisi ta question (ça arrive, je fonctionne aux mots-clés). Reformule ce que tu voulais dire, ou dis-moi précisément quel point te semble faux : si c’est sur une méthode, la fiche source est ouvrable ci-dessous ; si c’est sur ton cours, fie-toi au poly officiel de ta fac plutôt qu’à n’importe qui — moi compris. Le doute méthodique est une qualité de futur soignant, garde-le.',
      'Merci de me challenger — je préfère un utilisateur qui vérifie à un utilisateur qui gobe. Mon périmètre : les méthodes de travail du corpus, avec leurs sources (page ci-dessous). Hors de ce périmètre — contenu de cours, règles de ta fac, actualités — je ne fais pas autorité, et ton poly ou ta scolarité priment. Alors : qu’est-ce qui te semble faux exactement ? Si tu tiens le bon bout, tu viens d’apprendre quelque chose ; si c’est moi, reformulons.',
    ],
  },
];
