import type { IconName } from '../ui/Icon';

/**
 * Le mode Déclic — le pilier motivation de l'app.
 *
 * Principe : tu choisis TA situation, et quelqu'un te parle VRAIMENT —
 * pas une citation qui flotte, un discours qui te regarde dans les yeux.
 * Deux tons : « Franc » (sec, direct, exigeant — jamais insultant) et
 * « Doux » (bienveillant). Chaque discours débouche sur UNE action :
 * le contrat de 10 minutes, lancé sur place.
 *
 * Règles d'écriture :
 * - deuxième personne, phrases courtes, zéro blabla ;
 * - dur sur l'ACTION, jamais sur la personne — pas d'insulte, pas de mépris ;
 * - chaque discours nomme le comportement précis et le retourne en geste ;
 * - la situation « tout lâcher » est SENSIBLE : ton doux uniquement,
 *   orientation vers de vrais humains (protocole Détresse) — jamais de
 *   pression, jamais de minuteur.
 * - signés Axel (aucune fausse attribution) — le \n\n sépare les paragraphes.
 */

export type TalkTone = 'franc' | 'doux';

export interface TalkSituation {
  id: string;
  /** Libellé du choix (« Où tu en es ? »). */
  label: string;
  /** Sous-titre d'un mot ou deux sur la carte. */
  sub: string;
  icon: IconName;
  /** Discours ton franc (≥ 3) — absent pour la situation sensible. */
  franc: string[];
  /** Discours ton doux (≥ 2). */
  doux: string[];
  /** Fiche liée (toujours proposée sous le discours). */
  fiche: { label: string; to: string };
  /** true = sujet sensible : doux uniquement, action = Détresse, pas de minuteur. */
  safety?: boolean;
}

