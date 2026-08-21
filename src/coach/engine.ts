import { foldPhrase } from '../search/normalize';
import { COACH_LINES } from '../content/coach-lines';
import { SUBJECTS } from '../content/subjects';
import type { AxelMood } from '../ui/Axel';

/**
 * Le moteur d'Axel : 100 % local et déterministe dans sa logique.
 * - le message est normalisé comme la recherche (accents, casse, apostrophes),
 *   donc « je STRESSE !! » et « jé stresse » se comprennent pareil ;
 * - chaque intention a plusieurs formulations de réponse : on n'envoie jamais
 *   deux fois la même d'affilée, pour que ça parle naturellement ;
 * - la détresse passe toujours en premier et oriente vers des humains — Axel
 *   est un coach de méthodes, jamais un soin.
 */

export interface CoachLink {
  label: string;
  to: string;
}

export interface CoachReply {
  text: string;
  links: CoachLink[];
  mood: AxelMood;
  intent: string;
}

interface Intent {
  id: string;
  /** Mots-clés en forme normalisée (minuscules, sans accents). */
  keywords: string[];
  /** Plus haut = gagne en cas de concurrence (détresse = 100). */
  priority: number;
  variants: string[];
  links: CoachLink[];
  mood: AxelMood;
}

/** Normalisation : pliage recherche + ponctuation neutralisée. */
function norm(input: string): string {
  return foldPhrase(input)
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Les mots très courts exigent un mot entier (évite « con » dans « concours »). */
function matches(padded: string, keyword: string): boolean {
  if (keyword.length <= 4) return padded.includes(` ${keyword} `);
  return padded.includes(keyword);
}

const INTENTS: Intent[] = [
  {
    id: 'detresse',
    priority: 100,
    keywords: [
      'craquer', 'craque', 'pleure', 'pleurer', 'plus envie de rien', 'envie de rien',
      'abandonner', 'tout arreter', 'arreter medecine', 'deprime', 'deprimee',
      'je vais pas bien', 'vais mal', 'mal etre', 'me faire du mal', 'plus de sens',
      'desespere', 'desesperee', 'plus la force', 'a bout', 'je n en peux plus',
      'n en peux plus', 'envie de disparaitre', 'suicid',
    ],
    mood: 'care',
    links: [{ label: 'Protocole Détresse (avec les bons numéros)', to: '/sos/detresse' }],
    variants: [
      'Ce que tu ressens compte plus que n’importe quel cours. Je suis un coach de méthodes, pas un soutien psychologique — et là, c’est d’un humain dont tu as besoin : un proche, ton médecin, ou le 3114 (gratuit, 24 h/24). Le protocole Détresse de l’app liste les bons contacts. Le travail attendra, toi d’abord.',
      'Merci de me le dire. Là, ce n’est plus une question de méthode : parle à quelqu’un de vrai — un proche, ton médecin, ou le 3114, gratuit, jour et nuit. J’ai mis le protocole Détresse juste en dessous, il est fait exactement pour ce moment. Les cours peuvent attendre, vraiment.',
      'Stop, on met les révisions de côté une minute. Ce que tu décris mérite un humain, pas une app : un proche de confiance, ton médecin, ou le 3114 à toute heure. Ouvre le protocole Détresse ci-dessous — première étape : ne pas rester seul·e avec ça.',
      'Je te prends au sérieux. Une app ne soigne pas, et je ne vais pas faire semblant : contacte quelqu’un de vrai — un proche, ton médecin, le 3114 (gratuit, 24 h/24). Le protocole Détresse ci-dessous te guide pas à pas. Reviens vers les méthodes quand ça ira mieux, elles t’attendront.',
    ],
  },
  {
    id: 'panique',
    priority: 60,
    keywords: [
      'panique', 'crise d angoisse', 'crise de panique', 'respire plus',
      'coeur qui bat', 'tetanise', 'tetanisee', 'bloque devant ma copie',
    ],
    mood: 'care',
    links: [
      { label: 'SOS Panique avant une épreuve', to: '/sos/panique' },
      { label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' },
    ],
    variants: [
      'D’accord. D’abord le corps, ensuite les cours : expire lentement, plus long que l’inspiration, quatre fois. Puis ouvre le SOS Panique ci-dessous — il te prend par la main, étape par étape.',
      'Respire avec moi : inspire 4 secondes, expire 6, quatre cycles. La panique monte puis redescend toujours — laisse-la passer. Le SOS Panique ci-dessous enchaîne exactement les bons gestes.',
      'Ça arrive même aux meilleurs, et ça se gère : allonge tes expirations pendant une minute, pose les deux pieds au sol. Ensuite, suis le SOS Panique — chaque étape est écrite pour ce moment précis.',
      'Une chose à la fois. Ton cerveau est en alarme, pas en panne : une minute d’expirations longues, puis le protocole NRAR ci-dessous pour redescendre et te remettre en route.',
    ],
  },
  {
    id: 'stress',
    priority: 30,
    keywords: [
      'stress', 'stresse', 'stressee', 'pression', 'anxieux', 'anxieuse', 'anxiete',
      'peur du concours', 'peur de rater', 'boule au ventre',
    ],
    mood: 'care',
    links: [
      { label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' },
      { label: 'SOS Panique (si ça monte fort)', to: '/sos/panique' },
    ],
    variants: [
      'Le stress te dit que c’est important — pas que tu vas échouer. Transforme-le en carburant : une expiration longue, puis UNE tâche précise. Le protocole NRAR ci-dessous fait exactement ça.',
      'Normal d’avoir la pression : l’enjeu est réel. Mais l’anxiété regarde demain, le travail regarde maintenant. Reviens à l’heure qui vient : une unité de cours, un vrai rappel. Le NRAR t’aide à redescendre d’abord.',
      'Le concours se joue sur des mois, pas sur ton angoisse de ce soir. Réduis la fenêtre : la prochaine heure seulement. Et si ça monte trop fort, le SOS Panique est là pour ça.',
      'Ce que tu contrôles : ta prochaine heure, ta méthode, ton sommeil. Ce que tu ne contrôles pas : le classement des autres. Investis à 100 % dans la première colonne — commence par le NRAR ci-dessous.',
    ],
  },
  {
    id: 'procrastination',
    priority: 20,
    keywords: [
      'procrastin', 'arrive pas a commencer', 'arrive pas a m y mettre', 'repousse',
      'flemme', 'me lance pas', 'pas motive', 'pas motivee', 'demarre pas',
      'glande', 'perds mon temps', 'traine', 'commence pas',
    ],
    mood: 'happy',
    links: [
      { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
      { label: 'SOS Je n’arrive pas à commencer', to: '/sos/commencer' },
    ],
    variants: [
      'On ne va pas attendre la motivation — elle arrive toujours APRÈS le démarrage, jamais avant. Contrat minimal : 10 minutes, une seule unité de cours, minuteur lancé. Après, tu décides. Ouvre le Démarrage en 10 minutes ci-dessous.',
      'Ce n’est pas de la paresse, c’est un démarrage trop gros. Réduis : pas « bosser l’anat », mais « lire une page et la réciter ». 10 minutes chrono, c’est tout ce qu’on décide maintenant.',
      'Règle anti-procrastination : rends le premier pas ridicule de facilité. Ouvre le poly à la bonne page, mets le téléphone dans une autre pièce, lance 10 minutes. Le protocole ci-dessous fait le reste.',
      'Tu réfléchis à ta session au lieu de la faire — ça arrive à tout le monde. Bascule en mode exécution : le Démarrage en 10 minutes te donne un contrat court et précis. Lance-le, on en reparle après.',
      'La flemme adore le flou. Tue le flou : UNE unité (une page, un schéma), UN minuteur de 10 minutes, ZÉRO onglet ouvert. Vas-y maintenant, pas à l’heure pile.',
    ],
  },
  {
    id: 'ca-rentre-pas',
    priority: 20,
    keywords: [
      'rentre pas', 'retiens rien', 'retiens pas', 'memorise pas', 'oublie tout',
      'oublie tout le temps', 'rien ne reste', 'memoire', 'retenir mon cours',
    ],
    mood: 'think',
    links: [
      { label: 'SOS Ça ne rentre pas', to: '/sos/ca-rentre-pas' },
      { label: 'Rappel actif — la méthode reine', to: '/methode/rappel-actif' },
      { label: 'Répétition espacée', to: '/methode/repetition-espacee' },
    ],
    variants: [
      'Si ça ne rentre pas, c’est presque toujours le même coupable : tu relis au lieu de te tester. Ferme le cours, feuille blanche, écris tout ce que tu sais — puis compare. C’est inconfortable, et c’est exactement pour ça que ça marche.',
      'La mémoire ne se remplit pas, elle se muscle : chaque rappel de mémoire creuse le chemin. Le SOS ci-dessous te fait basculer de la relecture au rappel actif en une session.',
      'Trois leviers, dans l’ordre : te tester (rappel actif), espacer les reprises (répétition espacée), dormir. Si tu fais déjà les trois, on affine — dis-m’en plus ou lance le diagnostic.',
      'Ce qui glisse, c’est ce qu’on regarde. Ce qui tient, c’est ce qu’on récupère. Transforme chaque relecture en question : cache, récite, vérifie. Les deux fiches ci-dessous sont tes armes de base.',
    ],
  },
  {
    id: 'confusion',
    priority: 20,
    keywords: [
      'confonds', 'confond', 'melange', 'melange tout', 'ressemblent', 'se ressemble',
      'deux notions', 'similaires',
    ],
    mood: 'think',
    links: [
      { label: 'Tableau de contraste', to: '/methode/tableau-contraste' },
      { label: 'Entrelacement (mélanger les cas)', to: '/methode/interleaving' },
    ],
    variants: [
      'Deux notions qui se mélangent, c’est qu’elles ne se sont jamais rencontrées : mets-les côte à côte dans un tableau, ligne par ligne, et cherche LE détail qui tranche — le discriminant roi. Après ça, impossible de les confondre.',
      'Le cerveau confond ce qu’il apprend séparément. Le remède : le tableau de contraste (face à face, critère par critère), puis des questions mélangées pour t’entraîner à trancher.',
      'Classique en PASS — isoformes, voies, molécules jumelles… Le tableau de contraste ci-dessous est fait pour ça : deux colonnes, les différences en gras, et tu récites le discriminant de mémoire.',
      'Ne réapprends pas chaque notion de zéro : travaille la frontière entre les deux. Tableau de contraste d’abord, entrelacement ensuite pour tester la frontière dans le désordre.',
    ],
  },
  {
    id: 'par-coeur',
    priority: 15,
    keywords: [
      'par coeur', 'liste a retenir', 'apprendre une liste', 'noms a retenir',
      'valeurs a retenir', 'arbitraire', 'classification', 'nomenclature', 'moyen mnemotechnique', 'mnemotechnique',
    ],
    mood: 'happy',
    links: [
      { label: 'Imagerie mentale interactive', to: '/methode/imagerie-interactive' },
      { label: 'Association phonétique', to: '/methode/association-phonetique' },
      { label: 'Histoire-chaînage (pour les séquences)', to: '/methode/histoire-chainage' },
    ],
    variants: [
      'Pour l’arbitraire pur (noms, valeurs, listes), la compréhension ne suffit pas — il faut des accroches : image mentale interactive, jeu de mots phonétique, ou histoire qui enchaîne les éléments. Choisis l’arme selon la cible ci-dessous.',
      'Une liste sans logique s’apprend avec des béquilles assumées : une image frappante par élément, ou une histoire courte qui les enchaîne dans l’ordre. Quelques secondes de fabrication, des semaines de rappel.',
      'Le par-cœur se gagne en deux temps : une accroche mémorable (image, son, histoire) pour installer, puis la répétition espacée pour faire durer. Commence par l’accroche — les trois fiches ci-dessous.',
      'Astuce de concours : plus c’est absurde, mieux ça tient. Fabrique une image vivante et exagérée par élément à retenir — puis teste-toi de mémoire. L’imagerie interactive t’explique le geste exact.',
    ],
  },
  {
    id: 'qcm',
    priority: 20,
    keywords: [
      'qcm', 'rate les qcm', 'items', 'pieges', 'tombe dans les pieges',
      'colles blanches', 'banque de qcm',
    ],
    mood: 'think',
    links: [
      { label: 'SOS Je rate mes QCM', to: '/sos/qcm-rates' },
      { label: 'QCM actif (bien s’entraîner)', to: '/methode/qcm-actif' },
      { label: 'Correction par cause d’erreur', to: '/methode/correction-par-cause' },
    ],
    variants: [
      'Rater des QCM, c’est une mine d’or si tu corriges par CAUSE : cours pas su ? mal lu ? piège de formulation ? mauvais raisonnement ? Chaque cause a son remède — le SOS ci-dessous te fait faire le tri en une session.',
      'Ne compte pas ton score, dissèque-le : chaque erreur va dans une colonne (connaissance, lecture, piège, raisonnement). Tu sauras enfin QUOI corriger au lieu de « refaire des QCM » au hasard.',
      'Le QCM est une épreuve de discrimination fine : entraîne-toi en justifiant chaque item À VOIX HAUTE, vrai comme faux. C’est le QCM actif — bien plus rentable que d’en enchaîner des paquets.',
      'Trois questions à te poser après chaque colle : quelles erreurs viennent du cours ? lesquelles de la lecture ? lesquelles du piège ? La correction par cause ci-dessous transforme chaque échec en points.',
    ],
  },
  {
    id: 'fatigue',
    priority: 25,
    keywords: [
      'fatigue', 'fatiguee', 'epuise', 'epuisee', 'creve', 'crevee', 'mal dormi',
      'nuit blanche', 'sommeil', 'dormir', 'plus d energie', 'vide',
    ],
    mood: 'care',
    links: [
      { label: 'SOS Fatigue', to: '/sos/fatigue' },
      { label: 'Journée minimale (jour sans forme)', to: '/methode/journee-minimale' },
    ],
    variants: [
      'La fatigue n’est pas un manque de volonté, c’est une donnée physiologique. Aujourd’hui : journée minimale — un objectif réduit mais réel, pas zéro. Et le sommeil de ce soir est ta séance de consolidation la plus rentable.',
      'On n’apprend rien contre un cerveau épuisé : il consolide en dormant. Fais la version minimale de ta journée (le SOS Fatigue te la donne), couche-toi tôt, et reprends demain à pleine puissance.',
      'Sois stratège : mieux vaut 45 minutes efficaces + une vraie nuit que 4 heures de présence molle. La Journée minimale ci-dessous définit le strict nécessaire — fais-le, puis repos sans culpabilité.',
      'Signal reçu. Deux règles : pas de nuit blanche (jamais rentable en PASS), et un minimum incompressible aujourd’hui pour garder la chaîne intacte. Le SOS Fatigue t’organise ça en trois étapes.',
    ],
  },
  {
    id: 'retard',
    priority: 20,
    keywords: [
      'retard', 'deborde', 'debordee', 'submerge', 'submergee', 'trop de cours',
      'jamais a jour', 'accumule', 'course apres', 'rattraper',
    ],
    mood: 'think',
    links: [
      { label: 'SOS Je suis débordé·e', to: '/sos/retard' },
      { label: 'Triage du retard', to: '/methode/triage-retard' },
    ],
    variants: [
      'Le retard se triage, il ne se rattrape pas en bloc : classe chaque cours en « rentable maintenant / plus tard / à sacrifier partiellement », et commence par le plus rentable pour le concours. Le Triage ci-dessous te donne les critères exacts.',
      'Mauvaise nouvelle : tu ne rattraperas pas tout. Bonne nouvelle : tu n’en as pas besoin — le concours récompense la maîtrise du rentable, pas l’exhaustivité. On triage d’abord, on fonce ensuite.',
      'Arrête la course, pose-toi 20 minutes avec le SOS Débordé·e : inventaire, tri par rentabilité, plan de reprise réaliste. Tu repartiras avec une liste claire au lieu d’une boule au ventre.',
      'Être à jour est un mythe en PASS — viser 100 % te coûte les 80 % qui comptent. Le Triage du retard t’apprend à choisir froidement. C’est une compétence de major, pas un aveu d’échec.',
    ],
  },
  {
    id: 'comprends-rien',
    priority: 20,
    keywords: [
      'comprends rien', 'comprend rien', 'comprends pas', 'comprend pas', 'trop dur',
      'perdu', 'perdue', 'aucun sens', 'obscur',
    ],
    mood: 'think',
    links: [
      { label: 'SOS Je ne comprends plus rien', to: '/sos/comprends-plus-rien' },
      { label: 'Méthode de Feynman (expliquer simple)', to: '/methode/feynman' },
      { label: 'Exemple résolu (partir d’un cas)', to: '/methode/exemple-resolu' },
    ],
    variants: [
      'Quand plus rien n’a de sens, on redescend d’un étage : trouve la dernière chose que tu comprenais VRAIMENT, repars de là, et avance par exemples résolus plutôt que par théorie. Le SOS ci-dessous fait ce chemin avec toi.',
      'Ne relis pas plus fort — change d’angle : prends un exemple concret résolu et remonte vers la règle. Puis explique le passage bloquant avec tes mots, comme à un enfant : le trou exact apparaîtra.',
      'C’est le signal Feynman : essaie d’expliquer le passage simplement, à voix haute. Là où tu bloques, c’est LE point précis à retravailler — pas tout le chapitre. Fiche ci-dessous.',
      '« Je ne comprends rien » cache presque toujours UN maillon manquant précis. On le localise (SOS ci-dessous), on le répare par un exemple résolu, et la suite se débloque en cascade.',
    ],
  },
  {
    id: 'concentration',
    priority: 20,
    keywords: [
      'concentre', 'concentrer', 'concentration', 'distrait', 'distraite', 'deconcentre',
      'telephone', 'tiktok', 'instagram', 'reseaux', 'scrolle', 'scroll', 'focus',
    ],
    mood: 'happy',
    links: [
      { label: 'Friction numérique (téléphone hors-jeu)', to: '/methode/friction-numerique' },
      { label: 'Pomodoro (blocs + pauses)', to: '/methode/pomodoro' },
    ],
    variants: [
      'La concentration ne se force pas, elle s’organise : téléphone physiquement dans une autre pièce (la friction fait tout), un bloc de 25-50 minutes, une seule unité de cours. Les deux fiches ci-dessous montent le dispositif.',
      'Ton attention est le vrai enjeu du concours. Rends la distraction coûteuse : téléphone loin, notifications coupées, un onglet. Puis des blocs courts avec de vraies pauses — c’est le Pomodoro.',
      'Chaque coup d’œil au téléphone coûte plusieurs minutes de re-concentration. La solution n’est pas la volonté, c’est la friction : mets-le hors de portée AVANT la session. Fiche ci-dessous, elle est radicale et elle marche.',
      'Scroller pendant la pause, c’est saboter la pause. Blocs de travail nets, pauses SANS écran (marcher, boire, regarder loin). Le Pomodoro cadre tout ça proprement.',
    ],
  },
  {
    id: 'anki',
    priority: 20,
    keywords: [
      'anki', 'flashcard', 'flashcards', 'cartes memoire', 'deck', 'paquets de cartes',
      'anki deborde', 'anki me deborde', 'trop de cartes', 'revisions anki',
    ],
    mood: 'think',
    links: [
      { label: 'SOS Anki me déborde', to: '/sos/anki-deborde' },
      { label: 'Répétition espacée (le principe)', to: '/methode/repetition-espacee' },
      { label: 'Audit de deck', to: '/methode/audit-deck' },
    ],
    variants: [
      'Anki est un outil de RÉTENTION, pas de compréhension : n’y mets que ce qui est déjà compris, en cartes atomiques (une question, une réponse). Si les révisions débordent, le SOS ci-dessous assainit ton deck en une session.',
      'Règle d’or : une carte = un fait précis, formulé en question. Les cartes fourre-tout créent la montagne de révisions qui t’écrase. L’Audit de deck te fait le grand tri.',
      'Si Anki devient une corvée, c’est le deck qui est malade, pas toi : trop de cartes non comprises, mal découpées ou inutiles. Audit ci-dessous : supprimer, reformuler, atomiser.',
      'Anki oui, mais après compréhension et premier rappel actif — jamais à la place. Et est-ce que tout mérite une carte ? Le SOS t’aide à trancher ce qui entre et ce qui sort.',
    ],
  },
  {
    id: 'planning',
    priority: 15,
    keywords: [
      'planning', 'planifier', 'organiser ma semaine', 'organiser mes revisions',
      'emploi du temps', 'todo', 'to do', 'organisation',
    ],
    mood: 'think',
    links: [
      { label: 'Journée minimale', to: '/methode/journee-minimale' },
      { label: 'Triage (choisir quoi bosser)', to: '/methode/triage-retard' },
    ],
    variants: [
      'Choix assumé : pas de planner ni de méthode des J ici — les usines à planning consomment le temps qu’elles prétendent organiser. À la place : un socle minimal quotidien (Journée minimale) et un tri froid de ce qui est rentable (Triage). Simple et tenable.',
      'Le meilleur planning est celui qui survit à une mauvaise journée : définis ton minimum incompressible (fiche ci-dessous), fais-le CHAQUE jour, et ajoute par-dessus quand ça va. La régularité bat l’architecture.',
      'Planifie en unités de travail, pas en heures : « 2 rappels d’anat + 1 série de QCM », pas « 3 h d’anat ». Les heures se subissent, les unités se valident. La Journée minimale t’installe ce réflexe.',
    ],
  },
  {
    id: 'note-ratee',
    priority: 15,
    keywords: [
      'mauvaise note', 'rate ma colle', 'rate mon concours blanc', 'echoue', 'echec',
      'classement', 'mal classe', 'mal classee', 'resultat decevant', 'note decevante',
    ],
    mood: 'care',
    links: [
      { label: 'Correction par cause d’erreur', to: '/methode/correction-par-cause' },
      { label: 'Calibration de confiance', to: '/methode/calibration-confiance' },
    ],
    variants: [
      'Une note, c’est une mesure à un instant T — pas ton niveau final, encore moins ta valeur. Ce qui compte : d’où viennent les points perdus ? La Correction par cause te le dit noir sur blanc, et c’est là que sont tes prochains points.',
      'Les classements bougent énormément sur une année — ceux qui montent sont ceux qui corrigent par cause au lieu de ruminer le rang. Une session d’analyse ci-dessous, puis on repart.',
      'D’abord : encaisser, c’est normal que ça pique. Ensuite, à froid : chaque erreur classée par cause (cours, lecture, piège, raisonnement), chaque cause son remède. C’est LA séance la plus rentable de ta semaine.',
      'Un concours blanc raté qui est bien analysé vaut mieux qu’un réussi par chance : tu sais exactement quoi réparer. Fiche ci-dessous — et la Calibration t’apprend à savoir quand tu sais.',
    ],
  },
  {
    id: 'pause',
    priority: 12,
    keywords: ['pause', 'pauses', 'combien de temps travailler', 'rythme de travail', 'pomodoro'],
    mood: 'happy',
    links: [{ label: 'Pomodoro (blocs + pauses)', to: '/methode/pomodoro' }],
    variants: [
      'Les pauses font partie du travail : 25-50 minutes de bloc, 5-10 minutes de vraie pause SANS écran (marcher, boire, regarder loin). Le Pomodoro cadre tout ça — et ne coupe jamais un raisonnement en plein élan.',
      'Règle simple : des blocs nets, des pauses nettes. Une pause à scroller n’est pas une pause — ton attention ne récupère pas. Fiche Pomodoro ci-dessous pour le tempo exact.',
      'Si tu satures, la pause est un outil, pas une triche : 5 minutes debout, fenêtre, eau. Tu reviens avec un cerveau qui classe mieux. Le minuteur intégré à la fiche fait le chef d’orchestre.',
    ],
  },
  {
    id: 'motive-moi',
    priority: 15,
    keywords: [
      'motive', 'motive moi', 'motivation', 'citation', 'booste', 'booste moi',
      'encourage', 'inspire', 'donne moi de la force', 'remonte le moral',
    ],
    mood: 'cheer',
    links: [{ label: 'Toutes les citations en plein écran', to: '/citations/plein-ecran' }],
    variants: [
      '{line}\n\nMaintenant, du concret : choisis UNE unité de cours et lance 10 minutes. La motivation suit l’action, jamais l’inverse.',
      '{line}\n\nGarde ça en tête — puis transforme-le en geste : une page, un rappel de mémoire, maintenant.',
      '{line}\n\nEt souviens-toi : tu n’as pas besoin d’être au top pour bosser. C’est en bossant qu’on se remet au top.',
      '{line}\n\nRespire, redresse-toi, et prends le prochain petit pas. C’est comme ça qu’on gagne une année.',
    ],
  },
  {
    id: 'quelle-methode',
    priority: 12,
    keywords: [
      'quelle methode', 'quelles methodes', 'par ou commencer', 'comment apprendre',
      'comment reviser', 'comment travailler', 'quoi faire ce soir', 'que faire',
      'meilleure methode', 'conseille',
    ],
    mood: 'happy',
    links: [
      { label: 'Lancer le diagnostic (3 à 5 questions)', to: '/diagnostic' },
      { label: 'Parcourir la bibliothèque', to: '/bibliotheque' },
    ],
    variants: [
      'La bonne méthode dépend de trois choses : le type d’info (mécanisme ? liste ? formule ?), ton problème (comprendre ? retenir ? appliquer ?) et l’échéance. Le diagnostic ci-dessous croise tout ça en 3 à 5 questions et te sort la méthode exacte.',
      'Plutôt que de te donner une méthode au hasard, je te renvoie vers le diagnostic : il pose les bonnes questions et applique la matrice du corpus. Trente secondes, réponse sur mesure.',
      'Dis-m’en plus (quelle matière ? quel blocage ?) ou fais plus rapide : le diagnostic ci-dessous est exactement fait pour « je ne sais pas quoi utiliser ». Il ne se trompe pas de méthode.',
    ],
  },
  {
    id: 'matiere',
    priority: 18,
    keywords: [], // rempli dynamiquement ci-dessous à partir des matières
    mood: 'happy',
    links: [],
    variants: [
      'Bonne nouvelle : cette matière a son protocole dédié, avec les méthodes dominantes et les pièges classiques. C’est le chemin le plus court — fiche ci-dessous.',
      'Pour cette matière, ne réinvente rien : le protocole ci-dessous te donne la combinaison de méthodes qui correspond à son type d’informations. Suis-le tel quel une semaine, ajuste ensuite.',
      'Chaque matière a sa nature (mécanismes, structures, calculs, listes…) et donc ses méthodes. Le protocole ci-dessous fait le tri pour celle-là précisément.',
    ],
  },
  {
    id: 'sos',
    priority: 12,
    keywords: ['sos', 'urgence', 'au secours', 'a l aide', 'aide moi', 'besoin d aide'],
    mood: 'care',
    links: [{ label: 'Ouvrir les protocoles SOS', to: '/sos' }],
    variants: [
      'Les protocoles SOS sont faits pour les moments chauds : blocage, panique, fatigue, retard… Chacun commence par « Fais ça maintenant ». Dis-moi ce qui se passe, ou ouvre la liste ci-dessous.',
      'Je suis là. Dis-moi en un mot ce qui coince (commencer ? retenir ? panique ? fatigue ?) et je te donne le protocole exact — ou parcours les SOS ci-dessous, ils sont très courts.',
      'D’accord, on gère. Décris ton blocage en une phrase, ou va directement aux SOS : dix protocoles ultra-courts, un par situation de crise.',
    ],
  },
  {
    id: 'salut',
    priority: 5,
    keywords: ['salut', 'bonjour', 'bonsoir', 'hello', 'coucou', 'yo', 'slt', 'cc', 'hey'],
    mood: 'happy',
    links: [],
    variants: [
      'Salut ! Prêt·e quand tu l’es. Dis-moi ce qui coince — démarrage, mémorisation, stress, QCM… — ou touche une suggestion en dessous.',
      'Hello ! Je suis là pour transformer ton problème en méthode. Décris ton blocage en une phrase, même vague, je m’occupe du reste.',
      'Salut ! Question du jour : qu’est-ce qui te ralentit le plus en ce moment ? Dis-le avec tes mots, on règle ça.',
    ],
  },
  {
    id: 'merci',
    priority: 5,
    keywords: ['merci', 'thanks', 'nickel', 'genial', 'parfait', 'super', 'top'],
    mood: 'cheer',
    links: [],
    variants: [
      'Avec plaisir ! Maintenant, la vraie victoire : appliquer dans les 5 minutes. File !',
      'De rien — c’est toi qui fais le travail, moi je montre juste la porte. Bonne session !',
      'Toujours là quand il faut. Allez, une unité de cours et on valide la journée.',
      'Content que ça aide ! Reviens quand tu veux, même à 2 h du matin — je ne dors pas, moi.',
    ],
  },
  {
    id: 'qui-es-tu',
    priority: 8,
    keywords: ['qui es tu', 't es qui', 'tu es qui', 'ton nom', 'tu es quoi', 'c est quoi axel', 'presente toi'],
    mood: 'happy',
    links: [{ label: 'Lancer le diagnostic', to: '/diagnostic' }],
    variants: [
      'Moi c’est Axel — un neurone qui a beaucoup potentialisé. Je suis ton coach méthodes : tu me dis ce qui coince, je te donne le bon protocole du corpus. 100 % local, zéro compte, et je ne raconte rien à personne.',
      'Axel, neurone de compagnie et coach de révisions. Mon boulot : transformer « j’y arrive pas » en « voilà exactement quoi faire ». Tout se passe sur ton appareil, rien ne sort.',
      'Je suis Axel. Pas un humain, pas une IA en ligne — un coach local avec les 47 méthodes de ton corpus en tête. Pose-moi ton blocage, je te réponds en méthodes concrètes.',
    ],
  },
  {
    id: 'blague',
    priority: 8,
    keywords: ['blague', 'drole', 'marrant', 'rigoler', 'fais moi rire', 'joke'],
    mood: 'cheer',
    links: [],
    variants: [
      'Pourquoi je suis toujours optimiste ? Parce qu’en tant que neurone, je vois partout du potentiel… d’action. Allez, au travail — c’était ta pause.',
      'On dit que je manque d’humour, mais c’est faux : j’ai des synapses très excitables. Bon, une unité de cours maintenant ?',
      'Ma blague préférée : « je vais juste regarder mon téléphone 5 minutes ». Hilarant à chaque fois. Téléphone loin, et on y retourne !',
    ],
  },
  {
    id: 'vexant',
    priority: 8,
    keywords: ['nul cette app', 'sert a rien', 'tu sers a rien', 'debile', 'stupide', 'merde', 'chier', 'ta gueule'],
    mood: 'care',
    links: [{ label: 'Lancer le diagnostic', to: '/diagnostic' }],
    variants: [
      'Reçu cinq sur cinq — la frustration fait partie du jeu, surtout en PASS. Dis-moi ce qui t’a agacé : je peux sûrement mieux viser. Ou décris ton blocage autrement, j’écoute.',
      'Pas de souci, je ne me vexe pas (avantage d’être un neurone). Reformule ton problème avec d’autres mots, ou lance le diagnostic — il pose de meilleures questions que moi.',
      'OK. Souffle un coup, et réessaie avec une phrase simple : « je n’arrive pas à… ». C’est tout ce qu’il me faut pour t’aider vraiment.',
    ],
  },
];

// Les matières alimentent l'intention « matiere » avec leurs noms pliés.
const SUBJECT_KEYWORDS: { key: string; id: string; name: string }[] = SUBJECTS.flatMap((s) => {
  const keys = new Set<string>([norm(s.name), norm(s.id)]);
  return Array.from(keys).map((key) => ({ key, id: s.id, name: s.name }));
});
const MATIERE_INTENT = INTENTS.find((i) => i.id === 'matiere')!;
MATIERE_INTENT.keywords = SUBJECT_KEYWORDS.map((s) => s.key);

const FALLBACK: Intent = {
  id: 'fallback',
  priority: 0,
  keywords: [],
  mood: 'think',
  links: [
    { label: 'Lancer le diagnostic (il pose les questions)', to: '/diagnostic' },
    { label: 'Chercher dans les méthodes', to: '/recherche' },
  ],
  variants: [
    'Je ne suis pas sûr d’avoir bien compris — et je préfère te le dire que répondre à côté. Reformule en une phrase simple (« je n’arrive pas à… », « comment retenir… »), ou lance le diagnostic ci-dessous.',
    'Hmm, ça dépasse mes mots-clés. Essaie avec d’autres mots — ou plus efficace : le diagnostic ci-dessous pose 3 à 5 questions et trouve la méthode exacte, sans se tromper.',
    'Là je sèche (ça arrive aux meilleurs neurones). Dis-le autrement — « je bloque sur… », « je confonds… », « je stresse pour… » — ou passe par la recherche, elle comprend même les fautes de frappe.',
    'Pas certain de te suivre. Donne-moi le problème brut, sans faire de belles phrases : « anat rentre pas », « pas motivé », « QCM ratés »… Je parle couramment le raccourci.',
  ],
};

const GREETINGS: string[] = [
  'Salut, moi c’est Axel — ton coach méthodes. Dis-moi ce qui coince en ce moment : démarrer, retenir, comprendre, gérer le stress… J’ai un protocole pour chaque situation.',
  'Hello ! Axel, coach de révisions (et neurone à mes heures). Décris ton blocage avec tes mots, même en abrégé — je te réponds en méthodes concrètes, pas en discours.',
  'Salut ! Ici Axel. Une règle entre nous : pas de blabla, des protocoles. Qu’est-ce qui te ralentit aujourd’hui ?',
  'Bienvenue ! Je suis Axel, ton coach 100 % local (rien ne quitte ton appareil). Raconte : c’est quoi le problème du moment ?',
];

export const QUICK_CHIPS: string[] = [
  'Motive-moi',
  'J’arrive pas à commencer',
  'Ça ne rentre pas',
  'Je stresse',
  'Je confonds deux notions',
  'Je rate mes QCM',
  'Je suis débordé·e',
  'Quelle méthode ce soir ?',
];

// Mémoire de session : jamais deux fois la même formulation d'affilée.
const lastVariant = new Map<string, number>();

function pickVariant(id: string, variants: string[], rng: () => number): string {
  let idx = Math.floor(rng() * variants.length);
  const last = lastVariant.get(id);
  if (variants.length > 1 && idx === last) idx = (idx + 1) % variants.length;
  lastVariant.set(id, idx);
  return variants[idx]!;
}

function fillSlots(text: string, rng: () => number): string {
  if (!text.includes('{line}')) return text;
  const line = COACH_LINES[Math.floor(rng() * COACH_LINES.length)]!.text;
  // Espaces insécables : le guillemet ne se retrouve jamais orphelin.
  return text.replace('{line}', `« ${line} »`);
}

export function greet(rng: () => number = Math.random): CoachReply {
  return {
    text: pickVariant('greet', GREETINGS, rng),
    links: [],
    mood: 'happy',
    intent: 'greet',
  };
}

/** Réinitialise la mémoire anti-répétition (tests). */
export function _resetCoachForTests(): void {
  lastVariant.clear();
}

export function respond(input: string, rng: () => number = Math.random): CoachReply {
  const padded = ` ${norm(input)} `;

  let best: Intent = FALLBACK;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let matched = 0;
    for (const kw of intent.keywords) {
      if (matches(padded, kw)) matched++;
    }
    if (matched === 0) continue;
    const score = intent.priority * 100 + matched;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  let links = best.links;
  if (best.id === 'matiere') {
    const hits = SUBJECT_KEYWORDS.filter((s) => matches(padded, s.key));
    const seen = new Set<string>();
    links = hits
      .filter((h) => (seen.has(h.id) ? false : (seen.add(h.id), true)))
      .map((h) => ({ label: `Protocole ${h.name}`, to: `/matiere/${h.id}` }));
  }

  return {
    text: fillSlots(pickVariant(best.id, best.variants, rng), rng),
    links,
    mood: best.mood,
    intent: best.id,
  };
}
