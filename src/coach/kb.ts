import type { AxelMood } from '../ui/Axel';

/**
 * La base de connaissances d'Axel — la partie « quoi répondre ».
 * (La partie « comprendre » vit dans engine.ts.)
 *
 * Règles d'écriture :
 * - tous les mots-clés sont en forme normalisée : minuscules, SANS accents
 *   (un test le vérifie) ;
 * - `strong` = déclencheurs spécifiques (poids fort), `weak` = indices ;
 * - au moins 3 variantes par intention — jamais deux fois la même d'affilée ;
 * - `more` = suite quand on répond « ça n'a pas marché / dis-m'en plus » ;
 * - `also` = une phrase courte quand le sujet apparaît en second problème ;
 * - le contenu méthodo colle aux fiches du corpus, sans les réécrire.
 */

export interface CoachLink {
  label: string;
  to: string;
}

export interface Intent {
  id: string;
  strong: string[];
  weak?: string[];
  /** Détresse 100, panique 60, sécurité/urgence > 20, défaut 10. */
  priority?: number;
  variants: string[];
  more?: string[];
  also?: string;
  links?: CoachLink[];
  mood?: AxelMood;
}

export const INTENTS: Intent[] = [
  // ================================================================ SÉCURITÉ
  {
    id: 'detresse',
    priority: 100,
    strong: [
      'craquer', 'craque', 'pleure', 'pleurer', 'plus envie de rien', 'envie de rien',
      'abandonner', 'tout arreter', 'arreter medecine', 'deprime', 'je vais pas bien',
      'vais mal', 'mal etre', 'me faire du mal', 'plus de sens', 'desespere',
      'plus la force', 'a bout', 'n en peux plus', 'j en peux plus', 'en peux plus', 'envie de disparaitre', 'suicid',
      'me deteste', 'plus dormir plus manger', 'crise de larmes',
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
    strong: [
      'panique', 'crise d angoisse', 'crise de panique', 'respire plus', 'coeur qui bat',
      'tetanise', 'bloque devant ma copie', 'tremble', 'je suffoque',
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
    more: [
      'Si la respiration ne suffit pas : pose une main sur le ventre, nomme à voix basse cinq choses que tu vois autour de toi, puis reprends le protocole. Et si les crises reviennent souvent, parles-en à ton médecin — c’est fréquent et ça se traite très bien.',
      'Alors on réduit encore : lève-toi, marche jusqu’à la fenêtre, trente secondes de respiration, et reviens ouvrir UNE seule question de cours. Le mouvement casse la boucle de panique.',
      'Dans ce cas, le NRAR complet vaut le coup : Nommer ce qui se passe, Respirer, Ancrer, Reprendre par une tâche minuscule. La fiche ci-dessus le détaille pas à pas.',
    ],
    also: 'Et pour la panique qui monte : une minute d’expirations longues, puis le SOS Panique.',
  },
  {
    id: 'stress',
    priority: 12,
    strong: [
      'stress', 'stresse', 'sous pression', 'trop de pression', 'anxieux', 'anxieuse',
      'anxiete', 'peur du concours', 'peur de rater', 'boule au ventre', 'angoisse',
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
    more: [
      'Un truc qui marche bien : écris ton inquiétude en une phrase sur un papier (« j’ai peur de… »), plie-le, pose-le. Des travaux montrent que l’externaliser libère de la mémoire de travail. Puis 25 minutes de Pomodoro sur une seule unité.',
      'Alors ajoute le corps : 10 minutes de marche rapide avant la session. L’activation physique consomme l’adrénaline que le stress fabrique — tu reviens plus posé·e, et le NRAR passe mieux.',
      'Si le stress revient chaque jour au même moment, planifie-le : 5 minutes de « pire scénario » par écrit, pas une de plus. Tu verras qu’il a toujours une réponse concrète — souvent une méthode de la bibliothèque.',
    ],
    also: 'Et côté stress : une expiration longue, puis le protocole NRAR pour redescendre.',
  },

  // ============================================================== DÉMARRAGE
  {
    id: 'procrastination',
    strong: [
      'procrastin', 'arrive pas a commencer', 'arrive pas a m y mettre', 'repousse',
      'flemme', 'me lance pas', 'pas motive', 'demarre pas', 'glande', 'jarrive pas', 'my mettre',
      'remets', 'remets a demain', 'remets tout a demain',
      'perds mon temps', 'traine', 'commence pas', 'motivation',
    ],
    weak: ['canape', 'lit', 'netflix'],
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
    more: [
      'Toujours bloqué·e ? Alors encore plus petit : ouvre juste le poly à la bonne page et lis le premier titre à voix haute. C’est tout. Ce geste de 20 secondes casse l’inertie neuf fois sur dix — le reste s’enchaîne tout seul.',
      'Essaie la version « préparation la veille » : avant de te coucher, sors le cours, ouvre-le à la page exacte, pose le minuteur dessus. Demain, le démarrage ne demandera aucune décision — et c’est la décision qui coûte, pas le travail.',
      'Autre angle : fixe un rendez-vous d’attaque précis (« 14 h 00, bureau, biochimie p. 12 ») et annonce-le à quelqu’un. Une intention formulée en si-alors double les chances de passage à l’acte.',
    ],
    also: 'Et pour démarrer : contrat de 10 minutes sur UNE unité, minuteur lancé.',
  },
  {
    id: 'echeance-proche',
    priority: 12,
    strong: [
      'apres demain', 'ce soir je dois', 'exam demain', 'examen demain',
      'partiel demain', 'epreuve demain', 'demain matin', 'demain j ai', 'dans 2 jours', 'dans deux jours',
      'dans 3 jours', 'dans trois jours', 'colle demain', 'exam demain', 'concours dans',
      'derniere ligne droite', 'plus que quelques jours', 'j moins',
    ],
    mood: 'think',
    links: [
      { label: 'Révision rapide (circuit court)', to: '/methode/revision-rapide' },
      { label: 'SOS 20-30 minutes utiles', to: '/sos/vingt-minutes' },
      { label: 'Simulation d’examen', to: '/methode/simulation-examen' },
    ],
    variants: [
      'Échéance proche = on change de mode : fini d’apprendre du neuf, place au circuit court — rappels ciblés, erreurs connues, distinctions pièges, QCM. La Révision rapide ci-dessous organise exactement ça. Et cette nuit : on DORT (la mémoire se consolide en dormant, une nuit blanche te coûte des points).',
      'À ce stade, la rentabilité est reine : 1) tes erreurs des dernières colles, 2) les distinctions qui se confondent, 3) une simulation en conditions réelles si tu as 1 h. Pas de relecture passive — chaque minute doit être un rappel ou un test.',
      'Plan de dernière ligne droite : matin = rappels de mémoire des gros chapitres (feuille blanche, 10 min chacun) ; après-midi = QCM ciblés sur tes faiblesses ; soir = relecture UNIQUEMENT de tes erreurs du jour, puis dodo tôt. Le SOS 20-30 minutes te donne le format exact d’un bloc.',
    ],
    more: [
      'Et le jour J : petit-déjeuner normal, pas de nouvelle notion (ça écrase les anciennes), un seul document d’erreurs à relire, et le NRAR si le stress monte dans le couloir.',
      'Rappel important : viser « tout revoir » en 48 h est le piège classique. Tu ne peux pas — et tu n’en as pas besoin. 20 % des notions font 80 % des points : tes erreurs passées te disent lesquelles.',
    ],
    also: 'Et vu l’échéance : bascule en circuit court — rappels, erreurs, QCM ciblés (Révision rapide).',
  },
  {
    id: 'ca-rentre-pas',
    strong: [
      'rentre pas', 'retiens rien', 'retiens pas', 'memorise pas', 'oublie tout',
      'rien ne reste', 'retenir mon cours', 'memoriser',
    ],
    weak: ['memoire'],
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
    more: [
      'Si le rappel actif « ne marche pas », c’est souvent que l’unité est trop grosse : réduis à UNE sous-partie, teste-toi dessus, valide, passe à la suivante. Et vérifie le sommeil — sans nuit complète, rien ne consolide.',
      'Autre piste : le problème n’est peut-être pas la mémoire mais la compréhension. On ne retient pas ce qu’on n’a pas structuré. Essaie d’expliquer le passage avec tes mots (Feynman) : si tu bloques, c’est là qu’il faut travailler, pas sur la répétition.',
      'Vérifie aussi le moment du test : se tester juste après avoir lu, c’est trop tôt (ça teste la mémoire immédiate). Ferme le cours, fais autre chose 10 minutes, PUIS teste-toi — c’est ce délai qui muscle.',
    ],
    also: 'Et pour la mémorisation : remplace la relecture par des rappels de mémoire espacés.',
  },
  {
    id: 'memoire-long-terme',
    strong: [
      'oublie au bout de', 'oublie apres', 'oublie tout au bout', 'au bout de deux semaines',
      'au bout d une semaine', 'au bout de quelques jours', 'retiens pas longtemps', 'deux semaines apres',
      'oublie en une semaine', 'ca s efface', 'retombe dans l oubli', 'long terme',
    ],
    mood: 'think',
    links: [
      { label: 'Répétition espacée (le calendrier)', to: '/methode/repetition-espacee' },
      { label: 'Rappel différé', to: '/methode/rappel-differe' },
    ],
    variants: [
      'Oublier après quelques jours est NORMAL — c’est la courbe de l’oubli, tout le monde la subit. La parade n’est pas de « mieux apprendre » la première fois, c’est de REPASSER au bon moment : J+1, J+3, J+7, J+14. La Répétition espacée ci-dessous te donne le calendrier exact.',
      'Ton cerveau garde ce qu’il revoit espacé et laisse filer le reste — c’est un tri de sa part, pas un défaut du tien. Programme des rappels différés : chaque reprise au bord de l’oubli multiplie la durée de rétention.',
      'Le savoir qui tient à vie, c’est : rappel de mémoire + espacement croissant + sommeil. Une notion revue 5 fois espacées tient des mois ; revue 5 fois le même soir, elle tient trois jours. Même effort, résultat opposé.',
    ],
    also: 'Et pour que ça tienne dans le temps : des reprises espacées (J+1, J+3, J+7…).',
  },

  // ============================================================ COMPRENDRE
  {
    id: 'confusion',
    strong: [
      'confonds', 'confond', 'melange', 'melange tout', 'ressemblent', 'se ressemble',
      'deux notions', 'similaires', 'inverse tout',
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
    more: [
      'Pousse plus loin : après le tableau, fabrique-toi 5 mini-questions « lequel des deux ? » et garde-les pour tes révisions espacées. C’est la frontière qu’on doit tester, encore et encore, dans le désordre.',
      'Et si elles sont TROIS ou plus à se mélanger (classique avec les molécules), même principe en plus grand : une ligne par critère, une colonne par notion, et le discriminant de chaque paire souligné.',
    ],
    also: 'Et pour ce que tu confonds : un tableau de contraste avec le discriminant en gras.',
  },
  {
    id: 'comprends-rien',
    strong: [
      'comprends rien', 'comprend rien', 'comprends pas', 'comprend pas', 'trop dur',
      'perdu', 'aucun sens', 'obscur', 'trop abstrait', 'chinois',
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
    more: [
      'Si même l’exemple résolu reste opaque, le maillon manquant est en amont : vocabulaire ? prérequis de terminale ? notation ? Reprends la première ligne que tu ne peux PAS reformuler et cherche uniquement celle-là.',
      'Autre levier : la double représentation. Prends le passage et force-toi à le dessiner (schéma, flèches). Ce que la main n’arrive pas à dessiner, c’est précisément ce que la tête n’a pas compris.',
    ],
    also: 'Et pour ce que tu ne comprends pas : repars du dernier point clair, par exemples résolus.',
  },
  {
    id: 'trop-de-details',
    strong: [
      'trop de details', 'tout est important', 'quoi retenir', 'l essentiel',
      'trop dense', 'des pages et des pages', 'noye dans', 'tri dans le cours',
    ],
    mood: 'think',
    links: [
      { label: 'Chunking / Hiérarchisation', to: '/methode/chunking' },
      { label: 'Liste de questions', to: '/methode/liste-questions' },
    ],
    variants: [
      'Quand tout semble important, c’est que la structure manque. Avant les détails : squelette du cours en 5-7 blocs max (chunking), puis chaque détail s’accroche à son bloc. Un détail sans crochet tombe, toujours.',
      'Le prof et les annales te disent quoi retenir : transforme les titres en questions (liste de questions) et regarde ce que les QCM demandent vraiment. Ce qui n’est jamais demandé passe en priorité basse — c’est un choix stratégique, pas de la triche.',
      'Règle des étages : d’abord la carte du chapitre (grandes parties), ensuite les mécanismes, ensuite seulement les chiffres et exceptions. Apprendre les détails avant la carte, c’est ranger des affaires sans armoire.',
    ],
    also: 'Et face à la masse de détails : le squelette d’abord (chunking), les détails s’y accrochent.',
  },
  {
    id: 'nouveau-chapitre',
    strong: [
      'nouveau chapitre', 'nouveau cours', 'premiere lecture', 'aborder un cours',
      'attaquer un chapitre', 'par quoi commencer un cours', 'decouvrir le cours',
    ],
    mood: 'happy',
    links: [
      { label: 'Pré-test (se questionner avant)', to: '/methode/pretest' },
      { label: 'L’algorithme universel d’un cours', to: '/reperes/algorithme' },
    ],
    variants: [
      'Pour un cours neuf, l’ordre gagnant est contre-intuitif : questionne-toi AVANT de lire (pré-test — même en te trompant, ça prépare le cerveau), puis lecture structurante, puis premier rappel dans la foulée. L’algorithme universel ci-dessous déroule la séquence complète.',
      'N’attaque pas en lisant ligne 1 : survole les titres 2 minutes, devine de quoi ça parle, pose-toi 3 questions — PUIS lis pour y répondre. La lecture devient une chasse, pas une promenade.',
      'Premier passage sur un chapitre : 1) survol des titres, 2) pré-test rapide, 3) lecture active avec le squelette en tête, 4) rappel immédiat d’une page. Le tout tient en une session — l’algorithme ci-dessous est le chemin exact.',
    ],
    also: 'Et pour le nouveau chapitre : pré-test avant lecture, puis l’algorithme universel.',
  },

  // ================================================================ TESTER
  {
    id: 'qcm',
    strong: [
      'qcm', 'rate les qcm', 'items', 'pieges', 'tombe dans les pieges',
      'banque de qcm', 'entrainement qcm', 'entre deux reponses',
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
    more: [
      'Va plus loin : garde un journal d’erreurs (une ligne par erreur : notion, cause, remède). Relis-le avant chaque colle — c’est LE document le plus rentable de ton année, il ne parle que de TES faiblesses.',
      'Et attention au piège de la banque de QCM en boucle : refaire les mêmes te fait mémoriser les réponses, pas la matière. Alterne : session de QCM neufs → correction par cause → retour au cours sur les causes « connaissance ».',
    ],
    also: 'Et pour les QCM : corrige par cause d’erreur, pas au score.',
  },
  {
    id: 'note-ratee',
    strong: [
      'mauvaise note', 'rate ma colle', 'rate mon concours blanc', 'echoue', 'echec',
      'classement', 'mal classe', 'resultat decevant', 'note decevante', 'dernier du classement',
      'chute au classement',
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
    more: [
      'Précision qui rassure : les classements de début d’année prédisent mal le résultat final. Ce qui le prédit, c’est la pente — et la pente vient de l’analyse d’erreurs, pas du volume d’heures.',
      'Si la même cause d’erreur revient trois colles de suite, c’est elle ton chantier prioritaire, pas les chapitres suivants. Une cause traitée = des points sur TOUTES les prochaines épreuves.',
    ],
    also: 'Et pour la note ratée : une session de correction par cause, à froid.',
  },
  {
    id: 'trou-noir-examen',
    strong: [
      'trou noir', 'blanc pendant', 'oublie tout en colle', 'perds mes moyens',
      'je sais chez moi mais pas en examen', 'tout s efface le jour j',
    ],
    mood: 'care',
    links: [
      { label: 'Simulation d’examen (s’exposer avant)', to: '/methode/simulation-examen' },
      { label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' },
    ],
    variants: [
      '« Je sais chez moi mais pas en examen » a deux causes possibles : le stress qui coupe l’accès (→ NRAR, à entraîner AVANT le jour J), ou une illusion de maîtrise (reconnaître ≠ récupérer — chez toi, le cours est sous tes yeux). La simulation d’examen règle les deux : mêmes conditions, même chrono, sans filet.',
      'Le trou noir vient souvent d’un entraînement trop confortable : tu révises avec le cours à portée de main, l’examen te le retire. Entraîne la récupération SANS support, en conditions réelles — c’est exactement la fiche Simulation ci-dessous.',
      'Deux gestes : 1) chaque semaine, une session en conditions d’épreuve (chrono, sans notes, au propre) pour habituer ton cerveau à récupérer sous pression ; 2) le jour J, si le blanc arrive : NRAR, passe à la question suivante, l’accès revient presque toujours en travaillant sur autre chose.',
    ],
    also: 'Et contre le trou noir : des simulations en conditions réelles chaque semaine.',
  },
  {
    id: 'illusion-maitrise',
    strong: [
      'je crois savoir', 'j etais sur de moi', 'etais sur de moi', 'sur de moi et',
      'cetait faux', 'c etait faux', 'impression de connaitre', 'reconnais mais',
      'ca me parle mais', 'sur de mes reponses et faux', 'trop confiant',
    ],
    mood: 'think',
    links: [
      { label: 'Calibration de confiance', to: '/methode/calibration-confiance' },
      { label: 'Feuille blanche (vérité du rappel)', to: '/methode/feuille-blanche' },
    ],
    variants: [
      '« Ça me parle » est le mensonge préféré de la mémoire : reconnaître n’est pas savoir. Le test de vérité : feuille blanche, cours fermé, tu écris. Ce qui ne sort pas n’était pas su. La Calibration ci-dessous t’apprend à prédire ta note avant de vérifier — redoutable pour recoller confiance et réalité.',
      'Ton cerveau confond familiarité et maîtrise — tout le monde se fait avoir. L’antidote : avant chaque vérification, note ta confiance (sûr / moyen / au hasard), puis compare. En deux semaines, tu sauras exactement quand te fier à toi.',
      'C’est un problème de calibration, et ça se règle : ne dis plus jamais « je le sais » sans l’avoir RÉCUPÉRÉ de mémoire au moins une fois. Reconnaître un cours en le relisant, c’est comme reconnaître une chanson — ça ne veut pas dire savoir la chanter.',
    ],
    also: 'Et pour l’illusion de maîtrise : feuille blanche + calibration de confiance.',
  },

  // ============================================================== ORGANISATION
  {
    id: 'fatigue',
    priority: 12,
    strong: [
      'fatigue', 'epuise', 'creve', 'mal dormi', 'nuit blanche', 'plus d energie',
      'lessive', 'vide', 'burn out', 'a plat',
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
    more: [
      'Si la fatigue dure depuis plusieurs semaines malgré de vraies nuits, ce n’est plus de la méthode : parles-en à ton médecin (carence, sommeil de mauvaise qualité, moral — ça se vérifie facilement et ça change tout).',
      'Vérifie les basiques qui font 80 % du travail : heure de coucher STABLE, écrans coupés 30 minutes avant, pas de café après 15 h, un peu de lumière du jour le matin. La régularité du sommeil compte plus que sa durée exacte.',
    ],
    also: 'Et vu la fatigue : journée minimale aujourd’hui, vraie nuit ce soir.',
  },
  {
    id: 'sommeil',
    strong: [
      'insomnie', 'dors mal', 'm endors pas', 'reveille la nuit', 'couche tard',
      'sommeil', 'dormir', 'ruminer le soir', 'cerveau qui tourne la nuit',
    ],
    mood: 'care',
    links: [{ label: 'SOS Fatigue (le volet sommeil)', to: '/sos/fatigue' }],
    variants: [
      'Le sommeil n’est pas du temps perdu sur les révisions : c’est LE moment où le cerveau consolide ce que tu as appris. Sacrifier la nuit pour réviser, c’est verser de l’eau dans un seau percé. Protège une heure de coucher stable, écrans coupés 30 minutes avant.',
      'Si le cerveau mouline au coucher : pose un carnet à côté du lit et vide tout dessus (« demain : X, Y, Z »). Externaliser stoppe la boucle. Et pas de révision au lit — le lit doit rester un signal de sommeil, pas de biochimie.',
      'Règles simples qui marchent : lever à heure fixe (même le week-end, à une heure près), lumière du jour le matin, pas de caféine après 15 h, chambre fraîche. Si l’insomnie persiste plusieurs semaines, médecin — c’est fréquent en PASS et ça se traite.',
    ],
    also: 'Et côté sommeil : heure de coucher stable, écrans coupés avant, carnet pour vider la tête.',
  },
  {
    id: 'retard',
    strong: [
      'retard', 'deborde', 'submerge', 'trop de cours', 'jamais a jour', 'accumule',
      'course apres', 'rattraper', 'sous l eau', 'semaines de retard',
      'semaine de retard', 'mois de retard', 'de retard en',
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
    more: [
      'Concrètement, sur ta liste triée : le retard « rentable » se rattrape en mode dégradé — squelette du cours + QCM dessus, PAS une lecture intégrale. Tu combles à 70 % en 30 % du temps, et les QCM te disent où creuser.',
      'Et bloque le robinet : le retard qui angoisse, c’est celui qui GRANDIT. Chaque jour, le cours du jour d’abord (il est frais, il coûte moitié moins cher à apprendre maintenant), le rattrapage ensuite.',
    ],
    also: 'Et pour le retard : triage par rentabilité, cours du jour d’abord.',
  },
  {
    id: 'absence',
    strong: [
      'rate des cours', 'absent', 'pas pu aller', 'manque les cours', 'loupe une semaine',
      'arret maladie',
    ],
    mood: 'care',
    links: [
      { label: 'Triage du retard', to: '/methode/triage-retard' },
      { label: 'Journée minimale (reprise en douceur)', to: '/methode/journee-minimale' },
    ],
    variants: [
      'Une absence se rattrape en mode dégradé, pas en mode intégral : récupère les supports, fais le squelette de chaque cours manqué (titres + logique), puis des QCM dessus pour localiser ce qui mérite un vrai travail. Le Triage ci-dessous t’aide à ordonner.',
      'Ne culpabilise pas, organise : liste ce qui a été manqué, classe par importance concours, et reprends par le plus rentable. Et le cours du jour reste prioritaire sur le rattrapage — sinon le trou se déplace au lieu de se combler.',
      'Si c’était pour maladie : reprise progressive obligatoire (Journée minimale les 2-3 premiers jours). Repartir à 12 h/jour après un arrêt, c’est le meilleur moyen d’y retourner.',
    ],
    also: 'Et pour les cours manqués : rattrapage en mode squelette + QCM, pas en lecture intégrale.',
  },
  {
    id: 'planning',
    strong: [
      'planning', 'planifier', 'organiser ma semaine', 'organiser mes revisions',
      'emploi du temps', 'todo', 'to do', 'organisation', 'programme de revision',
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
    more: [
      'Structure simple qui tient l’année : chaque soir, note les 3 unités de demain (pas plus) sur un papier. Le matin, tu exécutes sans décider. La décision la veille, l’exécution le jour — c’est tout le secret.',
    ],
    also: 'Et pour l’organisation : un minimum quotidien en unités de travail, pas en heures.',
  },
  {
    id: 'combien-heures',
    strong: [
      'combien d heures', 'combien de temps travailler', 'heures par jour', 'assez travaille',
      '10h par jour', '12h par jour', 'volume horaire',
    ],
    mood: 'think',
    links: [
      { label: 'Pomodoro (structurer les blocs)', to: '/methode/pomodoro' },
      { label: 'Journée minimale', to: '/methode/journee-minimale' },
    ],
    variants: [
      'Mauvaise question — et tout le monde se la pose. Le concours ne compte pas tes heures, il compte ce que tu sais récupérer. 6 heures en blocs concentrés avec rappels actifs battent 11 heures de présence molle. Compte tes unités validées (rappels, QCM, schémas refaits), pas l’horloge.',
      'Le bon volume, c’est celui que tu tiens TOUTE l’année avec de vraies nuits : pour la plupart, 7 à 9 heures de travail EFFECTIF bien découpé (Pomodoro), avec pauses réelles. Au-delà, la qualité s’effondre et tu payes en janvier.',
      'Piège classique : comparer les heures affichées des autres. Certains « travaillent 12 h » dont 5 de relecture passive et de téléphone. Toi, vise des blocs nets, mesure en unités, et garde une heure de vraie coupure par jour — c’est elle qui rend le reste tenable.',
    ],
    also: 'Et sur le volume : compte les unités validées, pas les heures affichées.',
  },
  {
    id: 'vacances-repos',
    strong: [
      'vacances', 'week end', 'jour de repos', 'couper', 'jour off', 'pause dans la semaine',
      'culpabilise quand je me repose',
    ],
    mood: 'happy',
    links: [{ label: 'Journée minimale', to: '/methode/journee-minimale' }],
    variants: [
      'Le repos fait partie de l’entraînement — demande à n’importe quel sportif de haut niveau. Une demi-journée de vraie coupure par semaine te rend PLUS de points qu’elle n’en coûte : le cerveau consolide et la motivation se recharge. Sans culpabilité : c’est de la stratégie.',
      'En vacances courtes, le bon réglage : la Journée minimale (30-60 minutes de rappels espacés pour entretenir, pas apprendre du neuf) + vraie déconnexion le reste du temps. Tu reviens sans avoir perdu, et avec un cerveau qui a envie.',
      'Culpabiliser pendant la pause, c’est la rater deux fois : tu ne te reposes pas ET tu ne travailles pas. Décide la coupure à l’avance (jour, heure de reprise), profite à fond, reprends à l’heure dite. Une pause décidée n’est pas une pause volée.',
    ],
    also: 'Et pour le repos : une coupure décidée à l’avance vaut de l’or — sans culpabilité.',
  },

  // ================================================================ FOCUS
  {
    id: 'concentration',
    strong: [
      'concentre', 'concentrer', 'concentration', 'distrait', 'deconcentre',
      'telephone', 'tiktok', 'instagram', 'reseaux', 'scrolle', 'scroll', 'focus',
      'tete ailleurs', 'dans la lune',
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
    more: [
      'Si l’esprit vagabonde même sans téléphone : garde un papier « parking » à côté — chaque pensée intruse s’y note en 3 mots et tu reviens au cours. La noter la libère ; la suivre te coûte dix minutes.',
      'Et vérifie l’énergie : la concentration s’effondre quand on a faim, soif ou sommeil en retard. Avant d’accuser ta volonté, regarde ces trois jauges.',
    ],
    also: 'Et pour la concentration : téléphone dans une autre pièce + blocs Pomodoro.',
  },
  {
    id: 'musique',
    strong: [
      'musique', 'ecouteurs', 'casque', 'travailler en musique', 'bruit', 'spotify',
      'playlist', 'silence ou musique',
    ],
    mood: 'think',
    links: [{ label: 'Pomodoro (structurer l’attention)', to: '/methode/pomodoro' }],
    variants: [
      'Réponse honnête : pour de la mémorisation et de la compréhension fine, le silence gagne — les paroles surtout entrent en compétition avec le texte que tu lis. La musique marche mieux : pour DÉMARRER (un morceau rituel de lancement), ou en instrumental léger sur des tâches mécaniques (recopier un schéma, trier).',
      'Teste sur toi, mais proprement : une semaine de sessions en silence, une semaine en instrumental, mêmes conditions, et compare tes rappels. La plupart des gens surestiment ce que la musique leur apporte — elle masque l’ennui mais taxe l’attention.',
      'Si c’est le bruit ambiant le problème (BU bruyante, coloc), un bruit stable (bruit blanc, pluie) est un bon compromis : il couvre sans raconter d’histoire. Les paroles, elles, volent exactement le canal dont la lecture a besoin.',
    ],
    also: 'Et pour la musique : silence ou bruit stable pour mémoriser, paroles = attention volée.',
  },
  {
    id: 'lieu-travail',
    strong: [
      'bibliotheque', 'travailler chez moi', 'ou travailler', 'chez moi j y arrive pas',
      'a la bu', 'lieu de travail', 'chambre',
    ],
    mood: 'think',
    links: [{ label: 'Friction numérique', to: '/methode/friction-numerique' }],
    variants: [
      'Le meilleur lieu est celui qui rend la distraction chère et le démarrage facile. La BU marche pour beaucoup par pression sociale (tout le monde bosse) et absence de lit. Chez toi, ça marche SI tu recrées ça : bureau dédié, téléphone ailleurs, porte fermée, rituel de démarrage.',
      'Astuce sous-cotée : associe chaque lieu à un type de travail. BU = apprentissage neuf (calme profond), chez toi = QCM et rappels (moins exigeants), transports = écoute ou cartes de révision. Ton cerveau se met en mode dès qu’il reconnaît le lieu.',
      'Si chez toi tout t’aspire (lit, frigo, écrans), n’essaie pas de résister — déplace-toi. La volonté est une ressource limitée ; le changement de lieu est gratuit. Et garde le lit pour dormir : réviser au lit sabote les deux activités.',
    ],
    also: 'Et pour le lieu : celui où la distraction coûte cher — sinon, change de pièce, pas de volonté.',
  },

  // ================================================================ OUTILS
  {
    id: 'anki',
    strong: [
      'anki', 'flashcard', 'cartes memoire', 'deck', 'paquets de cartes',
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
    more: [
      'Deux réglages qui sauvent des decks : limite de nouvelles cartes par jour BASSE (mieux vaut 20 tenues que 60 trois jours), et suppression sans pitié des cartes ratées 5 fois — elles signalent un problème de compréhension, retour au cours.',
      'Et les decks tout faits des autres : séduisants, dangereux. Une carte qu’on n’a pas fabriquée (ou au moins vérifiée contre SON cours) mémorise parfois le cours d’une autre fac. Ils servent de complément QCM, pas de base.',
    ],
    also: 'Et pour Anki : cartes atomiques, du compris uniquement — audit si ça déborde.',
  },
  {
    id: 'fiches',
    strong: [
      'faire des fiches', 'fiches ou pas', 'ficher', 'resumer le cours', 'faire des resumes',
      'recopier mon cours', 'reecrire mon cours', 'recopier',
    ],
    mood: 'think',
    links: [
      { label: 'Le piège du recopiage (mythes)', to: '/reperes/mythes' },
      { label: 'Feuille blanche (la fiche qui muscle)', to: '/methode/feuille-blanche' },
      { label: 'Prise de notes utile', to: '/methode/prise-de-notes' },
    ],
    variants: [
      'Vérité qui dérange : recopier son cours au propre est une des activités les MOINS rentables du PASS — des heures de main, zéro rappel. Une fiche n’a de valeur que si elle sort de ta tête : cours fermé, tu écris le squelette de mémoire, PUIS tu vérifies et complètes en rouge. Ça, c’est de la feuille blanche — et ça muscle.',
      'La bonne question n’est pas « fiches ou pas » mais « produites comment » : une fiche recopiée = relecture déguisée ; une fiche reconstruite de mémoire = rappel actif + support de révision. Même papier, rentabilité opposée. La page Mythes ci-dessous démonte le piège en détail.',
      'Si tu tiens aux fiches : format ultra-court (le squelette + les discriminants + TES erreurs), fabriquées de mémoire puis corrigées. Et surtout pas de « d’abord je fiche tout, ensuite j’apprends » — c’est le meilleur moyen de passer le semestre à fabriquer du papier.',
    ],
    also: 'Et pour les fiches : de mémoire d’abord, correction ensuite — jamais du recopiage.',
  },
  {
    id: 'relecture-surlignage',
    strong: [
      'relire', 'je relis', 'relecture', 'surligner', 'surlignage', 'stabilo',
      'je lis et je relis', 'lu trois fois',
    ],
    mood: 'think',
    links: [
      { label: 'Pourquoi relire ne suffit pas (mythes)', to: '/reperes/mythes' },
      { label: 'Relecture & surlignage — la version utile', to: '/methode/relecture-surlignage' },
      { label: 'Rappel actif', to: '/methode/rappel-actif' },
    ],
    variants: [
      'La relecture est le piège n°1 : la 2e et 3e lecture donnent une sensation de fluidité que le cerveau prend pour de la maîtrise — mais reconnaître n’est pas récupérer. La science est nette là-dessus. La relecture a UN bon usage : ciblée, après un rappel, pour vérifier. La fiche ci-dessous montre la version utile.',
      'Surligner classe les phrases, pas les souvenirs. Si ton stabilo travaille plus que ta mémoire, inverse : lis UNE fois activement, ferme, récite, rouvre pour vérifier. Le surlignage devient alors un marquage de ce qui a résisté au rappel — là il sert.',
      'Compte tes prochaines 2 heures : combien de minutes les yeux sur le cours, combien à récupérer de mémoire cours fermé ? Si c’est 90/10, tu as trouvé ton levier n°1 — vise 50/50 et regarde tes QCM décoller.',
    ],
    also: 'Et sur la relecture : une fois activement, puis rappels — jamais en boucle.',
  },
  {
    id: 'prise-de-notes',
    strong: [
      'prendre des notes', 'prise de notes', 'notes en amphi', 'noter en cours',
      'ordinateur ou papier', 'tout noter',
    ],
    mood: 'think',
    links: [{ label: 'Prise de notes utile', to: '/methode/prise-de-notes' }],
    variants: [
      'Le but des notes n’est pas de tout capturer (le poly existe déjà) : c’est de forcer un premier traitement. Note la STRUCTURE, les liens logiques, les insistances du prof et tes questions — pas la dictée. La fiche ci-dessous donne le format exact.',
      'Tout noter mot à mot te transforme en sténographe : la main travaille, la tête dort. Mieux : squelette + mots-clés + « ?? » sur ce qui t’échappe, et dans les 24 h, un rappel de mémoire du cours — c’est LÀ que la prise de notes paye.',
      'Papier ou clavier ? Le papier force à condenser (on ne peut pas tout écrire) — c’est un avantage cognitif, pas un défaut. Si c’est au clavier : interdis-toi le verbatim, note en questions et en flèches.',
    ],
    also: 'Et pour les notes : structure et liens, jamais la dictée.',
  },
  {
    id: 'ressources',
    strong: [
      'quelle ressource', 'quel livre', 'drive', 'fiches des autres', 'annales',
      'ressources', 'supports', 'trop de supports', 'quel poly',
    ],
    mood: 'think',
    links: [
      { label: 'Sources et niveau de preuve', to: '/reperes/sources' },
      { label: 'Audit de deck (pour les decks partagés)', to: '/methode/audit-deck' },
    ],
    variants: [
      'Règle d’or : UNE source de référence par matière (celle de TA fac — c’est elle qui tombe), épuisée à fond, plutôt que cinq survolées. Les annales et QCM d’entraînement sont l’exception : là, plus il y en a, mieux c’est. Tout le reste (drives, fiches d’autres promos) = complément à vérifier, jamais base.',
      'Collectionner les ressources est une procrastination déguisée en travail : chercher le poly parfait donne l’impression d’avancer sans rien apprendre. Ferme la chasse, ouvre TON cours, et garde les annales comme seul « plus » systématique.',
      'Les fiches des autres résument LEUR compréhension — te les apprendre, c’est réciter la digestion d’un autre. Usage correct : les lire APRÈS ton propre travail pour vérifier que rien ne manque. La hiérarchie complète des sources est dans la page ci-dessous.',
    ],
    also: 'Et pour les ressources : une seule base par matière + toutes les annales possibles.',
  },
  {
    id: 'cours-video',
    strong: [
      'replay', 'cours en video', 'regarder les cours', 'vitesse x2', 'x2',
      'cours a distance', 'podcast du cours',
    ],
    mood: 'think',
    links: [
      { label: 'Prise de notes utile', to: '/methode/prise-de-notes' },
      { label: 'Rappel actif après visionnage', to: '/methode/rappel-actif' },
    ],
    variants: [
      'Le replay est un outil, pas une méthode : regarder ≠ apprendre, même en x2. La bonne boucle : visionnage actif (pause aux articulations, notes en structure), puis rappel de mémoire IMMÉDIAT de 5 minutes. Sans ce rappel, le replay s’évapore comme une série.',
      'Le x2 marche pour un cours déjà vu (repérage, vérification), mal pour du neuf complexe — la vitesse mange le temps de traitement. Neuf = vitesse normale avec pauses ; révision = accéléré assumé.',
      'Danger du replay : « je le regarderai plus tard » transforme le retard en dette invisible. Traite chaque vidéo comme un cours en amphi : un créneau fixe, des notes, un rappel derrière — pas une pile pour un futur toi héroïque.',
    ],
    also: 'Et pour les replays : visionnage actif + rappel de 5 minutes juste après.',
  },

  // ============================================================== MATIÈRES SPÉCIFIQUES
  {
    id: 'formules',
    strong: [
      'formule', 'les formules', 'retenir les formules', 'exos de calcul',
      'exercices de physique', 'calcul',
    ],
    mood: 'think',
    links: [
      { label: 'Carte de calcul', to: '/methode/carte-calcul' },
      { label: 'Exemple résolu', to: '/methode/exemple-resolu' },
      { label: 'Exercice à froid', to: '/methode/exercice-a-froid' },
    ],
    variants: [
      'Une formule ne se retient pas seule : elle se retient avec ses conditions d’usage (quand ? unités ? pièges ?). C’est la Carte de calcul : formule + « je l’utilise quand » + un mini-exemple + l’erreur classique. Quatre lignes qui valent dix relectures.',
      'Pour les matières à calcul, la boucle gagnante : exemple résolu étudié à fond → le refaire seul → exercice à froid (sans le modèle sous les yeux) quelques jours après. C’est le froid qui révèle si c’est acquis.',
      'Si tu connais la formule mais rates les exos : le problème est la reconnaissance de situation, pas la mémoire. Entraîne le tri : lis 10 énoncés SANS les résoudre, et pour chacun dis juste quelle formule s’applique et pourquoi. Rentabilité maximale.',
    ],
    also: 'Et pour les formules : carte de calcul (formule + quand + piège) et exos à froid.',
  },
  {
    id: 'schemas',
    strong: [
      'schema', 'schemas', 'legender', 'les schemas', 'schemas d anatomie',
      'schema d anatomie', 'dessins d anatomie', 'coupe', 'planche',
      'retenir un schema',
    ],
    mood: 'think',
    links: [
      { label: 'Reconstruction de schéma', to: '/methode/reconstruction-schema' },
      { label: 'Image-occlusion (masquer les légendes)', to: '/methode/image-occlusion' },
    ],
    variants: [
      'Un schéma se retient en le REFAISANT, pas en le contemplant : cours fermé, tu redessines (même moche — la précision du trait ne compte pas, la structure oui), puis tu compares et tu corriges en couleur. Fiche Reconstruction ci-dessous.',
      'Pour les légendes : masque-les et récite (image-occlusion — à la main avec un cache, ou en cartes). Regarder un schéma légendé donne une illusion totale de maîtrise ; le cache la fait tomber en dix secondes.',
      'Boucle efficace pour l’anat : 1) étudier le schéma en le racontant (chaque structure : où, quoi, avec quoi), 2) le redessiner de mémoire, 3) cache sur les légendes à J+2. Trois passages courts battent une heure d’observation.',
    ],
    also: 'Et pour les schémas : les refaire de mémoire, cache sur les légendes.',
  },

  // ================================================================ MENTAL
  {
    id: 'comparaison',
    strong: [
      'les autres sont meilleurs', 'tout le monde est meilleur', 'imposteur',
      'pas a ma place', 'pas legitime', 'me compare', 'moins bon que les autres',
      'ils comprennent plus vite',
    ],
    mood: 'care',
    links: [
      { label: 'Calibration (mesurer TES progrès)', to: '/methode/calibration-confiance' },
    ],
    variants: [
      'Tu compares ton intérieur (doutes, brouillons, fatigue) à l’extérieur des autres (assurance affichée, résultats annoncés). Match truqué. La seule comparaison utile : toi vs toi d’il y a deux semaines — et ça, la Calibration te le mesure objectivement.',
      'Le syndrome de l’imposteur touche massivement… les gens sérieux. Les vrais imposteurs ne se posent pas la question. Reviens aux faits mesurables : tes rappels réussis, tes causes d’erreurs corrigées. Les impressions mentent, les données non.',
      'À la BU, tout le monde a l’air sûr de lui — c’est un théâtre involontaire, chacun cache les mêmes doutes. Concentre-toi sur TA courbe : si tes rappels d’aujourd’hui battent ceux d’il y a quinze jours, tu es exactement où il faut.',
    ],
    also: 'Et pour la comparaison : mesure-toi à toi d’il y a deux semaines, pas au théâtre des autres.',
  },
  {
    id: 'pression-famille',
    strong: [
      'mes parents', 'ma famille', 'pression de ma famille', 'decevoir', 'fierte de',
      'on attend de moi', 'famille de medecins',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'La pression familiale pèse parce qu’elle transforme chaque QCM en jugement sur toi. Remets les rôles en place : eux espèrent, toi tu t’entraînes — et un entraînement se juge sur le processus (tes unités faites), pas sur l’angoisse des autres. Tu ne peux pas travailler à leur place, ils ne peuvent pas stresser à la tienne.',
      'Si c’est possible, une conversation calme aide : « votre soutien m’aide, vos questions quotidiennes sur le classement me coûtent ». Beaucoup de familles pressent par amour maladroit et s’ajustent quand on leur dit quoi faire à la place (ex. : gérer l’intendance, ne demander qu’une fois par semaine).',
      'Décevoir n’est pas au programme d’aujourd’hui : aujourd’hui il y a juste tes unités de travail. La pression parle de juin ; toi, tu joues la prochaine heure. Et si la pression déborde en mal-être réel, on est plus dans mon rayon — le protocole Détresse a les bons contacts.',
    ],
    also: 'Et pour la pression familiale : toi tu joues le processus, eux gèrent leur espoir.',
  },
  {
    id: 'doublant',
    strong: [
      'doublant', 'doublante', 'redouble', 'deuxieme fois', 'deja rate l an dernier',
      'deuxieme tentative',
    ],
    mood: 'happy',
    links: [
      { label: 'Correction par cause (sur l’an dernier)', to: '/methode/correction-par-cause' },
      { label: 'Lancer le diagnostic', to: '/diagnostic' },
    ],
    variants: [
      'Doubler est une position de FORCE si tu l’exploites : tu connais le terrain, les pièges, ton propre échec. Le travail n°1 : l’autopsie honnête de l’an dernier (méthodes ? régularité ? mental ? impasses ?) — la Correction par cause s’applique à une année entière aussi. Refaire pareil en espérant mieux, c’est le seul vrai danger.',
      'Ton avantage n’est pas d’avoir « déjà vu le cours » (ça s’évapore vite) — c’est de savoir exactement où TU as échoué. Change ce qui a échoué, garde ce qui marchait, et méfie-toi de la fausse confiance de la deuxième lecture : teste-toi comme un primant.',
      'Danger spécifique du doublant : démarrer fort en septembre sur la lancée, s’effondrer en novembre. La leçon de l’an dernier est souvent là : la régularité tenable bat le sprint. Journée minimale + méthodes actives dès le premier jour.',
    ],
    also: 'Et en tant que doublant·e : autopsie de l’an dernier d’abord, fausse confiance interdite.',
  },
  {
    id: 'perfectionnisme',
    strong: [
      'perfectionniste', 'jamais satisfait', 'tout doit etre parfait', 'peur de mal faire',
      'recommence tout le temps', 'jamais assez bien',
    ],
    mood: 'care',
    links: [
      { label: 'Journée minimale (le socle suffit)', to: '/methode/journee-minimale' },
      { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
    ],
    variants: [
      'Le perfectionnisme se déguise en exigence mais fonctionne comme un frein : tant que « parfait » est le seuil, commencer devient impossible et finir encore plus. Le concours ne note pas la perfection, il note la couverture × la maîtrise. Fait à 85 % sur tout bat parfait sur un tiers.',
      'Antidote concret : définis « terminé » AVANT de commencer (« ce chapitre est fini quand : squelette de mémoire + 20 QCM + erreurs notées »). Quand la définition est atteinte, on passe au suivant — même si « on pourrait encore ». On pourra toujours encore.',
      'Ton brouillon vaut mieux que ton plan parfait : une feuille blanche moche remplie de mémoire muscle plus qu’une fiche calligraphiée. Autorise-toi le moche qui travaille — le beau qui rassure, lui, coûte tes soirées.',
    ],
    also: 'Et pour le perfectionnisme : définis « terminé » à l’avance, le 85 % partout gagne.',
  },
  {
    id: 'ennui',
    strong: [
      'je m ennuie', 'c est chiant', 'pas interessant', 'aucun interet', 'trop ennuyeux',
      'ca me saoule',
    ],
    mood: 'happy',
    links: [
      { label: 'Pré-test (réveiller la curiosité)', to: '/methode/pretest' },
      { label: 'Entrelacement (varier les cas)', to: '/methode/interleaving' },
    ],
    variants: [
      'L’ennui vient souvent de la passivité, pas de la matière : relire EST ennuyeux, se tester est un jeu. Transforme la session en défi : pré-test avant d’apprendre, pari sur ta note, chrono. Le cerveau adore les enjeux — donne-lui-en.',
      'Astuce : l’entrelacement. Alterner deux matières par blocs de 30 minutes casse la monotonie ET améliore la discrimination — double gain. Et cherche le « pourquoi clinique » d’une notion barbante : ce canal ionique ennuyeux explique un médicament réel, et d’un coup il a une histoire.',
      'Si TOUT t’ennuie depuis des semaines, ce n’est plus de la pédagogie — fatigue ou moral en berne se déguisent souvent en ennui. Une vraie coupure, du sommeil, et si ça persiste : on en parle, ou tu ouvres le protocole Détresse.',
    ],
    also: 'Et contre l’ennui : passe en mode actif — pré-test, défis, entrelacement.',
  },
  {
    id: 'peur-echec',
    strong: [
      'peur de rater mon annee', 'et si je rate', 'plan b', 'reorientation', 'si j echoue',
      'rater ma vie', 'une seule chance',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'Regarde la peur en face une fois, proprement : et si ça ratait ? Il existe des LAS, des passerelles, des réorientations qui mènent aussi au soin — une année de PASS n’est jamais une impasse ni du temps perdu (méthodes de travail, culture bio, maturité). Maintenant que le pire a un visage et des solutions, il fait moins de bruit — retourne à ta prochaine unité.',
      'La peur de l’échec vole exactement l’énergie qui l’empêche : chaque heure passée à imaginer juin est une heure de moins pour le préparer. Marché honnête avec toi-même : 5 minutes de scénario catastrophe par écrit, pas une de plus, puis 25 minutes de travail réel.',
      '« Une seule chance » est faux factuellement — les parcours de santé ont plusieurs portes, et des médecins formidables sont passés par des chemins tordus. Ta mission n’est pas de garantir juin ; c’est de rendre chaque semaine un peu meilleure que la précédente. Ça, c’est 100 % dans tes mains.',
    ],
    also: 'Et pour la peur de rater : 5 minutes de scénario par écrit, puis retour au concret.',
  },
  {
    id: 'pourquoi-medecine',
    strong: [
      'pourquoi medecine', 'a quoi bon', 'pourquoi je fais medecine',
      'pourquoi je fais ca', 'sais plus pourquoi', 'plus de sens tout ca', 'perdu ma motivation profonde',
      'pourquoi je fais ca', 'vocation',
    ],
    mood: 'care',
    links: [{ label: 'Les citations en plein écran', to: '/citations/plein-ecran' }],
    variants: [
      'Question saine — elle revient chez tout le monde vers le milieu du semestre, quand le concret (patients, service, gestes) est encore loin et que le quotidien n’est que QCM. Reconnecte le fil : chaque notion apprise est un outil que tu utiliseras sur quelqu’un de réel. La biochimie de ce soir, c’est la lecture d’un bilan sanguin dans quatre ans.',
      'Écris ta réponse quelque part — trois lignes sur pourquoi tu as commencé — et ressors-la les jours gris. La motivation de fond ne disparaît pas, elle est juste recouverte par la fatigue du quotidien. (Et si la réponse honnête est « je ne sais plus du tout », c’est une vraie question d’orientation qui mérite mieux qu’un coach : parles-en à un humain de confiance.)',
      'Le sens ne se retrouve pas en réfléchissant plus — il se retrouve en avançant : une bonne session de travail redonne souvent plus de sens qu’une soirée de doute. Fais l’unité du jour, puis va voir une citation ou deux — c’est exactement leur rôle.',
    ],
    also: 'Et pour le sens : reconnecte chaque notion à son usage clinique futur.',
  },
  {
    id: 'sante-physique',
    priority: 12,
    strong: [
      'mal de tete', 'mal a la tete', 'migraine', 'mal aux yeux', 'mal au dos',
      'douleur', 'malade', 'grippe', 'fievre',
    ],
    mood: 'care',
    links: [{ label: 'Journée minimale (adapter la charge)', to: '/methode/journee-minimale' }],
    variants: [
      'Je suis un coach de méthodes, pas un soignant — si la douleur revient souvent ou t’inquiète, c’est médecin, sans hésiter. Côté organisation en attendant : Journée minimale (charge réduite mais chaîne intacte), pauses écran toutes les 25 minutes (regarde loin 20 secondes), et hydratation réelle.',
      'Malade = le corps réquisitionne l’énergie : lutter contre en enchaînant les heures rallonge la panne. Mode dégradé assumé : le strict minimum (fiche ci-dessous), beaucoup de sommeil, et la reprise progressive. Une semaine douce vaut mieux qu’un mois de rechutes.',
      'Maux de tête et yeux qui tirent en fin de journée, c’est souvent : écran trop proche, pas de pauses, hydratation en berne, sommeil court. Règle 20-20-20 (toutes les 20 min, regarde à 20 mètres pendant 20 secondes) + vraies pauses. Si ça persiste : médecin et contrôle de la vue — sérieusement.',
    ],
    also: 'Et côté santé : charge réduite, vraies pauses — et médecin si ça dure.',
  },
  {
    id: 'sport',
    strong: [
      'faire du sport', 'courir', 'muscu', 'footing', 'salle de sport', 'bouger',
      'arreter le sport',
    ],
    mood: 'happy',
    links: [{ label: 'Pomodoro (caser les blocs)', to: '/methode/pomodoro' }],
    variants: [
      'Ne sacrifie pas tout le sport « pour gagner du temps » : 2-3 séances courtes par semaine améliorent le sommeil, l’humeur et la concentration — c’est un investissement qui se rembourse en qualité de travail. La version PASS : 30-45 minutes, pas les 2 h d’avant.',
      'Le bon créneau : en fin de journée de travail (ça coupe et ça décharge le stress) ou le matin des jours légers. Et les jours surchargés, la version minimale existe : 15 minutes de marche rapide dehors — ce n’est pas « rien », c’est de l’entretien.',
      'Si tu as tout arrêté et que tu le sens (sommeil moins bon, tension qui monte), reprends petit : deux créneaux de 30 minutes plantés dans la semaine comme des rendez-vous. Le sport en PASS n’est pas un luxe, c’est de la maintenance du cerveau.',
    ],
    also: 'Et pour le sport : 2-3 séances courtes par semaine, c’est de la maintenance du cerveau.',
  },
  {
    id: 'cafe-energie',
    strong: [
      'cafe', 'cafeine', 'boisson energisante', 'redbull', 'monster', 'coup de barre',
      'somnolence apres manger',
    ],
    mood: 'think',
    links: [{ label: 'SOS Fatigue', to: '/sos/fatigue' }],
    variants: [
      'Le café marche — utilisé proprement : avant 15 h, 1 à 3 tasses, et pas pour compenser des nuits courtes en boucle (là il masque le problème qu’il aggrave). Après 15 h, il vole du sommeil profond même si tu t’endors « normalement ».',
      'Le coup de barre d’après-déjeuner est physiologique, pas un défaut : mets-y les tâches actives (QCM, rappels debout, schémas) plutôt que la lecture — ou une sieste de 15-20 minutes MAX si tu peux, redoutablement efficace. La lecture passive à 14 h, c’est de la sieste déguisée de toute façon.',
      'Les boissons énergisantes en période d’exam : pic puis crash, sommeil abîmé, anxiété boostée — mauvais deal pour un cerveau qui doit mémoriser. Café raisonnable, eau réelle, et la vraie molécule miracle reste gratuite : le sommeil.',
    ],
    also: 'Et pour l’énergie : café avant 15 h seulement, sieste courte plutôt que boisson énergisante.',
  },
  {
    id: 'amis-sorties',
    strong: [
      'mes amis', 'sortir', 'soiree', 'copain', 'copine', 'vie sociale', 'isole de mes amis',
      'invitations',
    ],
    mood: 'think',
    links: [{ label: 'Journée minimale', to: '/methode/journee-minimale' }],
    variants: [
      'Le PASS demande des sacrifices sociaux, pas un isolement total — l’isolement complet finit par coûter au moral, donc au travail. Le bon réglage : peu de sorties mais DÉCIDÉES (une par semaine ou quinzaine, choisie, sans culpabilité), et des amis prévenus du contexte : les vrais comprennent une année.',
      'Astuce qui change tout : remplace « désolé je peux pas » par « je peux pas ce soir, mais je suis libre samedi 12 h-14 h ». Tu gardes le lien en donnant TES créneaux — la vie sociale devient un rendez-vous cadré, pas une menace permanente sur le planning.',
      'Si une relation te coûte plus qu’elle ne te porte cette année (drama, pression, moqueries sur ton travail), tu as le droit de la mettre en pause — ce n’est pas de l’égoïsme, c’est de la gestion de saison. Les personnes qui comptent seront encore là en juillet.',
    ],
    also: 'Et pour la vie sociale : des créneaux décidés par toi, sans culpabilité.',
  },
  {
    id: 'styles-apprentissage',
    strong: [
      'visuel', 'auditif', 'kinesthesique', 'style d apprentissage', 'memoire visuelle',
      'memoire auditive', 'je suis plutot visuel',
    ],
    mood: 'think',
    links: [
      { label: 'Le mythe des styles (et la version vraie)', to: '/reperes/mythes' },
      { label: 'Double représentation', to: '/methode/double-representation' },
    ],
    variants: [
      'Attention, mythe tenace : les « styles d’apprentissage » figés (visuel/auditif/kinesthésique) ne sont pas soutenus par la recherche — enseigner « selon son style » n’améliore pas les résultats. Ce qui est vrai : le FORMAT doit suivre le CONTENU. Un mécanisme se schématise, une formule se pratique, une liste s’accroche — quel que soit ton « style ». La page Mythes détaille.',
      'Tu peux avoir des préférences (dessiner aide souvent, à presque tout le monde) — mais te définir « visuel » et tout convertir en images te fera rater ce qui exige du calcul ou du texte. La vraie compétence : choisir la représentation qu’exige la notion. C’est la Double représentation ci-dessous.',
      'Remplace « quel est mon style ? » par « qu’exige cette notion ? » : cascade → schéma fléché, formule → exemples calculés, structures → dessin légendé, définitions → questions-réponses. Ton profil dans l’app note des points forts FONCTIONNELS, jamais une étiquette figée — c’est voulu.',
    ],
    also: 'Et sur les « styles » : le format suit le contenu, pas une étiquette — mythe documenté.',
  },
  {
    id: 'progres-stagne',
    strong: [
      'je progresse pas', 'stagne', 'plafonne', 'toujours le meme niveau', 'aucun progres',
      'plafond de verre',
    ],
    mood: 'think',
    links: [
      { label: 'Calibration (objectiver le niveau)', to: '/methode/calibration-confiance' },
      { label: 'Variation (sortir du confort)', to: '/methode/variation' },
      { label: 'Entrelacement', to: '/methode/interleaving' },
    ],
    variants: [
      'Le plateau arrive quand l’entraînement devient confortable : mêmes QCM, mêmes chapitres, mêmes conditions. On progresse au bord de la difficulté, pas dedans ni loin. Ajoute de la variation : questions mélangées, formats nouveaux, conditions d’examen. Inconfort = signal de croissance.',
      'Vérifie d’abord que c’est un vrai plateau : nos impressions de progrès sont très mauvaises. La Calibration te donne une mesure objective sur deux semaines. Souvent « je stagne » = « je progresse sur ce que je ne mesure pas ».',
      'Piste classique de plateau : tu retravailles ce que tu sais déjà (c’est agréable) et évites tes zones faibles (c’est désagréable). Inverse le ratio une semaine : 70 % du temps sur tes pires chapitres. Désagréable et spectaculairement rentable.',
    ],
    also: 'Et pour le plateau : ajoute de l’inconfort ciblé — variation, mélange, zones faibles.',
  },
  {
    id: 'lent',
    strong: [
      'trop lent', 'je suis lent', 'pas le temps de finir', 'manque de temps en colle',
      'vitesse', 'les autres finissent avant',
    ],
    mood: 'think',
    links: [
      { label: 'Simulation d’examen (travailler le chrono)', to: '/methode/simulation-examen' },
      { label: 'Exercice à froid', to: '/methode/exercice-a-froid' },
    ],
    variants: [
      'La vitesse en épreuve ne vient pas de « lire plus vite » : elle vient de l’automatisation — ce qui est sur-appris ne demande plus de réflexion. Les items que tu traites lentement sont ceux que tu recalcules au lieu de reconnaître. Plus de rappels espacés dessus = plus de vitesse, mécaniquement.',
      'Entraîne le chrono comme une compétence à part : simulations en conditions réelles avec la VRAIE durée, et une stratégie de passage écrite (ordre des questions, quand sauter, quand revenir). On ne découvre pas sa gestion du temps le jour J.',
      'En attendant que la vitesse monte : stratégie de tri assumée — d’abord tous les points sûrs et rapides, ensuite les moyens, les gouffres à temps en dernier. Finir « dans l’ordre » est une habitude scolaire, pas une obligation de concours.',
    ],
    also: 'Et pour la vitesse : automatise par rappels espacés + simulations chronométrées.',
  },
  {
    id: 'trouble-attention',
    strong: [
      'tdah', 'dyslexie', 'dys', 'trouble de l attention', 'hyperactif', 'trouble dys',
    ],
    mood: 'care',
    links: [
      { label: 'Pomodoro (blocs courts)', to: '/methode/pomodoro' },
      { label: 'Friction numérique', to: '/methode/friction-numerique' },
    ],
    variants: [
      'Sujet sérieux, réponse en deux temps. 1) Officiel : si tu as un diagnostic (ou une forte suspicion), rapproche-toi du service handicap/santé de ton université — des aménagements d’épreuve existent (tiers temps notamment) et c’est ton droit, pas une faveur. 2) Méthodes : blocs courts (Pomodoro 15-25 min), friction numérique maximale, unités très petites et validables — tout ce que l’app propose marche, en version plus courte et plus fréquente.',
      'Je ne diagnostique rien — ça, c’est médecin ou spécialiste (et si c’est confirmé, l’université DOIT aménager : renseigne-toi tôt, les dossiers prennent du temps). Côté organisation, les leviers qui aident le plus : environnement épuré, blocs très courts avec sortie physique (se lever) entre deux, et le rappel actif qui garde le cerveau en mode action plutôt qu’en lecture flottante.',
      'Deux pistes en parallèle : la piste officielle (service santé universitaire → diagnostic → aménagements — commence maintenant, c’est long) et la piste quotidienne : réduis toutes les unités de moitié par rapport aux conseils standards, double la fréquence des pauses, et mesure en unités finies. Les méthodes actives sont tes alliées naturelles.',
    ],
    also: 'Et pour l’attention : blocs plus courts, pauses plus fréquentes — et le service handicap de la fac.',
  },

  {
    id: 'par-coeur',
    strong: [
      'par coeur', 'liste a retenir', 'apprendre une liste', 'noms a retenir',
      'valeurs a retenir', 'arbitraire', 'classification', 'nomenclature',
      'moyen mnemotechnique', 'mnemotechnique', 'retenir des chiffres',
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
    also: 'Et pour le par-cœur : une accroche (image, son, histoire) puis des rappels espacés.',
  },
  {
    id: 'pause',
    strong: ['pause', 'pauses', 'rythme de travail', 'pomodoro', 'temps de pause'],
    mood: 'happy',
    links: [{ label: 'Pomodoro (blocs + pauses)', to: '/methode/pomodoro' }],
    variants: [
      'Les pauses font partie du travail : 25-50 minutes de bloc, 5-10 minutes de vraie pause SANS écran (marcher, boire, regarder loin). Le Pomodoro cadre tout ça — et ne coupe jamais un raisonnement en plein élan.',
      'Règle simple : des blocs nets, des pauses nettes. Une pause à scroller n’est pas une pause — ton attention ne récupère pas. Fiche Pomodoro ci-dessous pour le tempo exact.',
      'Si tu satures, la pause est un outil, pas une triche : 5 minutes debout, fenêtre, eau. Tu reviens avec un cerveau qui classe mieux. Le minuteur intégré à la fiche fait le chef d’orchestre.',
    ],
    also: 'Et pour le rythme : blocs nets, pauses nettes, sans écran.',
  },

  {
    id: 'moral-bas',
    priority: 20,
    strong: [
      'ca va pas fort', 'moral a zero', 'moral dans les chaussettes', 'coup de mou',
      'pas le moral', 'moral en berne', 'gros coup de blues', 'je sature',
      'ras le bol de tout', 'au bout de ma vie', 'envie de rien aujourd hui',
      'journee pourrie', 'semaine pourrie', 'pas bien en ce moment', 'du mal en ce moment',
    ],
    mood: 'care',
    links: [
      { label: 'Une citation pour la route', to: '/citations/plein-ecran' },
      { label: 'Journée minimale (garder la chaîne)', to: '/methode/journee-minimale' },
      { label: 'Si c’est plus profond : protocole Détresse', to: '/sos/detresse' },
    ],
    variants: [
      'Les jours gris font partie de l’année — surtout d’une année comme la tienne, et ça ne dit rien de ta valeur ni de tes chances. Aujourd’hui, on vise petit : UNE unité de travail (la Journée minimale te la donne), un peu d’air dehors, un vrai repas. Et si ce « pas fort » dure depuis des semaines, ne le porte pas seul·e : le protocole Détresse a les bons contacts.',
      'Merci de le dire — c’est déjà un bon réflexe. Le moral bas ment beaucoup : il te dit « à quoi bon », alors qu’une petite victoire concrète le fait souvent reculer. Une page, un rappel, dix minutes. Puis quelque chose de gentil pour toi ce soir. Si ça s’installe ou s’alourdit, le protocole Détresse est là, sans honte.',
      'D’accord, journée difficile. On ne va pas faire semblant qu’une citation règle tout — mais on protège l’essentiel : le minimum de travail pour ne pas culpabiliser demain, du sommeil ce soir, et un moment de vraie coupure. Le reste peut attendre 24 h. Et parle-le à quelqu’un ce soir, même juste pour dire que c’était dur.',
    ],
    more: [
      'Si le moral reste bas plusieurs semaines, que le sommeil ou l’appétit s’en mêlent, ce n’est plus un « coup de mou » : c’est le moment d’en parler à un humain — proche, médecin, ou les contacts du protocole Détresse. C’est fréquent en PASS, ça se soigne, et demander de l’aide est une décision intelligente.',
      'Un truc concret qui aide les jours gris : la règle des 3 — une chose utile (même minuscule), une chose agréable, une personne à qui parler. Trois cases, pas plus. La journée devient récupérable.',
    ],
    also: 'Et pour le moral : vise une petite victoire aujourd’hui, et n’hésite pas à en parler autour de toi.',
  },
  {
    id: 'reveil',
    strong: [
      'panne de reveil', 'rate mon reveil', 'me reveille pas', 'du mal a me lever',
      'me lever le matin', 'snooze', 'reste au lit', 'traine au lit', 'emerge pas',
      'matins difficiles', 'me leve a midi',
    ],
    mood: 'happy',
    links: [
      { label: 'Journée minimale (redémarrer proprement)', to: '/methode/journee-minimale' },
      { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
    ],
    variants: [
      'Le lever se gagne la veille : heure de coucher stable, réveil À TRAVERS la pièce (obligé de te lever pour l’éteindre), et le premier geste du matin déjà décidé et préparé (le poly ouvert à la bonne page sur le bureau). Le matin, on n’improvise pas — on exécute.',
      'Règle d’or anti-snooze : les 10 premières minutes ne se négocient pas au réveil, elles se décident la veille. Lumière direct (volets, lampe forte), un verre d’eau, et le Démarrage en 10 minutes déjà prêt. Chaque snooze re-endort le cerveau pour un cycle qu’il ne finira pas — c’est pire que se lever.',
      'Si tu émerges à midi malgré tout, c’est le rythme entier qui a glissé : recale par le LEVER (heure fixe, même le week-end), pas par le coucher — le sommeil suivra en quelques jours. Et une matinée ratée ne condamne pas la journée : Journée minimale, et on repart.',
    ],
    also: 'Et pour le réveil : réveil loin du lit, premier geste préparé la veille.',
  },
  {
    id: 'impasses',
    strong: [
      'faire des impasses', 'impasse sur', 'des impasses', 'sacrifier un chapitre',
      'sacrifier une matiere', 'zapper un chapitre', 'laisser tomber un chapitre',
      'tout apprendre ou pas', 'abandonner un cours',
    ],
    mood: 'think',
    links: [
      { label: 'Triage du retard (les critères)', to: '/methode/triage-retard' },
      { label: 'Liste de questions (cibler le rentable)', to: '/methode/liste-questions' },
    ],
    variants: [
      'L’impasse totale est une roulette russe — mais le tri d’intensité est une stratégie de major : chaque chapitre reçoit un niveau (maîtrise complète / squelette + QCM / survol des annales), selon son poids au concours et ton retard. Le Triage ci-dessous te donne les critères froids pour décider sans culpabiliser.',
      'La vraie question n’est pas « impasse ou pas » mais « quel niveau d’investissement pour quel rendement ». Un chapitre jamais tombé en annales mérite le mode squelette, pas tes soirées. Décide par écrit, une fois, et ne re-négocie pas chaque jour — c’est la re-négociation qui épuise.',
      'Règle prudente : jamais d’impasse totale sur un chapitre poids lourd, mais des niveaux d’intensité partout ailleurs. Et garde une passe « annales » même sur les chapitres sacrifiés : 30 minutes de QCM te donnent les 3 questions récurrentes — le meilleur rapport temps/points qui existe.',
    ],
    also: 'Et pour les impasses : des niveaux d’intensité plutôt qu’un tout-ou-rien.',
  },
  {
    id: 'profs-poly',
    strong: [
      'prof incomprehensible', 'prof nul', 'prof mauvais', 'cours mal fait',
      'poly nul', 'poly incomprehensible', 'diapos illisibles', 'prof va trop vite',
      'mal explique', 'explique mal', 'explique trop mal', 'cours brouillon', 'diapos',
      'illisible', 'illisibles', 'prof', 'profs', 'prof qui lit ses diapos',
    ],
    mood: 'think',
    links: [
      { label: 'Exemple résolu (contourner par le concret)', to: '/methode/exemple-resolu' },
      { label: 'Feynman (reconstruire l’explication)', to: '/methode/feynman' },
      { label: 'Sources : que privilégier', to: '/reperes/sources' },
    ],
    variants: [
      'Un cours mal fait, ça arrive — et râler ne rapporte pas de points. Stratégie de contournement : garde le poly officiel comme RÉFÉRENCE de ce qui tombe (même moche, c’est lui qui fait foi), mais construis ta compréhension ailleurs : exemples résolus, annales commentées, et l’explication que TU reconstruis avec Feynman. Le prof n’est qu’une source parmi d’autres — l’examen, lui, reste basé sur son contenu.',
      'Sépare deux choses : le CONTENU à connaître (celui du poly officiel, non négociable) et l’EXPLICATION pour le comprendre (n’importe quelle source claire fait l’affaire). Beaucoup perdent des points en apprenant un autre cours « mieux expliqué » — les détails qui tombent sont ceux de TA fac. Comprendre ailleurs, mémoriser ici.',
      'Prof trop rapide : n’essaie pas de tout suivre en direct. Note la structure et les insistances, marque « ?? » aux trous, et comble dans les 24 h avec le poly + un exemple résolu. Un cours magistral n’est pas fait pour tout comprendre en direct — personne n’y arrive.',
    ],
    also: 'Et pour le cours mal fait : comprendre ailleurs, mémoriser sur le poly officiel.',
  },
  {
    id: 'contradictions',
    strong: [
      'infos contradictoires', 'pas la meme chose selon', 'versions differentes',
      'le tutorat dit autre chose', 'contradiction entre', 'deux versions',
      'qui croire', 'sources qui se contredisent', 'le prof dit l inverse',
    ],
    mood: 'think',
    links: [
      { label: 'Hiérarchie des sources', to: '/reperes/sources' },
      { label: 'Tableau de contraste (poser les deux versions)', to: '/methode/tableau-contraste' },
    ],
    variants: [
      'Règle simple quand deux sources se contredisent : celle qui NOTE gagne. Le poly / le cours officiel de ta fac fait foi au concours, même si le tutorat ou un livre dit autre chose (la science évolue, les concours moins vite). Note la contradiction dans un coin (elle peut devenir une question piège), apprends la version officielle.',
      'Pose les deux versions côte à côte dans un mini-tableau : source, affirmation, laquelle est celle de la fac. Neuf fois sur dix, la « contradiction » est une différence de contexte ou de niveau de détail. Et pour l’examen : la version du prof qui rédige les sujets, toujours.',
      'C’est frustrant mais fréquent. Priorité : 1) le cours officiel de TA fac, 2) les annales (elles montrent la version attendue), 3) le reste. Si le doute persiste sur un point important, la question au prof ou au tutorat de ta fac vaut mieux que des heures de forums.',
    ],
    also: 'Et pour les contradictions : la version de ta fac fait foi — c’est elle qui note.',
  },
  {
    id: 'arbitrage-soir',
    strong: [
      'quoi bosser ce soir', 'bosse quoi ce soir', 'je bosse quoi', 'je revise quoi',
      'quelle matiere ce soir', 'choisir entre deux matieres',
      'par quoi je commence ce soir', 'quel cours bosser', 'quelle matiere prioriser',
      'plusieurs matieres en attente', 'choisir quoi reviser',
    ],
    mood: 'think',
    links: [
      { label: 'Triage (décider froidement)', to: '/methode/triage-retard' },
      { label: 'Entrelacement (alterner utile)', to: '/methode/interleaving' },
    ],
    variants: [
      'Décision en 60 secondes, pas plus (l’hésitation coûte plus cher que n’importe quel « mauvais » choix) : 1) une échéance proche ? elle gagne. 2) Sinon, la matière la plus en retard SUR SON POIDS au concours. 3) Égalité ? Celle que tu évites depuis le plus longtemps — c’est là que dorment les points. Et si la soirée est longue, alterne deux matières par blocs : l’entrelacement rend les deux plus solides.',
      'Le piège du soir : passer 30 minutes à choisir, puis bosser mou. Inverse : choisis en 1 minute avec la règle échéance > rentabilité > évitement, écris l’unité exacte (« biochimie : cycle X, rappel + 20 QCM »), et fonce. Un choix moyen exécuté bat un choix parfait discuté.',
      'Astuce durable : décide la veille pour le lendemain (3 unités notées sur un papier). Le soir venu, zéro délibération — tu exécutes. La fatigue du soir est mauvaise conseillère pour choisir, très correcte pour exécuter.',
    ],
    also: 'Et pour choisir ce soir : échéance > rentabilité > matière évitée — en 60 secondes.',
  },
  {
    id: 'argent-job',
    strong: [
      'job etudiant', 'travailler a cote', 'baby sitting', 'financer mes etudes',
      'probleme d argent', 'soucis d argent', 'bourse', 'payer mon loyer',
    ],
    mood: 'care',
    links: [{ label: 'Triage (protéger le rentable)', to: '/methode/triage-retard' }],
    variants: [
      'Sujet sérieux, et pas un détail : un job pendant le PASS coûte cher en points, donc chaque heure doit être choisie. Deux pistes avant tout : le service social de ta fac (bourses, aides d’urgence, exonérations — beaucoup d’étudiants passent à côté d’aides auxquelles ils ont droit) ; et si le job est incontournable, vise des créneaux compatibles (baby-sitting où tu peux réviser, week-end plutôt que soirs de semaine).',
      'Je ne vais pas faire semblant que ça n’impacte pas — ça impacte. Donc on optimise ce qui reste : tes heures d’étude deviennent non négociables et ultra-actives (rappels, QCM — zéro relecture molle), le Triage décide froidement où elles vont, et tes trajets/pauses deviennent des micro-rappels. Et vérifie tes droits aux aides : CROUS, assistante sociale de la fac. C’est leur travail de t’aider.',
      'La règle si tu dois travailler : protège le sommeil AVANT tout (c’est lui qui rend tes heures d’étude rentables), sanctuarise des blocs d’étude fixes dans la semaine, et accepte le mode « intensité triée » plutôt que l’exhaustivité. Des étudiants passent le concours en travaillant à côté — avec une organisation au cordeau et zéro temps mou.',
    ],
    also: 'Et côté budget : vérifie tes droits (CROUS, service social de la fac) — c’est fait pour ça.',
  },
  {
    id: 'logement-bruit',
    strong: [
      'coloc bruyant', 'colocs bruyants', 'voisins bruyants', 'trop de bruit chez moi',
      'pas d endroit calme', 'famille bruyante', 'petit frere', 'petite soeur',
      'impossible de bosser chez moi', 'du bruit a la maison', 'coloc', 'colocs',
      'colocation', 'voisins', 'trop de bruit',
    ],
    mood: 'think',
    links: [
      { label: 'Friction numérique (et environnement)', to: '/methode/friction-numerique' },
      { label: 'Pomodoro (blocs courts déplaçables)', to: '/methode/pomodoro' },
    ],
    variants: [
      'Le bruit subi est un vrai voleur de points — on ne « s’habitue » pas, on paye en re-concentrations. Trois parades par ordre d’efficacité : déplacer les sessions exigeantes (BU, salle de la fac, médiathèque municipale — souvent vide et calme) ; bouchons d’oreilles + bruit stable au casque pour couvrir ; négocier des créneaux de silence à la maison (2 h précises valent mieux qu’un « moins de bruit » vague).',
      'Stratégie réaliste : garde pour la maison les tâches qui tolèrent le bruit (QCM, cartes, recopie de schémas) et sors pour ce qui exige du silence profond (apprentissage neuf, rappels). Même 2 h de BU par jour bien utilisées changent une semaine.',
      'Si tu ne peux pas sortir : bouchons en mousse (3 €, sous-cotés), bruit blanc au casque par-dessus, et blocs Pomodoro courts calés sur les moments calmes de la maison (tôt le matin, c’est souvent l’or du silence). Le réveil avancé d’une heure peut te rendre ta meilleure heure de la journée.',
    ],
    also: 'Et pour le bruit : sessions exigeantes dehors, tâches tolérantes à la maison.',
  },
  {
    id: 'transports',
    strong: [
      'dans le train', 'dans le bus', 'dans le metro', 'temps de trajet',
      'une heure de trajet', '1h de trajet', 'trajets longs', 'pendant le trajet',
      'rentabiliser le trajet',
    ],
    mood: 'happy',
    links: [
      { label: 'Répétition espacée (le format trajet)', to: '/methode/repetition-espacee' },
      { label: 'Rappel actif (en mode mental)', to: '/methode/rappel-actif' },
    ],
    variants: [
      'Les trajets sont parfaits pour la RÉVISION, mauvais pour l’apprentissage neuf (trop d’interruptions). Le combo gagnant : cartes de rappel sur téléphone (répétition espacée), ou le rappel mental pur — tu fermes les yeux et récites le squelette du dernier cours, puis vérifies en arrivant. Une heure de trajet = ta session de consolidation quotidienne, gratuite.',
      'Adapte au mode de transport : assis au calme → cartes ou lecture ciblée de tes erreurs ; debout/bruyant → rappel mental (récite la cascade d’hier, liste les enzymes, refais le schéma dans ta tête). Le rappel mental sans support est sous-coté : c’est exactement le format de l’examen.',
      'Piège du trajet : le scroll par défaut. Décide AVANT de monter ce que tu y fais (« 20 cartes de biochimie » ou « rappel mental de l’anat d’hier ») — sinon le téléphone gagne par défaut. Et garde un trajet par jour SANS travail : la décompression compte aussi.',
    ],
    also: 'Et pour les trajets : cartes espacées ou rappel mental — jamais du neuf.',
  },
  {
    id: 'soiree-alcool',
    strong: [
      'soiree hier', 'bu hier soir', 'gueule de bois', 'lendemain de soiree',
      'trop bu', 'cuite', 'soiree la veille de',
    ],
    mood: 'think',
    links: [{ label: 'Journée minimale (mode dégradé)', to: '/methode/journee-minimale' }],
    variants: [
      'Sans jugement — mais avec les faits : l’alcool abîme précisément le sommeil profond, celui qui consolide la mémoire. Une vraie soirée coûte en pratique 24-48 h de rendement. Aujourd’hui : hydratation, journée minimale (rappels légers, pas d’apprentissage neuf), coucher tôt. Et pense « calendrier » : une soirée se place APRÈS une colle, jamais avant.',
      'Aujourd’hui, ton cerveau tourne en mode dégradé — inutile de forcer de l’apprentissage neuf qui ne s’imprimera pas. Programme minimum : de l’eau, un vrai repas, 45 minutes de QCM faciles pour garder la chaîne, sieste courte si besoin, et la vraie nuit ce soir répare le reste.',
      'Le deal honnête avec les soirées en PASS : rares, choisies, et placées stratégiquement (après une échéance, avant un jour léger). Celle d’hier est passée — pas de culpabilité rétroactive, juste la version minimale d’aujourd’hui et une vraie nuit. Demain tu repars à pleine puissance.',
    ],
    also: 'Et après la soirée : journée minimale, hydratation, vraie nuit — pas de neuf aujourd’hui.',
  },
  {
    id: 'alimentation',
    strong: [
      'je mange mal', 'saute des repas', 'saute le dejeuner', 'pas le temps de manger',
      'malbouffe', 'grignote', 'grignotage', 'plus d appetit', 'perdu l appetit',
    ],
    mood: 'care',
    links: [{ label: 'Pomodoro (caser les vrais repas)', to: '/methode/pomodoro' }],
    variants: [
      'Manger n’est pas du temps volé aux révisions : le cerveau est l’organe le plus gourmand du corps, et l’hypoglycémie de 16 h te coûte plus qu’une vraie pause déjeuner. Minimum vital : trois repas ancrés à heures à peu près fixes, de quoi tenir sous la main (fruits, oléagineux — pas que des gâteaux), et l’eau en continu. C’est de la maintenance de ton outil de travail.',
      'Le grignotage permanent est souvent un symptôme : ennui, stress, ou repas trop légers. Traite la cause (vrais repas, vraies pauses) plutôt que de culpabiliser sur le symptôme. Et le déjeuner sauté « pour gagner une heure » se paye l’après-midi en concentration — c’est un prêt à taux usuraire.',
      'Attention à un signal : si l’appétit a VRAIMENT disparu depuis plusieurs semaines (ou que tu manges compulsivement sans faim), ce n’est plus de la logistique — c’est souvent le stress ou le moral qui parlent. Ça mérite un médecin, pas un régime. Pour le reste : simple, régulier, suffisant.',
    ],
    also: 'Et côté repas : trois vrais repas ancrés — le cerveau est ton outil de travail.',
  },
  {
    id: 'oral-entretien',
    strong: [
      'un oral', 'l oral', 'entretien', 'presenter a l oral', 'exposer a l oral',
      'parler en public', 'mineure orale',
    ],
    mood: 'think',
    links: [
      { label: 'Feynman (verbaliser clairement)', to: '/methode/feynman' },
      { label: 'Simulation (répéter en conditions)', to: '/methode/simulation-examen' },
    ],
    variants: [
      'Honnêteté : le corpus de l’app est taillé pour l’écrit et les QCM — l’oral n’y a pas de protocole dédié. Mais deux méthodes s’y transposent très bien : Feynman (expliquer simplement à voix haute, c’est littéralement l’entraînement d’un oral) et la Simulation (répéter en conditions réelles, chrono, debout, enregistré au téléphone pour t’entendre). Répéter DEVANT quelqu’un une fois vaut dix répétitions seul.',
      'Pour un oral, la boucle efficace : écrire le squelette (pas le texte mot à mot — il s’effondre sous le stress), le dérouler à voix haute en Feynman, s’enregistrer une fois (douloureux et magique), et une répétition en conditions réelles. Le par-cœur intégral est le piège : vise la maîtrise du plan + des transitions.',
      'Trois répétitions bien faites suffisent souvent : une pour structurer (avec notes), une pour fluidifier (sans notes, enregistrée), une en conditions (tenue, debout, chrono, public d’un ami). Et le jour J, le NRAR marche aussi avant un oral — même corps, même stress, mêmes gestes.',
    ],
    also: 'Et pour l’oral : Feynman à voix haute + une répétition en conditions réelles.',
  },
  {
    id: 'las-orientation',
    strong: [
      'las ou pass', 'choisir las', 'la las', 'las', 'en las', 'mineure', 'passerelle',
      'me reorienter', 'reorientation', 'changer de filiere', 'plan b concret',
    ],
    mood: 'care',
    links: [{ label: 'Protocole anti-stress NRAR', to: '/methode/nrar-stress' }],
    variants: [
      'Vraie question, mauvaise adresse : je suis un coach de MÉTHODES, et l’orientation (LAS, mineures, passerelles) est un sujet réglementaire qui change selon les facs et les années — je refuse de te répondre à moitié juste. Les bonnes portes : le service orientation de TA fac (les règles locales priment), les journées d’info, et des étudiants passés par ces parcours. Ce que je peux te dire : y réfléchir n’est pas « abandonner » — c’est de la stratégie adulte.',
      'Je ne vais pas jouer au conseiller d’orientation — les règles LAS/passerelles sont trop locales et trop mouvantes pour un coach hors ligne. Par contre : avoir un plan B réfléchi REND PLUS FORT au concours (moins de terreur de l’échec = meilleur travail). Prends un rendez-vous au service orientation de ta fac pour poser les vraies infos, puis reviens à ta prochaine unité de travail l’esprit plus clair.',
      'Sujet important, à traiter avec les bonnes sources : service orientation de ta fac, textes officiels de TON université, témoignages récents. Méfie-toi des forums (règles d’une autre fac, d’une autre année). Et pendant que la réflexion mûrit, le meilleur investissement reste le même : tes méthodes et ta régularité — elles servent dans TOUS les scénarios.',
    ],
    also: 'Et pour l’orientation : le service orientation de ta fac — les règles locales priment.',
  },
  {
    id: 'tutorat-prepa',
    strong: [
      'tutorat ou prepa', 'prepa privee', 'payer une prepa', 'inscrire en prepa',
      'le tutorat suffit', 'prepa payante', 'boite privee',
    ],
    mood: 'think',
    links: [{ label: 'Sources et niveau de preuve', to: '/reperes/sources' }],
    variants: [
      'Réponse honnête : aucune structure ne travaille à ta place, et les classements sont remplis d’étudiants « tutorat seul ». Le tutorat de fac a deux avantages structurels : il est calé sur TON programme (c’est lui qui prédit les sujets) et il est gratuit. Une prépa peut apporter du cadre et des colles en plus — utile si tu as du mal à t’auto-structurer — mais c’est la MÉTHODE quotidienne qui fait le classement, pas le logo sur le polycopié.',
      'Avant de payer, pose la vraie question : qu’est-ce qui te manque ? Des colles ? (le tutorat en fait). Du cadre ? (les méthodes de l’app + un binôme font ça gratuitement). De la réassurance ? (comprends que la prépa vend aussi ça). Si tu paies, que ce soit pour un besoin identifié — pas pour calmer l’angoisse ou parce que « tout le monde le fait ».',
      'Le piège classique de la prépa : l’empilement. Deux sources de cours + deux banques de colles = surcharge et culpabilité permanente. Quelle que soit ta décision, garde UNE base de cours (celle de ta fac) et fais des annales/colles ta seule accumulation. La structure en plus doit simplifier ta semaine, pas la doubler.',
    ],
    also: 'Et sur tutorat/prépa : c’est la méthode quotidienne qui classe, pas le logo.',
  },

  // ================================================================ MÉTA / SOCIAL
  {
    id: 'motive-moi',
    strong: [
      'motive', 'motive moi', 'citation', 'booste', 'encourage', 'inspire',
      'donne moi de la force', 'remonte le moral', 'phrase du jour',
    ],
    mood: 'cheer',
    links: [{ label: 'Toutes les citations en plein écran', to: '/citations/plein-ecran' }],
    variants: [
      '{line}\n\nMaintenant, du concret : choisis UNE unité de cours et lance 10 minutes. La motivation suit l’action, jamais l’inverse.',
      '{line}\n\nGarde ça en tête — puis transforme-le en geste : une page, un rappel de mémoire, maintenant.',
      '{line}\n\nEt souviens-toi : tu n’as pas besoin d’être au top pour bosser. C’est en bossant qu’on se remet au top.',
      '{line}\n\nRespire, redresse-toi, et prends le prochain petit pas. C’est comme ça qu’on gagne une année.',
    ],
    more: ['{line}\n\nUne autre ? Le plein écran en a des centaines — mais après, au travail.'],
  },
  {
    id: 'quelle-methode',
    strong: [
      'quelle methode', 'quelles methodes', 'par ou commencer', 'comment apprendre',
      'comment reviser', 'comment travailler', 'quoi faire ce soir', 'que faire',
      'meilleure methode', 'conseille moi',
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
    strong: [], // rempli par le moteur avec les noms de matières
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
    strong: ['sos', 'urgence', 'au secours', 'a l aide', 'aide moi', 'besoin d aide'],
    mood: 'care',
    links: [{ label: 'Ouvrir les protocoles SOS', to: '/sos' }],
    variants: [
      'Les protocoles SOS sont faits pour les moments chauds : blocage, panique, fatigue, retard… Chacun commence par « Fais ça maintenant ». Dis-moi ce qui se passe, ou ouvre la liste ci-dessous.',
      'Je suis là. Dis-moi en un mot ce qui coince (commencer ? retenir ? panique ? fatigue ?) et je te donne le protocole exact — ou parcours les SOS ci-dessous, ils sont très courts.',
      'D’accord, on gère. Décris ton blocage en une phrase, ou va directement aux SOS : dix protocoles ultra-courts, un par situation de crise.',
    ],
  },
  {
    id: 'aide-app',
    strong: [
      'comment marche l app', 'a quoi sert l app', 'aide de l app', 'fonctionnalites',
      'comment utiliser l app', 'que sais tu faire', 'tu sais faire quoi',
    ],
    mood: 'happy',
    links: [
      { label: 'Lancer le diagnostic', to: '/diagnostic' },
      { label: 'La bibliothèque des 47 méthodes', to: '/bibliotheque' },
      { label: 'Les protocoles SOS', to: '/sos' },
    ],
    variants: [
      'Le tour du propriétaire : la Bibliothèque (47 méthodes en fiches actionnables + 12 protocoles par matière), le Diagnostic (3-5 questions → LA méthode qu’il te faut), les SOS (10 protocoles de crise), la Recherche (elle comprend même les fautes), et moi pour t’orienter en discutant. Tout marche hors ligne, rien ne quitte ton appareil.',
      'Je peux : t’orienter vers la bonne méthode quand tu me décris un blocage, t’expliquer n’importe quelle fiche (« c’est quoi le rappel actif ? »), te donner le protocole d’une matière, te remotiver, et t’envoyer vers le bon SOS en cas de coup dur. Essaie une suggestion en bas, ou pose ta question avec tes mots.',
      'Trois portes selon l’urgence : ça va mal maintenant → SOS ; tu ne sais pas quelle méthode → Diagnostic ; tu veux explorer → Bibliothèque. Et moi je fais l’aiguillage en langage normal — fautes de frappe acceptées.',
    ],
  },
  {
    id: 'salut',
    priority: 5,
    strong: ['salut', 'bonjour', 'bonsoir', 'hello', 'coucou', 'slt', 'hey', 'wesh', 'yo'],
    mood: 'happy',
    variants: [
      'Salut ! Prêt·e quand tu l’es. Dis-moi ce qui coince — démarrage, mémorisation, stress, QCM… — ou touche une suggestion en dessous.',
      'Hello ! Je suis là pour transformer ton problème en méthode. Décris ton blocage en une phrase, même vague, je m’occupe du reste.',
      'Salut ! Question du jour : qu’est-ce qui te ralentit le plus en ce moment ? Dis-le avec tes mots, on règle ça.',
    ],
  },
  {
    id: 'merci',
    priority: 5,
    strong: ['merci', 'thanks', 'nickel', 'genial', 'parfait', 'super', 'top', 'trop bien'],
    mood: 'cheer',
    variants: [
      'Avec plaisir ! Maintenant, la vraie victoire : appliquer dans les 5 minutes. File !',
      'De rien — c’est toi qui fais le travail, moi je montre juste la porte. Bonne session !',
      'Toujours là quand il faut. Allez, une unité de cours et on valide la journée.',
      'Content que ça aide ! Reviens quand tu veux, même à 2 h du matin — je ne dors pas, moi.',
    ],
  },
  {
    id: 'au-revoir',
    priority: 5,
    strong: ['bonne nuit', 'bye', 'a plus', 'je file', 'j y vais', 'a toute'],
    mood: 'cheer',
    variants: [
      'File ! Une bonne session, puis du vrai repos. À la prochaine.',
      'Bonne nuit — et rappelle-toi : dormir, c’est réviser en secret. Ton cerveau consolide pendant que tu rêves.',
      'À plus ! Je reste là, dans ta poche, au cas où.',
    ],
  },
  {
    id: 'qui-es-tu',
    priority: 8,
    strong: [
      'qui es tu', 't es qui', 'tu es qui', 'ton nom', 'tu es quoi', 'c est quoi axel',
      'presente toi', 'tu es un robot', 'tu es une ia',
    ],
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
    strong: ['blague', 'drole', 'marrant', 'rigoler', 'fais moi rire', 'joke', 'humour'],
    mood: 'cheer',
    variants: [
      'Pourquoi je suis toujours optimiste ? Parce qu’en tant que neurone, je vois partout du potentiel… d’action. Allez, au travail — c’était ta pause.',
      'On dit que je manque d’humour, mais c’est faux : j’ai des synapses très excitables. Bon, une unité de cours maintenant ?',
      'Ma blague préférée : « je vais juste regarder mon téléphone 5 minutes ». Hilarant à chaque fois. Téléphone loin, et on y retourne !',
      'Deux neurones se croisent. L’un dit : « ça gaine ? » … Je sors. Et toi tu rentres — dans ton cours.',
    ],
  },
  {
    id: 'vexant',
    priority: 8,
    strong: [
      'nul cette app', 'sert a rien', 'tu sers a rien', 'debile', 'stupide', 'merde',
      'chier', 'ta gueule', 'reponds mal', 'comprends jamais rien',
    ],
    mood: 'care',
    links: [{ label: 'Lancer le diagnostic', to: '/diagnostic' }],
    variants: [
      'Reçu cinq sur cinq — la frustration fait partie du jeu, surtout en PASS. Dis-moi ce qui t’a agacé : je peux sûrement mieux viser. Ou décris ton blocage autrement, j’écoute.',
      'Pas de souci, je ne me vexe pas (avantage d’être un neurone). Reformule ton problème avec d’autres mots, ou lance le diagnostic — il pose de meilleures questions que moi.',
      'OK. Souffle un coup, et réessaie avec une phrase simple : « je n’arrive pas à… ». C’est tout ce qu’il me faut pour t’aider vraiment.',
    ],
  },
];

/** Réponses de suivi génériques quand aucun `more` spécifique n'existe. */
export const GENERIC_MORE: string[] = [
  'On passe en mode exécution : ouvre la première fiche ci-dessus et fais littéralement l’étape 1, là, maintenant. Reviens me dire ce que ça a donné.',
  'Le mieux que je puisse faire : la fiche ci-dessus, mode « Suivre pas à pas » — elle te tient la main étape par étape. Et si le blocage est ailleurs, décris-le moi avec d’autres mots.',
  'Alors précisons : c’est quoi exactement qui coince — comprendre, retenir, t’y mettre, ou le moral ? Un mot suffit, j’ajuste.',
];

/** Accusés pour « oui / ok » après une réponse. */
export const ACK_YES: string[] = [
  'Parfait. Alors on ne discute plus, on exécute : première étape de la fiche ci-dessus, maintenant. Tu m’en donnes des nouvelles.',
  'Top. Lance-toi tout de suite — pas dans dix minutes. La fiche fait le reste.',
  'Très bien. Un minuteur, la fiche, et c’est parti. Je suis là au retour.',
];

/** Accusés pour « non / pas ça » après une réponse. */
export const ACK_NO: string[] = [
  'OK, alors j’ai mal visé. Reformule avec d’autres mots — ou dis-moi juste la matière et le moment où ça coince, je réajuste.',
  'Compris, on change d’angle. Décris la scène : tu es où, tu essaies de faire quoi, et qu’est-ce qui se passe à la place ?',
  'D’accord. Le diagnostic sera peut-être plus fin que moi sur ce coup : 3 à 5 questions et il tranche. Sinon, redis-le moi autrement.',
];
