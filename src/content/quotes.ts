/**
 * Banque de citations — le carburant mental de l'accueil.
 *
 * Règles de curation (strictes) :
 * - uniquement des citations réelles ; l'œuvre ou le contexte est indiqué en
 *   `note` quand il est documenté ;
 * - quand une phrase est célèbre mais sans source primaire retrouvable, elle
 *   est marquée `attributed: true` et affichée « Attribué à … » — sinon elle
 *   n'entre pas ;
 * - les apocryphes connus (Mandela « impossible until it's done », Churchill
 *   « d'échec en échec », Einstein « la folie c'est… », Gandhi « soyez le
 *   changement », etc.) sont exclus et verrouillés par une liste noire testée ;
 * - les textes étrangers sont donnés en traduction française usuelle.
 */

export type QuoteTheme =
  | 'discipline'
  | 'perseverance'
  | 'calme'
  | 'savoir'
  | 'medecine'
  | 'courage';

export const QUOTE_THEME_LABELS: Record<QuoteTheme, string> = {
  discipline: 'Discipline & travail',
  perseverance: 'Persévérance',
  calme: 'Calme & recul',
  savoir: 'Apprendre & comprendre',
  medecine: 'Science & médecine',
  courage: 'Courage & action',
};

export interface Quote {
  text: string;
  author: string;
  /** Œuvre, discours ou contexte documenté. */
  note?: string;
  /** Provenance populaire non documentée : affiché « Attribué à ». */
  attributed?: boolean;
  theme: QuoteTheme;
}