export const TALK_SITUATIONS: TalkSituation[] = [
  {
    id: 'pas-commence',
    label: 'J’ai pas encore commencé',
    sub: 'Le démarrage',
    icon: 'bolt',
    fiche: { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
    franc: [
      'Regarde l’heure. Maintenant regarde ce que tu as produit aujourd’hui. C’est ça, ton vrai classement du jour — pas celui de la fac, celui que tu es en train de te fabriquer, heure par heure, en « n’ayant pas commencé ».\n\nTu n’as pas un problème de motivation. Tu attends qu’une envie magique descende du ciel — elle ne descendra pas. L’envie vient PENDANT le travail, jamais avant. Tous ceux qui bossent en ce moment ont commencé sans envie.\n\nAlors on arrête tout de suite le « je m’y mets bientôt ». Le bouton en bas lance 10 minutes. Pas ta soirée, pas ta vie : dix minutes. Tu appuies, tu ouvres le cours, et on se retrouve de l’autre côté.',
      'Sois honnête deux secondes : ça fait combien de temps que tu « vas commencer » ? Une heure ? Deux ? Ce temps-là, personne ne te le rendra — et pendant ce temps précis, des centaines de gens qui visent TA place font des QCM.\n\nCette année ne se rejoue pas. C’est maintenant qu’elle se gagne, dans ces moments exacts où c’est toi contre ta flemme. Et la bonne nouvelle, c’est que ta flemme perd tous ses combats rapprochés : elle ne survit jamais à un démarrage réel.\n\nDonc on ne discute plus. Une page. Dix minutes. Le minuteur est juste en dessous — appuie, et prouve-toi qui commande.',
      'Tu sais déjà tout ce que je vais te dire. Tu sais que relire tes messages ne fait pas avancer l’anat. Tu sais que « encore cinq minutes » en fait trente. Tu sais que ce soir tu vas t’en vouloir. Tu le SAIS — alors pourquoi tu es encore là ?\n\nParce que commencer, c’est le moment le plus dur, et ton cerveau le fuit. Normal. Mais il y a un secret : le moment le plus dur dure exactement trois minutes. Passées ces trois minutes, la machine tourne toute seule.\n\nTrois minutes de courage. C’est tout ce qu’on te demande. Le contrat de 10 minutes est en bas — dedans, il y a tes trois minutes dures et sept minutes gratuites. Vas-y.',
    ],
    doux: [
      'Commencer, c’est la partie la plus lourde — pour tout le monde, pas juste pour toi. Une fois lancé·e, ça roule presque tout seul ; c’est vraiment cette première marche qui coûte.\n\nAlors on va la raboter : pas « bosser toute la soirée », juste ouvrir le poly à la bonne page et lire le premier titre. C’est tout ce qu’on décide maintenant. La suite viendra d’elle-même — elle vient presque toujours.\n\nLe minuteur en bas fait 10 minutes. Lance-le sans pression : à la sonnerie, tu auras le droit d’arrêter. Mais je crois qu’on sait tous les deux que tu continueras.',
      'Pas encore commencé, et alors ? La journée n’est pas ratée — elle n’a juste pas encore démarré. Ce qui compte, ce n’est pas l’heure qu’il est : c’est ce que tu fais de la prochaine.\n\nOn oublie le retard, on oublie la culpabilité — elles ne portent pas de stylo. On prend UNE page, UNE notion, et on lui donne dix minutes tranquilles.\n\nAppuie sur le bouton quand tu es prêt·e. Dix minutes, c’est doux, c’est faisable, et c’est exactement ce qu’il faut pour transformer la journée.',
    ],
  },
  {
    id: 'en-train-de-trainer',
    label: 'Je suis en train de traîner, là',
    sub: 'En direct',
    icon: 'clock',
    fiche: { label: 'Réduction de friction numérique', to: '/methode/friction-numerique' },
    franc: [
      'Alors parlons de ce qui se passe LÀ, maintenant : tu es sur ton téléphone, sur cette app, à lire un texte de motivation… au lieu de bosser. Oui, même moi je compte. La motivation que tu cherches ici, elle est de l’autre côté de ce téléphone — dans ton poly fermé qui t’attend.\n\nChaque « juste deux minutes » que tu t’accordes coûte le triple en re-concentration. Tu ne perds pas deux minutes, tu perds le fil — et le fil, c’est tout ce qui compte pendant une session.\n\nDonc voilà le deal, et il est non négociable : tu appuies sur le bouton, le minuteur part, le téléphone va dans l’autre pièce, et pendant dix minutes tu redeviens quelqu’un qui bosse. Exécution.',
      'Je vais te dire ce que tu es en train de faire, et tu vas te reconnaître : tu tournes autour du travail. Tu ouvres une app, tu la fermes, tu regardes un truc, tu te dis « allez bientôt », tu rouvres autre chose. Ça s’appelle orbiter. Et on peut orbiter des heures sans jamais atterrir.\n\nLe problème n’est pas toi, c’est la boucle — et une boucle, ça se COUPE, ça ne se négocie pas. On la coupe avec un geste physique : téléphone posé loin, poly ouvert, minuteur lancé.\n\nLe bouton est en bas. C’est ton atterrissage. Dix minutes de sol ferme, tout de suite.',
      'Question directe : dans une heure, tu préfères être quelqu’un qui a fait une vraie session — ou quelqu’un qui a « failli s’y mettre » pendant soixante minutes ? Parce que là, tout de suite, tu es en train de choisir la deuxième option. En silence. Par défaut.\n\nCe soir au coucher, cette heure-là pèsera l’un ou l’autre : la fierté tranquille, ou cette petite honte molle du temps perdu qu’on connaît tous. C’est le MÊME effort de départ — seul le premier geste diffère.\n\nAlors fais le bon : bouton, minuteur, cours ouvert. Dans dix minutes, tu seras déjà de l’autre côté, et franchement ? C’est mieux là-bas.',
    ],
    doux: [
      'Hé — je te vois tourner en rond, et ce n’est pas grave : tout le monde orbite avant d’atterrir. L’important, c’est de ne pas y passer la soirée.\n\nOn va s’aider d’un geste tout simple : pose le téléphone hors de portée, ouvre le poly à la bonne page, et lance le petit minuteur en bas. Pas pour te punir — pour te donner un cadre où c’est facile de rester.\n\nDix minutes, une seule chose, et le tourbillon s’arrête de lui-même. Tu verras : le calme du travail commencé est bien plus agréable que l’agitation d’avant.',
      'Traîner un peu, ça arrive — le cerveau cherche une pause qu’il n’a peut-être pas eue proprement. Alors on va faire les choses dans l’ordre : trente secondes de vraie pause (lève les yeux, respire, bois un coup)… et ensuite on rentre.\n\nPas la peine de rattraper quoi que ce soit : juste la prochaine unité, tranquillement. Le minuteur en bas t’ouvre la porte.\n\nDix minutes douces. C’est tout. Et la soirée change de couleur.',
    ],
  },
  {
    id: 'pas-envie',
    label: 'J’ai zéro envie aujourd’hui',
    sub: 'La flemme',
    icon: 'book',
    fiche: { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
    franc: [
      'Zéro envie. OK. Et alors ? Tu crois que les infirmières de nuit ont « envie » à 4 h du matin ? Que les internes ont « envie » à la 11e heure de garde ? Le métier que tu vises est un métier où on fait ce qu’il faut, envie ou pas. Ça commence aujourd’hui — c’est même exactement ça, l’entraînement.\n\nL’envie est une météo. Le travail est une direction. On ne pilote pas sa vie à la météo.\n\nDonc note bien ce qui va se passer : tu vas bosser dix minutes SANS envie, et tu vas découvrir un truc que peu de gens comprennent — l’envie revient pendant l’action, pas avant. Bouton. Maintenant. Sans envie. C’est justement ça qui est fort.',
      'Le jour du concours, personne ne te demandera si tu avais envie en octobre. On regardera ce que tu SAIS. Et ce que tu sauras en janvier, c’est la somme exacte de tous ces jours « sans envie » où tu as bossé quand même.\n\nLes jours avec envie, tout le monde bosse — ils ne te classent pas. Ce sont les jours comme AUJOURD’HUI qui départagent. Là, maintenant, tu es littéralement devant l’un des jours qui comptent double.\n\nAlors tu vas me faire le minimum syndical de ceux qui réussissent : dix minutes, une page, sans envie et sans discuter. Après tu réévalues. Le bouton est en bas.',
      '« J’ai pas envie » — d’accord, mais envie de QUOI, au juste ? Pas envie de réussir ta PASS ? Si. Pas envie d’être soignant·e un jour ? Si. Ce dont tu n’as pas envie, c’est des trente premières secondes d’inconfort. Trente secondes. C’est ça, le mur — pas plus épais que ça.\n\nTu ne vas pas laisser trente secondes d’inconfort décider de ton année. Pas toi. Pas après tout ce que tu as déjà donné pour être ici.\n\nLe bouton lance dix minutes. Les trente premières secondes seront moches, les neuf minutes trente d’après seront normales, et à la fin tu seras fier·e. Appuie.',
    ],
    doux: [
      'Les jours sans envie existent, et ils ne disent rien de ta valeur ni de tes chances — ils disent juste que tu es humain·e et que l’année est longue.\n\nCes jours-là, on ne vise pas une grande session : on vise une petite victoire, une seule, pour garder la chaîne intacte. Une page lue et récitée. Dix minutes posées.\n\nEt souvent — pas toujours, mais souvent — la machine repart une fois lancée. Si elle ne repart pas, tant pis : tu auras fait ta part du jour, et c’est déjà bien. Le minuteur est en bas, sans pression.',
      'Pas d’envie aujourd’hui ? Alors on va la remplacer par quelque chose de plus fiable : un tout petit rituel. On s’assoit. On ouvre. On lance dix minutes. C’est tout — l’envie n’est pas invitée, elle rejoindra en cours de route si elle veut.\n\nTu n’as pas besoin d’être motivé·e pour faire un petit pas. Et un petit pas par jour, c’est exactement comme ça qu’on traverse une année pareille.\n\nVas-y doucement. Le bouton t’attend.',
    ],
  },
  {
    id: 'me-suis-plante',
    label: 'Je viens de me planter',
    sub: 'Colle ratée',
    icon: 'diagnostic',
    fiche: { label: 'Correction par cause d’erreur', to: '/methode/correction-par-cause' },
    franc: [
      'Tu t’es planté·e. Bien. Maintenant tu as deux options, et une seule rapporte des points : ruminer le rang toute la soirée — zéro point — ou disséquer chaque erreur à froid et transformer cette colle en munitions — des points sur TOUTES les prochaines.\n\nLes gens qui montent au classement ne ratent pas moins que toi. Ils recyclent mieux. Chaque erreur analysée par cause vaut de l’or ; chaque erreur ruminée vaut du vent.\n\nAlors : dix minutes de déception, c’est déjà consommé. Maintenant on passe au travail utile. Le minuteur en bas, la fiche Correction par cause en dessous — et cette note ratée devient la meilleure séance de ta semaine.',
      'Une note. UNE note, sur les dizaines qui jalonneront ton année. Le classement d’aujourd’hui, c’est la photo d’HIER — et toi tu joues pour janvier, pas pour hier.\n\nMais attention : cette note contient quelque chose de précieux, et ça expire vite. Tes erreurs sont fraîches, tes hésitations encore tièdes. C’est MAINTENANT qu’elles se dissèquent — dans trois jours, elles seront froides et muettes.\n\nDonc pas ce soir de rumination : ce soir, autopsie. Chaque erreur → sa cause → son remède. Dix minutes pour commencer le tri, le bouton est en bas. Et relève la tête : la guerre est longue, et tu viens de recevoir du renseignement gratuit sur l’ennemi.',
      'Écoute-moi bien parce que c’est le moment où tout se joue : ce n’est pas la note qui décide de ta suite, c’est ce que tu fais dans l’HEURE qui vient. Ceux qui coulent, coulent ici — pas dans la colle, dans l’après-colle. Ils laissent une mauvaise note leur voler trois jours de travail.\n\nPas toi. Toi, tu vas faire le truc de pro : encaisser debout, analyser froid, repartir vite.\n\nLe protocole tient en une phrase : chaque erreur classée par cause, chaque cause traitée, et retour à l’entraînement. Dix minutes pour lancer l’analyse. Bouton. Et demain, cette note ne sera plus une blessure — ce sera un plan.',
    ],
    doux: [
      'Ça pique, hein. C’est normal, et tu as le droit — encaisse une minute, respire, ne fais pas semblant que ça ne fait rien.\n\nEt puis quand tu seras prêt·e, souviens-toi de ce qui est vrai : une note est une mesure à un instant, pas un verdict sur toi. Les classements bougent énormément sur une année — ce qui les fait bouger, c’est précisément ce que tu feras de cette colle.\n\nQuand ça va mieux, dix petites minutes d’analyse à froid : ces erreurs, d’où viennent-elles ? Le bouton est là, sans urgence. Cette note peut devenir ton meilleur investissement de la semaine.',
      'D’abord : tu n’es pas ta note. Ce qui a été mesuré, c’est un jour, un état de fatigue, un chapitre — pas ta valeur, pas ton avenir.\n\nEnsuite, en douceur : cette colle a des choses à t’apprendre, et elles valent cher. Pas ce soir si c’est trop frais — mais demain, à tête reposée, chaque erreur regardée calmement te donnera un endroit précis où progresser.\n\nPour l’instant : quelque chose de gentil pour toi, une vraie pause, du sommeil. Et si tu veux transformer ça tout de suite, le minuteur fait des sessions très douces de dix minutes.',
    ],
  },
  {
    id: 'fatigue-mais-faut-bosser',
    label: 'Fatigué·e, mais je dois y aller',
    sub: 'L’énergie',
    icon: 'sos',
    fiche: { label: 'Journée minimale', to: '/methode/journee-minimale' },
    franc: [
      'Fatigué·e mais tu dois bosser. OK — alors on va bosser INTELLIGENT, pas héroïque. Le héros fatigué fait 4 heures molles qui ne s’impriment pas et sabote sa nuit. Le pro fatigué fait 45 minutes chirurgicales et va dormir. Devine qui gagne en janvier.\n\nCe soir, ta mission est courte et non négociable : la Journée minimale. Le strict nécessaire pour garder la chaîne intacte — rappels dus, une unité critique, rien de neuf et de lourd.\n\nDix minutes pour lancer la première unité, c’est le bouton en bas. Ensuite tu finis ton minimum, et tu DORS tes huit heures comme un professionnel. Le sommeil, c’est ta séance de consolidation — la sauter, c’est travailler pour rien.',
      'Je ne vais pas te mentir pour te faire plaisir : oui tu es fatigué·e, et non, ce n’est pas une raison pour zéro. Entre « je me défonce » et « je fais rien », il y a la zone que les gens forts connaissent : le minimum exécuté proprement.\n\nUn jour à 10 % vaut infiniment plus qu’un jour à 0 % — pas pour les points de ce soir, pour la CHAÎNE. Casser la chaîne un soir de fatigue, c’est comme ça que les semaines déraillent.\n\nDonc : une unité. Une seule, choisie, faite lentement mais faite. Dix minutes au bouton. Puis extinction des feux tôt, sans culpabilité — c’est un ordre médical autant que tactique.',
      'La fatigue est une donnée, pas une excuse — et pas une honte non plus. On la traite comme un chef de service en garde : on adapte le plan, on ne l’abandonne pas.\n\nPlan du soir, version fatigue : 1) dix minutes de rappels FACILES — pas de neuf, pas de dur ; 2) préparer le démarrage de demain (poly ouvert à la bonne page sur le bureau) ; 3) coucher TÔT, vraiment tôt. Trois gestes, trente minutes max, et ta journée de demain est déjà à moitié gagnée.\n\nLe premier geste est au bout du bouton. Exécution mesurée — puis repos complet. C’est comme ça qu’on tient dix mois.',
    ],
    doux: [
      'Tu es fatigué·e et tu veux quand même avancer — c’est tout à ton honneur, et on va le faire en respectant ton état.\n\nCe soir, la version douce : une seule unité, la plus simple de ta liste, faite tranquillement. Des rappels faciles, pas d’apprentissage lourd — un cerveau fatigué consolide mal le neuf, mais entretient très bien l’acquis.\n\nDix minutes au bouton, puis tu fermes boutique et tu offres à ton cerveau la vraie séance de ce soir : une nuit complète. C’est elle qui fait le gros du travail.',
      'D’abord, sois fier·e d’être encore là malgré la fatigue — beaucoup auraient déjà lâché la soirée entière.\n\nEnsuite, sagesse d’endurance : les jours de basse énergie, on protège trois choses — la chaîne (un petit quelque chose plutôt que rien), le sommeil (non négociable), et le moral (zéro culpabilité pour la version réduite).\n\nLance dix minutes toutes douces si tu le sens. Sinon, prépare juste demain et va dormir — ça aussi, c’est une décision de quelqu’un qui va réussir.',
    ],
  },
  {
    id: 'doute-de-moi',
    label: 'Je doute de moi',
    sub: 'Les autres',
    icon: 'person',
    fiche: { label: 'Calibration de confiance', to: '/methode/calibration-confiance' },
    franc: [
      'Tu doutes de toi. Pendant ce temps, tu sais ce que font ceux dont le niveau t’impressionne ? Ils bossent. Ils ne passent pas leur soirée à se demander s’ils sont légitimes — et c’est EXACTEMENT pour ça qu’ils avancent.\n\nLe doute n’est pas ton problème. Le temps que tu lui donnes, si. Chaque minute passée à te comparer est une minute de préparation en moins — tu creuses toi-même l’écart qui t’angoisse.\n\nAlors on inverse la machine tout de suite : la seule réponse au doute qui vaille quelque chose, c’est une preuve. Un rappel réussi. Une série de QCM analysée. Du CONCRET. Dix minutes au bouton — et là tu auras un fait, pas une impression.',
      'Les impressions mentent. À la BU, tout le monde a l’air sûr de lui — c’est un théâtre où chacun cache les mêmes doutes que toi. Tu compares ton intérieur à leur vitrine : match truqué, résultat truqué.\n\nLes données, elles, ne mentent pas : tes rappels d’aujourd’hui contre ceux d’il y a deux semaines. TA courbe. C’est la seule comparaison qui existe vraiment — et je parie qu’elle monte plus que tu ne crois.\n\nDonc fini le tribunal imaginaire. Place au terrain : dix minutes de travail mesurable, maintenant, et le doute recule d’un cran. Il recule TOUJOURS devant les preuves. Bouton.',
      'Tu te demandes si tu as le niveau ? Mauvaise question — le niveau n’est pas une chose qu’on A, c’est une chose qu’on CONSTRUIT, unité par unité, exactement comme celle que tu es sur le point de faire ou de fuir.\n\nPersonne dans ta promo n’est « fait pour ça » de naissance. Il y a juste ceux qui construisent pendant que les autres se demandent s’ils sont capables de construire.\n\nTa place, tu es en train de la fabriquer ou de la laisser — là, ce soir, dans les dix prochaines minutes. Alors choisis le bon camp : bouton, poly, une unité. Le doute n’a jamais arrêté quelqu’un qui bosse.',
    ],
    doux: [
      'Ce doute qui te traverse touche presque tout le monde dans ces couloirs — et surtout les plus sérieux, précisément parce qu’ils se regardent honnêtement. Les vrais imposteurs ne se posent jamais la question.\n\nTu n’as pas volé ta place : tu la construis chaque jour où tu t’entraînes. Et ta progression réelle est probablement plus belle que ton impression — nos impressions sont de très mauvais juges.\n\nSi tu veux du concret rassurant : dix petites minutes de rappel sur un chapitre que tu connais. Tu verras ce que tu SAIS — et ça fait un bien fou. Le bouton est là.',
      'Compare deux photos de toi : aujourd’hui, et il y a un mois. Pas toi contre les autres — toi contre toi. Tout ce que tu comprends maintenant qui te semblait du chinois, tous ces réflexes de méthode qui n’existaient pas…\n\nC’est ça, ta vraie trajectoire. Elle ne se voit pas jour par jour, comme on ne voit pas pousser un arbre — mais elle est là.\n\nContinue de l’arroser, tranquillement : une petite unité maintenant, à ton rythme. Chaque pas rend le doute un peu plus petit et l’arbre un peu plus grand.',
    ],
  },
  {
    id: 'matin-lancement',
    label: 'C’est le matin, je me lance',
    sub: 'Premier geste',
    icon: 'clock',
    fiche: { label: 'Démarrage en 10 minutes', to: '/methode/demarrage-10-minutes' },
    franc: [
      'Le matin ne se négocie pas, il s’exécute. Chaque minute que tu passes à « émerger » sur ton téléphone est ta meilleure heure de cerveau que tu donnes à des inconnus qui postent des vidéos.\n\nTon cerveau du matin est le plus frais de la journée — c’est lui qui comprend le plus vite, retient le mieux, cale les chapitres durs. Le gaspiller en scroll, c’est jouer ta meilleure carte sur du vide.\n\nDonc protocole immédiat : eau, lumière, téléphone posé LOIN, et la première unité au bouton — dix minutes, tout de suite, avant que la journée trouve des excuses. Celui ou celle qui gagne sa matinée gagne sa journée. Exécution.',
      'Il y a deux sortes de matins : ceux qu’on prend, et ceux qui s’évaporent. Ceux qui s’évaporent commencent tous pareil — « je regarde juste un truc », et il est 11 h.\n\nToi, ce matin, tu vas faire le geste des gens sérieux : commencer AVANT d’avoir envie. La motivation du matin n’existe pas, c’est l’action du matin qui la fabrique. Dans dix minutes de travail, tu seras réveillé·e ET lancé·e — deux pour le prix d’un.\n\nLe bouton est en bas. Premier geste de la journée : le bon. Tout le reste en découle.',
      'Réfléchis à ça : ce que tu fais dans les trente premières minutes se répète toute la journée. Commence mou, la journée sera molle. Commence net, elle sera nette. Ce n’est pas de la magie, c’est de l’élan — et l’élan, ça se lance le matin ou ça se rattrape péniblement tout le jour.\n\nDonc pas de « petit déjeuner de deux heures », pas de tour des réseaux « pour se réveiller ». La version courte : routine rapide, bureau, poly ouvert.\n\nDix minutes au bouton, là, maintenant. À la sonnerie, tu auras déjà gagné ta première bataille — et la journée entière change de pente. Debout, on y va.',
    ],
    doux: [
      'Bonjour toi. Pas besoin de se brusquer — mais pas besoin de traîner non plus. Le matin aime les petits rituels : un verre d’eau, la lumière, et un premier geste tout simple vers le travail.\n\nTon cerveau est frais en ce moment, c’est son plus beau moment de la journée — offre-lui quelque chose d’intéressant plutôt que du défilement.\n\nDix minutes douces pour commencer, juste pour mettre le train sur les rails. Le bouton est là. Une fois lancé·e, la matinée se déroulera presque toute seule.',
      'Une belle journée de travail ressemble à un train : le plus important, c’est le départ en douceur — pas la vitesse de pointe.\n\nAlors ce matin, on ne se demande pas « comment je vais tenir jusqu’à ce soir » (personne ne tient une journée entière d’un coup) — on se demande juste : « c’est quoi, ma première petite unité ? ».\n\nChoisis-la, lance les dix minutes, et laisse l’élan faire son travail. Le reste de la journée te dira merci pour ce départ tranquille.',
    ],
  },
  {
    id: 'soir-derniere-session',
    label: 'Le soir, dernière session',
    sub: 'Finir fort',
    icon: 'star',
    fiche: { label: 'Révision rapide (circuit court)', to: '/methode/revision-rapide' },
    franc: [
      'Dernière session du jour. C’est celle que 90 % des gens sabotent — « j’ai déjà bien bossé », « je la ferai mieux demain ». Et c’est précisément pour ça qu’elle vaut double : c’est la session des 10 % qui montent.\n\nElle n’a pas besoin d’être longue. Elle a besoin d’EXISTER : un circuit court de rappels sur ce que tu as vu aujourd’hui — parce que ce que tu récupères ce soir, ta nuit va le graver. C’est le meilleur rendement horaire de ta journée.\n\nDix minutes au bouton. Rappels du jour, cours fermé, puis extinction. Finis comme quelqu’un qui joue la gagne — pas comme quelqu’un qui s’échappe.',
      'Tu es fatigué·e, il est tard, et tu hésites à lâcher. Écoute-moi UNE minute : la dernière session du soir a un superpouvoir que les autres n’ont pas — elle passe la nuit avec toi. Ce que tu rappelles maintenant, ton sommeil le consolide gratuitement pendant huit heures.\n\nDix minutes de rappels maintenant valent trente minutes demain matin. C’est le seul moment de la journée où le temps se multiplie.\n\nAlors on ne fait pas du neuf, on ne force pas — on RÉCOLTE : ferme les cours, récite ce que la journée t’a appris, note les trous pour demain. Le bouton lance la récolte. Ensuite, dodo mérité.',
      'La différence entre une bonne journée et une journée d’élite tient souvent à ceci : comment elle FINIT. Finir en scroll, c’est laisser la journée s’effilocher. Finir en rappel, c’est la sceller.\n\nEt il y a un bonus caché : la dernière chose que tu fais ce soir décide de ton humeur de demain matin. Finis par dix minutes propres, et demain tu te réveilles quelqu’un qui est « dedans ». Finis en vrac, et demain tu redémarres de zéro.\n\nDix minutes. Rappels du jour. Préparation du premier geste de demain. Bouton — et on scelle cette journée comme il faut.',
    ],
    doux: [
      'Belle journée ou journée moyenne, peu importe — on va la terminer proprement, et en douceur.\n\nLe rituel du soir qui fait tout : dix minutes de rappels calmes sur ce que tu as vu aujourd’hui (ta nuit adore consolider ce qu’on lui confie juste avant), puis les trois unités de demain notées sur un papier, puis extinction tranquille.\n\nPas de neuf, pas de forcing — juste ranger la journée avant de dormir. Le bouton lance les dix minutes. Et après : repos complet, tu l’as gagné.',
      'La dernière session du soir, pense-la comme border la journée avant de la coucher : on repasse doucement sur ce qu’elle a appris, on note ce qui reste à faire, et on éteint.\n\nC’est un moment agréable, en vrai — le travail sans la pression, juste la récolte.\n\nDix douces minutes au bouton si tu en as encore sous le pied. Et si tu es vraiment au bout : note juste les trois unités de demain, et va dormir en paix. Les deux sont des fins dignes.',
    ],
  },
  {
    id: 'veille-de-colle',
    label: 'Veille de colle',
    sub: 'J-1',
    icon: 'diagnostic',
    fiche: { label: 'Révision rapide (circuit court)', to: '/methode/revision-rapide' },
    franc: [
      'Veille de colle. Alors écoute bien, parce que les prochaines heures se jouent sur la DISCIPLINE, pas sur l’héroïsme : plus rien de neuf — le neuf de la veille écrase l’ancien et ne tient pas. Ce soir, on consolide ce qui existe.\n\nLe circuit gagnant : tes erreurs passées relues, les distinctions pièges récitées, quelques QCM ciblés sur tes points faibles. Chaque minute doit être un rappel ou un test — zéro relecture molle.\n\nEt le plus important, grave-le : cette nuit tu DORS. Un cerveau sans sommeil rend une copie vide — la nuit blanche de veille est le seul moyen certain de perdre des points. Dix minutes au bouton pour lancer le circuit court. Puis exécution, puis dodo tôt. C’est un ordre.',
      'Demain tu passes. Et là, deux profils vont se dessiner dans ta promo : les paniqués qui essaient de « tout revoir » cette nuit (ils vont brasser, angoisser, mal dormir et sous-performer) — et les stratèges qui font un circuit court propre et vont se coucher.\n\nTu es un stratège. Donc : 20 % des notions font 80 % des points, et tes erreurs passées te disent LESQUELLES. C’est là que tu frappes, et nulle part ailleurs.\n\nRappels des gros blocs, erreurs connues, pièges répertoriés. Dix minutes au bouton pour attaquer. Et à l’heure H ce soir : extinction, quoi qu’il reste. Ta copie de demain se joue autant dans ton lit que dans ton poly.',
      'J-1. Ton niveau de demain est déjà fixé à 95 % — la seule variable qui reste, c’est l’état dans lequel tu le LIVRES. Et cet état se fabrique ce soir : révision ciblée, dîner normal, coucher tôt, affaires prêtes.\n\nDonc on ne panique pas, on prépare la livraison : une passe sur TES erreurs (le document le plus rentable que tu possèdes), les distinctions qui se confondent, et stop.\n\nInterdits formels ce soir : le chapitre jamais ouvert (trop tard, il ne rentrera pas), les pronostics du groupe de promo (leur stress est contagieux), et l’écran tard. Dix minutes au bouton pour la passe d’erreurs. Puis tu fermes tout, et demain tu livres. Confiance.',
    ],
    doux: [
      'Veille de colle — et je vais te dire un secret apaisant : l’essentiel de ce que tu sais, tu le sais déjà. Ce soir ne peut plus tout changer, mais il peut tout consolider.\n\nAlors on fait simple et doux : une relecture de tes erreurs passées (juste elles), quelques rappels des grandes structures, et c’est tout. Pas de chapitre neuf, pas de marathon — de la précision tranquille.\n\nEt puis le vrai geste gagnant : une vraie nuit. Ton cerveau va ranger toute la nuit ce que tu consolides maintenant. Dix minutes calmes au bouton, puis on prépare demain, puis on dort. Tu es plus prêt·e que ton stress ne le dit.',
      'Demain, c’est un entraînement grandeur nature — pas un jugement dernier. Quoi qu’il arrive, tu en sortiras avec du renseignement précieux sur ce qui tient et ce qui manque.\n\nCe soir : douceur et ordre. Un petit circuit de rappels sur tes erreurs connues, les affaires préparées, un dîner normal, un coucher tôt. Le tout sans écran tard et sans les pronostics anxiogènes des autres.\n\nDix minutes posées si tu veux réviser encore un peu — le bouton est là. Sinon, prépare ton sac et va dormir : c’est aussi une excellente révision.',
    ],
  },
  {
    id: 'bonne-lancee',
    label: 'Je suis bien lancé·e',
    sub: 'Tenir l’élan',
    icon: 'check',
    fiche: { label: 'Pomodoro / Timeboxing', to: '/methode/pomodoro' },
    franc: [
      'Tu es lancé·e ? Parfait. Alors maintenant je vais te dire le truc que personne ne dit : c’est LÀ, exactement là, que la plupart des gens se sabotent. Ils se sentent bien, ils se disent « je l’ai bien mérité », et ils s’offrent une « petite pause » qui tue l’élan net.\n\nL’élan est un capital. Ça se protège, ça ne se dépense pas en récompenses anticipées.\n\nDonc la règle : tant que ça roule, on ROULE. La pause viendra à la fin du bloc, pas au milieu de la vague. Enchaîne la prochaine unité maintenant — dix minutes au bouton pour la sceller — et gardons cette machine chaude. C’est comme ça qu’on fabrique les grosses journées.',
      'Bien lancé·e — et tu sais quoi ? C’est le moment d’encaisser le maximum. Les vagues comme ça ne se commandent pas : quand elle est là, on surfe jusqu’au bout.\n\nUne heure de travail EN élan vaut trois heures de travail en démarrage. C’est maintenant que ta soirée peut devenir énorme, pas plus tard.\n\nAlors pas de téléphone « juste pour voir », pas de micro-pause qui n’en est pas une. La prochaine unité, tout de suite, pendant que c’est chaud. Bouton. Dix minutes de plus dans la machine — et on regarde jusqu’où elle va.',
      'Note bien ce moment. Regarde comment tu te sens : concentré·e, efficace, presque facile. C’EST ÇA que tu cherches tous les jours — et c’est maintenant que tu peux comprendre comment il est arrivé.\n\nQu’est-ce qui a marché ? Le lieu ? L’heure ? Le téléphone loin ? Le démarrage sans réfléchir ? Prends dix secondes pour le noter quelque part — c’est ta recette personnelle, elle vaut de l’or les mauvais jours.\n\nEt ensuite : on ne casse rien, on enchaîne. Prochaine unité au bouton, même réglage, même vague. Les grands classements se construisent exactement dans des moments comme celui-là.',
    ],
    doux: [
      'Quel plaisir de te voir lancé·e ! Savoure une seconde — c’est le résultat direct de ton démarrage, pas de la chance.\n\nPour faire durer la vague sans t’épuiser : continue en blocs propres (le Pomodoro est parfait pour ça), avec de vraies petites pauses SANS écran entre deux — elles entretiennent l’élan au lieu de le casser.\n\nEt à la fin, quand tu t’arrêteras, note ce qui a rendu cette session si fluide : c’est ta recette. La prochaine unité t’attend au bouton, en douceur — la vague est belle, reste dessus.',
      'Tu es dans le bon rythme — c’est précieux, et ça s’entretient comme un feu de camp : on ajoute une bûche à la fois, on ne le laisse pas s’éteindre, mais on ne l’étouffe pas non plus.\n\nDonc : la prochaine unité tranquillement, une vraie pause toutes les 45-50 minutes, de l’eau, et on continue tant que c’est agréable.\n\nEt quand tu sentiras la vraie fatigue arriver, arrête-toi en beauté — sur une réussite, avec les trois unités de demain notées. Finir une bonne session proprement, c’est déjà préparer la suivante.',
    ],
  },
  {
    id: 'reprise-apres-pause',
    label: 'Je reprends après avoir lâché',
    sub: 'Le retour',
    icon: 'arrow',
    fiche: { label: 'Triage du retard 24-72 h', to: '/methode/triage-retard' },
    franc: [
      'Tu as lâché quelques jours. OK. Maintenant la seule question qui compte : qu’est-ce que tu fais dans les dix prochaines minutes ? Parce que je vais te dire où se perdent les comebacks : pas dans la pause — dans le FAUX retour. Trois jours à « se remettre dedans », à réorganiser, à culpabiliser. Trois jours de pause de plus, déguisés.\n\nLe vrai retour tient en un geste : ouvrir un cours et produire dix minutes de travail réel. Pas ranger. Pas planifier. PRODUIRE.\n\nLa culpabilité, tu la déposes ici, elle ne sert à rien. Le retard, on le triera après — le Triage existe pour ça. Là, tout de suite : bouton, dix minutes, et tu es officiellement de retour. Le reste suivra.',
      'Écoute, l’année ne te demande pas d’être parfait·e — elle te demande de REVENIR. À chaque fois. C’est ça, la vraie compétence des gens qui finissent bien classés : pas zéro pause, zéro abandon.\n\nEt là tu es pile au moment décisif : celui où la pause devient soit une parenthèse, soit une pente. La différence entre les deux ? Dix minutes de travail réel, aujourd’hui, maintenant.\n\nPas de grand plan de rattrapage ce soir — juste le geste qui te remet dans le match. Le cours du JOUR d’abord (jamais le rattrapage d’abord, c’est le piège classique). Bouton. Dix minutes. Bienvenue de retour.',
      'Le pire ennemi du retour, c’est le fantasme du « retour parfait » : attendre lundi, attendre d’avoir tout replanifié, attendre d’être « vraiment prêt·e ». Pendant ce temps, les jours s’ajoutent aux jours.\n\nToi tu vas faire l’inverse du fantasme : un retour moche et IMMÉDIAT. Dix minutes sur le cours le plus récent — pas le plus en retard, le plus RÉCENT, celui qui coûte le moins cher à apprendre maintenant.\n\nLe trou de ces derniers jours ? Il se triera à froid, par rentabilité, avec la fiche en dessous. Mais d’abord on stoppe l’hémorragie : plus UN jour ne s’ajoute. Bouton. C’est reparti — pour de vrai cette fois.',
    ],
    doux: [
      'Te revoilà — et c’est ça qui compte. Une pause de quelques jours dans une année pareille, ça arrive à presque tout le monde ; ce qui distingue les parcours qui tiennent, c’est juste le retour. Tu es en train de le faire. Bravo.\n\nOn reprend en douceur, sans se noyer dans le rattrapage : aujourd’hui, le cours du jour et rien d’autre. Le trou des derniers jours se triera calmement plus tard, par priorité — la fiche en dessous t’y aidera.\n\nDix minutes toutes simples pour rallumer la machine. Le bouton est là. Pas de culpabilité à l’entrée : elle reste dehors.',
      'Reprendre, c’est comme rentrer dans l’eau : le premier contact est frais, et après on est très bien. Le secret, c’est d’y aller par étapes — pas de plongeon dans trois semaines de retard.\n\nAujourd’hui : une seule unité, agréable si possible, sur le cours le plus récent. Demain : pareil, plus un petit morceau de rattrapage choisi. La régularité douce va tout reconstruire — elle gagne toujours sur l’année.\n\nLance tes dix premières minutes quand tu es prêt·e. Je suis content de te revoir au travail.',
    ],
  },
  {
    id: 'gros-cap',
    label: 'Besoin de voir plus loin',
    sub: 'Le sens',
    icon: 'heart',
    fiche: { label: 'Une citation pour la route', to: '/citations/plein-ecran' },
    franc: [
      'Lève la tête deux minutes. Dans quelques années, quelqu’un sera assis en face d’un soignant qui saura quoi faire — calme, compétent, utile. Ce soignant, c’est toi, ou c’est quelqu’un d’autre. Ça se décide en partie CE SOIR, dans des soirées exactement comme celle-là.\n\nLa biochimie que tu trouves aride, c’est la lecture d’un bilan sanguin en garde. L’anat qui ne rentre pas, c’est un geste sûr un jour où il faudra être sûr. Rien de ce que tu apprends n’est gratuit — tout est un outil pour quelqu’un de réel.\n\nVoilà pourquoi on ne lâche pas. Voilà pourquoi dix minutes de plus ce soir ont un sens. Le bouton est en bas — au travail, futur·e soignant·e.',
      'Tu veux la vérité sur cette année ? Elle est dure, injuste par moments, et elle ne durera pas toujours — c’est une SAISON, pas ta vie. Une saison de construction, la plus dense que tu vivras peut-être.\n\nEt dans dix ans, elle tiendra en trois lignes de souvenir. Mais ce qu’elle aura construit — ta capacité de travail, ta rigueur, ta place — te servira chaque jour du reste de ta vie professionnelle.\n\nAlors on la traverse en la regardant pour ce qu’elle est : un investissement massif, à durée limitée, sur la personne que tu deviens. Chaque unité compte. Dix minutes au bouton, pour la version de toi qui te dira merci.',
      'Pose-toi la vraie question, celle qu’on évite : dans un an, quand tout ça sera derrière, qu’est-ce que tu veux pouvoir te dire ? « J’ai tout donné » — ou « j’aurais pu » ?\n\nParce que c’est ça, le seul vrai enjeu. Pas le classement des autres, pas la chance, pas les profs : la trace que TU laisses dans tes propres journées. « J’aurais pu » est la phrase la plus lourde à porter — et elle se fabrique une soirée molle à la fois.\n\n« J’ai tout donné » aussi, ça se fabrique une soirée à la fois. Celle-là, par exemple. Dix minutes au bouton. Choisis ta phrase.',
    ],
    doux: [
      'Prends une vraie minute et souviens-toi : tu n’es pas là par hasard. Un jour, quelque chose t’a fait dire « je veux soigner » — une personne, un moment, une évidence. Ce quelque chose existe toujours ; il est juste recouvert par la fatigue des QCM.\n\nChaque notion que tu apprends est un fil tiré vers ce futur-là. La cascade de ce soir, c’est un médicament compris dans quatre ans, un patient mieux traité dans dix.\n\nRetourne au travail avec ça dans un coin de la tête — pas comme un poids, comme une boussole. Dix minutes au bouton, tranquillement, dans la bonne direction.',
      'Les années comme la tienne se traversent mieux quand on regarde les deux horizons : le proche (la prochaine unité, la prochaine heure — c’est tout ce qu’on te demande aujourd’hui) et le lointain (la vie qui t’attend après, et elle vaut le coup).\n\nEntre les deux, il n’y a rien à porter : pas besoin de penser à juin ce soir. Juin se construira tout seul avec des soirées comme celle-ci, posées l’une après l’autre.\n\nAlors : un petit pas maintenant, l’horizon en toile de fond. Le bouton est là quand tu veux.',
    ],
  },
  {
    id: 'envie-de-tout-lacher',
    label: 'J’ai envie de tout lâcher',
    sub: 'On se pose',
    icon: 'heart',
    safety: true,
    fiche: { label: 'Protocole Détresse (les bons contacts)', to: '/sos/detresse' },
    franc: [],
    doux: [
      'D’abord, merci d’avoir choisi cette carte plutôt que de garder ça pour toi. On se pose, et je te parle franchement mais doucement : « envie de tout lâcher » peut vouloir dire deux choses très différentes.\n\nSi c’est le ras-le-bol d’une mauvaise passe — une semaine dure, une note qui fait mal — alors ça se traverse : une vraie coupure ce soir, du sommeil, et on reparlera travail demain. Pas de grande décision un soir de fatigue : la fatigue est une menteuse convaincante.\n\nMais si c’est plus lourd que ça — si ça dure depuis des semaines, si plus rien n’a de goût, si tu te sens à bout — alors ce n’est plus une question de motivation, et je refuse de te faire un discours de coach. C’est d’un humain dont tu as besoin : un proche ce soir, ton médecin, ou le 3114 (gratuit, 24 h/24). Le protocole Détresse ci-dessous a tous les bons contacts. Toi d’abord. Les cours attendront.',
      'Je te prends au sérieux, alors pas de pep talk ici — juste ce qui est vrai.\n\nCe que tu ressens a le droit d’exister. Une année comme la tienne use, et « je n’en peux plus » est parfois simplement le cri d’un corps qui réclame du repos : une soirée entière SANS cours ni culpabilité, une vraie nuit, un vrai repas, quelqu’un à qui parler. Souvent, après ça, la question « tout lâcher » a déjà changé de forme.\n\nEt si elle n’a pas changé de forme — si le poids revient chaque jour, si le sommeil ou l’appétit s’en mêlent, si tu te fais peur par moments — alors promets-moi une chose : tu ne restes pas seul·e avec ça. Un proche, ton médecin, le service santé de ta fac, ou le 3114 à toute heure. Demander de l’aide n’est pas un échec — c’est exactement ce que ferait quelqu’un d’intelligent qui traverse un moment dur. Le protocole ci-dessous te guide pas à pas.',
      'Viens, on enlève toute pression deux minutes. Pas de minuteur ici, pas de « bouge-toi » — ce n’est pas le moment et tu mérites mieux que ça.\n\nCe soir, ta seule mission : prendre soin de l’humain avant l’étudiant. Manger quelque chose de vrai. Prévenir quelqu’un que c’était une journée difficile — un message suffit : « journée dure, ça me ferait du bien de parler ». Dormir. C’est tout, et c’est déjà beaucoup.\n\nLa question de l’orientation, du concours, de la suite — elle est légitime, et elle mérite d’être posée à tête reposée, avec de vraies personnes : tes proches, le service orientation, ton médecin si le moral est en cause. Pas seul·e à 23 h un soir de fatigue. Le protocole Détresse ci-dessous liste qui appeler, quand, comment. Tu comptes plus que tout le reste.',
    ],
  },
];

/** Retrouve une situation par id (null si inconnue). */
export function findSituation(id: string): TalkSituation | null {
  return TALK_SITUATIONS.find((s) => s.id === id) ?? null;
}
