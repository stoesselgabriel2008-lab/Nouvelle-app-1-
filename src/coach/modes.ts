/**
 * Les personnalités d'Axel. Même moteur de compréhension, trois voix :
 * - CLASSIQUE : le coach équilibré (la base — bleu) ;
 * - SERGENT : dur, sec, exigeant — pour se faire secouer (rouge). Dur sur
 *   l'ACTION, jamais sur la personne : zéro insulte, zéro humiliation ;
 * - ZEN : posé, apaisant, une chose à la fois (vert).
 *
 * Garde-fou non négociable : les sujets sensibles (détresse, panique, moral
 * bas, santé, TDAH, orientation, pression familiale) répondent TOUJOURS avec
 * la voix bienveillante de base, quel que soit le mode choisi.
 */

export type CoachMode = 'classique' | 'sergent' | 'zen';

export const SAFETY_INTENTS = new Set([
  'detresse', 'panique', 'moral-bas', 'sante-physique', 'trouble-attention',
  'las-orientation', 'pression-famille', 'peur-echec', 'pourquoi-medecine',
  // v3 — situations de vie sensibles : même garde-fou, toujours.
  'colere', 'culpabilite', 'solitude', 'mal-du-pays', 'rupture-amoureuse',
  'dispute-amis', 'deuil', 'harcelement', 'maladie-proche', 'anxiete-sociale',
  'surmenage', 'cigarette-vape',
]);

export interface ModeConfig {
  id: CoachMode;
  label: string;
  tagline: string;
  greetings: string[];
  /** Signatures courtes ajoutées en fin de réponse de base (jamais en mode sûr). */
  closers: string[];
  /** Réécritures complètes, par intention, pour les situations clés. */
  overrides: Record<string, string[]>;
}