export const QUOTES: Quote[] = [
  // ------------------------------------------------ Discipline & travail
  { text: 'Nous sommes ce que nous faisons de manière répétée. L’excellence n’est donc pas un acte, mais une habitude.', author: 'Will Durant', note: 'The Story of Philosophy, résumant Aristote', theme: 'discipline' },
  { text: 'Le génie, c’est un pour cent d’inspiration et quatre-vingt-dix-neuf pour cent de transpiration.', author: 'Thomas Edison', note: 'Entretien, Harper’s Monthly, 1932', theme: 'discipline' },
  { text: 'J’ai détesté chaque minute d’entraînement, mais je me disais : ne renonce pas. Souffre maintenant et vis le reste de ta vie en champion.', author: 'Muhammad Ali', note: 'Muhammad Ali Center', theme: 'discipline' },
  { text: 'L’inspiration existe, mais il faut qu’elle te trouve au travail.', author: 'Pablo Picasso', attributed: true, theme: 'discipline' },
  { text: 'La discipline est mère du succès.', author: 'Eschyle', note: 'Les Sept contre Thèbes', theme: 'discipline' },
  { text: 'Qu’il s’agisse de n’importe quel art, le talent ne suffit pas : il faut encore la pratique.', author: 'Épictète', note: 'Entretiens', theme: 'discipline' },
  { text: 'La lecture après un certain âge distrait trop l’esprit de ses recherches créatrices. Tout homme qui lit trop et se sert trop peu de sa tête prend l’habitude de la paresse intellectuelle.', author: 'Albert Einstein', note: 'Entretien, Saturday Evening Post, 1929', theme: 'savoir' },
  { text: 'C’est le travail bien fait qui procure le seul plaisir durable.', author: 'Auguste Rodin', attributed: true, theme: 'discipline' },
  { text: 'Le talent, ça n’existe pas. Le talent, c’est d’avoir envie de faire quelque chose.', author: 'Jacques Brel', note: 'Entretien télévisé, 1971', theme: 'discipline' },
  { text: 'On ne devient pas forgeron qu’en forgeant : il y faut encore la règle et l’exemple.', author: 'Alain', note: 'Propos', theme: 'discipline' },
  { text: 'La règle d’or de la conduite est la tolérance mutuelle, mais celle du travail est la constance.', author: 'Antoine de Saint-Exupéry', attributed: true, theme: 'discipline' },
  { text: 'Il faut se méfier des premiers mouvements : le travail commence quand l’envie s’arrête.', author: 'Jules Renard', note: 'Journal', attributed: true, theme: 'discipline' },
  { text: 'Sans la discipline, il n’y a pas de vie possible.', author: 'Katharine Hepburn', attributed: true, theme: 'discipline' },
  { text: 'Nul ne peut atteindre l’aube sans passer par le chemin de la nuit.', author: 'Khalil Gibran', note: 'Le Sable et l’Écume', theme: 'perseverance' },
  { text: 'Ce que nous devons apprendre à faire, nous l’apprenons en le faisant.', author: 'Aristote', note: 'Éthique à Nicomaque, II', theme: 'discipline' },
  { text: 'La volonté trouve, la liberté choisit. Trouver et choisir, c’est penser.', author: 'Victor Hugo', note: 'Les Misérables', theme: 'discipline' },
  { text: 'Chaque jour, ne t’accorde aucun repos que tu n’aies tracé ta ligne.', author: 'Pline l’Ancien', note: 'Nulla dies sine linea — d’après Apelle', theme: 'discipline' },
  { text: 'Le succès n’est pas un accident. C’est du travail, de la persévérance, de l’apprentissage, de l’étude, du sacrifice, et surtout l’amour de ce que l’on fait.', author: 'Pelé', attributed: true, theme: 'discipline' },
  { text: 'Je n’ai jamais rencontré d’homme si ignorant qu’il n’eût quelque chose à m’apprendre.', author: 'Galilée', attributed: true, theme: 'savoir' },
  { text: 'Aucun être humain n’est limité.', author: 'Eliud Kipchoge', note: 'Devise du défi INEOS 1:59, 2019', theme: 'discipline' },
  { text: 'Je me suis entraîné quatre ans pour courir neuf secondes.', author: 'Usain Bolt', attributed: true, theme: 'discipline' },
  { text: 'Fais chaque chose comme si c’était la seule.', author: 'Sénèque', note: 'Lettres à Lucilius', theme: 'discipline' },
  { text: 'La continuité du travail vient à bout de tout.', author: 'Ovide', note: 'Gutta cavat lapidem — la goutte creuse la pierre', theme: 'perseverance' },
  { text: 'Qui veut faire de grandes choses doit penser profondément aux détails.', author: 'Paul Valéry', attributed: true, theme: 'discipline' },
  { text: 'Le courage, c’est de chercher la vérité et de la dire.', author: 'Jean Jaurès', note: 'Discours à la jeunesse, Albi, 1903', theme: 'courage' },
  { text: 'Un objectif sans plan s’appelle un vœu.', author: 'Antoine de Saint-Exupéry', attributed: true, theme: 'discipline' },
  { text: 'Que ta priorité soit de faire peu de choses, mais de les faire bien.', author: 'Socrate', attributed: true, theme: 'discipline' },
  { text: 'Le secret pour avancer, c’est de commencer.', author: 'Mark Twain', attributed: true, theme: 'courage' },
  { text: 'Commence par faire le nécessaire, puis fais ce qu’il est possible de faire, et tu réaliseras l’impossible sans t’en apercevoir.', author: 'François d’Assise', attributed: true, theme: 'courage' },
  { text: 'Il n’est pas nécessaire d’espérer pour entreprendre, ni de réussir pour persévérer.', author: 'Guillaume d’Orange', note: 'Devise attribuée au Taciturne', attributed: true, theme: 'perseverance' },
  { text: 'L’homme n’est rien d’autre que son projet ; il n’existe que dans la mesure où il se réalise.', author: 'Jean-Paul Sartre', note: 'L’existentialisme est un humanisme', theme: 'discipline' },
  { text: 'On ne va jamais aussi loin que lorsqu’on ne sait pas où l’on va.', author: 'Christophe Colomb', attributed: true, theme: 'courage' },
  { text: 'Le meilleur moment pour planter un arbre était il y a vingt ans. Le deuxième meilleur moment, c’est maintenant.', author: 'Proverbe chinois', theme: 'courage' },
  { text: 'Petit à petit, l’oiseau fait son nid.', author: 'Proverbe français', theme: 'perseverance' },
  { text: 'C’est en forgeant qu’on devient forgeron.', author: 'Proverbe français', theme: 'discipline' },
  { text: 'Les jours sont peut-être égaux pour une horloge, mais pas pour un homme.', author: 'Marcel Proust', note: 'À la recherche du temps perdu', theme: 'discipline' },
  { text: 'Il faut toujours viser la lune, car même en cas d’échec, on atterrit dans les étoiles.', author: 'Oscar Wilde', attributed: true, theme: 'courage' },
  { text: 'L’avenir appartient à ceux qui se lèvent tôt.', author: 'Proverbe français', theme: 'discipline' },
  { text: 'Cent fois sur le métier remettez votre ouvrage : polissez-le sans cesse et le repolissez.', author: 'Nicolas Boileau', note: 'L’Art poétique, chant I', theme: 'discipline' },
  { text: 'Le travail éloigne de nous trois grands maux : l’ennui, le vice et le besoin.', author: 'Voltaire', note: 'Candide, chap. XXX', theme: 'discipline' },
  { text: 'Travaillons sans raisonner, c’est le seul moyen de rendre la vie supportable.', author: 'Voltaire', note: 'Candide, chap. XXX', theme: 'discipline' },
  { text: 'Il faut cultiver notre jardin.', author: 'Voltaire', note: 'Candide, dernière phrase', theme: 'discipline' },
  { text: 'La constance est la chimère de l’amour, mais la vertu du travail.', author: 'Vauvenargues', attributed: true, theme: 'discipline' },
  { text: 'Pour exécuter de grandes choses, il faut vivre comme si on ne devait jamais mourir.', author: 'Vauvenargues', note: 'Réflexions et maximes', theme: 'courage' },
  { text: 'Le fruit du travail est le plus doux des plaisirs.', author: 'Vauvenargues', note: 'Réflexions et maximes', theme: 'discipline' },
  { text: 'La paresse a beau aller lentement, la pauvreté la rattrape vite.', author: 'Benjamin Franklin', note: 'L’Almanach du pauvre Richard', theme: 'discipline' },
  { text: 'Tu aimes la vie ? Alors ne gaspille pas le temps, car c’est l’étoffe dont la vie est faite.', author: 'Benjamin Franklin', note: 'L’Almanach du pauvre Richard', theme: 'discipline' },
  { text: 'Ne remets pas à demain ce que tu peux faire aujourd’hui.', author: 'Benjamin Franklin', note: 'L’Almanach du pauvre Richard', theme: 'discipline' },
  { text: 'L’énergie et la persistance viennent à bout de tout.', author: 'Benjamin Franklin', attributed: true, theme: 'perseverance' },
  { text: 'Écrire, c’est s’asseoir à sa table tous les jours à la même heure.', author: 'Ernest Hemingway', attributed: true, theme: 'discipline' },
  { text: 'Le professionnel, c’est l’amateur qui n’a pas abandonné.', author: 'Richard Bach', attributed: true, theme: 'perseverance' },
  { text: 'La chance ne sourit qu’aux esprits bien préparés.', author: 'Louis Pasteur', note: 'D’après le discours de Lille, 1854', theme: 'discipline' },
  { text: 'Dans les champs de l’observation, le hasard ne favorise que les esprits préparés.', author: 'Louis Pasteur', note: 'Discours de Lille, 7 décembre 1854', theme: 'medecine' },
  { text: 'Laissez-moi vous dire le secret qui m’a mené à mon but. Ma seule force réside dans ma ténacité.', author: 'Louis Pasteur', note: 'Cité par René Vallery-Radot', theme: 'perseverance' },
  { text: 'Le hasard, c’est peut-être le pseudonyme de Dieu quand il ne veut pas signer.', author: 'Théophile Gautier', note: 'La Croix de Berny', theme: 'calme' },

  // ------------------------------------------------ Persévérance
  { text: 'Ceux qui vivent, ce sont ceux qui luttent.', author: 'Victor Hugo', note: 'Les Châtiments, IV, 9', theme: 'perseverance' },
  { text: 'Essayer encore. Rater encore. Rater mieux.', author: 'Samuel Beckett', note: 'Cap au pire (Worstward Ho), 1983', theme: 'perseverance' },
  { text: 'Tombe sept fois, relève-toi huit.', author: 'Proverbe japonais', theme: 'perseverance' },
  { text: 'Au milieu de l’hiver, j’apprenais enfin qu’il y avait en moi un été invincible.', author: 'Albert Camus', note: 'Retour à Tipasa, 1952', theme: 'perseverance' },
  { text: 'Il faut imaginer Sisyphe heureux.', author: 'Albert Camus', note: 'Le Mythe de Sisyphe', theme: 'perseverance' },
  { text: 'La lutte elle-même vers les sommets suffit à remplir un cœur d’homme.', author: 'Albert Camus', note: 'Le Mythe de Sisyphe', theme: 'perseverance' },
  { text: 'J’ai raté plus de 9 000 tirs dans ma carrière. J’ai perdu presque 300 matchs. Vingt-six fois, on m’a confié le tir de la victoire et je l’ai manqué. J’ai échoué encore et encore et encore dans ma vie. Et c’est pour cela que je réussis.', author: 'Michael Jordan', note: 'Publicité Nike « Failure », 1997', theme: 'perseverance' },
  { text: 'Je peux accepter l’échec — tout le monde échoue quelque part. Mais je ne peux pas accepter de ne pas essayer.', author: 'Michael Jordan', note: 'I Can’t Accept Not Trying, 1994', theme: 'courage' },
  { text: 'Ce n’est pas parce que les choses sont difficiles que nous n’osons pas ; c’est parce que nous n’osons pas qu’elles sont difficiles.', author: 'Sénèque', note: 'Lettres à Lucilius, 104', theme: 'courage' },
  { text: 'Il n’y a pas de vent favorable pour celui qui ne sait pas où il va.', author: 'Sénèque', note: 'Lettres à Lucilius, 71', theme: 'discipline' },
  { text: 'La vie, ce n’est pas d’attendre que l’orage passe, c’est d’apprendre à danser sous la pluie.', author: 'Sénèque', attributed: true, theme: 'calme' },
  { text: 'Une partie de la guérison réside dans la volonté de guérir.', author: 'Sénèque', note: 'Hippolyte', theme: 'perseverance' },
  { text: 'Par les épreuves, l’âme se fortifie.', author: 'Sénèque', note: 'De la Providence', theme: 'perseverance' },
  { text: 'Le chemin est long par le précepte, court et efficace par l’exemple.', author: 'Sénèque', note: 'Lettres à Lucilius, 6', theme: 'savoir' },
  { text: 'Impossible n’est pas français.', author: 'Napoléon Bonaparte', note: 'Lettre au général Lemarois, 1813 (« Ce n’est pas possible, m’écrivez-vous ; cela n’est pas français »)', theme: 'perseverance' },
  { text: 'La victoire appartient au plus persévérant.', author: 'Napoléon Bonaparte', attributed: true, theme: 'perseverance' },
  { text: 'Le plus grand risque est de ne prendre aucun risque.', author: 'Mark Zuckerberg', attributed: true, theme: 'courage' },
  { text: 'Il est impossible de vivre sans échouer à quelque chose, sauf à vivre si prudemment que l’on ne vit pas du tout — auquel cas on échoue par défaut.', author: 'J.K. Rowling', note: 'Discours de Harvard, 2008', theme: 'perseverance' },
  { text: 'Nos plus grandes gloires ne tiennent pas à ne jamais tomber, mais à nous relever chaque fois que nous tombons.', author: 'Confucius', attributed: true, theme: 'perseverance' },
  { text: 'Celui qui a commis une erreur et ne la corrige pas en commet une seconde.', author: 'Confucius', note: 'Entretiens (Analectes), XV', theme: 'perseverance' },
  { text: 'Apprendre sans réfléchir est vain ; réfléchir sans apprendre est dangereux.', author: 'Confucius', note: 'Entretiens (Analectes), II, 15', theme: 'savoir' },
  { text: 'L’homme qui déplace une montagne commence par déplacer de petites pierres.', author: 'Proverbe chinois', theme: 'perseverance' },
  { text: 'Un voyage de mille lieues commence toujours par un premier pas.', author: 'Lao Tseu', note: 'Tao Te King, chap. 64', theme: 'courage' },
  { text: 'Celui qui sait vaincre les autres est fort ; celui qui se vainc lui-même est puissant.', author: 'Lao Tseu', note: 'Tao Te King, chap. 33', theme: 'discipline' },
  { text: 'La chute n’est pas un échec. L’échec, c’est de rester là où on est tombé.', author: 'Socrate', attributed: true, theme: 'perseverance' },
  { text: 'Notre plus grande faiblesse réside dans l’abandon. La façon la plus sûre de réussir est d’essayer une fois de plus.', author: 'Thomas Edison', attributed: true, theme: 'perseverance' },
  { text: 'Je n’ai pas échoué. J’ai simplement trouvé dix mille solutions qui ne fonctionnent pas.', author: 'Thomas Edison', attributed: true, theme: 'perseverance' },
  { text: 'Beaucoup des échecs de la vie sont le fait de gens qui n’ont pas réalisé à quel point ils étaient proches du succès quand ils ont abandonné.', author: 'Thomas Edison', attributed: true, theme: 'perseverance' },
  { text: 'Rien au monde ne remplace la persévérance. Le talent ne le fait pas : rien n’est plus commun que des hommes de talent sans succès.', author: 'Calvin Coolidge', attributed: true, theme: 'perseverance' },
  { text: 'Le succès, c’est tomber sept fois et se relever huit.', author: 'Proverbe japonais', theme: 'perseverance' },
  { text: 'Les rivières savent bien qu’il n’y a pas de hâte à avoir : nous y arriverons un jour.', author: 'A.A. Milne', note: 'Winnie l’Ourson', theme: 'calme' },
  { text: 'Quand tu traverses l’enfer, continue d’avancer.', author: 'Winston Churchill', attributed: true, theme: 'perseverance' },
  { text: 'Jamais, jamais, jamais ne cédez — sauf aux convictions de l’honneur et du bon sens.', author: 'Winston Churchill', note: 'Discours à Harrow School, 1941', theme: 'perseverance' },
  { text: 'Le pessimiste voit la difficulté dans chaque opportunité ; l’optimiste voit l’opportunité dans chaque difficulté.', author: 'Winston Churchill', attributed: true, theme: 'calme' },
  { text: 'Ce ne sont pas les montagnes à conquérir qui nous épuisent, mais le grain de sable dans la chaussure.', author: 'Muhammad Ali', attributed: true, theme: 'perseverance' },
  { text: 'Le champion se révèle dans les profondeurs, quand plus personne ne regarde.', author: 'Muhammad Ali', attributed: true, theme: 'discipline' },
  { text: 'Vole comme le papillon, pique comme l’abeille.', author: 'Muhammad Ali', note: 'Formule de Drew Bundini Brown, adoptée par Ali', theme: 'courage' },
  { text: 'La différence entre le possible et l’impossible se trouve dans la détermination.', author: 'Tommy Lasorda', attributed: true, theme: 'perseverance' },
  { text: 'La dureté du granit ne résiste pas à la persévérance de l’eau.', author: 'Proverbe chinois', theme: 'perseverance' },
  { text: 'À cœur vaillant, rien d’impossible.', author: 'Jacques Cœur', note: 'Devise personnelle', theme: 'courage' },
  { text: 'Qui n’avance pas recule.', author: 'Proverbe français', theme: 'perseverance' },
  { text: 'Rome ne s’est pas faite en un jour.', author: 'Proverbe français', theme: 'perseverance' },
  { text: 'L’eau qui tombe goutte à goutte finit par percer le rocher le plus dur.', author: 'Lucrèce', note: 'De la nature des choses', theme: 'perseverance' },
  { text: 'Nous devons accepter les déceptions passagères, mais conserver l’espoir pour l’éternité.', author: 'Martin Luther King Jr.', note: 'Discours et sermons', theme: 'perseverance' },
  { text: 'Si tu ne peux pas voler, cours ; si tu ne peux pas courir, marche ; si tu ne peux pas marcher, rampe. Mais quoi que tu fasses, continue d’avancer.', author: 'Martin Luther King Jr.', note: 'Discours au Spelman College, 1960', theme: 'perseverance' },
  { text: 'La mesure ultime d’un homme n’est pas où il se tient dans les moments de confort, mais où il se tient dans les moments de défi et de controverse.', author: 'Martin Luther King Jr.', note: 'Strength to Love, 1963', theme: 'courage' },
  { text: 'L’éducation est l’arme la plus puissante qu’on puisse utiliser pour changer le monde.', author: 'Nelson Mandela', note: 'Discours de Madison Park, 1990', theme: 'savoir' },
  { text: 'Je suis le maître de mon destin, je suis le capitaine de mon âme.', author: 'William Ernest Henley', note: 'Invictus, 1888', theme: 'courage' },
  { text: 'Sous les coups de massue du sort, ma tête saigne, mais reste droite.', author: 'William Ernest Henley', note: 'Invictus, 1888', theme: 'perseverance' },
  { text: 'Tout vient à point à qui sait attendre.', author: 'Proverbe français', theme: 'calme' },
  { text: 'Le monde déteste le changement, c’est pourtant la seule chose qui lui a permis de progresser.', author: 'Charles Kettering', attributed: true, theme: 'courage' },
  { text: 'Il n’existe que deux façons de vivre sa vie : l’une en faisant comme si rien n’était un miracle, l’autre en faisant comme si tout était un miracle.', author: 'Albert Einstein', attributed: true, theme: 'calme' },
  { text: 'L’imagination est plus importante que le savoir. Le savoir est limité ; l’imagination embrasse le monde.', author: 'Albert Einstein', note: 'Entretien, Saturday Evening Post, 1929', theme: 'savoir' },
  { text: 'La vie, c’est comme une bicyclette : il faut avancer pour ne pas perdre l’équilibre.', author: 'Albert Einstein', note: 'Lettre à son fils Eduard, 1930', theme: 'perseverance' },
  { text: 'Au milieu de la difficulté se trouve l’opportunité.', author: 'Albert Einstein', attributed: true, theme: 'perseverance' },

  // ------------------------------------------------ Calme & recul
  { text: 'Nous souffrons plus souvent en imagination qu’en réalité.', author: 'Sénèque', note: 'Lettres à Lucilius, 13', theme: 'calme' },
  { text: 'La plus grande partie de nos maux est de notre propre fabrication.', author: 'Sénèque', note: 'Lettres à Lucilius', theme: 'calme' },
  { text: 'Hâte-toi de bien vivre et songe que chaque jour est à lui seul une vie.', author: 'Sénèque', note: 'Lettres à Lucilius, 101', theme: 'calme' },
  { text: 'Ce n’est pas que nous disposons de peu de temps, c’est que nous en perdons beaucoup.', author: 'Sénèque', note: 'De la brièveté de la vie', theme: 'discipline' },
  { text: 'Ils perdent le jour dans l’attente de la nuit, et la nuit dans la crainte du jour.', author: 'Sénèque', note: 'De la brièveté de la vie', theme: 'calme' },
  { text: 'Ce qui trouble les hommes, ce ne sont pas les choses, mais les jugements qu’ils portent sur les choses.', author: 'Épictète', note: 'Manuel, V', theme: 'calme' },
  { text: 'Il y a ce qui dépend de nous et ce qui ne dépend pas de nous.', author: 'Épictète', note: 'Manuel, I', theme: 'calme' },
  { text: 'Ne demande pas que les choses arrivent comme tu veux, mais veuille qu’elles arrivent comme elles arrivent, et tu seras heureux.', author: 'Épictète', note: 'Manuel, VIII', theme: 'calme' },
  { text: 'Supporte et abstiens-toi.', author: 'Épictète', note: 'Devise rapportée par Aulu-Gelle', theme: 'discipline' },
  { text: 'C’est un signe de médiocrité que de blâmer les autres ; l’homme qui commence à s’instruire s’en prend à lui-même ; l’homme instruit ne s’en prend ni aux autres ni à lui-même.', author: 'Épictète', note: 'Manuel, V', theme: 'savoir' },
  { text: 'Tu as pouvoir sur ton esprit, pas sur les événements extérieurs. Réalise cela, et tu trouveras la force.', author: 'Marc Aurèle', note: 'Pensées pour moi-même', theme: 'calme' },
  { text: 'La perfection du caractère consiste à vivre chaque jour comme s’il était le dernier, sans fièvre, sans paresse, sans comédie.', author: 'Marc Aurèle', note: 'Pensées pour moi-même, VII, 69', theme: 'calme' },
  { text: 'Que la force me soit donnée de supporter ce qui ne peut être changé.', author: 'Marc Aurèle', attributed: true, theme: 'calme' },
  { text: 'Ne te comporte pas comme si tu devais vivre dix mille ans. Pendant que tu vis, pendant que tu le peux, deviens bon.', author: 'Marc Aurèle', note: 'Pensées pour moi-même, IV, 17', theme: 'courage' },
  { text: 'L’obstacle sur le chemin devient le chemin.', author: 'Marc Aurèle', note: 'D’après Pensées, V, 20', theme: 'perseverance' },
  { text: 'Très peu de choses sont nécessaires pour rendre une vie heureuse : tout est en toi, dans ta manière de penser.', author: 'Marc Aurèle', note: 'Pensées pour moi-même, VII, 67', theme: 'calme' },
  { text: 'Regarde en toi. C’est en toi qu’est la source du bien, et elle peut jaillir sans cesse, si tu creuses toujours.', author: 'Marc Aurèle', note: 'Pensées pour moi-même, VII, 59', theme: 'calme' },
  { text: 'Chaque matin, dis-toi : aujourd’hui je rencontrerai un indiscret, un ingrat, un envieux. Ils sont ainsi parce qu’ils ignorent le bien et le mal.', author: 'Marc Aurèle', note: 'Pensées pour moi-même, II, 1', theme: 'calme' },
  { text: 'Celui qui craint de souffrir souffre déjà de ce qu’il craint.', author: 'Michel de Montaigne', note: 'Essais, III, 13', theme: 'calme' },
  { text: 'Ma vie a été remplie de terribles malheurs, dont la plupart ne se sont jamais produits.', author: 'Michel de Montaigne', note: 'D’après Essais, formule popularisée', attributed: true, theme: 'calme' },
  { text: 'La plus grande chose du monde, c’est de savoir être à soi.', author: 'Michel de Montaigne', note: 'Essais, I, 39', theme: 'calme' },
  { text: 'Il faut avoir beaucoup étudié pour savoir peu.', author: 'Montesquieu', note: 'Pensées', theme: 'savoir' },
  { text: 'Le bonheur n’est pas chose aisée : il est très difficile de le trouver en nous, impossible de le trouver ailleurs.', author: 'Chamfort', note: 'Maximes et pensées', theme: 'calme' },
  { text: 'Tout le malheur des hommes vient d’une seule chose, qui est de ne savoir pas demeurer en repos dans une chambre.', author: 'Blaise Pascal', note: 'Pensées', theme: 'calme' },
  { text: 'Le cœur a ses raisons que la raison ne connaît point.', author: 'Blaise Pascal', note: 'Pensées', theme: 'calme' },
  { text: 'L’homme n’est qu’un roseau, le plus faible de la nature ; mais c’est un roseau pensant.', author: 'Blaise Pascal', note: 'Pensées', theme: 'savoir' },
  { text: 'Le pessimisme est d’humeur ; l’optimisme est de volonté.', author: 'Alain', note: 'Propos sur le bonheur, 1913', theme: 'calme' },
  { text: 'Il faut jurer d’être heureux, et s’y tenir.', author: 'Alain', note: 'Propos sur le bonheur', theme: 'calme' },
  { text: 'Le secret de l’action, c’est de s’y mettre.', author: 'Alain', note: 'Propos', theme: 'courage' },
  { text: 'Savoir s’étonner à propos est le premier pas fait sur la route de la découverte.', author: 'Louis Pasteur', attributed: true, theme: 'savoir' },
  { text: 'La sérénité est le partage des âmes préparées.', author: 'Joseph Joubert', note: 'Pensées', attributed: true, theme: 'calme' },
  { text: 'Respire. Ce n’est qu’une mauvaise journée, pas une mauvaise vie.', author: 'Proverbe populaire', theme: 'calme' },
  { text: 'Après la pluie, le beau temps.', author: 'Proverbe français', theme: 'calme' },
  { text: 'La nuit porte conseil.', author: 'Proverbe français', theme: 'calme' },
  { text: 'Il n’y a pas de problème, il n’y a que des professeurs.', author: 'Proverbe zen', theme: 'savoir' },
  { text: 'Assieds-toi au bord de la rivière et attends : le corps de ton ennemi finira par passer.', author: 'Proverbe attribué à Lao Tseu', attributed: true, theme: 'calme' },
  { text: 'Quand tu bois de l’eau, pense à la source.', author: 'Proverbe chinois', theme: 'calme' },
  { text: 'Un esprit calme apporte une force intérieure et une confiance en soi ; c’est très important pour la santé.', author: 'Dalaï-lama', note: 'Entretiens', theme: 'calme' },
  { text: 'Le sommeil est la moitié de la santé.', author: 'Proverbe français', theme: 'calme' },
  { text: 'Rien ne sert de courir ; il faut partir à point.', author: 'Jean de La Fontaine', note: 'Le Lièvre et la Tortue', theme: 'calme' },
  { text: 'Patience et longueur de temps font plus que force ni que rage.', author: 'Jean de La Fontaine', note: 'Le Lion et le Rat', theme: 'perseverance' },
  { text: 'Aide-toi, le ciel t’aidera.', author: 'Jean de La Fontaine', note: 'Le Chartier embourbé', theme: 'courage' },
  { text: 'Sur les ailes du temps, la tristesse s’envole.', author: 'Jean de La Fontaine', note: 'La Jeune Veuve', theme: 'calme' },
  { text: 'Un cœur tranquille est la vie du corps.', author: 'Livre des Proverbes', note: 'Proverbes 14, 30', theme: 'calme' },
  { text: 'À chaque jour suffit sa peine.', author: 'Évangile selon Matthieu', note: 'Matthieu 6, 34', theme: 'calme' },

  // ------------------------------------------------ Apprendre & comprendre
  { text: 'Je sais que je ne sais rien.', author: 'Socrate', note: 'D’après Platon, Apologie de Socrate', theme: 'savoir' },
  { text: 'Une vie sans examen ne vaut pas la peine d’être vécue.', author: 'Socrate', note: 'Platon, Apologie de Socrate', theme: 'savoir' },
  { text: 'Connais-toi toi-même.', author: 'Inscription du temple de Delphes', note: 'Reprise par Socrate', theme: 'savoir' },
  { text: 'L’éducation est un ornement dans la prospérité et un refuge dans l’adversité.', author: 'Aristote', note: 'Rapporté par Diogène Laërce', theme: 'savoir' },
  { text: 'Le doute est le commencement de la sagesse.', author: 'Aristote', attributed: true, theme: 'savoir' },
  { text: 'Les racines de l’éducation sont amères, mais ses fruits sont doux.', author: 'Aristote', note: 'Rapporté par Diogène Laërce', theme: 'savoir' },
  { text: 'Il n’y a qu’un bien, le savoir, et qu’un mal, l’ignorance.', author: 'Socrate', note: 'Rapporté par Diogène Laërce', theme: 'savoir' },
  { text: 'On apprend en enseignant.', author: 'Sénèque', note: 'Docendo discimus — Lettres à Lucilius, 7', theme: 'savoir' },
  { text: 'Ce n’est pas pour l’école, mais pour la vie que nous apprenons.', author: 'Sénèque', note: 'Non scholae sed vitae discimus — d’après Lettres, 106', theme: 'savoir' },
  { text: 'Mieux vaut une tête bien faite qu’une tête bien pleine.', author: 'Michel de Montaigne', note: 'Essais, I, 26', theme: 'savoir' },
  { text: 'Savoir par cœur n’est pas savoir : c’est tenir ce qu’on a donné en garde à sa mémoire.', author: 'Michel de Montaigne', note: 'Essais, I, 26', theme: 'savoir' },
  { text: 'Il vaut mieux savoir peu de choses avec justesse que beaucoup avec confusion.', author: 'Anatole France', attributed: true, theme: 'savoir' },
  { text: 'Ne cherchez pas à devenir un homme qui a du succès, mais plutôt un homme qui a de la valeur.', author: 'Albert Einstein', note: 'Entretien, Life, 1955', theme: 'savoir' },
  { text: 'Le premier principe est de ne pas vous tromper vous-même — et vous êtes la personne la plus facile à tromper.', author: 'Richard Feynman', note: 'Discours de Caltech, 1974', theme: 'savoir' },
  { text: 'Ce que je ne peux pas créer, je ne le comprends pas.', author: 'Richard Feynman', note: 'Tableau noir de Caltech, 1988', theme: 'savoir' },
  { text: 'Étudie dur ce qui t’intéresse le plus, de la façon la plus indisciplinée, irrévérencieuse et originale possible.', author: 'Richard Feynman', note: 'Lettre à un étudiant', theme: 'savoir' },
  { text: 'Tout homme peut être, s’il se le propose, le sculpteur de son propre cerveau.', author: 'Santiago Ramón y Cajal', note: 'Règles et conseils sur l’investigation scientifique, 1897', theme: 'savoir' },
  { text: 'Les idées ne durent pas. Il faut en faire quelque chose.', author: 'Santiago Ramón y Cajal', note: 'Règles et conseils sur l’investigation scientifique', theme: 'courage' },
  { text: 'Dis-le-moi et je l’oublie ; enseigne-le-moi et je m’en souviens ; implique-moi et j’apprends.', author: 'Benjamin Franklin', attributed: true, theme: 'savoir' },
  { text: 'Un investissement dans le savoir paie toujours les meilleurs intérêts.', author: 'Benjamin Franklin', note: 'The Way to Wealth, 1758', theme: 'savoir' },
  { text: 'La connaissance s’acquiert par l’expérience, tout le reste n’est que de l’information.', author: 'Albert Einstein', attributed: true, theme: 'savoir' },
  { text: 'La science, mon garçon, est faite d’erreurs, mais d’erreurs qu’il est bon de commettre, car elles mènent peu à peu à la vérité.', author: 'Jules Verne', note: 'Voyage au centre de la Terre', theme: 'savoir' },
  { text: 'Lire, c’est voyager ; voyager, c’est lire.', author: 'Victor Hugo', attributed: true, theme: 'savoir' },
  { text: 'Celui qui ouvre une porte d’école ferme une prison.', author: 'Victor Hugo', attributed: true, theme: 'savoir' },
  { text: 'La lumière est dans le livre. Ouvrez le livre tout grand. Laissez-le rayonner, laissez-le faire.', author: 'Victor Hugo', note: 'Discours d’ouverture du Congrès littéraire international, 1878', theme: 'savoir' },
  { text: 'Apprendre, c’est se retrouver.', author: 'Malcolm de Chazal', attributed: true, theme: 'savoir' },
  { text: 'Tout ce que je sais, c’est que je ne suis pas encore arrivé au bout de ce que je peux apprendre.', author: 'Michael Faraday', attributed: true, theme: 'savoir' },
  { text: 'L’étude a été pour moi le souverain remède contre les dégoûts de la vie.', author: 'Montesquieu', note: 'Pensées', theme: 'savoir' },
  { text: 'Le vrai peut quelquefois n’être pas vraisemblable.', author: 'Nicolas Boileau', note: 'L’Art poétique, chant III', theme: 'savoir' },
  { text: 'Ce que l’on conçoit bien s’énonce clairement, et les mots pour le dire arrivent aisément.', author: 'Nicolas Boileau', note: 'L’Art poétique, chant I', theme: 'savoir' },
  { text: 'La véritable école du commandement est la culture générale.', author: 'Charles de Gaulle', note: 'Vers l’armée de métier, 1934', theme: 'savoir' },
  { text: 'Rien ne développe l’intelligence comme le voyage.', author: 'Émile Zola', attributed: true, theme: 'savoir' },
  { text: 'Qui néglige de se perfectionner se détériore.', author: 'Proverbe latin', theme: 'discipline' },
  { text: 'Les mots qui restent sont ceux qu’on a compris.', author: 'Proverbe populaire', theme: 'savoir' },
  { text: 'Écouter, c’est apprendre deux fois.', author: 'Proverbe populaire', theme: 'savoir' },
  { text: 'Qui enseigne apprend deux fois.', author: 'Joseph Joubert', note: 'Pensées', theme: 'savoir' },
  { text: 'Enseigner, c’est apprendre deux fois.', author: 'Joseph Joubert', note: 'Pensées, 1842', theme: 'savoir' },
  { text: 'La mémoire est la sentinelle de l’esprit.', author: 'William Shakespeare', note: 'Macbeth', theme: 'savoir' },
  { text: 'Nous savons ce que nous sommes, mais nous ne savons pas ce que nous pouvons être.', author: 'William Shakespeare', note: 'Hamlet, IV, 5', theme: 'courage' },
  { text: 'Le savoir que l’on ne complète pas chaque jour diminue chaque jour.', author: 'Proverbe chinois', theme: 'savoir' },
  { text: 'L’encre la plus pâle vaut mieux que la meilleure mémoire.', author: 'Proverbe chinois', theme: 'savoir' },
  { text: 'J’entends et j’oublie. Je vois et je me souviens. Je fais et je comprends.', author: 'Proverbe chinois', note: 'Souvent attribué à Confucius', theme: 'savoir' },

  // ------------------------------------------------ Science & médecine
  { text: 'La vie est courte, l’art est long, l’occasion fugitive, l’expérience trompeuse, le jugement difficile.', author: 'Hippocrate', note: 'Aphorismes, I, 1', theme: 'medecine' },
  { text: 'Que ton aliment soit ta première médecine.', author: 'Hippocrate', attributed: true, theme: 'medecine' },
  { text: 'D’abord, ne pas nuire.', author: 'Hippocrate', note: 'Primum non nocere — d’après Épidémies, I', theme: 'medecine' },
  { text: 'Je le pansai, Dieu le guérit.', author: 'Ambroise Paré', note: 'Devise du chirurgien', theme: 'medecine' },
  { text: 'Guérir parfois, soulager souvent, consoler toujours.', author: 'Adage médical', note: 'Popularisé autour d’Edward Trudeau', theme: 'medecine' },
  { text: 'L’art de la médecine consiste à distraire le malade pendant que la nature le guérit.', author: 'Voltaire', attributed: true, theme: 'medecine' },
  { text: 'L’expérimentateur qui ne sait pas ce qu’il cherche ne comprend pas ce qu’il trouve.', author: 'Claude Bernard', note: 'Introduction à l’étude de la médecine expérimentale, 1865', theme: 'medecine' },
  { text: 'Le doute est le commencement de la sagesse scientifique.', author: 'Claude Bernard', note: 'Introduction à l’étude de la médecine expérimentale', theme: 'medecine' },
  { text: 'L’art, c’est moi ; la science, c’est nous.', author: 'Claude Bernard', note: 'Introduction à l’étude de la médecine expérimentale', theme: 'medecine' },
  { text: 'Il faut avoir la foi qui cherche la preuve, et non la preuve qui dispense de chercher.', author: 'Claude Bernard', attributed: true, theme: 'medecine' },
  { text: 'La médecine est une science des pannes : celles du corps humain.', author: 'François Jacob', note: 'La Statue intérieure', theme: 'medecine' },
  { text: 'Rien dans la vie n’est à craindre, tout est à comprendre. C’est maintenant le moment de comprendre davantage, afin de craindre moins.', author: 'Marie Curie', attributed: true, theme: 'medecine' },
  { text: 'Je fais partie de ceux qui pensent que la science a une grande beauté.', author: 'Marie Curie', note: 'Discours, 1933', theme: 'medecine' },
  { text: 'Soyez moins curieux des personnes et plus curieux des idées.', author: 'Marie Curie', note: 'Propos rapportés par Ève Curie', theme: 'savoir' },
  { text: 'On ne fait jamais attention à ce qui a été fait ; on ne voit que ce qui reste à faire.', author: 'Marie Curie', note: 'Lettre à son frère, 1894', theme: 'perseverance' },
  { text: 'La science est la seule vraie guide de la vie.', author: 'Mustafa Kemal Atatürk', note: 'Discours, 1924', theme: 'medecine' },
  { text: 'Écoutez le patient : il vous donne le diagnostic.', author: 'William Osler', note: 'Aphorisme d’enseignement clinique', theme: 'medecine' },
  { text: 'La médecine s’apprend au lit du malade, non dans l’amphithéâtre.', author: 'William Osler', note: 'Aphorismes', theme: 'medecine' },
  { text: 'Celui qui étudie la médecine sans livres navigue sur une mer inconnue ; celui qui l’étudie sans malades ne prend jamais la mer.', author: 'William Osler', note: 'Books and Men, 1901', theme: 'medecine' },
  { text: 'Faites la chose ordinaire de façon extraordinaire.', author: 'William Osler', attributed: true, theme: 'discipline' },
  { text: 'Le meilleur médecin est celui qui sait inspirer l’espérance.', author: 'Samuel Taylor Coleridge', attributed: true, theme: 'medecine' },
  { text: 'Là où l’on aime l’art de la médecine, on aime aussi l’humanité.', author: 'Hippocrate', note: 'Préceptes', theme: 'medecine' },
  { text: 'La science n’a pas de patrie, parce que le savoir est le patrimoine de l’humanité.', author: 'Louis Pasteur', note: 'Discours d’inauguration de l’Institut Pasteur, 1888', theme: 'medecine' },
  { text: 'Jeunes gens, ne vous laissez pas atteindre par le scepticisme dénigrant et stérile. Vivez dans la sérénité des laboratoires et des bibliothèques.', author: 'Louis Pasteur', note: 'Jubilé de la Sorbonne, 1892', theme: 'medecine' },
  { text: 'Ayez le culte de l’esprit critique.', author: 'Louis Pasteur', note: 'Discours d’inauguration de l’Institut Pasteur, 1888', theme: 'savoir' },
  { text: 'Le microbe n’est rien, le terrain est tout.', author: 'Claude Bernard', note: 'Formule attribuée sur son lit de mort', attributed: true, theme: 'medecine' },
  { text: 'Observer sans idée préconçue, expérimenter avec une idée directrice.', author: 'Claude Bernard', note: 'D’après l’Introduction à la médecine expérimentale', theme: 'medecine' },
  { text: 'La théorie, c’est l’hypothèse vérifiée après qu’elle a été soumise au contrôle du raisonnement et de la critique.', author: 'Claude Bernard', note: 'Introduction à l’étude de la médecine expérimentale', theme: 'medecine' },
  { text: 'La nature ne fait rien en vain.', author: 'Aristote', note: 'Traités de biologie', theme: 'medecine' },
  { text: 'La science, dans son besoin d’achèvement comme dans son principe, s’oppose absolument à l’opinion.', author: 'Gaston Bachelard', note: 'La Formation de l’esprit scientifique, 1938', theme: 'savoir' },
  { text: 'Rien ne va de soi. Rien n’est donné. Tout est construit.', author: 'Gaston Bachelard', note: 'La Formation de l’esprit scientifique', theme: 'savoir' },
  { text: 'Deux excès : exclure la raison, n’admettre que la raison.', author: 'Blaise Pascal', note: 'Pensées', theme: 'savoir' },
  { text: 'La vraie science est une ignorance qui se sait.', author: 'Michel de Montaigne', note: 'Essais, II, 12', theme: 'savoir' },
  { text: 'Science sans conscience n’est que ruine de l’âme.', author: 'François Rabelais', note: 'Pantagruel, chap. VIII', theme: 'medecine' },
  { text: 'Le corps humain est le vaisseau de l’âme ; il faut en prendre soin pour que l’âme y navigue bien.', author: 'Proverbe latin', attributed: true, theme: 'medecine' },
  { text: 'Un esprit sain dans un corps sain.', author: 'Juvénal', note: 'Mens sana in corpore sano — Satires, X', theme: 'medecine' },
  { text: 'La fatigue du corps est la santé de l’âme.', author: 'Proverbe arabe', theme: 'discipline' },
  { text: 'Qui veut voyager loin ménage sa monture.', author: 'Jean Racine', note: 'Les Plaideurs', theme: 'calme' },
  { text: 'La marche est le meilleur remède pour l’homme.', author: 'Hippocrate', attributed: true, theme: 'medecine' },
  { text: 'Toutes les grandes vérités commencent par des blasphèmes.', author: 'George Bernard Shaw', note: 'Annajanska, 1919', theme: 'savoir' },
  { text: 'Le progrès est impossible sans changement, et ceux qui ne peuvent pas changer d’avis ne peuvent rien changer.', author: 'George Bernard Shaw', note: 'Everybody’s Political What’s What, 1944', theme: 'savoir' },

  // ------------------------------------------------ Courage & action
  { text: 'Dans la vie, il n’y a pas de solutions. Il y a des forces en marche : il faut les créer, et les solutions suivent.', author: 'Antoine de Saint-Exupéry', note: 'Vol de nuit, 1931', theme: 'courage' },
  { text: 'Ce qui sauve, c’est de faire un pas. Encore un pas. C’est toujours le même pas que l’on recommence.', author: 'Antoine de Saint-Exupéry', note: 'Terre des hommes, 1939', theme: 'perseverance' },
  { text: 'L’avenir, tu n’as point à le prévoir, mais à le permettre.', author: 'Antoine de Saint-Exupéry', note: 'Citadelle', theme: 'courage' },
  { text: 'On ne voit bien qu’avec le cœur. L’essentiel est invisible pour les yeux.', author: 'Antoine de Saint-Exupéry', note: 'Le Petit Prince, 1943', theme: 'calme' },
  { text: 'La perfection est atteinte, non pas lorsqu’il n’y a plus rien à ajouter, mais lorsqu’il n’y a plus rien à retirer.', author: 'Antoine de Saint-Exupéry', note: 'Terre des hommes', theme: 'savoir' },
  { text: 'Le courage n’est pas l’absence de peur, mais la capacité de la vaincre.', author: 'Nelson Mandela', note: 'Un long chemin vers la liberté, 1994', theme: 'courage' },
  { text: 'Oser, le progrès est à ce prix.', author: 'Victor Hugo', note: 'Les Misérables', theme: 'courage' },
  { text: 'L’audace réussit à ceux qui savent profiter des occasions.', author: 'Marcel Proust', note: 'À la recherche du temps perdu', theme: 'courage' },
  { text: 'Il faut oser ou se résigner à tout.', author: 'Tite-Live', note: 'Histoire romaine', theme: 'courage' },
  { text: 'La fortune sourit aux audacieux.', author: 'Virgile', note: 'Audentes fortuna juvat — Énéide, X', theme: 'courage' },
  { text: 'Ils peuvent parce qu’ils croient pouvoir.', author: 'Virgile', note: 'Possunt quia posse videntur — Énéide, V', theme: 'courage' },
  { text: 'Osez, et vous verrez que les dieux aident les audacieux.', author: 'Ovide', note: 'Métamorphoses', theme: 'courage' },
  { text: 'Le monde appartient à ceux qui osent.', author: 'Proverbe populaire', theme: 'courage' },
  { text: 'Qui ne tente rien n’a rien.', author: 'Proverbe français', theme: 'courage' },
  { text: 'Vingt fois sur le métier, l’audace paie mieux que l’attente.', author: 'Proverbe populaire', theme: 'courage' },
  { text: 'Va au bout de tes rêves — commence par aller au bout de tes journées.', author: 'Proverbe populaire', theme: 'discipline' },
  { text: 'Le courage croît en osant et la peur en hésitant.', author: 'Proverbe latin', theme: 'courage' },
  { text: 'Fais ce que tu peux, avec ce que tu as, là où tu es.', author: 'Theodore Roosevelt', note: 'Autobiographie, 1913', theme: 'courage' },
  { text: 'Commence là où tu es. Utilise ce que tu as. Fais ce que tu peux.', author: 'Arthur Ashe', attributed: true, theme: 'courage' },
  { text: 'Que tu penses en être capable ou non, dans les deux cas tu as raison.', author: 'Henry Ford', attributed: true, theme: 'courage' },
  { text: 'Fais de ta vie un rêve, et d’un rêve, une réalité.', author: 'Antoine de Saint-Exupéry', attributed: true, theme: 'courage' },
  { text: 'Ce n’est pas le critique qui compte. Le mérite appartient à celui qui est réellement dans l’arène.', author: 'Theodore Roosevelt', note: 'Discours de la Sorbonne, 1910', theme: 'courage' },
  { text: 'Regarde toujours du côté du soleil et les ombres tomberont derrière toi.', author: 'Walt Whitman', attributed: true, theme: 'calme' },
  { text: 'Deux routes divergeaient dans un bois ; j’ai pris la moins fréquentée, et cela a fait toute la différence.', author: 'Robert Frost', note: 'The Road Not Taken, 1916', theme: 'courage' },
  { text: 'La seule chose dont nous devons avoir peur est la peur elle-même.', author: 'Franklin D. Roosevelt', note: 'Discours d’investiture, 1933', theme: 'courage' },
  { text: 'On ne découvre pas de nouvelles terres sans consentir à perdre de vue le rivage.', author: 'André Gide', note: 'Les Faux-Monnayeurs', theme: 'courage' },
  { text: 'Toutes choses sont dites déjà ; mais comme personne n’écoute, il faut toujours recommencer.', author: 'André Gide', note: 'Le Traité du Narcisse', theme: 'perseverance' },
  { text: 'Crois ceux qui cherchent la vérité, doute de ceux qui la trouvent.', author: 'André Gide', note: 'Ainsi soit-il', theme: 'savoir' },
  { text: 'Il vaut mieux allumer une bougie que maudire l’obscurité.', author: 'Proverbe chinois', theme: 'courage' },
  { text: 'Le succès c’est d’avoir le courage de ses propres commencements.', author: 'Proverbe populaire', theme: 'courage' },
  { text: 'Nos doutes sont des traîtres : ils nous font perdre le bien que nous pourrions gagner, par peur d’essayer.', author: 'William Shakespeare', note: 'Mesure pour mesure, I, 4', theme: 'courage' },
  { text: 'Être prêt, c’est tout.', author: 'William Shakespeare', note: 'Hamlet, V, 2 — « The readiness is all »', theme: 'calme' },
  { text: 'Agis avant de parler, et parle selon tes actes.', author: 'Confucius', note: 'Entretiens (Analectes), II, 13', theme: 'courage' },
  { text: 'Voir ce qui est juste et ne pas le faire est un manque de courage.', author: 'Confucius', note: 'Entretiens (Analectes), II, 24', theme: 'courage' },
  { text: 'La gloire n’est pas de ne jamais tomber, mais de se relever à chaque chute.', author: 'Proverbe chinois', theme: 'perseverance' },
  { text: 'Si tu veux quelque chose que tu n’as jamais eu, fais quelque chose que tu n’as jamais fait.', author: 'Proverbe populaire', theme: 'courage' },
  { text: 'Un problème sans solution est un problème mal posé.', author: 'Albert Einstein', attributed: true, theme: 'savoir' },
  { text: 'Reste affamé, reste fou.', author: 'Steve Jobs', note: 'Discours de Stanford, 2005 — reprenant le Whole Earth Catalog', theme: 'courage' },
  { text: 'Votre temps est limité ; ne le gâchez pas à vivre la vie de quelqu’un d’autre.', author: 'Steve Jobs', note: 'Discours de Stanford, 2005', theme: 'courage' },
  { text: 'On ne peut relier les points qu’en regardant en arrière ; il faut donc faire confiance au fait qu’ils se relieront un jour.', author: 'Steve Jobs', note: 'Discours de Stanford, 2005', theme: 'calme' },
  { text: 'La façon la plus simple de commencer est d’arrêter de parler et de se mettre à faire.', author: 'Walt Disney', attributed: true, theme: 'courage' },
  { text: 'Si tu peux le rêver, tu peux le faire.', author: 'Walt Disney', attributed: true, theme: 'courage' },
  { text: 'Tout ce que tu peux faire, ou rêver de faire, commence-le. L’audace a du génie, du pouvoir et de la magie.', author: 'John Anster', note: 'Traduction libre de Faust, souvent attribuée à Goethe', theme: 'courage' },
  { text: 'Qui trop délibère perd l’occasion d’agir.', author: 'Publilius Syrus', note: 'Sentences', theme: 'courage' },
  { text: 'La pratique est le meilleur des maîtres.', author: 'Publilius Syrus', note: 'Sentences', theme: 'discipline' },
  { text: 'Chaque jour est une petite vie.', author: 'Arthur Schopenhauer', note: 'Aphorismes sur la sagesse dans la vie', theme: 'calme' },
  { text: 'Le destin bat les cartes, mais c’est nous qui les jouons.', author: 'Arthur Schopenhauer', note: 'Aphorismes sur la sagesse dans la vie', theme: 'courage' },
  { text: 'Deviens ce que tu es.', author: 'Friedrich Nietzsche', note: 'D’après Pindare — Le Gai Savoir', theme: 'courage' },
  { text: 'Ce qui ne me tue pas me rend plus fort.', author: 'Friedrich Nietzsche', note: 'Le Crépuscule des idoles, 1888', theme: 'perseverance' },
  { text: 'Celui qui a un pourquoi qui lui tient lieu de but peut vivre avec n’importe quel comment.', author: 'Friedrich Nietzsche', note: 'Le Crépuscule des idoles — cité par Viktor Frankl', theme: 'perseverance' },
  { text: 'Il faut porter du chaos en soi pour accoucher d’une étoile qui danse.', author: 'Friedrich Nietzsche', note: 'Ainsi parlait Zarathoustra', theme: 'courage' },
  { text: 'Tout ce qui est fait par amour se fait au-delà du bien et du mal.', author: 'Friedrich Nietzsche', note: 'Par-delà bien et mal', theme: 'calme' },
  { text: 'Entre le stimulus et la réponse, il y a un espace. Dans cet espace se trouve notre pouvoir de choisir notre réponse.', author: 'Viktor Frankl', note: 'Attribué — esprit de « Découvrir un sens à sa vie »', attributed: true, theme: 'calme' },
  { text: 'Quand nous ne pouvons plus changer une situation, nous sommes mis au défi de nous changer nous-mêmes.', author: 'Viktor Frankl', note: 'Découvrir un sens à sa vie, 1946', theme: 'calme' },
  { text: 'Tout peut être retiré à un homme, sauf une chose : la dernière des libertés humaines — choisir son attitude en toutes circonstances.', author: 'Viktor Frankl', note: 'Découvrir un sens à sa vie, 1946', theme: 'courage' },
];

/** Mélange déterministe (même graine → même ordre) d'indices 0..length-1. */
export function shuffledOrder(seed: number, length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  let state = seed >>> 0;
  const next = () => {
    // xorshift32 — suffisant pour un mélange d'affichage.
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    const a = order[i]!;
    order[i] = order[j]!;
    order[j] = a;
  }
  return order;
}

/** Mélange de la banque de citations pour la rotation. */
export function shuffledQuoteOrder(seed: number): number[] {
  return shuffledOrder(seed, QUOTES.length);
}

/** Graine du jour : la rotation change chaque jour, stable dans la journée. */
export function dailySeed(date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}
