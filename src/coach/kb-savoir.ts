import type { Intent } from './kb';

/**
 * KB Savoir — la couche encyclopédie d'Axel (v3).
 * Questions factuelles sur les méthodes du corpus : durées, rythmes,
 * différences entre fiches proches, « pourquoi ça marche », vocabulaire.
 *
 * Chaque réponse est ANCRÉE dans les fiches de l'app (mêmes chiffres, mêmes
 * réglages) et renvoie vers la fiche source. Les questions matchent par
 * locutions (poids 6) : elles battent la carte d'identité générique d'une
 * fiche quand l'utilisateur pose une question précise.
 */

export const KNOWLEDGE_INTENTS: Intent[] = [
  // ============================================================ DURÉES & RYTHMES
  {
    id: 'k-duree-pomodoro',
    strong: [
      'combien de temps un pomodoro', 'duree d un pomodoro', 'pomodoro de combien',
      'combien de minutes un pomodoro', 'pomodoro combien de temps', '25 ou 50 minutes',
      'blocs de combien de temps', 'duree des blocs', 'combien de temps par bloc',
      'sessions de combien de temps',
    ],
    mood: 'happy',
    links: [{ label: 'Pomodoro / Timeboxing', to: '/methode/pomodoro' }],
    variants: [
      'Les réglages de la fiche : 25-5 (25 minutes de travail, 5 de pause) pour démarrer ou quand tu es fatigué·e, et 45-10 ou 50-10 en régime de base. Et la fiche insiste : c’est un réglage, pas une loi biologique — si tu es en plein élan à la sonnerie, finis ton raisonnement. L’essentiel n’est pas le chiffre : c’est le bloc avec une sortie observable et le téléphone hors de portée.',
      'Deux formats dans la fiche Pomodoro : le 25-5 (idéal pour vaincre l’inertie ou les jours sans énergie) et le 45-10 / 50-10 (le régime de croisière quand la concentration tient). Choisis selon ton état du moment, pas selon un dogme — et ajuste : certains cerveaux carburent en 35-7. Le minuteur intégré à la fiche gère le tempo pour toi.',
      'Réponse de la fiche : 25 minutes-5 de pause pour lancer la machine, 45-10 ou 50-10 une fois lancé·e. Deux détails qui font la différence : chaque bloc doit viser une sortie OBSERVABLE (« le schéma refait de mémoire », pas « avancer l’anat »), et la pause est une vraie pause — debout, sans écran. Sinon ce n’est pas du Pomodoro, c’est juste une horloge qui tourne.',
    ],
    also: 'Et pour les blocs : 25-5 pour démarrer, 45-10 en croisière — avec une sortie observable.',
  },
  {
    id: 'k-duree-pause',
    strong: [
      'combien de temps de pause', 'duree des pauses', 'pause de combien',
      'pauses de combien de temps', 'combien de pauses par jour', 'longueur des pauses',
      'temps de pause ideal',
    ],
    mood: 'happy',
    links: [{ label: 'Pomodoro (blocs + pauses)', to: '/methode/pomodoro' }],
    variants: [
      'Le rythme de la fiche : 5 minutes de pause après un bloc de 25, environ 10 après un bloc de 45-50. Et toutes les 3-4 séquences, une pause plus longue (20-30 minutes) avec un vrai changement d’état : bouger, manger, sortir. La règle d’or : une pause SANS écran — scroller ne repose pas l’attention, ça la change juste de propriétaire.',
      'Compte 5 à 10 minutes selon la longueur du bloc — et surtout, soigne leur CONTENU : lever les yeux au loin, marcher, boire, respirer. C’est ça qui recharge l’attention. La pause-téléphone est un piège documenté : elle stimule au lieu de reposer, et la re-concentration coûte double au retour. Blocs nets, pauses nettes.',
      'La bonne pause est courte et franche : 5-10 minutes, debout, loin des écrans. Si tu as besoin de 30 minutes pour récupérer d’un bloc de 45, le signal est ailleurs — sommeil en retard, faim, ou bloc trop dur (réduis l’unité). Et n’oublie pas la grande respiration de la journée : un vrai déjeuner et une coupure en soirée font partie du système, pas du luxe.',
    ],
    also: 'Et pour les pauses : 5-10 minutes sans écran — c’est le sans-écran qui recharge.',
  },
  {
    id: 'k-intervalles',
    strong: [
      'quels intervalles', 'les intervalles', 'quel rythme de revision',
      'tous les combien reviser', 'quand reviser un cours', 'a quelle frequence reviser',
      'j plus 1', 'espacer de combien', 'quel espacement', 'intervalles de revision',
      'calendrier de revision', 'quand faire les rappels', 'a quel rythme revoir',
    ],
    mood: 'think',
    links: [
      { label: 'Répétition espacée / FSRS', to: '/methode/repetition-espacee' },
      { label: 'Rappel différé', to: '/methode/rappel-differe' },
    ],
    variants: [
      'Le rythme artisanal du corpus : J+1, J+3, J+7, J+14 — premier rappel le lendemain, puis des reprises de plus en plus espacées, chacune au bord de l’oubli. Si tu utilises Anki, l’algorithme (FSRS) calcule ces intervalles pour toi, carte par carte — à condition de répondre honnêtement. Dans les deux cas, le principe est le même : c’est la récupération espacée qui grave, pas la relecture rapprochée.',
      'Retiens la logique plutôt que des dates magiques : chaque reprise se place juste avant que ça s’efface — demain, puis dans 3 jours, puis une semaine, puis deux. Une notion revue 5 fois ESPACÉES tient des mois ; revue 5 fois le même soir, elle tient trois jours. Même effort, résultat opposé. Et chaque « reprise » est un rappel de mémoire, jamais une relecture.',
      'Deux réponses selon ton outillage : à la main → le calendrier J+1 / J+3 / J+7 / J+14 de la fiche Répétition espacée, appliqué aux unités qui comptent ; avec Anki → laisse FSRS décider, il fait exactement ce calcul en continu. Le Rappel différé complète le dispositif : re-tester sans prévenir, sous une autre formulation — c’est le vrai verdict de la mémoire.',
    ],
    also: 'Et pour le rythme : J+1, J+3, J+7, J+14 — chaque reprise en rappel, au bord de l’oubli.',
  },
  {
    id: 'k-nombre-repetitions',
    strong: [
      'combien de fois reviser un cours', 'combien de repetitions', 'revoir combien de fois',
      'combien de fois revoir', 'nombre de revisions necessaires', 'combien de passages sur un cours',
      'combien de fois pour retenir',
    ],
    mood: 'think',
    links: [{ label: 'Répétition espacée', to: '/methode/repetition-espacee' }],
    variants: [
      'L’ordre de grandeur du corpus : autour de 5 reprises ESPACÉES (J+1, J+3, J+7, J+14, puis entretien), une notion tient des mois. Mais le nombre seul ne dit rien — cinq relectures ne valent pas une seule vraie récupération de mémoire. La bonne unité de compte : des rappels réussis espacés, pas des « passages » sur le cours.',
      'Question piège — parce que la réponse dépend du GESTE : en rappel actif espacé, 4-5 reprises installent durablement la plupart des notions ; en relecture, vingt passages laissent une familiarité trompeuse. Et certaines notions résistent plus que d’autres : celles-là méritent une carte dédiée ou une accroche mnémotechnique, pas juste « une fois de plus ».',
      'Pense couverture décroissante : la première reprise (J+1) est la plus rentable de toutes — ne la saute jamais. Les suivantes coûtent de moins en moins cher (un rappel de 2 minutes suffit souvent) et rapportent longtemps. Si au 5e passage espacé une notion ne tient toujours pas, le problème n’est plus la répétition : c’est la compréhension ou le format — change d’angle (Feynman, schéma, carte de contraste).',
    ],
    also: 'Et sur le nombre : ~5 reprises espacées en rappel — la première (J+1) est la plus rentable.',
  },
  {
    id: 'k-heures-sommeil',
    priority: 12,
    strong: [
      'combien d heures de sommeil', 'combien dormir', 'combien d heures dormir',
      'heures de sommeil necessaires', '6 heures de sommeil ca suffit',
      '7 heures de sommeil', 'dormir combien de temps',
    ],
    mood: 'care',
    links: [{ label: 'SOS Fatigue (le volet sommeil)', to: '/sos/fatigue' }],
    variants: [
      'Le repère du corpus : 7 à 8 heures, complètes et RÉGULIÈRES — c’est pendant le sommeil que le cerveau consolide ce que tu as appris dans la journée. Dormir 5-6 h pour « gagner du temps de révision », c’est apprendre plus et retenir moins : le pire échange de l’année. Et la régularité compte autant que la durée : coucher et lever stables, même le week-end à une heure près.',
      '7-8 heures pour la plupart des cerveaux — et surtout : pas de dette chronique. Une courte nuit exceptionnelle se rattrape ; des semaines à 6 h dégradent mémoire, humeur et immunité en silence. Le test honnête : si tu as besoin d’un réveil strident ET de café pour émerger tous les jours, tu es en dette. La priorité méthodo n°1 devient alors le sommeil, avant toute technique.',
      'La science derrière le chiffre : la consolidation mémorielle se joue notamment en fin de nuit — écourter systématiquement, c’est amputer précisément la phase qui grave tes cours. D’où la règle : 7-8 h non négociables en période d’apprentissage, et JAMAIS de nuit blanche avant une épreuve (un cerveau sans sommeil rend une copie vide). Les détails pratiques sont dans le SOS Fatigue.',
    ],
    also: 'Et pour le sommeil : 7-8 h régulières — c’est la nuit qui grave ce que le jour apprend.',
  },
  {
    id: 'k-pourquoi-sommeil',
    strong: [
      'pourquoi le sommeil est important', 'dormir ca sert a quoi', 'a quoi sert le sommeil',
      'le sommeil consolide', 'pourquoi dormir aide a retenir', 'lien entre sommeil et memoire',
      'sommeil et memoire',
    ],
    mood: 'think',
    links: [{ label: 'SOS Fatigue', to: '/sos/fatigue' }],
    variants: [
      'Parce que dormir EST une phase de travail : pendant la nuit, le cerveau rejoue et réorganise ce qui a été appris, transfère vers la mémoire durable, et fait le tri. C’est littéralement la séance de consolidation de ta journée — gratuite, automatique, à condition d’avoir lieu. La sauter revient à étudier puis jeter une partie du bénéfice.',
      'Trois services rendus par la nuit : consolidation (ce que tu as appris s’installe), nettoyage (le cerveau évacue ses déchets métaboliques — d’où la tête claire au réveil), et régulation émotionnelle (le stress se digère en dormant). En période de concours, tu utilises les trois à plein régime. C’est pour ça que le sommeil n’est pas du temps volé aux révisions : c’en est la deuxième moitié.',
      'L’image juste : la journée tu écris au brouillon, la nuit le cerveau recopie au propre. Pas de nuit complète = un brouillon qui s’efface partiellement. C’est aussi pour ça qu’apprendre du lourd la veille au soir tard marche mal : tu écris le brouillon et tu supprimes la mise au propre. Étudier, dormir, re-tester — c’est le cycle complet.',
    ],
    also: 'Et pourquoi dormir : la nuit recopie au propre ce que la journée a écrit au brouillon.',
  },

  // ================================================================ LE GESTE JUSTE
  {
    id: 'k-quand-se-tester',
    strong: [
      'quand se tester', 'a quel moment se tester', 'se tester tout de suite',
      'se tester juste apres', 'tester direct apres avoir lu', 'attendre avant de se tester',
      'quand faire le premier rappel',
    ],
    mood: 'think',
    links: [
      { label: 'Rappel différé', to: '/methode/rappel-differe' },
      { label: 'Rappel actif', to: '/methode/rappel-actif' },
    ],
    variants: [
      'Le tempo du corpus : un premier rappel DANS LA FOULÉE de l’apprentissage (il ancre et révèle les trous immédiats)… mais pas dans la seconde : ferme le cours, laisse passer au moins une vraie pause (~10 minutes ou une autre tâche), PUIS teste-toi. Se tester l’instant d’après mesure la mémoire immédiate, pas la vraie. Ensuite : le rappel différé — J+1 et au-delà, sans prévenir, sous une autre formulation.',
      'Trois moments, trois rôles : juste après l’étude (avec un petit délai) → vérifier que c’est structuré ; le lendemain (J+1) → le rappel le plus rentable de tous ; à distance et par surprise (rappel différé) → le seul vrai verdict. La fiche Rappel différé insiste : une réussite immédiate ne prouve rien — c’est la réussite après oubli partiel qui grave.',
      'Règle simple : chaque unité étudiée doit être récupérée de mémoire au moins une fois LE JOUR MÊME (après un délai, cours fermé), puis re-testée espacée. Le piège classique : se tester livre ouvert ou 30 secondes après lecture — la sensation de réussite est garantie, l’apprentissage non. Le léger inconfort du délai, c’est précisément le muscle qui travaille.',
    ],
    also: 'Et pour le premier test : le jour même mais après un délai — puis J+1, le plus rentable.',
  },
  {
    id: 'k-testing-effect',
    strong: [
      'c est quoi le testing effect', 'effet test', 'pourquoi le rappel actif marche',
      'pourquoi se tester marche', 'pourquoi se tester est efficace',
      'la science du rappel actif', 'preuve du rappel actif',
    ],
    mood: 'think',
    links: [
      { label: 'Rappel actif (la fiche socle)', to: '/methode/rappel-actif' },
      { label: 'Sources et niveau de preuve', to: '/reperes/sources' },
    ],
    variants: [
      'Le testing effect, c’est le résultat le plus solide de la science de l’apprentissage : l’acte de RÉCUPÉRER une information de mémoire la renforce davantage que la re-étudier. Autrement dit, le test n’est pas qu’une mesure — c’est un traitement. Chaque récupération recreuse le chemin d’accès, et c’est ce chemin qu’on te demande le jour du concours.',
      'Deux mécanismes derrière l’effet : la récupération consolide la trace (le souvenir sollicité devient plus robuste et plus accessible), et l’échec de récupération DIAGNOSTIQUE — tu sais exactement quoi retravailler, là où la relecture berce tout le monde dans la même familiarité. C’est le duo rentabilité + lucidité qui en fait la méthode socle du corpus.',
      'C’est l’effet démontré maintes fois : à temps égal, un groupe qui se teste bat un groupe qui relit — surtout à distance de plusieurs jours, exactement l’échelle de temps d’un concours. La nuance honnête de la page Sources : l’effet exige une vraie récupération (cours fermé, réponse produite), pas un survol de QCM corrigés. Le léger effort ressenti n’est pas le signe que ça marche mal — c’est le signe que ça marche.',
    ],
    also: 'Et le testing effect : récupérer renforce plus que relire — le test est un traitement.',
  },
  {
    id: 'k-courbe-oubli',
    strong: [
      'courbe de l oubli', 'c est quoi la courbe de l oubli', 'pourquoi j oublie aussi vite',
      'pourquoi on oublie', 'oublier c est normal', 'vitesse de l oubli',
    ],
    mood: 'think',
    links: [
      { label: 'Répétition espacée (la parade)', to: '/methode/repetition-espacee' },
      { label: 'Rappel différé', to: '/methode/rappel-differe' },
    ],
    variants: [
      'La courbe de l’oubli, c’est la pente naturelle de la mémoire : sans reprise, une grande partie d’un apprentissage s’efface en quelques jours — pour tout le monde, ce n’est pas un défaut personnel. La bonne nouvelle : chaque récupération espacée APLATIT la courbe. Après quelques reprises bien placées, la pente devient presque plate — c’est tout le principe de la répétition espacée.',
      'Oublier n’est pas un bug, c’est le tri par défaut du cerveau : ce qui n’est pas re-sollicité est considéré comme inutile et s’estompe. La parade n’est donc pas « mieux apprendre la première fois » (impossible de battre la courbe en une passe) mais REPASSER au bon moment — juste avant l’effacement. Chaque reprise au bord de l’oubli multiplie la durée de rétention.',
      'Deux conséquences pratiques de cette courbe : 1) la sensation de « tout oublier en une semaine » est NORMALE et prévue par le système — c’est pour ça que le calendrier J+1/J+3/J+7/J+14 existe ; 2) juger une méthode le lendemain n’a pas de sens : la mémoire se joue à deux semaines. Travaille AVEC la courbe (espacement) au lieu de la maudire.',
    ],
    also: 'Et la courbe de l’oubli : normale, universelle — et elle s’aplatit à chaque rappel espacé.',
  },
  {
    id: 'k-charge-cognitive',
    strong: [
      'charge cognitive', 'c est quoi la charge cognitive', 'memoire de travail',
      'trop d informations d un coup', 'cerveau surcharge', 'saturation mentale',
    ],
    mood: 'think',
    links: [
      { label: 'Chunking / Hiérarchisation', to: '/methode/chunking' },
      { label: 'Exemple résolu', to: '/methode/exemple-resolu' },
    ],
    variants: [
      'La charge cognitive, c’est la place limitée de ta mémoire de travail : quelques éléments à la fois, pas plus — et quand un cours en balance vingt d’un coup, ça déborde et plus rien ne s’imprime. Les parades du corpus : le chunking (regrouper en 3-7 blocs — un bloc devient UN élément), et l’exemple résolu (qui montre la solution au lieu de te faire tout tenir en tête pendant que tu cherches).',
      'Image utile : ta mémoire de travail est un plan de travail de cuisine — petit. Un cours dense y pose trop d’ingrédients en même temps, et tout tombe. Cuisiner proprement, c’est : préparer les blocs à l’avance (chunking), suivre une recette déjà rédigée au début (exemple résolu), et n’avoir qu’UNE préparation en cours (une seule unité, un seul support ouvert).',
      'C’est aussi pour ça que certaines habitudes coûtent cher sans qu’on le voie : les notifications (chaque interruption vide le plan de travail), le multi-supports (deux sources ouvertes = double charge), les phrases du prof recopiées mot à mot (transcrire sature, traiter apprend). Réduire la charge inutile — environnement, structure, un seul flux — libère la place pour la charge UTILE : comprendre et retenir.',
    ],
    also: 'Et la charge cognitive : mémoire de travail petite — chunking et un seul flux à la fois.',
  },
  {
    id: 'k-discriminant',
    strong: [
      'c est quoi le discriminant', 'discriminant roi', 'c est quoi un discriminant',
      'le detail qui tranche', 'trouver le discriminant',
    ],
    mood: 'think',
    links: [{ label: 'Tableau de contraste A/B', to: '/methode/tableau-contraste' }],
    variants: [
      'Le « discriminant roi », dans le corpus, c’est LE critère qui permet de trancher à coup sûr entre deux notions jumelles — celui qui, à lui seul, suffit à dire « c’est A, pas B ». Dans un tableau de contraste, tu alignes 3-6 dimensions qui distinguent les deux notions, puis tu élis le discriminant : c’est lui que tu récites de mémoire, lui que les QCM piègent, lui qui rapporte.',
      'Exemple du principe : deux molécules se confondent ? Compare-les ligne par ligne (localisation, fonction, régulation…), puis cherche la ligne où la différence est NETTE et toujours vraie — voilà ton discriminant. Le reste du tableau aide à comprendre ; le discriminant sert à répondre vite et juste sous pression. C’est la différence entre connaître deux fiches et savoir trancher.',
      'Pourquoi ce concept est central : les QCM ne testent presque jamais une notion isolée — ils testent la FRONTIÈRE entre deux notions proches. Ton travail n’est donc pas d’apprendre A puis B séparément, mais d’apprendre ce qui les sépare. D’où le geste : tableau de contraste, discriminant en gras, et des mini-questions « lequel des deux ? » recyclées dans tes rappels espacés.',
    ],
    also: 'Et le discriminant : LE critère qui tranche entre deux jumelles — c’est lui que les QCM testent.',
  },
  {
    id: 'k-unite-travail',
    strong: [
      'c est quoi une unite', 'unite de travail', 'c est quoi une unite de cours',
      'travailler en unites', 'compter en unites',
    ],
    mood: 'think',
    links: [{ label: 'Journée minimale (le socle en unités)', to: '/methode/journee-minimale' }],
    variants: [
      'Une unité, dans le vocabulaire du corpus, c’est un morceau de travail LOGIQUE et VALIDABLE : une définition maîtrisée, un mécanisme récité, un schéma refait de mémoire, une série de 20 QCM analysée. Pas un nombre de pages ni une durée. L’intérêt : une unité se termine et se valide (fait / pas fait), là où « 2 heures d’anat » se subissent sans preuve de résultat.',
      'C’est le changement de comptabilité qui rend les journées pilotables : au lieu de « j’ai bossé 6 heures » (qui ne dit rien de ce qui est acquis), tu comptes « 3 rappels réussis + 1 tableau de contraste + 20 QCM corrigés par cause ». Chaque unité a une sortie observable — tu sais si elle est faite. C’est aussi comme ça qu’on définit la Journée minimale : un socle de 2-3 unités, pas un volume horaire.',
      'Règle de taille : une unité doit tenir dans un bloc (25-50 minutes) et se conclure par une preuve — quelque chose d’écrit, de récité, de coché. Trop grosse (« le chapitre entier ») → elle ne finit jamais et démotive ; trop floue (« avancer ») → elle ne se valide pas. Bien taillée, elle transforme une montagne de cours en une liste de gestes finissables.',
    ],
    also: 'Et l’unité de travail : un morceau logique avec une sortie observable — validable, pas subi.',
  },
  {
    id: 'k-mode-degrade',
    strong: [
      'c est quoi le mode degrade', 'mode degrade', 'travailler en mode degrade',
      'rattraper en degrade', 'version degradee d un cours',
    ],
    mood: 'think',
    links: [
      { label: 'Triage du retard 24-72 h', to: '/methode/triage-retard' },
      { label: 'Chunking (extraire le squelette)', to: '/methode/chunking' },
    ],
    variants: [
      'Le mode dégradé, c’est la façon assumée de traiter un cours qu’on ne peut PAS travailler à fond (retard, absence, chapitre à faible poids) : squelette du cours (titres + logique générale) + QCM dessus, au lieu de la lecture intégrale. Tu couvres environ 70 % de la valeur en 30 % du temps, et les QCM te disent précisément où creuser si besoin. C’est un choix stratégique, pas une triche.',
      'Concrètement, un cours en mode dégradé se traite ainsi : 1) survol structurant — les titres, les grandes parties, la logique (20-30 minutes, pas plus) ; 2) une salve de QCM ou d’annales sur ce chapitre ; 3) retour CIBLÉ uniquement sur ce que les QCM ont révélé comme fragile et rentable. Le reste attend — peut-être pour toujours, et c’est ok si le Triage l’a décidé froidement.',
      'Pourquoi ce mode existe : en PASS, viser 100 % partout garantit 60 % partout. Le corpus assume des niveaux d’intensité — maîtrise complète pour les poids lourds, mode dégradé pour le reste, survol d’annales pour le marginal. Le mode dégradé n’est donc pas un échec de méthode : c’en est une, à part entière, avec ses étapes. La fiche Triage donne les critères pour décider qui y passe.',
    ],
    also: 'Et le mode dégradé : squelette + QCM ciblés — 70 % de la valeur en 30 % du temps.',
  },
  {
    id: 'k-codes-erreurs',
    strong: [
      'les codes de la correction', 'c est quoi les causes d erreur', 'codes d erreur',
      'classer mes erreurs', 'categories d erreurs', 'types d erreurs aux qcm',
      'c est quoi k c t l', 'les lettres de la correction',
    ],
    mood: 'think',
    links: [{ label: 'Correction par cause / Carnet d’erreurs', to: '/methode/correction-par-cause' }],
    variants: [
      'La fiche Correction par cause classe chaque erreur avec un code : K (connaissance — le cours n’était pas su), C (compréhension — su mais pas compris), T (transfert/raisonnement — compris mais mal appliqué), L (lecture — l’énoncé ou le piège de formulation), F (forme/étourderie), Tps (gestion du temps), G (guessing — bonne ou mauvaise réponse au hasard). Chaque code a SON remède — c’est tout l’intérêt : on ne « travaille pas plus », on répare la bonne pièce.',
      'Le principe des codes : une erreur K (cours pas su) se répare par du rappel espacé ; une L (mal lu) par un entraînement de lecture d’items ; une T (raisonnement) par des exemples résolus et de la variation ; une Tps par des simulations chronométrées. Mettre le bon code, c’est déjà la moitié de la correction — et ton carnet d’erreurs devient une carte précise de TES fragilités, le document le plus rentable de l’année.',
      'Détail qui change tout, dans la fiche : on code aussi les HÉSITATIONS et les bonnes réponses chanceuses (G) — pas seulement les fautes. Une bonne réponse au hasard est une erreur qui n’a pas encore eu lieu. À la colle suivante, tu relis ton carnet par code : si le même code revient en masse, c’est lui ton chantier prioritaire, pas le chapitre suivant.',
    ],
    also: 'Et les codes d’erreur : K, C, T, L, F, Tps, G — chaque cause a son remède propre.',
  },
  {
    id: 'k-regle-20-20-20',
    strong: [
      'regle 20 20 20', 'la regle des 20', 'reposer les yeux', 'pause pour les yeux',
      'yeux fatigues par l ecran', 'proteger ses yeux',
    ],
    mood: 'happy',
    links: [{ label: 'Pomodoro (caler les pauses)', to: '/methode/pomodoro' }],
    variants: [
      'La règle 20-20-20, c’est l’hygiène de base des yeux sur écran : toutes les 20 minutes, regarde quelque chose à 20 mètres (par la fenêtre, le fond de la pièce) pendant 20 secondes. Ça détend le muscle de mise au point qui, verrouillé des heures sur un écran à 40 cm, fabrique les maux de tête de fin de journée. Cale-la sur tes fins de blocs Pomodoro, c’est le rythme parfait.',
      'Simple et rentable : 20 minutes d’écran → 20 secondes de regard à 20 mètres. Ajoute les basiques : cligner volontairement (on cligne moitié moins devant un écran, d’où les yeux secs), luminosité de l’écran alignée sur la pièce, et un peu de distance (bras tendu minimum). Si malgré ça les maux de tête persistent : contrôle de la vue — sérieusement, c’est souvent ça.',
      'C’est une micro-habitude au rapport effort/gain imbattable : 20 secondes toutes les 20 minutes, et la fatigue oculaire de 18 h recule nettement. Couple-la à tes pauses de bloc (lever les yeux, regarder LOIN, marcher deux pas) et tu traites d’un coup les yeux, le dos et l’attention. Trois maintenance pour le prix d’une.',
    ],
    also: 'Et pour les yeux : toutes les 20 minutes, 20 secondes à 20 mètres.',
  },

  // ============================================================= DIFFÉRENCES
  {
    id: 'k-diff-rappel-espacee',
    strong: [
      'difference entre rappel actif et repetition espacee', 'rappel actif ou repetition espacee',
      'rappel actif et repetition espacee', 'difference rappel espacement',
      'espacement ou rappel',
    ],
    mood: 'think',
    links: [
      { label: 'Rappel actif', to: '/methode/rappel-actif' },
      { label: 'Répétition espacée', to: '/methode/repetition-espacee' },
    ],
    variants: [
      'Les deux ne se choisissent pas — ils s’emboîtent : le rappel actif est le GESTE (récupérer de mémoire, support fermé), la répétition espacée est le CALENDRIER (quand refaire ce geste : J+1, J+3, J+7…). L’un sans l’autre perd l’essentiel : des rappels non espacés s’évaporent, un espacement en relecture ne grave rien. La formule complète : rappel actif × espacement × sommeil.',
      'Réponds-toi avec une image : le rappel actif est l’exercice de musculation, la répétition espacée est le programme d’entraînement. Un bon exercice fait au hasard donne peu ; un bon programme rempli de mauvais exercices aussi. Chaque case de ton calendrier de reprise doit contenir un vrai rappel (feuille blanche, cartes, récitation) — c’est le couple qui fait la rétention long terme.',
      'Dans la pratique quotidienne : tu apprends une unité → rappel actif le jour même (le geste) → puis la même unité revient à J+1, J+3, J+7 (le calendrier), à chaque fois EN rappel, jamais en relecture. Anki automatise le calendrier (FSRS) ; la feuille blanche et le blurting incarnent le geste. Deux fiches, un seul système.',
    ],
    also: 'Et la différence : le rappel est le geste, l’espacement est le calendrier — ensemble seulement.',
  },
  {
    id: 'k-diff-feuille-blurting',
    strong: [
      'difference entre feuille blanche et blurting', 'feuille blanche ou blurting',
      'blurting ou feuille blanche', 'difference blurting feuille blanche',
    ],
    mood: 'think',
    links: [
      { label: 'Feuille blanche', to: '/methode/feuille-blanche' },
      { label: 'Blurting', to: '/methode/blurting' },
    ],
    variants: [
      'Même famille (produire de mémoire, support fermé), deux réglages : la feuille blanche est STRUCTURÉE — tu restitues un plan, un mécanisme, un tableau, proprement, puis tu compares au poly ; le blurting est la version RAPIDE et BRUTE — tu déverses très vite tout ce qui revient sur une petite section, sans mise en page, puis tu compares. La feuille blanche teste l’organisation ; le blurting débusque vite les trous.',
      'Choisis selon le moment : blurting pour un check express (5 minutes en fin d’étude, ou dans une révision rapide — « qu’est-ce qui me revient sur ce chapitre ? ») ; feuille blanche pour une vraie session de consolidation (reconstruire le squelette complet, vérifier la hiérarchie, corriger en couleur). Beaucoup enchaînent les deux : blurting pour vider, feuille blanche pour ordonner.',
      'La nuance de la fiche : le blurting s’applique à une PETITE section déjà comprise — c’est un sprint de récupération, pas un outil de structuration. Si le chapitre entier est flou, commence par la feuille blanche (ou même le chunking pour poser le squelette) ; garde le blurting pour entretenir et vérifier. Deux vitesses du même muscle.',
    ],
    also: 'Et la différence : feuille blanche = structuré et complet, blurting = rapide et brut.',
  },
  {
    id: 'k-diff-mindmap-conceptuelle',
    strong: [
      'difference entre mind map et carte conceptuelle', 'mind map ou carte conceptuelle',
      'carte mentale ou carte conceptuelle', 'difference carte mentale conceptuelle',
    ],
    mood: 'think',
    links: [
      { label: 'Mind map de mémoire', to: '/methode/mind-map' },
      { label: 'Carte conceptuelle', to: '/methode/carte-conceptuelle' },
    ],
    variants: [
      'Deux cartes, deux cibles : la mind map teste la HIÉRARCHIE d’un chapitre (le tronc, les branches, ce qui se rattache à quoi) — construite support fermé, c’est un rappel actif de la structure. La carte conceptuelle teste les RELATIONS : chaque flèche porte un verbe précis (« active », « inhibe », « mesure ») et doit se lire comme une phrase scientifique correcte. L’une organise, l’autre explique.',
      'Le critère de choix est le type de contenu : chapitre à structure arborescente (classifications, plans de cours) → mind map ; réseau de mécanismes où tout interagit (voies, régulations) → carte conceptuelle, parce que c’est le VERBE sur la flèche qui porte le savoir. Et la règle commune des deux fiches : construites DE MÉMOIRE puis vérifiées — recopiées du cours, ce sont des décorations.',
      'Attention au piège commun : les deux cartes ne valent que par leur mode de fabrication. La fiche mind map le dit crûment : « faite en copiant le cours, ce n’est plus un test — c’est de la décoration ». Donc dans les deux cas : support fermé, tu produis, tu compares, tu corriges. La différence n’est que dans ce que tu produis : une arborescence (mind map) ou des phrases fléchées (conceptuelle).',
    ],
    also: 'Et la différence : mind map = hiérarchie de mémoire, conceptuelle = relations avec verbes.',
  },
  {
    id: 'k-diff-contrastes',
    strong: [
      'difference entre tableau de contraste et carte contraste', 'tableau ou carte de contraste',
      'carte piege ou tableau de contraste', 'difference tableau carte contraste',
    ],
    mood: 'think',
    links: [
      { label: 'Tableau de contraste A/B', to: '/methode/tableau-contraste' },
      { label: 'Carte piège / contraste', to: '/methode/carte-contraste' },
    ],
    variants: [
      'Les deux traitent les notions jumelles, à deux étapes différentes : le TABLEAU de contraste est l’outil d’ÉTUDE — poser A et B côte à côte, 3-6 dimensions, élire le discriminant roi ; la CARTE de contraste est l’outil d’ENTRETIEN — une carte (type Anki) qui re-teste précisément ce discriminant dans le temps. D’abord on construit la frontière (tableau), ensuite on l’entretient (carte).',
      'Enchaînement type du corpus : deux notions se mélangent → séance de tableau de contraste (comprendre ce qui les sépare, souligner le critère qui tranche) → puis fabrication d’une ou deux cartes de contraste qui posent la question frontale (« qu’est-ce qui distingue A de B ? » / « ceci est-il A ou B ? ») avec au verso le discriminant + une mini-justification. Le tableau vit une séance ; la carte vit toute l’année dans tes rappels espacés.',
      'La fiche carte-contraste apporte une règle fine : la carte doit tester LE CRITÈRE QUI TRANCHE, pas re-poser deux faits séparés (deux cartes « c’est quoi A » et « c’est quoi B » n’empêchent aucune confusion). C’est exactement ce que le tableau prépare : il te fait trouver le discriminant, et la carte le transforme en question d’entraînement. Deux fiches, une seule frontière.',
    ],
    also: 'Et la différence : le tableau construit la frontière, la carte l’entretient dans le temps.',
  },

  // ================================================================= OUTILS
  {
    id: 'k-cartes-par-jour',
    strong: [
      'combien de cartes par jour', 'combien de nouvelles cartes', 'nombre de cartes par jour',
      'limite de cartes', 'cartes anki par jour', '20 nouvelles cartes',
    ],
    mood: 'think',
    links: [
      { label: 'Répétition espacée / FSRS', to: '/methode/repetition-espacee' },
      { label: 'Audit de deck', to: '/methode/audit-deck' },
    ],
    variants: [
      'La règle du corpus : une limite de nouvelles cartes BASSE et tenable — l’ordre de grandeur de 20 par jour tenu toute l’année bat 60 par jour abandonné au bout de trois semaines. Pourquoi : chaque nouvelle carte engage des révisions futures (c’est un crédit), et c’est l’accumulation des échéances qui fabrique les piles de 500 cartes qui écrasent. Peu, propre, tous les jours.',
      'Le bon chiffre dépend d’une seule chose : tes révisions dues doivent rester FAISABLES chaque jour (si tu sautes des jours, l’algorithme perd son sens et la pile explose). Commence bas (15-20 nouvelles/jour), observe une semaine, ajuste. Et surtout : n’ajoute que des cartes atomiques et comprises — une carte floue coûte dix révisions pénibles, la supprimer est souvent le meilleur geste (l’Audit de deck est là pour ça).',
      'Deux garde-fous de la fiche : ne mets en carte que ce qui mérite un entretien long terme (pas le cours entier — Anki entretient des unités ciblées, il ne remplace pas l’apprentissage), et purge sans pitié : une carte ratée 5 fois signale un problème de compréhension → retour au cours, pas une 6e répétition. Un deck sain est un deck qu’on élague.',
    ],
    also: 'Et pour Anki : ~20 nouvelles cartes par jour tenues, atomiques et comprises — et on élague.',
  },
  {
    id: 'k-fsrs',
    strong: [
      'c est quoi fsrs', 'fsrs', 'algorithme d anki', 'algorithme de repetition',
      'comment anki calcule', 'reglages anki',
    ],
    mood: 'think',
    links: [{ label: 'Répétition espacée / FSRS', to: '/methode/repetition-espacee' }],
    variants: [
      'FSRS, c’est l’algorithme moderne de planification d’Anki : pour chaque carte, il estime quand tu es sur le point d’oublier et programme la révision juste avant — exactement le principe de la répétition espacée, calculé carte par carte au lieu d’un calendrier unique. La condition de la fiche : réponds HONNÊTEMENT aux boutons (un « facile » menti fausse tout le calcul et te fait revoir trop tard).',
      'Ce qu’il faut en retenir sans plonger dans la technique : tu n’as pas à décider quand revoir — c’est précisément le travail de FSRS, et il le fait mieux qu’un calendrier manuel dès que les cartes se comptent en centaines. Ton travail à toi : des cartes propres (atomiques, comprises) et des réponses sincères. La qualité des cartes fait la qualité du planning.',
      'Le contrat avec FSRS tient en trois clauses : 1) régularité — il planifie pour quelqu’un qui ouvre l’app chaque jour, les pauses de 5 jours créent les piles monstrueuses ; 2) honnêteté — les boutons sont des données, pas des encouragements ; 3) confiance — ne « re-révise » pas manuellement ce qu’il n’a pas demandé, tu casserais l’espacement optimal. En échange, il porte le calendrier à ta place.',
    ],
    also: 'Et FSRS : il programme chaque carte juste avant l’oubli — à condition de réponses honnêtes.',
  },
  {
    id: 'k-palais-quand',
    strong: [
      'le palais mental ca marche', 'palais mental ca marche', 'quand utiliser le palais mental',
      'palais mental utile', 'methode des loci ca marche', 'palais mental pour tout',
    ],
    mood: 'think',
    links: [{ label: 'Palais mental / Méthode des loci', to: '/methode/palais-mental' }],
    variants: [
      'Oui, ça marche — la technique est ancienne et solide — mais la fiche est claire sur son vrai statut : PUISSANT MAIS COÛTEUX. Construire un palais (un trajet familier + une image interactive par étape) prend du temps ; réserve-le donc aux listes LONGUES, STABLES et vraiment importantes — pas à chaque cours. Pour une liste de 5 éléments, un acronyme ou une histoire-chaînage rend le même service en dix fois moins cher.',
      'Le bon usage : quelques palais bien choisis dans l’année (une classification lourde, une liste ordonnée à fort coefficient qui doit tenir jusqu’en juin), construits une fois, entretenus en rappels espacés. Le mauvais usage : vouloir « tout mettre en palais » — tu passerais plus de temps en architecture mentale qu’en apprentissage. Le corpus le classe dans les mnémotechniques de niche, pas dans le socle.',
      'Verdict honnête de la fiche : efficace pour les séquences arbitraires longues (l’image par lieu exploite la mémoire spatiale, très robuste), inutilement lourd pour ce qui a une LOGIQUE (un mécanisme se retient par sa chaîne causale, pas par un trajet). Donc : d’abord se demander « est-ce arbitraire ou logique ? » — logique → chaîne causale ; arbitraire court → acronyme/histoire ; arbitraire long et stable → palais.',
    ],
    also: 'Et le palais mental : réel mais coûteux — pour les listes longues et stables uniquement.',
  },
  {
    id: 'k-annales-comment',
    strong: [
      'comment utiliser les annales', 'travailler les annales', 'les annales ca sert a quoi',
      'a quoi servent les annales', 'quand faire les annales', 'bien utiliser les annales',
    ],
    mood: 'think',
    links: [
      { label: 'QCM actif proposition par proposition', to: '/methode/qcm-actif' },
      { label: 'Correction par cause', to: '/methode/correction-par-cause' },
      { label: 'Simulation / Mode examen', to: '/methode/simulation-examen' },
    ],
    variants: [
      'Les annales ont TROIS usages distincts — les mélanger gâche leur valeur : 1) BOUSSOLE en début de chapitre (10 minutes de lecture des questions tombées te disent ce que ta fac demande VRAIMENT — avant même d’apprendre) ; 2) ENTRAÎNEMENT en cours de route (QCM actif : chaque proposition justifiée à voix haute, erreurs codées par cause) ; 3) SIMULATION en approche d’épreuve (un sujet complet, conditions réelles, chrono). Trois moments, trois protocoles.',
      'La règle d’or du corpus : les annales sont la seule ressource dont on ne sature jamais — « une seule source de cours, TOUTES les annales possibles ». Mais attention au mode d’emploi : les refaire en boucle jusqu’à connaître les réponses par cœur mesure ta mémoire DES ANNALES, pas de la matière. La parade : justifier chaque proposition (vraie ET fausse), et coder chaque erreur — c’est l’analyse qui rapporte, pas le score.',
      'Le calendrier rentable : dès maintenant, un survol des annales du chapitre en cours (ça oriente tout ton apprentissage — tu sais ce qui tombe) ; chaque semaine, une session de QCM actif dessus ; à l’approche des colles, des sujets complets en conditions (Simulation). Et chaque erreur alimente ton carnet par cause. Les annales ne sont pas un contrôle de fin — c’est un instrument de pilotage du début à la fin.',
    ],
    also: 'Et les annales : boussole avant, entraînement pendant, simulation avant l’épreuve.',
  },

  // ============================================================ MOMENTS & CHOIX
  {
    id: 'k-matin-ou-soir',
    strong: [
      'reviser le matin ou le soir', 'matin ou soir', 'meilleur moment pour reviser',
      'meilleure heure pour reviser', 'travailler le matin ou le soir', 'chronotype',
      'plus efficace le matin ou le soir',
    ],
    mood: 'think',
    links: [{ label: 'Pomodoro (structurer les créneaux)', to: '/methode/pomodoro' }],
    variants: [
      'Réponse honnête : la RÉGULARITÉ bat l’horaire. Cela dit, deux repères utiles : le travail EXIGEANT (apprentissage neuf, mécanismes durs) passe mieux sur un cerveau frais — pour la plupart, c’est le matin ou le début d’après-midi ; et la fin de soirée convient bien aux tâches légères (rappels courts, cartes, relecture d’erreurs) — pas au neuf lourd qui vole le sommeil. Observe TES pics une semaine, puis cale le dur dessus.',
      'Le vrai principe : chaque créneau a son type de tâche. Cerveau frais → comprendre et apprendre du neuf ; creux d’après-déjeuner → tâches actives faciles (QCM, schémas) ; soirée → consolidation légère et préparation du lendemain. Le pire des arrangements : garder le plus dur pour 22 h « quand c’est calme » — c’est l’heure où la compréhension coûte double et où l’écran sabote la nuit.',
      'Si tu es du soir, assume-le PARTIELLEMENT : décale ton dur vers ton pic réel (fin d’après-midi, début de soirée), mais garde deux verrous — l’heure de coucher stable (le chronotype n’annule pas le besoin de sommeil) et un cours du matin traité le jour même quand il y en a. Le luxe de choisir son heure s’arrête là où commence la dette de sommeil et la dette de cours.',
    ],
    also: 'Et matin/soir : le dur sur cerveau frais, le léger le soir — et la régularité avant tout.',
  },
  {
    id: 'k-avant-dormir',
    strong: [
      'reviser avant de dormir', 'apprendre avant de se coucher', 'reviser le soir avant de dormir',
      'travailler juste avant de dormir', 'relire avant de dormir',
    ],
    mood: 'think',
    links: [
      { label: 'Rappel actif (la version du soir)', to: '/methode/rappel-actif' },
      { label: 'SOS Fatigue (protéger la nuit)', to: '/sos/fatigue' },
    ],
    variants: [
      'Bonne intuition — bien réglée : un rappel LÉGER avant de dormir profite de la consolidation nocturne (ce qu’on récupère en dernier est bien placé pour être consolidé). Le bon format : 10-15 minutes de rappels calmes (réciter le squelette du jour, quelques cartes faciles), papier plutôt qu’écran, lumière basse. Ce qui ne marche PAS : attaquer du neuf difficile à 23 h — ça excite, ça frustre, et ça vole la nuit qui devait consolider.',
      'Le rituel rentable du soir : d’abord noter les 3 unités de demain (la tête se vide, le lendemain démarre sans décision), puis un mini-rappel du jour (mental ou sur papier — « qu’est-ce que j’ai appris aujourd’hui ? »), puis extinction. C’est doux, court, et ça combine trois fiches : rappel actif, préparation du démarrage, et hygiène de sommeil. L’inverse — cours dense + écran jusqu’au lit — combine leurs trois sabotages.',
      'Nuance importante : « réviser avant de dormir aide » est vrai pour la CONSOLIDATION, pas une excuse pour repousser le coucher. Si la session du soir grignote ton heure de sommeil, elle coûte plus qu’elle ne rapporte — la nuit complète reste l’outil de mémorisation n°1. Règle simple : le rappel du soir se place AVANT ton heure de coucher fixe, jamais à la place.',
    ],
    also: 'Et avant de dormir : un rappel léger de 10-15 minutes — jamais du neuf, jamais à la place du sommeil.',
  },
  {
    id: 'k-week-end',
    priority: 12,
    strong: [
      'rattraper le week end', 'bosser le week end', 'travailler le week end',
      'organiser mon week end', 'week end de revision', 'que faire le week end',
    ],
    mood: 'think',
    links: [
      { label: 'Triage du retard (choisir quoi rattraper)', to: '/methode/triage-retard' },
      { label: 'Journée minimale (la demi-journée off)', to: '/methode/journee-minimale' },
    ],
    variants: [
      'Le week-end type qui tient l’année : une vraie demi-journée OFF (décidée à l’avance, sans culpabilité — c’est elle qui rend la semaine suivante possible), et le reste en travail CHOISI plutôt que subi : le rattrapage trié par rentabilité (fiche Triage), une session de QCM/annales de la semaine, et les rappels espacés dus. Le week-end n’est pas une deuxième semaine — c’est la maintenance de la machine.',
      'Piège classique du samedi : « je vais tout rattraper ce week-end ». Résultat habituel : un samedi de lecture passive culpabilisée et un dimanche soir épuisé. La version qui marche : 2-3 priorités MAX choisies froidement (Triage), traitées en mode actif (squelette + QCM, pas relecture intégrale), des blocs nets… et la coupure réelle quelque part. Un week-end à 6 heures nettes bien choisies bat un week-end à 12 heures floues.',
      'Utilise le week-end pour ce que la semaine ne permet pas : les sessions LONGUES à forte valeur — une simulation en conditions réelles, une passe d’analyse d’erreurs sur les colles de la semaine, un gros chapitre en retard traité en dégradé. Et protège le dimanche soir : préparation douce de la semaine (3 unités de lundi notées), coucher normal. Le lundi se gagne le dimanche à 22 h.',
    ],
    also: 'Et le week-end : 2-3 priorités triées + une vraie demi-journée off — pas une deuxième semaine.',
  },
  {
    id: 'k-lecture-rapide',
    strong: [
      'lecture rapide', 'lire plus vite', 'speed reading', 'formation lecture rapide',
      'lire en diagonale pour apprendre', 'doubler ma vitesse de lecture',
    ],
    mood: 'think',
    links: [
      { label: 'Le vrai levier : rappel actif', to: '/methode/rappel-actif' },
      { label: 'Mythes d’apprentissage', to: '/reperes/mythes' },
    ],
    variants: [
      'Réponse franche : la « lecture rapide » façon stage miracle (lire 3× plus vite en comprenant tout) n’est pas soutenue par la recherche — au-delà d’un certain rythme, la compréhension chute mécaniquement, et sur un cours de médecine dense elle chute d’abord. Ce qui existe vraiment : le SURVOL STRATÉGIQUE (parcourir titres et structure pour orienter — le corpus l’utilise dans l’algorithme universel) et la lecture normale ACTIVE. Le goulot d’étranglement n’est jamais la vitesse de tes yeux : c’est la rétention.',
      'Fais le calcul qui dégrise : lire un cours 2× plus vite fait gagner 30 minutes… que tu perds intégralement si la rétention baisse de 20 % — parce que c’est la mémorisation qui coûte du temps, pas la lecture. Le vrai gain de vitesse est ailleurs : moins de relectures (remplacées par des rappels), moins de re-travail (erreurs corrigées par cause), moins de flottement (blocs nets). C’est là que des heures entières se libèrent.',
      'Ce que tu peux légitimement accélérer : le survol d’orientation (2 minutes sur les titres avant d’apprendre — voir l’algorithme universel), le repérage dans un poly connu, la relecture CIBLÉE post-rappel. Ce qu’il ne faut pas accélérer : la première lecture de fond d’un mécanisme — c’est un temps de construction, pas un temps de transport. Lis à vitesse de compréhension, puis teste-toi : c’est le combo le plus rapide qui existe vraiment.',
    ],
    also: 'Et la lecture rapide : mythe au-delà du survol — le vrai gain est dans moins de relectures.',
  },
  {
    id: 'k-marcher-reviser',
    strong: [
      'reviser en marchant', 'reciter en marchant', 'apprendre en marchant',
      'marcher et reviser', 'revision en marchant',
    ],
    mood: 'happy',
    links: [{ label: 'Rappel actif (le mode mental)', to: '/methode/rappel-actif' }],
    variants: [
      'Excellente pratique — au bon poste : la marche est parfaite pour le RAPPEL (réciter mentalement ou à voix basse la cascade d’hier, dérouler un plan, refaire un raisonnement), pas pour l’apprentissage neuf sur document. Le mouvement entretient l’éveil, et le rappel sans aucun support est exactement le format de l’épreuve. Un tour de pâté de maisons = une session de consolidation gratuite.',
      'Le combo marche + récitation cumule trois gains : un vrai rappel actif (le plus dur : sans support du tout), une pause d’écran pour les yeux, et de l’activité physique légère qui aère la tête. Mode d’emploi : choisis l’unité AVANT de sortir (« la voie de signalisation d’hier »), déroule de mémoire en marchant, note mentalement les trous, vérifie au retour. Cinq minutes de vérification ciblée, et la boucle est bouclée.',
      'Deux variantes selon le moment : la marche-rappel après une session (consolider ce qui vient d’être appris en le récitant en route vers la pause) et la marche-préparation avant (dérouler ce qu’on sait déjà du chapitre — un pré-test ambulant). Et si tu as enregistré tes propres synthèses audio, la marche est leur terrain idéal : écoute, pause, anticipe la suite de mémoire, reprends.',
    ],
    also: 'Et en marchant : du rappel mental, jamais du neuf — le format exact de l’épreuve.',
  },
  {
    id: 'k-voix-haute',
    strong: [
      'reciter a voix haute', 'a voix haute ca marche', 'apprendre a voix haute',
      'parler tout seul pour reviser', 'reviser a voix haute', 'lire a voix haute',
    ],
    mood: 'happy',
    links: [
      { label: 'Feynman (expliquer à voix haute)', to: '/methode/feynman' },
      { label: 'Rappel actif', to: '/methode/rappel-actif' },
    ],
    variants: [
      'Oui — avec une distinction cruciale : RÉCITER de mémoire à voix haute est excellent (c’est du rappel actif renforcé : produire les mots engage plus que les penser, et l’oreille détecte les hésitations que l’œil pardonne) ; LIRE le cours à voix haute est de la relecture sonorisée — à peine mieux que silencieuse. La voix n’a de valeur que si elle PRODUIT, support fermé.',
      'La version la plus puissante : Feynman parlé — explique la notion à voix haute comme à quelqu’un d’autre, sans support, phrases simples. Tu entendras littéralement l’endroit où ça bafouille : c’est LE point à retravailler. Bonus pratique : s’enregistrer une fois de temps en temps — désagréable et redoutablement révélateur ; et tes meilleures explications enregistrées deviennent ta bibliothèque audio de trajet.',
      'Pourquoi ça marche : produire à voix haute mobilise la formulation (tu ne peux pas « à peu près savoir » une phrase que tu dois prononcer), la mémoire auditive s’ajoute en couche, et le débit t’impose une structure — les trous s’entendent. Usage type : après chaque unité, 2 minutes de récitation parlée cours fermé. À la BU, la version chuchotée ou mentale-articulée fait le même travail.',
    ],
    also: 'Et la voix haute : réciter oui (rappel renforcé), relire sonorisé non.',
  },
  {
    id: 'k-simulation-frequence',
    strong: [
      'combien de simulations', 'une simulation par semaine', 'frequence des simulations',
      'souvent des simulations', 'combien de fois se mettre en conditions',
      'quand faire des simulations',
    ],
    mood: 'think',
    links: [{ label: 'Simulation / Mode examen', to: '/methode/simulation-examen' }],
    variants: [
      'Le rythme du corpus : UNE session en conditions réelles par semaine en régime normal (chrono, zéro indice, correction seulement à la fin), en montant la fréquence à l’approche des épreuves. C’est le vaccin contre le trou noir : le cerveau s’habitue à récupérer SOUS PRESSION, sans support — la seule compétence que les révisions confortables n’entraînent jamais.',
      'Hebdomadaire, et surtout COMPLÈTE : le format réel (même durée, même type de sujet), le chrono visible, aucune vérification en cours de route, et l’analyse À LA FIN — score, gestion du temps, confiance par question, causes d’erreurs. Une simulation sans son analyse n’est qu’un entraînement au stress ; avec l’analyse, c’est ton meilleur outil de pilotage.',
      'Calibrage selon le calendrier : loin des épreuves → 1/semaine sur les chapitres déjà couverts (elle sert de rappel espacé géant) ; à 2-3 semaines d’une colle → 2/semaine dont une sur sujet complet ; dernière ligne droite → des conditions réelles presque quotidiennes en format court. Et toujours la règle de la fiche : on simule les CONDITIONS, pas seulement le contenu — l’heure, la table nue, le silence, le chrono.',
    ],
    also: 'Et les simulations : une par semaine en régime normal, davantage à l’approche — analyse comprise.',
  },

  // ================================================================ LE CORPUS
  {
    id: 'k-combien-methodes',
    strong: [
      'combien de methodes', 'combien de fiches', 'combien y a t il de methodes',
      'nombre de methodes', 'toutes les methodes', 'combien de protocoles',
    ],
    mood: 'happy',
    links: [
      { label: 'La bibliothèque complète', to: '/bibliotheque' },
      { label: 'Lancer le diagnostic', to: '/diagnostic' },
    ],
    variants: [
      'Le corpus complet : 47 méthodes en fiches actionnables (du socle — rappel actif, répétition espacée — aux outils de niche comme le palais mental), 12 protocoles par matière (la combinaison gagnante pour l’anat, la biochimie…), et 10 SOS de crise (panique, retard, « ça ne rentre pas »…). Plus les pages repères : l’algorithme universel, la matrice par type d’info, les mythes, les sources. Tout est dans la Bibliothèque — et le diagnostic t’y oriente en 3-5 questions.',
      '47 fiches méthodes + 12 protocoles matière + 10 SOS — mais le vrai chiffre à retenir : il t’en faut environ CINQ pour transformer ton année (rappel actif, répétition espacée, correction par cause, Pomodoro, et la méthode qui traite TON blocage principal — le diagnostic la trouve). Le reste est un arsenal de précision à ouvrir quand le besoin exact se présente. Ne collectionne pas : applique.',
      'L’inventaire : 47 méthodes classées par usage (comprendre, mémoriser, se tester, s’organiser, se concentrer…), 12 protocoles de matière et 10 SOS ultra-courts pour les moments chauds. Chaque fiche dit quand l’utiliser, quand l’ÉVITER, la procédure pas à pas, et « c’est acquis si… ». Commence par la Bibliothèque ou raconte-moi ton blocage — je fais l’aiguillage.',
    ],
  },
  {
    id: 'k-source-corpus',
    strong: [
      'd ou viennent les methodes', 'c est base sur quoi', 'basees sur quoi',
      'base sur quoi', 'fondees sur quoi', 'les preuves scientifiques',
      'ca marche vraiment tes methodes', 'tes methodes sont fiables', 'qui a ecrit les fiches',
      'les methodes sont prouvees', 'fonde sur la science',
    ],
    mood: 'think',
    links: [{ label: 'Sources et niveau de preuve', to: '/reperes/sources' }],
    variants: [
      'Bonne question — la réponse est dans la page Sources : le corpus s’appuie sur la science de l’apprentissage (effet test, espacement, exemples résolus, charge cognitive…), avec un NIVEAU DE PREUVE affiché par famille de méthodes : le socle (rappel actif, espacement) a des preuves massives ; certains outils (mnémotechniques de niche) ont des preuves plus ciblées et la fiche le dit. Pas de pensée magique : quand un truc est un mythe (styles d’apprentissage, relecture), le corpus le démonte nommément.',
      'Le principe d’honnêteté du corpus : chaque méthode annonce son niveau de preuve, ses conditions et ses limites — « quand l’éviter » figure sur chaque fiche, ce que les vendeurs de méthodes miracles n’écrivent jamais. La hiérarchie des preuves et les références sont sur la page Sources. Et le juge final reste TES données : la Calibration mesure si une méthode te fait progresser, toi, sur tes colles.',
      'Ça vient de la recherche en psychologie cognitive appliquée à l’apprentissage — les effets les plus répliqués du domaine (se tester bat relire, espacer bat masser, les exemples résolus battent l’essai-erreur pour débuter…). La page Sources te donne la hiérarchie des preuves ; la page Mythes fait le ménage inverse (ce qui NE marche pas malgré sa popularité). Tu as le droit — et même le devoir de futur soignant — de vérifier : c’est prévu pour.',
    ],
    also: 'Et les preuves : niveau affiché par fiche, hiérarchie sur la page Sources — vérifiable.',
  },
  {
    id: 'k-algorithme',
    strong: [
      'c est quoi l algorithme universel', 'l algorithme universel', 'algorithme d un cours',
      'algorithme universel d un cours', 'la sequence pour un cours',
    ],
    mood: 'happy',
    links: [{ label: 'L’algorithme universel d’un cours', to: '/reperes/algorithme' }],
    variants: [
      'L’algorithme universel, c’est LA séquence par défaut du corpus pour traiter n’importe quel cours, de l’arrivée du poly jusqu’à la maîtrise : survol structurant → pré-test → lecture/écoute active → premier rappel dans la foulée → reprises espacées → tests en conditions. Chaque étape a sa fiche. Quand tu ne sais pas comment t’y prendre avec un cours, c’est le chemin à dérouler tel quel — il est fait pour ça.',
      'C’est la colonne vertébrale de la méthode : une suite d’étapes qui s’applique à TOUT cours, quelle que soit la matière — seuls les outils de chaque étape changent (un mécanisme prendra la chaîne causale, une liste prendra une mnémotechnique). La page le détaille étape par étape avec les fiches associées. Réflexe à installer : nouveau cours → algorithme, sans réinventer la stratégie à chaque fois.',
      'Son rôle est anti-charge mentale : au lieu de décider à chaque cours « je fais quoi, dans quel ordre ? », tu déroules une séquence prouvée — questionner avant de lire, lire pour répondre, récupérer aussitôt, espacer ensuite, tester en conditions enfin. La page Algorithme te la donne en une frise claire. Les 47 fiches sont les outils ; l’algorithme est le plan de montage.',
    ],
    also: 'Et l’algorithme universel : la séquence par défaut de tout cours — survol, pré-test, actif, rappels, tests.',
  },
  {
    id: 'k-mythes',
    strong: [
      'les mythes d apprentissage', 'c est quoi les mythes', 'idees recues sur les revisions',
      'fausses bonnes idees', 'quels sont les mythes', 'mythes sur la memoire',
    ],
    mood: 'think',
    links: [{ label: 'La page Mythes complète', to: '/reperes/mythes' }],
    variants: [
      'La page Mythes démonte les fausses bonnes idées les plus coûteuses du PASS : relire suffit (non — la familiarité n’est pas la mémoire), surligner apprend (non — ça classe des phrases), recopier au propre fixe (non — la main travaille, la tête dort), « je suis visuel/auditif » (les styles figés ne sont pas soutenus par la recherche), la nuit blanche rentable (jamais), le multitâche efficace (le cerveau alterne et paye chaque bascule). Chacun avec sa version VRAIE en face.',
      'Ce que ces mythes ont en commun : ils procurent une SENSATION de travail (fluidité de relecture, pages fluotées, fiches calligraphiées) sans produire de récupération — et l’examen ne teste que la récupération. La page liste chaque mythe, pourquoi il séduit, ce que dit la recherche, et le geste à mettre à la place. C’est probablement les dix minutes de lecture les plus rentables de l’app.',
      'Le mythe le plus cher payé en PASS reste le trio relire-surligner-recopier : des centaines d’heures annuelles pour une rétention faible, avec en prime l’illusion de maîtrise (« ça me parle » ≠ « je sais le produire »). Mention spéciale aussi aux styles d’apprentissage (étiquette sans preuve — le FORMAT doit suivre le CONTENU, pas ton « profil ») et à la lecture rapide miracle. La page Mythes fait le tri complet, référencé.',
    ],
    also: 'Et les mythes : relire, surligner, recopier, « je suis visuel » — la page les démonte un par un.',
  },
  {
    id: 'k-matrice',
    strong: [
      'c est quoi la matrice', 'la matrice des methodes', 'matrice par type d info',
      'quelle methode pour quel type', 'type d information quelle methode',
    ],
    mood: 'think',
    links: [{ label: 'La matrice type d’info → méthodes', to: '/reperes/matrice' }],
    variants: [
      'La matrice, c’est la table de correspondance du corpus : à chaque TYPE d’information son arsenal. Une définition → carte question/réponse ; un mécanisme → chaîne causale + perturbations « si… alors » ; deux notions proches → tableau de contraste ; une liste arbitraire → mnémotechniques ; un schéma → reconstruction + occlusion ; une formule → carte de calcul + exercices à froid ; une chronologie → frise. Tu identifies le type, la matrice te donne les armes.',
      'Son principe fondateur : le FORMAT de travail doit suivre la NATURE du contenu — pas tes préférences ni tes habitudes. Apprendre un mécanisme comme une liste (par cœur linéaire) ou une liste comme un mécanisme (chercher une logique qui n’existe pas) sont les deux gaspillages symétriques classiques. Le réflexe : devant un passage, demande-toi « c’est quoi, au fond ? » — et ouvre la colonne correspondante de la matrice.',
      'C’est l’outil anti-« une seule méthode pour tout » : le rappel actif et l’espacement restent le socle universel, mais la PRÉPARATION du matériau change selon sa nature — c’est exactement ce que la matrice cartographie, type par type, avec les fiches liées. Elle sert aussi de diagnostic : si une notion résiste, vérifie d’abord que tu la travailles dans le bon format. La page complète est ci-dessous.',
    ],
    also: 'Et la matrice : identifie le type d’info, elle te donne les méthodes qui lui correspondent.',
  },
];