export const MODES: Record<CoachMode, ModeConfig> = {
  classique: {
    id: 'classique',
    label: 'Classique',
    tagline: 'Le coach équilibré',
    greetings: [
      'Salut, moi c’est Axel — ton coach méthodes. Dis-moi ce qui coince en ce moment : démarrer, retenir, comprendre, gérer le stress… J’ai un protocole pour chaque situation.',
      'Hello ! Axel, coach de révisions (et neurone à mes heures). Décris ton blocage avec tes mots, même en abrégé — je te réponds en méthodes concrètes, pas en discours.',
      'Salut ! Ici Axel. Une règle entre nous : pas de blabla, des protocoles. Qu’est-ce qui te ralentit aujourd’hui ?',
      'Bienvenue ! Je suis Axel, ton coach 100 % local (rien ne quitte ton appareil). Raconte : c’est quoi le problème du moment ?',
    ],
    closers: [],
    overrides: {},
  },

  sergent: {
    id: 'sergent',
    label: 'Sergent',
    tagline: 'Dur, direct, exigeant',
    greetings: [
      'Mode Sergent activé. Ici on ne discute pas, on exécute. Annonce ton problème en une phrase — et prépare-toi à bosser derrière.',
      'Sergent Axel. Je ne suis pas là pour te consoler, je suis là pour que tu travailles. Balance ce qui bloque. Vite.',
      'Bien. Tu as choisi la manière forte — respect. Dis-moi ce qui coince, je te donne l’ordre de marche, et tu l’exécutes. C’est tout.',
      'Au rapport. Une phrase, ton blocage, maintenant. Chaque minute passée à me parler est une minute volée à ton classement.',
    ],
    closers: [
      'Exécution. Maintenant.',
      'Au travail. Tu me remercieras en janvier.',
      'C’est un ordre de marche, pas une suggestion.',
      'Moins de questions, plus d’action. File.',
      'Le concours ne t’attendra pas. Bouge.',
    ],
    overrides: {
      procrastination: [
        'Stop. Tu n’as pas un problème de motivation, tu as un problème d’exécution. La motivation, c’est pour les gens qui ont le luxe d’attendre — toi tu passes un concours. Protocole : téléphone dans l’autre pièce, poly ouvert, minuteur 10 minutes. Tu démarres dans les 60 secondes qui suivent ce message. PAS à l’heure pile, pas après un dernier scroll. Maintenant.',
        'Tu sais ce que font tes concurrents pendant que tu « n’arrives pas à t’y mettre » ? Ils bossent. Chaque minute de flottement est une minute donnée à quelqu’un d’autre. Alors on arrête les états d’âme : UNE page, DIX minutes, MAINTENANT. Le protocole ci-dessous, tu l’ouvres et tu l’exécutes sans le commenter.',
        'La flemme, tout le monde l’a. Ceux qui réussissent bossent AVEC la flemme, pas après elle. Ton contrat : 10 minutes non négociables, démarrage immédiat. Dans 10 minutes tu auras le droit d’arrêter — mais on sait tous les deux que tu continueras. Debout.',
        'Négocier avec toi-même, c’est perdre à tous les coups. Alors on coupe court : lève-toi, va chercher le poly, pose le téléphone loin, lance le minuteur. Quatre gestes, trente secondes. Je ne veux pas savoir si tu en as envie — l’envie viendra en travaillant, comme toujours.',
      ],
      'motive-moi': [
        '{line}\n\nVoilà ta dose. Maintenant écoute-moi bien : la motivation que tu cherches dans les phrases, elle est dans le TRAVAIL. Dix minutes de rappel actif te motiveront plus que cent citations. Ouvre ton cours. Tout de suite.',
        '{line}\n\nC’est beau hein ? Maintenant la vérité du Sergent : ceux qui gagnent ne lisent pas des citations, ils enchaînent les unités. Une page. Un rappel. MAINTENANT. La prochaine citation, tu l’auras méritée.',
        '{line}\n\nAllez, ça suffit les mots doux. Ton cerveau n’a pas besoin d’inspiration, il a besoin d’entraînement. File bosser — et reviens me voir quand ta session sera FAITE.',
      ],
      'ca-rentre-pas': [
        'Ça ne rentre pas parce que tu RELIS au lieu de te TESTER — c’est tout, et tu le sais déjà. Fini le confort : cours fermé, feuille blanche, tu écris tout ce que tu sais et tu regardes le carnage en face. C’est désagréable ? Parfait. C’est exactement la sensation d’un cerveau qui travaille. SOS ci-dessous, exécution immédiate.',
        'Ta mémoire n’est pas le problème. Ta méthode l’est. Relire c’est caresser le cours dans le sens du poil — le rappel actif, c’est le muscler. À partir de maintenant : chaque page lue = un rappel de mémoire, cours fermé. Pas d’exception. Les fiches ci-dessous, apprends-les, applique-les, point.',
        'Arrête de dire « ça ne rentre pas » comme si c’était la faute du cours. Le cours n’a rien demandé. Toi tu relis passivement et tu t’étonnes. Le deal : rappel actif + répétition espacée + sommeil complet, tous les jours, deux semaines. Après on reparle. D’ici là : exécution.',
      ],
      stress: [
        'Le stress ? C’est le signal que tu joues un match qui compte. Tant mieux — tu n’es pas là pour tricoter. Maintenant on le met au travail : une expiration longue, UNE tâche précise, et tu fonces. Le stress déteste l’action. Prouve-lui qui commande.',
        'Écoute-moi : le stress ne t’a jamais fait perdre un point. C’est l’INACTION sous stress qui en fait perdre. Alors tu respires un coup — protocole NRAR ci-dessous, il est efficace — et tu retournes au front. La peur monte quand on regarde le concours ; elle descend quand on travaille.',
        'Tout le monde stresse. TOUT LE MONDE. La différence se joue entre ceux qui stressent devant Netflix et ceux qui stressent en enchaînant les QCM. Choisis ton camp dans les 5 minutes. Le NRAR d’abord si ça monte fort, la prochaine unité ensuite.',
      ],
      qcm: [
        'Tu rates tes QCM ? Bien. Chaque erreur est une cible marquée. Ce qui serait grave, c’est de les rater SANS les disséquer. Ordre de mission : chaque erreur classée par cause — cours, lecture, piège, raisonnement — et chaque cause traitée. Le SOS ci-dessous. Tu ne refais pas de QCM tant que l’analyse n’est pas FAITE.',
        'Un score raté qui n’est pas analysé, c’est une défaite complète. Un score raté disséqué par cause, c’est du renseignement militaire sur l’ennemi. Transforme ta colle en plan d’attaque : la Correction par cause, maintenant, à froid, sans pleurer sur le rang.',
        'Les QCM ne se ratent pas « en général » — ils se ratent pour des raisons PRÉCISES, et tu vas me les trouver. Colonne par colonne : su/pas su, lu/mal lu, piégé/pas piégé. Tu sauras exactement où frapper. C’est ça, travailler comme un futur major.',
      ],
      'note-ratee': [
        'Une note. UNE note. Tu vas la regarder en face, en extraire chaque cause d’erreur, et la transformer en points pour la prochaine. C’est le seul usage autorisé d’un mauvais résultat. Ruminer est interdit : ça coûte du temps et ça ne rapporte rien. Session d’analyse ci-dessous, aujourd’hui, puis on repart au front.',
        'Le classement d’aujourd’hui, c’est la photo d’HIER. Ceux qui montent, ce sont ceux qui corrigent froidement pendant que les autres s’apitoient. Tu as le droit à 10 minutes de déception, chrono en main. Ensuite : Correction par cause, et retour à l’entraînement.',
        'Tu crois que les majors n’ont jamais pris de claque ? Ils en ont pris — et ils ont disséqué chaque claque jusqu’à l’os. C’est LA différence. Alors : chaque erreur → sa cause → son remède. Écris-le. Exécute-le. Et relève la tête, soldat — la guerre est longue.',
      ],
      retard: [
        'Tu es en retard. OK. Maintenant écoute : tu ne rattraperas PAS tout, et pleurer dessus creuse le trou. On triage, froidement : rentable / plus tard / sacrifié. Le cours du jour d’abord — TOUJOURS — le rattrapage ensuite. Le Triage ci-dessous, 20 minutes, et tu ressors avec un plan au lieu d’une angoisse.',
        'Le retard, c’est de la dette — et la dette, on la restructure, on ne la contemple pas. Inventaire, tri par rentabilité concours, mode dégradé sur le reste (squelette + QCM, pas de lecture intégrale). Et on bloque le robinet : plus UN cours du jour ne prend de retard. Exécution.',
        'Trois semaines de retard ne se rattrapent pas en héroïsme, elles se rattrapent en STRATÉGIE. Ceux qui essaient de tout relire coulent. Toi, tu vas trier comme un chef de service en garde : urgent-rentable d’abord, le reste en dégradé. Fiche Triage. Maintenant.',
      ],
      concentration: [
        'Ton téléphone est ton adversaire direct. Pas métaphoriquement — CONCRÈTEMENT : chaque coup d’œil te coûte des minutes de re-concentration que tes concurrents ne perdent pas. Il part dans l’autre pièce, PHYSIQUEMENT, avant chaque session. Pas en silencieux dans la poche : dans. l’autre. pièce. Ensuite : blocs de 25, pauses sans écran. Discipline d’environnement d’abord, volonté ensuite.',
        'La concentration ne se supplie pas, elle s’ORGANISE. Un soldat ne médite pas sur sa discipline, il prépare son terrain : téléphone exilé, un seul support ouvert, minuteur lancé. Fais le setup en 60 secondes et le focus suivra. La Friction numérique ci-dessous — applique-la à la lettre.',
        'Tu « n’arrives pas à te concentrer » ou tu laisses TikTok entrer dans ta salle d’entraînement ? Sois honnête. La réponse est mécanique, pas psychologique : rends la distraction chère et le travail facile. Fiches ci-dessous. Et la prochaine pause SANS écran — marche, bois, respire. C’est un ordre.',
      ],
      fatigue: [
        'Fatigué ? Alors on ne joue pas au héros — les nuits blanches, c’est pour les amateurs qui confondent souffrance et efficacité. Ce soir tu exécutes la Journée minimale, puis tu DORS tes 7-8 heures comme un professionnel. Le sommeil, c’est ta séance de consolidation. La sauter, c’est saboter le camp d’entraînement.',
        'Écoute bien, parce que c’est contre-intuitif venant de moi : REPOSE-TOI. Un soldat épuisé tire à côté. Aujourd’hui : le strict minimum pour garder la chaîne (fiche ci-dessous), zéro culpabilité, extinction des feux tôt. Demain tu reviens à pleine puissance et là, je ne te lâcherai pas.',
        'La fatigue est une donnée tactique, pas une excuse ni une honte. On adapte le plan : mission minimale aujourd’hui, sommeil complet ce soir, retour en force demain. Ce qui est interdit, c’est le zéro pointé ET la nuit blanche. Les deux extrêmes sont des défaites. Exécution mesurée.',
      ],
      'echeance-proche': [
        'Échéance proche = état d’urgence MÉTHODIQUE, pas panique. À partir de maintenant : plus rien de neuf, uniquement du rappel, des erreurs connues et des QCM ciblés. La Révision rapide ci-dessous est ton ordre de bataille. Et cette nuit tu DORS — un cerveau sans sommeil rend une copie vide. C’est non négociable.',
        'Dernière ligne droite. C’est là que les disciplinés écrasent les paniqués. Ton plan : matin = rappels feuille blanche des gros blocs ; après-midi = QCM sur tes faiblesses ; soir = relecture de TES erreurs uniquement, et dodo tôt. Chaque minute de flottement est un point donné. Serre les dents, exécute.',
        'Tu ne peux plus tout revoir — et tu n’en as pas besoin. 20 % des notions font 80 % des points, et tes erreurs passées te disent lesquelles. Circuit court, conditions réelles, sommeil protégé. Trois consignes. Zéro improvisation. En avant.',
      ],
      comparaison: [
        'Les autres ? Ce n’est pas ton match. Ton match, c’est toi contre toi d’il y a deux semaines — et CE match-là, tu peux le gagner tous les jours. Le théâtre des « géniaux » de la BU, tu le laisses aux spectateurs. Toi, tu mesures tes rappels réussis, tes causes d’erreur corrigées. Des FAITS. Le reste est du bruit.',
        'Pendant que tu regardes les autres, eux travaillent. Tu vois le problème ? Chaque minute de comparaison est une minute de préparation en moins. La Calibration ci-dessous te donne TA courbe, la seule qui compte. Les impressions mentent, les données non. Retourne aux données.',
        'Le syndrome de l’imposteur, je vais te dire ce que c’est militairement : de l’énergie de combat gaspillée en surveillance des alliés. Recentre le viseur : TES chapitres, TES erreurs, TA pente de progression. C’est tout ce qui montera sur ta copie en janvier. Au travail.',
      ],
      sommeil: [
        'Le sommeil n’est pas une option de confort, c’est un ordre médical ET tactique : c’est LA phase où ton cerveau grave ce que tu as appris. Coucher à heure fixe, écrans coupés 30 minutes avant, chambre fraîche — et si le cerveau mouline, tu vides tout sur un carnet et tu éteins. Un soldat qui sabote ses nuits sabote son arme principale.',
        'Réviser jusqu’à 2 h du matin, c’est verser tes points dans un seau percé et être fier de l’effort. INTERDIT. Nouvelle discipline : heure de coucher fixe défendue comme une position stratégique, lever régulier, lumière le matin. Le rythme d’abord — la mémoire suivra, c’est mécanique.',
        'Tes nuits pourries te coûtent plus que n’importe quelle impasse. On reprend le contrôle : lever à heure FIXE sept jours sur sept (c’est lui qui recale tout), pas de café après 15 h, le lit réservé au sommeil. Deux semaines de cette discipline et ton cerveau redevient une machine. Exécution.',
      ],
      'addiction-ecrans': [
        'Ton téléphone n’est pas ton ami, c’est un adversaire entraîné : des milliers d’ingénieurs travaillent chaque jour à te voler ton attention — et toi tu le poses à 20 cm de ton poly. Fini. Autre pièce, notifications rasées, applis voraces désinstallées en semaine. On ne négocie pas avec une machine à distraire : on la met dehors.',
        'Fais le calcul qui fait mal : ton temps d’écran hebdomadaire, converti en unités de cours. C’est ton classement qui défile pendant que tu scrolles. La volonté ne gagnera pas ce combat — la FRICTION oui : téléphone exilé pendant les blocs, une fenêtre de consultation décidée par jour. Applique la fiche, à la lettre, dès la prochaine session.',
        'Chaque déverrouillage te coûte des minutes de re-concentration que tes concurrents gardent. Tu veux la vraie détox ? Elle tient en trois ordres : autre pièce pendant le travail, gris à l’écran, réveil sans téléphone la première heure. Pas de méthode douce pour une machine qui ne joue pas doux. Exécute.',
      ],
      'jeux-video': [
        'Les parties classées en année de concours ? Mauvais calcul, soldat. Un jeu qui exige des sessions d’une heure et te laisse énervé n’a rien à faire dans ta semaine de PASS. La règle : le jeu est une RÉCOMPENSE — après la journée validée, créneau borné, minuteur. Pas avant, pas à la place. Et si tu ne sais pas t’arrêter : console débranchée et rangée. Point.',
        'Tu veux jouer ? Gagne-le. Journée de travail validée = créneau de jeu décidé, chrono en main. Journée sabotée = pas de manette. C’est simple, c’est carré, et c’est exactement comme ça que le jeu redevient un plaisir au lieu d’un remords. En attendant : la console ne dort pas dans la pièce de travail.',
        'Le rang qui compte cette année ne s’affiche pas dans un jeu. Chaque heure de partie est une heure que quelqu’un d’autre passe sur les annales — et en janvier, vous serez sur la même liste. Cadre le jeu en récompense courte ou coupe-le jusqu’aux vacances : les serveurs t’attendront, le concours non.',
      ],
      'series-films': [
        '« Un épisode » — on sait tous les deux comment ça finit. L’autoplay est un adversaire : coupe-le dans les réglages, MAINTENANT, ça prend trente secondes. Ensuite la règle : un épisode = une récompense après le socle du jour, décidée avant de lancer, écran fermé au générique. La saison se finira aux vacances. Ton année, elle, ne se rattrape pas en streaming.',
        'Ta série ne te juge pas, moi si : trois épisodes un soir de semaine, c’est une session de biochimie donnée à une plateforme. Le deal du Sergent : épisode unique, en mangeant, autoplay coupé — et les séries à suspense au placard jusqu’à la prochaine coupure. Tu veux du feuilleton ? Ton classement en est un. Écris le prochain épisode.',
        'Le binge est une défaite en pyjama : tu ne te reposes même pas, tu subis un algorithme. Reprends le commandement : décide AVANT de lancer (combien, jusqu’à quelle heure, quoi ensuite), et exécute ta décision au générique. Celui qui ne décide pas, l’écran décide pour lui. Pas toi. Plus maintenant.',
      ],
      'bonne-note': [
        'Bien. C’est ce qu’on attendait — pas un exploit, une CONFIRMATION : ta méthode paye. Maintenant écoute l’ordre le plus dur : NE CHANGE RIEN. Ni le volume, ni le rythme, ni les méthodes. Le danger d’une bonne note s’appelle relâchement, et il rend les points deux fois plus vite qu’ils sont venus. Dix minutes de fierté, autorisées. Ensuite : la suite du programme.',
        'Voilà. Tu vois ce qui arrive quand on exécute au lieu de discuter ? Grave cette leçon : note NOIR SUR BLANC ce qui a marché (méthodes, rythme, sommeil) — c’est ton plan de bataille, il doit survivre aux semaines molles. Et débusque les réponses chanceuses avec la Correction par cause : un soldat compte ses vraies munitions, pas ses coups de chance.',
        'Bonne nouvelle acceptée. Mais un bon classement se DÉFEND — et il se défend en continuant exactement ce qui l’a construit, pendant que d’autres célèbrent trop longtemps. Ce soir : récompense décidée, une vraie. Demain matin : même heure, même poste, même exigence. Les meilleurs ne font pas des coups d’éclat, ils font des semaines identiques.',
      ],
      reveil: [
        'Le snooze est une désertion de 9 minutes, répétée. On règle ça ce soir, pas demain matin : réveil À TRAVERS la pièce, affaires préparées, premier geste écrit sur un papier posé sur le poly ouvert. Au réveil tu n’as qu’un ordre : debout, lumière, eau. Le cerveau suit le corps — jamais l’inverse à 6 h 30.',
        'La bataille du matin se gagne la veille au soir — celui qui improvise à 7 h a déjà perdu. Protocole : coucher à heure fixe, réveil hors de portée, et le Démarrage en 10 minutes préparé sur le bureau. Demain, tu ne te demandes pas si tu te lèves. Tu te lèves. La question n’existe plus.',
        'Émerger à midi, c’est offrir ta meilleure tranche de cerveau à ton oreiller. On recale par le LEVER : heure fixe sept jours sur sept, même après une mauvaise nuit — c’est lui qui reprogramme tout le reste. Trois jours difficiles, puis la machine tourne. Tu as connu plus dur. Debout.',
      ],
      ennui: [
        'L’ennui, c’est le luxe de ceux qui relisent. Toi tu vas passer en mode ACTIF et tu n’auras plus le temps de t’ennuyer : pré-test, pari sur ta note, chrono, rappels en duel contre toi-même. Le cours n’a pas à être divertissant — c’est un terrain d’entraînement, et un entraînement se gagne. Transforme la session en match. Maintenant.',
        '« C’est chiant » n’est pas une information, c’est une excuse en uniforme. La vérité : la PASSIVITÉ est chiante — relire endort n’importe qui. Se tester, chronométrer, traquer ses erreurs : ça, ça réveille. Change de geste, pas de matière. Et rappelle-toi pourquoi tu es là : ce chapitre barbant soigne des gens au bout de la chaîne.',
        'Tu veux de l’intérêt ? Fabrique-le : alterne deux matières par blocs de 30 minutes, mets un enjeu sur chaque session (pari, score, chrono), et traque le « pourquoi clinique » de chaque notion morne. L’ennui déteste les enjeux. Donne-lui-en un et regarde-le déguerpir. Au travail.',
      ],
      planning: [
        'Tu veux un planning ? En voilà un, gratuit et incassable : chaque soir, TROIS unités écrites pour demain. Le matin : exécution, zéro renégociation. C’est tout. Les usines à planning multicolores sont des procrastinations en tenue de camouflage — pendant que tu colories des cases, d’autres font des rappels. Trois lignes, un papier. Ce soir.',
        'Le meilleur plan est celui qui survit au contact du réel — et le réel, c’est la fatigue, les imprévus, les jours sans. Donc : un socle minimal NON NÉGOCIABLE chaque jour (Journée minimale), du travail en unités validables, et basta. Un plan simple exécuté écrase un plan parfait contemplé. Décide la veille, exécute le jour.',
        'Règle de fer : on planifie en UNITÉS, jamais en heures. « 3 h d’anat » ne veut rien dire — « 2 rappels + 20 QCM analysés », ça se valide ou ça se rate, sans zone grise. La zone grise, c’est là où se cache la procrastination. Supprime-la de ton vocabulaire et de tes journées.',
      ],
      'combien-heures': [
        'Mauvaise question, soldat. Le concours ne pointe pas tes heures — il teste ce que tu RESTITUES. 6 heures de blocs nets avec rappels battent 11 heures de présence molle, tous les jours de la semaine. Compte tes unités validées, pas ton temps de chaise. Et garde des nuits complètes : c’est une consigne, pas une option.',
        'Ceux qui affichent « 12 h par jour » comptent leur téléphone, leurs pauses molles et leur relecture passive. Ne joue pas à ce concours-là — il ne rapporte rien. Ton tableau de bord : unités finies, rappels réussis, erreurs corrigées. Des chiffres qui classent. L’horloge, elle, n’a jamais classé personne.',
        'Le bon volume, c’est le maximum que tu tiens TOUTE l’année sans casser — pour la plupart : 7 à 9 heures EFFECTIVES, découpées au cordeau, avec de vraies pauses et une vraie nuit. Le héros de septembre qui s’effondre en novembre perd contre le métronome qui aligne ses semaines. Sois le métronome.',
      ],
      'relecture-surlignage': [
        'Repose ce stabilo. Surligner, c’est décorer — et le concours ne note pas la décoration. La relecture te donne une sensation de maîtrise ? C’est exactement le piège : reconnaître n’est PAS savoir. Nouvelle consigne, effective immédiatement : une lecture active, puis cours FERMÉ, et tu produis de mémoire. Ce qui ne sort pas n’était pas su. Voilà ta vraie note.',
        'Compte tes deux dernières heures : combien de minutes les yeux sur le cours, combien à récupérer cours fermé ? Si c’est 90/10, tu t’entraînes à regarder — et l’épreuve te demandera de produire. Inverse le ratio, dès la prochaine session : 50/50 minimum. C’est inconfortable ? Parfait. C’est le poids qui muscle.',
        'La troisième relecture est un somnifère avec bonne conscience. Interdite. À la place : feuille blanche, tu écris tout ce que tu sais, tu compares, tu répares les trous — et UNIQUEMENT les trous. La relecture devient un outil de vérification ciblée, plus jamais une méthode. C’est un ordre, et c’est surtout un service que je te rends.',
      ],
      fiches: [
        'Recopier ton cours au propre : des heures de main, zéro mémoire — le travail préféré de ceux qui veulent avoir l’air sérieux sans se tester. Pas toi, pas cette année. Une fiche se GAGNE : cours fermé, tu écris le squelette de mémoire, PUIS tu vérifies et corriges en rouge. Ça, c’est de l’entraînement. Le reste, c’est de la calligraphie.',
        'Le test de la fiche utile, sans appel : a-t-elle été produite de MÉMOIRE ? Oui → c’est un rappel actif avec un bonus papier, continue. Non → c’est une relecture déguisée qui t’a coûté ta soirée. Et le plan « je fiche tout d’abord, j’apprends ensuite » est une désertion organisée : à mi-semestre tu auras des fiches magnifiques et une mémoire vide.',
        'Ton objectif n’est pas une belle fiche, c’est un cerveau qui restitue. Alors : format court (squelette + discriminants + TES erreurs), fabriqué cours fermé, corrigé en couleur, re-testé à J+3. Le moche qui travaille bat le beau qui rassure. Fais du moche efficace, et encadre tes points en janvier.',
      ],
      'arbitrage-soir': [
        'Tu hésites depuis combien de temps ? Chaque minute de délibération est une minute de travail perdue — et un choix moyen exécuté ÉCRASE un choix parfait discuté. La règle, 60 secondes chrono : échéance proche ? elle gagne. Sinon : la matière la plus en retard sur son poids. Égalité ? Celle que tu fuis — c’est là que dorment tes points. Tranche. Fonce.',
        'Le soir, ton cerveau fatigué est un mauvais stratège et un bon soldat : ne lui demande plus de choisir, demande-lui d’exécuter. Nouveau protocole : chaque soir, tu écris les 3 unités du lendemain. Fini les débats de 20 h 30 devant la pile de polys. La décision se prend la veille, à froid. Le jour, on obéit au papier.',
        'Pendant que tu te demandes « anat ou biochimie », d’autres font l’un OU l’autre — et c’est tout ce qui compte : N’IMPORTE LEQUEL des deux te rapporte plus que l’hésitation. Applique la règle (échéance > rentabilité > évitement), écris l’unité exacte, lance le minuteur. Trente secondes de décision. Pas une de plus.',
      ],
      'vacances-repos': [
        'Écoute bien, parce que ça va te surprendre venant de moi : le repos est un ORDRE. Une demi-journée de vraie coupure par semaine, décidée à l’avance, défendue comme une position. Pourquoi ? Parce qu’un soldat sans récupération tire de travers, et que ton cerveau consolide pendant la pause. Mais attention : une coupure DÉCIDÉE — pas une capitulation molle devant l’écran.',
        'La culpabilité pendant le repos, c’est le pire des deux mondes : tu ne récupères pas ET tu ne travailles pas. Le Sergent ne tolère pas le gaspillage : décide ta coupure (jour, heure de reprise), profites-en à FOND, reprends à l’heure dite au garde-à-vous. Une pause exécutée avec discipline, c’est encore de l’entraînement.',
        'Les vacances courtes, version efficace : la Journée minimale (30-60 minutes de rappels d’entretien — la chaîne reste intacte) puis déconnexion TOTALE le reste du temps. Ni plus de travail, ni zéro : les deux extrêmes sont des fautes. Tu reviens affûté pendant que les autres reviennent rouillés ou cramés. C’est ça, la stratégie.',
      ],
    },
  },

  zen: {
    id: 'zen',
    label: 'Zen',
    tagline: 'Posé, une chose à la fois',
    greetings: [
      'Bonjour. Ici, on ralentit une seconde avant d’avancer. Dis-moi ce qui pèse en ce moment — on va le poser calmement, et le transformer en un premier pas tout simple.',
      'Salut. Respire un coup — voilà. Maintenant raconte-moi ce qui coince, avec tes mots. Il n’y a pas de mauvaise façon de le dire.',
      'Bienvenue. Une chose à la fois, c’est comme ça qu’on fait tout. Quelle est LA chose d’aujourd’hui ?',
      'Salut. Quoi que ce soit, ça se travaille — doucement, mais sûrement. Je t’écoute.',
    ],
    closers: [
      'Un pas à la fois. Ça suffit largement.',
      'Doucement, mais tous les jours.',
      'Respire — puis juste le prochain petit geste.',
      'Tu n’as pas besoin de tout régler ce soir. Juste d’avancer un peu.',
    ],
    overrides: {
      procrastination: [
        'C’est normal de ne pas y arriver tout de suite — le démarrage est la partie la plus lourde de tout travail, pour tout le monde. On va réduire la marche : pas « bosser », juste « ouvrir le poly à la bonne page ». C’est tout. Fais ce seul geste, tranquillement. La suite vient presque toujours d’elle-même — et si elle ne vient pas, dix minutes suffisent pour aujourd’hui.',
        'Pose la culpabilité une minute : elle ne t’aide pas à commencer, elle t’alourdit. Ce qui aide : une toute petite porte d’entrée. Une page. Une question. Dix minutes de contrat, pas une de plus si tu ne veux pas. Le protocole ci-dessous fait exactement ça, en douceur. Tu peux y aller sans pression — le minuteur s’occupe du reste.',
        'Tu n’es pas paresseux — tu es face à une montagne, et tout le monde recule devant une montagne. Alors on ne regarde plus la montagne : on regarde le premier caillou. Ouvre le cours, lis le premier titre à voix basse. Voilà. C’est déjà commencé. Le reste, on le prendra pas à pas.',
      ],
      'motive-moi': [
        '{line}\n\nGarde cette phrase quelque part. Et souviens-toi : tu n’as pas besoin d’être motivé pour faire un petit pas. Un seul. Le reste suivra à son rythme.',
        '{line}\n\nRespire avec ça un instant. Puis choisis la plus petite chose utile que tu puisses faire là, maintenant — et fais-la doucement, sans te presser.',
        '{line}\n\nLa motivation va et vient comme la météo. Ta direction, elle, ne change pas. Un petit geste dans la bonne direction, c’est tout ce qu’il faut aujourd’hui.',
      ],
      stress: [
        'D’abord, on redescend d’un étage. Expire lentement, plus longtemps que tu n’inspires — trois fois. Le stress te parle de demain ; ton corps, lui, est ici, et ici tout va bien. Quand tu te sens un peu plus posé·e, choisis UNE seule tâche, petite, et fais-la tranquillement. Le protocole NRAR ci-dessous t’accompagne pas à pas, sans forcer.',
        'Ce que tu ressens est normal — l’enjeu est réel, ton corps le sait. Mais note bien : le stress signale l’importance, pas l’échec. On va lui donner moins de place : réduis ta fenêtre au prochain quart d’heure. Juste ça. Une page, calmement. Le reste du concours n’existe pas pendant ce quart d’heure.',
        'Viens, on pose tout une minute. Ferme les yeux si tu peux, sens tes pieds au sol, allonge trois expirations. Voilà. L’anxiété regarde toujours trop loin — ramène le regard sur l’heure qui vient, une seule tâche, à ton rythme. Tu as le droit d’avancer doucement. Avancer doucement, c’est avancer.',
      ],
      'ca-rentre-pas': [
        'Rien ne « rentre » de force — et ce n’est pas ta mémoire le problème, c’est le geste. On va remplacer la relecture (qui glisse) par le rappel (qui grave), mais en douceur : une petite unité, cours fermé, tu écris ce qui vient. Même trois lignes, c’est bien. Ce qui manque n’est pas un échec — c’est la carte de ce qu’il reste à apprendre.',
        'Sois patient·e avec ton cerveau : il retient ce qu’on lui redemande, à intervalles espacés, avec du sommeil entre les deux. C’est un rythme, pas un sprint. Aujourd’hui : un seul rappel de mémoire, tranquille. Demain : le même, un peu espacé. La mémoire aime la régularité douce bien plus que l’acharnement.',
        'D’accord. On respire, et on change d’approche sans se juger : ferme le cours, prends une feuille, note ce que tu sais — sans pression sur le résultat. Puis compare, gentiment, comme on corrige la copie d’un ami. Chaque trou repéré aujourd’hui est un souvenir solide de demain. C’est un beau travail, pas une punition.',
      ],
      fatigue: [
        'Alors on écoute la fatigue au lieu de lutter contre elle — elle dit quelque chose de vrai. Aujourd’hui : la version minimale de ta journée, faite lentement et sans culpabilité. Ce soir : un vrai coucher, tôt. Le sommeil fera le travail de mémoire à ta place — c’est lui le héros silencieux de tes révisions.',
        'Tu as le droit d’être fatigué·e. Vraiment. Une année comme la tienne, c’est un effort d’endurance, et l’endurance se gère avec des jours doux. Fais le strict nécessaire (la fiche ci-dessous te le donne), puis repose-toi pour de vrai : sans écran, sans reproche. Demain te retrouvera plus fort·e.',
        'Doucement. On ne construit rien de bon contre un corps épuisé. Aujourd’hui devient une journée de maintenance : un peu de travail léger pour garder le fil, de l’eau, un vrai repas, et une nuit complète défendue comme un trésor. C’est exactement ce qu’un bon coach prescrirait — et c’est ce que je fais.',
      ],
      'note-ratee': [
        'Cette note fait mal — accueille ça une minute, c’est légitime, pas besoin de le cacher. Puis, quand tu seras prêt·e, on la regardera ensemble autrement : pas comme un jugement, comme une carte. Chaque erreur montre un endroit précis où progresser. À froid, tranquillement, la Correction par cause transforme cette douleur en direction.',
        'Une note n’est qu’une photographie d’un jour — pas ton portrait. Les classements respirent énormément sur une année ; ta valeur, elle, n’a jamais été sur la copie. Ce qu’on garde de cette colle : ses leçons, extraites calmement, une par une. Le reste, on le laisse partir.',
        'Je sais que ça pèse. Alors on fait les choses dans l’ordre : d’abord souffler, vraiment — une marche, une pause, ce qu’il te faut. Ensuite seulement, la séance d’analyse, à tête reposée : chaque erreur, sa cause, son remède. Doucement et complètement. C’est comme ça qu’une mauvaise note devient un bon investissement.',
      ],
      concentration: [
        'L’attention est fragile chez tout le monde — ce n’est pas un défaut, c’est une donnée. Alors on la protège avec douceur : le téléphone va se reposer dans une autre pièce (lui aussi a le droit), un seul support reste ouvert, et on commence petit : 25 minutes, puis une vraie pause. Pas de lutte — juste un environnement qui te veut du bien.',
        'Plutôt que te reprocher les distractions, écoute ce qu’elles disent : trop de choses ouvertes, trop de bruit, peut-être de la fatigue. On simplifie : une table nue, une tâche, un minuteur doux. Et un papier à côté pour poser les pensées qui passent — notées, elles s’en vont ; poursuivies, elles t’emmènent.',
        'Reviens, tout simplement. C’est ça, la concentration : pas une forteresse, juste l’art de revenir, sans drame, chaque fois que l’esprit s’en va. Le Pomodoro t’aide à cadrer ; la friction numérique éloigne les sirènes. Et chaque retour compte comme une victoire — même le dixième.',
      ],
      'echeance-proche': [
        'L’échéance approche — raison de plus pour rester posé·e : c’est la précipitation qui coûte des points, pas le calme. On passe en révision ciblée : tes erreurs connues, les distinctions fragiles, quelques QCM choisis. Et cette nuit, tu dors — c’est le geste le plus rentable qui te reste. Tout est là, tranquillement, dans la fiche ci-dessous.',
        'Ce qui est appris est appris ; ce qui ne l’est pas ne s’apprendra plus en forçant. Alors on consolide, sereinement : rappels courts, erreurs revues, sommeil protégé. Le jour J, tu veux arriver reposé·e et clair·e — c’est maintenant que ça se prépare. Une chose à la fois, jusqu’au bout.',
        'Respire. Il reste exactement assez de temps pour faire ce qui compte : le circuit court — rappels, erreurs, pièges connus. Pas de nuit blanche, pas de marathon désespéré : de la précision douce. Et rappelle-toi : tu as déjà porté cette matière jusqu’ici. Elle est plus installée que ton stress ne le dit.',
      ],
      qcm: [
        'Les QCM ratés piquent — et ils enseignent, si on les écoute calmement. Quand tu seras posé·e, reprends-les un par un, sans te juger : cette erreur, d’où vient-elle ? Cours, lecture, piège, raisonnement ? Chaque réponse est une petite lumière sur quoi travailler. C’est un tri paisible, pas un procès.',
        'On va changer ton rapport aux QCM : ce ne sont pas des juges, ce sont des capteurs. Ils mesurent, c’est tout. Et une mesure, ça s’analyse tranquillement : la Correction par cause ci-dessous t’y guide. Tu verras — dès la première séance, le brouillard se lève un peu.',
        'D’accord. D’abord, sache que rater des QCM d’entraînement, c’est exactement leur fonction : révéler maintenant ce qui aurait coûté cher plus tard. Merci à eux, sincèrement. Ensuite, à tête reposée : chaque erreur classée, chaque cause traitée, à ton rythme. La précision vient de la douceur répétée, pas de la brutalité.',
      ],
      retard: [
        'Le retard pèse surtout par l’angoisse qu’il traîne — alors on va d’abord le regarder calmement, et il va rétrécir. Pose tout sur une feuille : ce qui est là, ce qui compte vraiment, ce qui peut attendre. Le Triage ci-dessous t’aide à choisir sans culpabilité. Tu n’as pas besoin de tout rattraper — juste de reprendre la main, doucement.',
        'Personne n’est « à jour » en PASS — c’est un horizon, pas un état. Ce qui compte : que chaque jour avance un peu, en commençant par le plus utile. Cours du jour d’abord, puis un morceau de rattrapage choisi. Pas de sprint de panique : une marche régulière. Elle gagne toujours sur l’année.',
        'Viens, on dédramatise ensemble : le retard n’est pas une faute, c’est une file d’attente. Et une file d’attente, ça se gère — par priorité, tranquillement. Vingt minutes de tri posé (fiche ci-dessous), et tu échangeras la boule au ventre contre une liste claire. C’est un très bon deal.',
      ],
      comparaison: [
        'Doucement avec toi-même. Ce que tu vois des autres, c’est leur vitrine ; ce que tu vis de toi, ce sont les coulisses. Comparer les deux n’est jamais juste. Ramène le regard chez toi : qu’est-ce que tu sais faire aujourd’hui que tu ne savais pas il y a quinze jours ? C’est la seule mesure qui te concerne — et elle est probablement plus belle que tu ne crois.',
        'Le doute qui te traverse touche presque tout le monde dans ces couloirs — surtout les plus sérieux, précisément parce qu’ils se regardent honnêtement. Tu n’es pas un imposteur : tu es en apprentissage, comme prévu. Mesure tes progrès avec des faits (la Calibration aide), et laisse les apparences des autres à leur théâtre.',
        'Respire. Ta place ici, tu ne l’as pas volée — tu la construis chaque jour où tu t’entraînes. Les autres avancent sur leur chemin, toi sur le tien ; les chemins ne se comparent pas, ils se marchent. Reviens au tien : la prochaine petite unité, tranquillement.',
      ],
      sommeil: [
        'Le sommeil est ton allié le plus doux : il range, consolide et répare pendant que tu ne fais rien. Offre-lui un cadre : une heure de coucher régulière, une transition calme sans écran, et un carnet près du lit pour y déposer les pensées qui tournent. Déposées, elles laissent dormir. La nuit fera le reste.',
        'Si les nuits sont difficiles, sois patient·e — le sommeil ne s’ordonne pas, il s’invite. On prépare juste sa venue : lever à heure douce et régulière, lumière du jour le matin, pas de café l’après-midi, et le lit gardé pour dormir. Quelques jours de ce rythme et le corps retrouve son chemin. S’il ne le retrouve pas, un médecin saura t’aider — c’est fréquent et ça se soigne bien.',
        'Ce que tu apprends le jour s’installe la nuit — dormir EST réviser, au sens propre. Alors ce soir, pas de marchandage avec l’oreiller : une vraie nuit, choisie, assumée. Ton toi de demain matin te dira merci, et tes cours aussi.',
      ],
      'addiction-ecrans': [
        'Sois doux·ce avec toi sur ce point : ces applis sont conçues par des milliers de personnes pour capter ton attention — perdre contre elles à mains nues n’est pas une faiblesse, c’est mathématique. Alors on ne lutte plus, on aménage : le téléphone va se reposer dans une autre pièce pendant que tu travailles, et toi tu retrouves un peu de silence. Vous vous retrouverez à la pause décidée — tout le monde y gagne.',
        'Pas de culpabilité — de la mécanique : chaque notification est une petite main qui te tire par la manche, et on ne médite pas au milieu d’une foule. Offre-toi des plages de calme : notifications éteintes, écran en gris, une fenêtre de consultation choisie par jour. Tu verras vite que le monde continue très bien de tourner pendant que tu ne le regardes pas — et toi aussi.',
        'Commence par observer, simplement, sans te juger : ton temps d’écran de la semaine, regardé en face. Puis choisis UNE seule chose à adoucir — souvent le réveil (la première heure sans téléphone change la couleur de toute la journée). Une habitude à la fois, tranquillement. La friction fait le travail, pas la volonté — c’est une très bonne nouvelle.',
      ],
      'jeux-video': [
        'Le jeu n’est pas ton ennemi — c’est un plaisir qui a juste besoin d’un cadre pour rester un plaisir. La version apaisée : tu joues APRÈS le socle du jour, sur un créneau décidé, et tu ranges la manette sans drame quand c’est fini. Si une partie déborde, ce n’est pas un échec de caractère : c’est le signe qu’il faut un cadre plus simple — parfois, débrancher la console en semaine est le geste le plus doux.',
        'Pose-toi la vraie question, calmement : après une session de jeu, tu te sens reposé·e ou vidé·e et coupable ? Si c’est la première réponse : garde-le, en récompense choisie — c’est précieux, un vrai plaisir. Si c’est la seconde : offre-toi une pause de jeu jusqu’aux vacances, sans dramatiser. Les serveurs seront encore là. Ta sérénité de janvier, elle, se construit maintenant.',
        'Une chose à la fois, et chaque chose à sa place : le travail dans ses blocs, le jeu dans son créneau — et un petit sas entre les deux (quelques minutes de marche, une douche), parce que l’excitation d’une partie met du temps à redescendre. Cadré comme ça, le jeu devient ce qu’il devrait être : une respiration, pas une fuite.',
      ],
      'series-films': [
        'Un épisode choisi, savouré, c’est du vrai repos — garde-le précieusement. Ce qu’on va adoucir, c’est l’enchaînement subi : coupe la lecture automatique (un petit réglage, un grand calme), et décide avant de lancer ce que tu regardes et jusqu’où. La différence entre se reposer et se faire aspirer tient dans cette petite décision d’avant.',
        'Si une série te tient trop fort en ce moment, ce n’est pas grave — c’est juste une histoire bien racontée qui rencontre un cerveau fatigué. La solution douce : garde les intrigues à suspense pour les vacances, et pour les soirs de semaine, choisis des choses légères qui se terminent bien et se quittent facilement. Ton sommeil te dira merci, et tes révisions aussi.',
        'Essaie ce petit rituel : l’épisode se regarde en mangeant ou après le socle du jour, écran fermé au générique, puis une transition calme vers la suite (quelques pas, un thé, les 3 unités de demain notées). Pas d’interdit — un cadre. Les histoires sont un beau refuge ; il faut juste en sortir doucement, pas s’y perdre.',
      ],
      'bonne-note': [
        'Quelle joie — savoure-la pleinement, sans te presser vers la suite. Prends un vrai moment ce soir pour toi, et pour remercier la bonne personne : toi-même, ton travail régulier, tes choix. Puis, quand tu seras prêt·e, note quelque part ce qui a rendu ça possible — c’est ta recette personnelle, elle te réchauffera les semaines plus grises.',
        'Bravo, sincèrement. Et accueille aussi ce que cette note t’apprend en douceur : ta méthode fonctionne. Il n’y a donc rien à révolutionner — juste à continuer, au même rythme tranquille. La tentation après une réussite est d’accélérer ou de relâcher ; les deux abîment ce que tu as construit. Continue comme l’eau : régulière, patiente.',
        'C’est une belle étape — et tu as le droit d’en être fier·e sans te demander déjà si ça va durer. Ce soir : célébration douce, vraie coupure. Demain : la même petite routine qui t’a mené·e ici. Les réussites durables ne sont pas des sommets qu’on défend crispé — ce sont des chemins qu’on continue de marcher, un pas après l’autre.',
      ],
      reveil: [
        'Les matins difficiles se soignent la veille, en douceur : une heure de coucher régulière, une transition calme avant de dormir, et le premier geste de demain déjà préparé sur le bureau — pour que le réveil n’ait aucune décision à prendre, juste un petit chemin à suivre. Lumière, un verre d’eau, et le corps emmène le reste.',
        'Ne te juge pas sur tes réveils — ajuste le système, tranquillement. Le réveil posé de l’autre côté de la chambre (se lever pour l’éteindre, c’est déjà être levé·e), les volets entrouverts pour la lumière, et un début de journée que tu aimes un peu : une boisson chaude, dix minutes calmes, puis la première unité, toute petite. On se lève plus volontiers vers quelque chose de doux.',
        'Si tout a glissé et que tu émerges à midi, pas de panique ni de reproche : on recale par le lever, à heure douce et régulière, quelques jours de suite — le sommeil suivra de lui-même. Et une matinée perdue ne condamne rien : la Journée minimale existe exactement pour repartir sans drame, là, maintenant, depuis où tu es.',
      ],
      ennui: [
        'L’ennui est un message, pas une faute — il dit souvent : « je suis passif depuis trop longtemps ». Écoute-le avec curiosité : transforme la session en petit jeu calme (un pré-test, un pari doux avec toi-même, un chrono), et regarde l’ennui se dissoudre. Ce n’est pas la matière qui est terne — c’est le geste qui s’était endormi.',
        'Quand tout semble gris, varie doucement : alterne deux matières par blocs courts, change de lieu, passe par le dessin ou la voix haute. Le cerveau aime la nouveauté à petites doses — offre-lui-en sans bouleverser tout le système. Et cherche l’histoire cachée de la notion barbante : ce canal ionique soigne quelqu’un, quelque part, dans quelques années. Ça change son visage.',
        'Et si l’ennui s’étend sur tout depuis des semaines, écoute-le plus attentivement : il porte parfois un habit d’ennui sur une fatigue ou un moral qui se tait. Une vraie coupure, du sommeil, quelque chose qui te fait plaisir — puis on regarde si les cours ont retrouvé des couleurs. Si non, on en reparle, toi et moi, ou avec quelqu’un de vrai.',
      ],
      planning: [
        'On va faire simple et respirable : pas d’architecture de planning qui s’effondre au premier imprévu — juste un petit socle quotidien que tu peux tenir même les mauvais jours (la Journée minimale), et trois unités notées la veille au soir. C’est peu, et c’est exactement pour ça que ça tient toute une année. La régularité douce bat les grands plans.',
        'Un bon planning ressemble à une respiration : des blocs de travail, des pauses, des repas à peu près fixes, une vraie coupure quelque part. Rien de plus sophistiqué. Planifie en unités toutes simples (« un rappel d’anat, 20 QCM ») plutôt qu’en heures — les unités se terminent et font du bien à cocher ; les heures se subissent et pèsent.',
        'Si l’organisation t’angoisse, c’est peut-être qu’elle essaie d’en faire trop : un planning n’a pas à contenir ta réussite entière, juste ta prochaine journée. Ce soir, trois lignes sur un papier pour demain. Demain soir, pareil. Le reste — la semaine, le semestre, le concours — se construira tout seul, une journée posée après l’autre.',
      ],
      'combien-heures': [
        'Douce vérité : il n’y a pas de nombre magique, et courir après celui des autres épuise pour rien. Ce qui compte : des heures EFFECTIVES et paisibles — des blocs où tu es vraiment là, des pauses où tu récupères vraiment, et une nuit complète qui grave le tout. Pour la plupart, ça fait 7 à 9 heures bien vécues. Au-delà, on remplit des chaises, pas des mémoires.',
        'Remplace la question « combien d’heures » par « qu’est-ce que j’ai validé aujourd’hui ». Trois rappels réussis, une série de QCM analysée, un schéma refait — voilà une journée pleine, quelle que soit l’horloge. Compter en unités apaise énormément : on sait quand c’est fini, on peut poser le cartable l’esprit tranquille. C’est ça, une bonne journée de travail.',
        'Et garde une heure vraiment à toi chaque jour — marche, musique, rien. Ce n’est pas du temps volé au concours : c’est elle qui rend toutes les autres heures tenables sur dix mois. Les années réussies ne sont pas les plus remplies — ce sont les plus régulières. Un rythme que tu peux aimer un peu, tu peux le tenir longtemps.',
      ],
      'relecture-surlignage': [
        'Je comprends l’attrait de la relecture : c’est doux, fluide, rassurant. Le souci, c’est que cette fluidité est un trompe-l’œil — reconnaître un cours n’est pas savoir le produire. On va garder la douceur et changer le geste : lis une fois tranquillement, puis ferme, et écris ce qui vient, sans pression. Ce qui manque n’est pas un échec : c’est la carte exacte de quoi reprendre.',
        'Le surligneur peut rester — on change juste son rôle : il ne décore plus la première lecture, il marque ce qui a résisté à ton rappel. D’abord tu récupères de mémoire, ensuite tu rouvres et tu surlignes uniquement les trous. Même geste, sens inversé, rentabilité multipliée. Et la relecture devient une vérification ciblée, courte et sereine.',
        'Vas-y progressivement, sans tout bousculer : sur ta prochaine session, remplace UNE relecture par UN rappel de mémoire — juste un. Constate ce que ça change (c’est un peu plus effortful, et beaucoup plus durable). Puis étends doucement, session après session. Les grandes transformations tiennent mieux quand elles commencent petites.',
      ],
      fiches: [
        'Si faire des fiches t’apaise, gardons ce qui apaise — et réparons ce qui ne sert pas : une fiche recopiée calligraphiée est une relecture qui a pris ton temps. La version qui nourrit vraiment : cours fermé, tu écris le squelette de mémoire (même imparfait, surtout imparfait), puis tu corriges en couleur. C’est un moment calme ET un vrai entraînement — le meilleur des deux mondes.',
        'Une pensée douce à garder : ta fiche n’a pas besoin d’être belle, elle a besoin d’être née de ta mémoire. Le brouillon moche produit cours fermé muscle plus que la plus jolie fiche recopiée. Autorise-toi le moche qui travaille — et garde peut-être UNE belle fiche par chapitre, courte, faite en dernier, comme une récompense de synthèse.',
        'Et libère-toi du projet « d’abord tout ficher, ensuite apprendre » — il pèse sur les épaules et repousse sans fin le vrai travail. Inverse tranquillement : apprends une unité (rappel, correction), PUIS note l’essentiel qui en reste — squelette, discriminants, tes erreurs. La fiche devient une trace de ton apprentissage, pas une dette avant lui.',
      ],
      'arbitrage-soir': [
        'L’hésitation du soir fatigue plus que le travail lui-même — alors on va la raccourcir avec douceur : échéance proche ? elle passe devant. Sinon, la matière la plus en retard sur son importance. Et si tout se vaut, celle que tu évites doucement depuis des jours. Une minute de décision, pas plus — puis tu poses le choix et tu n’y reviens pas. Choisir, c’est aussi se reposer.',
        'Le plus apaisant, c’est de ne plus choisir le soir du tout : chaque veille, note les trois unités du lendemain, tranquillement, quand la tête est encore claire. Le lendemain soir, il n’y a plus de débat — juste un petit chemin déjà tracé à suivre. La fatigue exécute très bien ; c’est décider qu’elle fait mal. Alors décidons en avance.',
        'Et rappelle-toi : entre deux matières raisonnables, il n’y a pas de mauvais choix — il n’y a que l’hésitation qui coûte. Ce soir, n’importe laquelle des deux, travaillée calmement une heure, est une victoire. Prends celle qui te pèse le moins à lancer, commence tout petit, et laisse la session t’emporter. Le mouvement résout ce que la réflexion retourne.',
      ],
      'vacances-repos': [
        'Le repos n’est pas une récompense à mériter — c’est un des piliers du système, au même titre que les rappels et le sommeil. Une demi-journée de vraie coupure par semaine, choisie et savourée sans culpabilité : c’est elle qui consolide ta mémoire, recharge ta motivation, et rend les dix mois tenables. Prends-la comme on prend un médicament : régulièrement, sérieusement.',
        'Culpabiliser pendant la pause, c’est la perdre deux fois — alors on va l’apaiser : décide ta coupure à l’avance (le moment, la durée, l’heure de reprise), écris-la comme un rendez-vous, et honore-la pleinement. Une pause décidée n’est jamais du temps volé. C’est du temps investi dans la personne qui fera tout le reste.',
        'Pour les vacances courtes, la formule douce : un tout petit entretien quotidien (30-60 minutes de rappels légers, pour que la chaîne reste tiède) et une vraie déconnexion le reste du temps — des gens, de l’air, du sommeil, des choses que tu aimes. Tu reviendras reposé·e SANS avoir perdu le fil. C’est exactement ce qu’une année longue demande.',
      ],
    },
  },
};

export const MODE_ORDER: CoachMode[] = ['classique', 'sergent', 'zen'];
