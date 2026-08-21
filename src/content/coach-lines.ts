import type { QuoteTheme } from './quotes';

/**
 * Phrases de coach — écrites pour cette app, sans auteur et sans fausse
 * attribution (c'est la différence avec les citations : ici on assume que
 * c'est la voix du coach). Courtes, directes, en tutoiement. Le style vise
 * celui des meilleures apps de motivation : une idée par phrase, zéro
 * remplissage, du concret.
 */

export interface CoachLine {
  text: string;
  theme: QuoteTheme;
}

export const COACH_LINES: CoachLine[] = [
  // ------------------------------------------------------- Action / démarrage
  { text: 'Arrête de planifier. Commence à exécuter.', theme: 'courage' },
  { text: 'Dix minutes. C’est tout ce que tu dois décider maintenant.', theme: 'courage' },
  { text: 'Le cours parfait n’existe pas. La page ouverte, si.', theme: 'courage' },
  { text: 'Tu n’as pas besoin d’être motivé pour commencer. Tu as besoin de commencer pour être motivé.', theme: 'courage' },
  { text: 'Ce soir, tu seras content de ce que tu fais là, maintenant.', theme: 'courage' },
  { text: 'La première phrase est la plus dure. Lis-la.', theme: 'courage' },
  { text: 'Pas envie ? Normal. Fais-le sans envie.', theme: 'courage' },
  { text: 'Le meilleur moment, c’était ce matin. Le deuxième meilleur, c’est maintenant.', theme: 'courage' },
  { text: 'Ouvre le cours. Le reste suivra.', theme: 'courage' },
  { text: 'Une unité courte. Un vrai rappel. C’est déjà une victoire.', theme: 'courage' },
  { text: 'Tu réfléchis à comment travailler depuis vingt minutes. Travaille vingt minutes.', theme: 'courage' },
  { text: 'Décide petit. Exécute tout de suite.', theme: 'courage' },
  { text: 'Fais-le mal, mais fais-le. Tu corrigeras.', theme: 'courage' },
  { text: 'L’élan vient en marchant. Jamais avant.', theme: 'courage' },
  { text: 'Ferme les onglets. Ouvre le poly.', theme: 'courage' },
  { text: 'Ta seule mission : ne pas finir la journée à zéro.', theme: 'courage' },
  { text: 'Commencer, c’est déjà être devant tous ceux qui hésitent.', theme: 'courage' },
  { text: 'Moins de préparation, plus de confrontation.', theme: 'courage' },
  { text: 'Aujourd’hui compte double : tu travailles, et tu prouves que tu peux.', theme: 'courage' },
  { text: 'Le doute se soigne par l’action. Pas par la réflexion.', theme: 'courage' },
  { text: 'Ne négocie pas avec toi-même. Le contrat, c’est dix minutes.', theme: 'courage' },
  { text: 'Un jour tu raconteras cette année. Rends l’histoire belle.', theme: 'courage' },

  // ------------------------------------------------------- Discipline / travail
  { text: 'Tu ne montes pas au niveau de tes objectifs. Tu descends au niveau de tes habitudes.', theme: 'discipline' },
  { text: 'Les autres révisent aussi. La différence se joue sur comment.', theme: 'discipline' },
  { text: 'Relire, c’est confortable. Se tester, c’est efficace. Choisis.', theme: 'discipline' },
  { text: 'Ce que tu répètes aujourd’hui, tu le retrouveras le jour du concours.', theme: 'discipline' },
  { text: 'La régularité bat l’intensité. Tous les jours bat un grand soir.', theme: 'discipline' },
  { text: 'Ton cerveau retient ce qu’il utilise. Fais-le travailler, pas admirer.', theme: 'discipline' },
  { text: 'Une heure concentrée vaut trois heures de présence.', theme: 'discipline' },
  { text: 'Le surlignage rassure. Le rappel classe.', theme: 'discipline' },
  { text: 'Chaque erreur corrigée aujourd’hui, c’est un point pris demain.', theme: 'discipline' },
  { text: 'Travaille quand c’est prévu. Repose-toi quand c’est prévu. Tout est là.', theme: 'discipline' },
  { text: 'Tu n’as pas besoin de plus d’heures. Tu as besoin de meilleures heures.', theme: 'discipline' },
  { text: 'La discipline, c’est se souvenir de ce que tu veux vraiment.', theme: 'discipline' },
  { text: 'Fais simple : une méthode, un minuteur, une unité de cours.', theme: 'discipline' },
  { text: 'Ce qui est mesuré progresse. Compte tes rappels, pas tes heures.', theme: 'discipline' },
  { text: 'Le talent, c’est de l’entraînement accumulé. Accumule.', theme: 'discipline' },
  { text: 'Personne ne te regarde. C’est exactement là que tout se joue.', theme: 'discipline' },
  { text: 'Chaque jour tenu rend le suivant plus facile.', theme: 'discipline' },
  { text: 'Ta routine est ton armure. Remets-la chaque matin.', theme: 'discipline' },
  { text: 'Pas de génie. Des répétitions espacées et du sommeil.', theme: 'discipline' },
  { text: 'Fais ce qui marche, pas ce qui rassure.', theme: 'discipline' },
  { text: 'Tu veux le classement sans l’inconfort. L’inconfort est le prix.', theme: 'discipline' },
  { text: 'Sois le concurrent que tu redouterais d’avoir.', theme: 'discipline' },

  // ------------------------------------------------------- Persévérance
  { text: 'Tu n’es pas en retard. Tu es en route.', theme: 'perseverance' },
  { text: 'Mauvaise journée ? D’accord. Mauvaise semaine ? Non. Reprends ce soir.', theme: 'perseverance' },
  { text: 'Le concours ne demande pas la perfection. Il demande de tenir.', theme: 'perseverance' },
  { text: 'Chaque jour où tu ne lâches pas, tu doubles quelqu’un qui lâche.', theme: 'perseverance' },
  { text: 'Tu as déjà survécu à toutes tes pires journées. Celle-là aussi passera.', theme: 'perseverance' },
  { text: 'Rater un QCM, c’est une donnée. Pas un verdict.', theme: 'perseverance' },
  { text: 'Les courbes de progrès ne montent jamais droit. Continue de tracer.', theme: 'perseverance' },
  { text: 'Un pas par jour, c’est 365 pas d’avance en un an.', theme: 'perseverance' },
  { text: 'Ce qui te semble lent aujourd’hui te semblera énorme en janvier.', theme: 'perseverance' },
  { text: 'Tomber sept fois. Se relever huit.', theme: 'perseverance' },
  { text: 'Tu n’as pas besoin de voir tout l’escalier. Juste la prochaine marche.', theme: 'perseverance' },
  { text: 'La constance est invisible sur une journée et imbattable sur une année.', theme: 'perseverance' },
  { text: 'Reprendre après un échec, c’est ça, le vrai niveau.', theme: 'perseverance' },
  { text: 'Tu creuses un tunnel. On ne voit rien juste avant la sortie.', theme: 'perseverance' },
  { text: 'Le découragement est une météo. Ta direction ne change pas.', theme: 'perseverance' },
  { text: 'Ceux qui réussissent sont ceux qui ont recommencé une fois de plus.', theme: 'perseverance' },
  { text: 'Ton futur toi supplie ton toi d’aujourd’hui de ne pas lâcher.', theme: 'perseverance' },
  { text: 'Note d’aujourd’hui ≠ niveau de demain. Corrige, espace, repasse.', theme: 'perseverance' },
  { text: 'Il n’y a pas d’échec définitif tant que tu es encore en train d’apprendre.', theme: 'perseverance' },
  { text: 'Avance fatigué s’il le faut. Mais avance.', theme: 'perseverance' },

  // ------------------------------------------------------- Calme / recul
  { text: 'Respire. Tu n’as pas à tout savoir aujourd’hui. Tu as à travailler aujourd’hui.', theme: 'calme' },
  { text: 'Le stress te dit que c’est important. Pas que tu vas échouer.', theme: 'calme' },
  { text: 'Une chose à la fois. C’est comme ça qu’on fait tout.', theme: 'calme' },
  { text: 'Tu ne peux pas contrôler le classement. Tu peux contrôler ta prochaine heure.', theme: 'calme' },
  { text: 'Panique = trop de choses en même temps. Choisis-en une.', theme: 'calme' },
  { text: 'Ferme les yeux dix secondes. Rouvre-les sur une seule tâche.', theme: 'calme' },
  { text: 'Ton cerveau n’est pas ton ennemi. Il est juste fatigué. Traite-le bien.', theme: 'calme' },
  { text: 'Compare-toi à toi d’hier. Les autres sont un bruit de fond.', theme: 'calme' },
  { text: 'La nuit porte conseil, et surtout elle consolide. Dors.', theme: 'calme' },
  { text: 'Tu as le droit de faire une pause. Tu n’as pas le droit de te la reprocher.', theme: 'calme' },
  { text: 'Range le téléphone dans une autre pièce. Ton attention vaut de l’or.', theme: 'calme' },
  { text: 'L’anxiété regarde demain. Le travail regarde maintenant. Reste ici.', theme: 'calme' },
  { text: 'Un esprit clair vaut mieux qu’une heure de plus. Va marcher dix minutes.', theme: 'calme' },
  { text: 'Ce n’est pas toute ta vie. C’est une année de ta vie, avec un but.', theme: 'calme' },
  { text: 'Fais la paix avec « pas encore ». C’est là que tout s’apprend.', theme: 'calme' },
  { text: 'Trop de pression ? Réduis l’unité. Une page. Un schéma. Une question.', theme: 'calme' },
  { text: 'Le calme est une compétence. Elle s’entraîne comme le reste.', theme: 'calme' },
  { text: 'Tu n’es pas ton classement. Tu es la personne qui s’entraîne.', theme: 'calme' },

  // ------------------------------------------------------- Apprendre / méthode
  { text: 'Si tu ne peux pas l’expliquer sans le cours, tu ne le sais pas encore. Teste-toi.', theme: 'savoir' },
  { text: 'Feuille blanche, stylo, trois minutes. La vérité sur ce que tu sais.', theme: 'savoir' },
  { text: 'Lire, c’est rencontrer. Se rappeler, c’est retenir.', theme: 'savoir' },
  { text: 'Ce que tu récupères de mémoire tient. Ce que tu relis glisse.', theme: 'savoir' },
  { text: 'Un schéma refait de tête vaut dix relectures.', theme: 'savoir' },
  { text: 'Espacer, c’est oublier un peu pour retenir longtemps.', theme: 'savoir' },
  { text: 'Le confort est le signal d’alarme : si c’est facile, ça ne muscle pas.', theme: 'savoir' },
  { text: 'Pose la question avant d’apprendre la réponse. Ton cerveau adorera.', theme: 'savoir' },
  { text: 'Confonds deux notions ? Mets-les côte à côte et cherche LE détail qui tranche.', theme: 'savoir' },
  { text: 'Explique-le à voix haute comme à un enfant de dix ans. Les trous s’entendent.', theme: 'savoir' },
  { text: 'Ton erreur d’aujourd’hui est ta meilleure fiche de révision.', theme: 'savoir' },
  { text: 'Comprendre d’abord. Mémoriser ensuite. Jamais l’inverse.', theme: 'savoir' },
  { text: 'Moins de fiches parfaites, plus de rappels imparfaits.', theme: 'savoir' },
  { text: 'La mémoire aime trois choses : le test, l’espacement, le sommeil.', theme: 'savoir' },
  { text: 'Chaque question que tu te poses vaut mieux que dix pages relues.', theme: 'savoir' },
  { text: 'Apprendre, c’est fabriquer des accès. Le rappel creuse le chemin.', theme: 'savoir' },
  { text: 'Ce cours immense ? Ce sont des blocs. Découpe, nomme, empile.', theme: 'savoir' },
  { text: 'Ne collectionne pas les ressources. Épuise celle que tu as.', theme: 'savoir' },

  // ------------------------------------------------------- Science & médecine
  { text: 'Chaque notion que tu apprends servira un jour un patient. Même celle-là.', theme: 'medecine' },
  { text: 'Tu n’apprends pas pour le concours. Tu t’entraînes à penser comme un soignant.', theme: 'medecine' },
  { text: 'La médecine récompense exactement ce que tu fais : la rigueur répétée.', theme: 'medecine' },
  { text: 'Un jour, une famille sera rassurée parce que tu auras été sérieux ce semestre.', theme: 'medecine' },
  { text: 'Ta blouse se gagne page par page.', theme: 'medecine' },
  { text: 'Pense mécanisme, pas récitation : c’est comme ça que raisonnent les cliniciens.', theme: 'medecine' },
  { text: 'La science que tu apprends est la même qui sauve des vies à l’étage au-dessus.', theme: 'medecine' },
  { text: 'Derrière chaque item de QCM, il y a une situation réelle qui t’attend.', theme: 'medecine' },
];
