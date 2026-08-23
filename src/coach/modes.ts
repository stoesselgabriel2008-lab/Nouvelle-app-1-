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
    },
  },
};

export const MODE_ORDER: CoachMode[] = ['classique', 'sergent', 'zen'];
