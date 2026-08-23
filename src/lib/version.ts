/**
 * Version de l'app et journal des nouveautés, affiché dans le panneau
 * « Quoi de neuf » après chaque mise à jour et depuis Pour moi → Application.
 *
 * À chaque évolution visible : incrémenter APP_VERSION et ajouter une entrée
 * en tête de CHANGELOG (phrases courtes, orientées utilisateur).
 */

export const APP_VERSION = '3.0.0';

export interface ChangelogEntry {
  version: string;
  date: string; // AAAA-MM
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '3.0.0',
    date: '2026-08',
    items: [
      'Axel change de dimension : ~140 situations comprises (le double), dont toute ta vie autour du concours — colère, culpabilité, solitude, rupture, dispute, deuil, harcèlement, proche malade, surmenage, tabac, bonnes notes à fêter, écrans, jeux, séries, sieste, canicule, groupe de travail, iPad ou papier, jour J, après-colle, rentrée, amphi ou replay, changement de méthode, choix de filière…',
      'Nouvelle couche « savoir » : pose-lui des questions précises — « pomodoro combien de temps ? », « quels intervalles de révision ? », « combien de cartes Anki par jour ? », « différence feuille blanche / blurting ? », « la lecture rapide ça marche ? » — il répond avec les chiffres exacts des fiches et le lien source.',
      'Il parle encore mieux le SMS : « g pas compris », « c chiant », « koi bosser ce soir », « jsuis vener », « seum », « cimer »… Et il dit honnêtement ses limites (pas d’internet, pas d’heure — 100 % local).',
      'Sergent et Zen doublés : 24 situations réécrites par personnalité. Et le garde-fou s’étend : tous les nouveaux sujets sensibles gardent la voix bienveillante, dans tous les modes.',
      'La glisse partout : une pastille coulisse sous l’onglet actif de la barre du bas (et un glissement du doigt sur la barre change d’onglet), la carte de citations de l’accueil se balaye du doigt, le plein écran suit ton geste dans les quatre directions. Retour haptique discret sur les gestes clés.',
      'Le tout verrouillé par 450 tests unitaires (dont une table de 336 phrases réelles) et la suite complète sur 5 formats d’écran.',
    ],
  },
  {
    version: '2.0.0',
    date: '2026-08',
    items: [
      'Axel a maintenant trois personnalités, à changer d’un geste sur le sélecteur coulissant : Classique (le coach équilibré, bleu), Sergent (rouge, dur et direct — il te met au travail, sans jamais te rabaisser) et Zen (vert, posé, une chose à la fois). Le visage, les couleurs et la voix changent — la méthode, elle, reste la même.',
      'Garde-fou absolu : quel que soit le mode, les sujets sensibles (détresse, panique, moral bas, santé…) gardent toujours la voix bienveillante et orientent vers de vraies personnes.',
      'Plein écran citations : choisis ton ambiance — Motivation, Discipline, Persévérance, Calme, Savoir, Médecine, phrases du coach seules, citations seules ou tes favoris. Le choix est retenu et s’applique aussi à la carte de l’accueil.',
      'La personnalité choisie est retenue, la conversation continue quand tu changes de voix, et tout reste 100 % local, sur ton appareil.',
    ],
  },
  {
    version: '1.9.0',
    date: '2026-08',
    items: [
      'Axel parle couramment le langage étudiant : « jpp », « jsuis », « flm », « bcp », « tkt », « jsp »… traduits avant analyse — les phrases toutes simples passent (« ça rentre pas », « jy arrive pas », « jen ai marre », « je suis nul »).',
      'Un lexique de concepts : des dizaines de façons de dire « oublier », « bloquer », « en avoir marre », « être crevé »… mènent à la bonne réponse sans mot-clé exact. Et « l’anat rentre pas » est compris comme matière + problème, d’un coup.',
      '14 situations de plus : moral bas (avec la nuance qui va vers les bonnes ressources), réveil impossible, impasses, prof qui explique mal, sources contradictoires, quoi bosser ce soir, job étudiant, colocs bruyants, trajets, lendemain de soirée, repas sautés, oral, LAS/orientation, tutorat vs prépa.',
      'Et quand vraiment rien ne matche, Axel ne sèche plus : il fait tourner la recherche de l’app et te propose les fiches les plus proches.',
      'Le tout verrouillé par une table d’évaluation de ~175 phrases réelles testées, fautes et argot compris. Toujours 100 % local.',
    ],
  },
  {
    version: '1.8.0',
    date: '2026-08',
    items: [
      'Axel comprend beaucoup plus de choses : plus de 50 situations couvertes — sommeil, comparaison aux autres, pression familiale, doublants, fiches ou pas, musique, volume d’heures, échéances proches, perfectionnisme, trou noir en colle, plateau de progression, et bien d’autres.',
      'Il connaît chaque fiche par son nom : demande « c’est quoi le blurting ? » ou juste « feynman », il répond avec le vrai résumé de la fiche et le lien direct.',
      'Il suit la conversation : « ça n’a pas marché », « explique », « oui », « encore » — il approfondit le même sujet au lieu de repartir de zéro. Et si ton message mélange deux problèmes (« crevé et débordé »), il traite les deux.',
      'Il rattrape les fautes de frappe par distance d’édition, cite le protocole de ta matière quand tu la mentionnes, et démonte les mythes classiques (relire, surligner, recopier, « je suis visuel »).',
      'Le tout reste 100 % local et vérifié par une table d’évaluation de plus de 100 phrases testées.',
    ],
  },
  {
    version: '1.7.0',
    date: '2026-08',
    items: [
      'Les citations tournent vraiment tout le temps : ta position dans le flux est mémorisée — chaque ouverture de l’app affiche la phrase suivante, jamais la même. La rotation de l’accueil passe à 8 secondes et le plein écran reprend là où tu en étais.',
      'Plein écran : vraie glisse directionnelle entre les phrases (vers le haut = suivante, vers le bas = précédente).',
      'Chat d’Axel : suggestions + zone de saisie regroupées sur un fond plein — plus rien ne se chevauche, et le champ se cale au ras du clavier quand il s’ouvre.',
      'Barres en verre plus nettes : le contenu qui défile derrière ne gêne plus la lecture ; fondu de bord sur la rangée de suggestions.',
    ],
  },
  {
    version: '1.6.0',
    date: '2026-08',
    items: [
      'Vraie app sur iPhone et iPad : nouvelle icône Axel digne d’une app native, écrans de lancement pour tous les formats d’écran (fini le flash blanc à l’ouverture), et un guide d’installation en 3 gestes sur l’accueil.',
      'Une fois installée depuis Safari (Partager → « Sur l’écran d’accueil »), l’app est plein écran, hors ligne, avec son icône — sans App Store, sans compte, sans rien payer. C’est la seule voie qu’Apple autorise gratuitement, et elle est très bien.',
      'Tes données (favoris, historique, citations aimées) restent stockées sur ton appareil et survivent aux mises à jour.',
    ],
  },
  {
    version: '1.5.0',
    date: '2026-08',
    items: [
      'Axel, ton coach : une mascotte maison et un vrai chat local. Décris ton blocage avec tes mots (fautes et abréviations comprises), il répond naturellement — jamais deux fois pareil — avec les bons protocoles en un toucher. 100 % sur ton appareil.',
      'Citations en plein écran, façon fond d’écran : une phrase à la fois sur fond profond, toucher = suivante, cœur = favori, partage natif. La carte d’accueil ouvre directement ce mode.',
      'Le flux du jour mélange désormais les citations vérifiées avec des phrases de coach courtes et percutantes — écrites pour l’app, jamais faussement attribuées.',
      'Si ça ne va vraiment pas, Axel ne joue pas au thérapeute : il oriente vers de vraies personnes et le protocole Détresse.',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-08',
    items: [
      'Coach mental : une citation s’affiche sur l’accueil et change toutes les 12 secondes (un toucher passe à la suivante). L’ordre est remélangé chaque jour.',
      'Près de 300 citations réelles et vérifiées — la source est indiquée (œuvre, discours, lettre) ; quand la provenance n’est pas documentée, la phrase est honnêtement marquée « Attribué à ». Les fausses citations qui traînent partout sont bannies.',
      'Nouvelle page Citations : toute la banque, filtrable par thème (discipline, persévérance, calme, apprendre, science & médecine, courage).',
      'Méthode du jour sur l’accueil : chaque jour, une des 47 méthodes mise en avant — une façon simple d’élargir ta boîte à outils.',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-08',
    items: [
      'Navigation en fondu natif : les pages s’enchaînent avec les transitions de vue du navigateur, comme dans une app iOS.',
      'Grand titre à la iOS : en défilant, le titre de la page se replie dans une barre compacte en verre.',
      'Minuteur redessiné : un anneau de progression autour du temps restant.',
      'Le diagnostic et le pas-à-pas glissent d’une étape à l’autre ; les coches d’étapes ont un retour visuel.',
      'Matière affinée : liséré fin sur les cartes, carte d’entrée en dégradé, icônes cohérentes dans toutes les listes.',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-08',
    items: [
      'Recherche sur iPhone corrigée : le champ est maintenant en haut de l’écran — plus rien ne « monte » avec le clavier, et la barre d’onglets s’efface pendant la saisie.',
      'Micro-étapes : chaque étape des procédures détaille désormais le geste exact (« lis en surlignant les mots discriminants, ferme, récite idées puis mots-clés… »).',
      'Mode pas-à-pas : bouton « Suivre pas à pas » sur chaque fiche — la procédure défile en plein écran, une étape à la fois, et se termine sur « C’est acquis si… ».',
      'Reprendre : si tu quittes une méthode en cours d’étapes, l’accueil te propose de reprendre exactement où tu en étais.',
      'Bibliothèque : chaque catégorie affiche son nombre de méthodes.',
      'Survols et finitions sur iPad et desktop.',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-08',
    items: [
      'Les étapes « Fais ça maintenant » se cochent : tu vois où tu en es pendant que tu appliques la méthode.',
      'Minuteur intégré sur les protocoles chronométrés : démarrage en 10 minutes, Pomodoro, session de 20-30 minutes.',
      '« Pourquoi ça marche » : une phrase de justification, adossée à la recherche, sur les méthodes qui en ont une solide.',
      '« Ensuite » : chaque fiche propose la suite logique (exemple résolu → complétion → exercice à froid…).',
      'Ce panneau Nouveautés : après une mise à jour, l’app te dit ce qui a changé. Vérification manuelle possible dans Pour moi.',
      'Diagnostic : tes réponses restent affichées sur l’écran de résultat, et tu peux les modifier d’un geste.',
      'Recherche : le meilleur résultat est mis en avant avec son résumé, la Bibliothèque a un champ de recherche direct, et la touche « / » ouvre la recherche au clavier.',
      'Un exemple PASS concret sur chaque fiche méthode.',
      'Pastille « Hors ligne » quand le réseau coupe — tout continue de fonctionner.',
      'Aide à l’installation sur iPhone directement dans l’app.',
      'Transitions plus douces et retours visuels au toucher.',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-08',
    items: [
      'Première version : 47 méthodes, 12 protocoles matière, diagnostic adaptatif, SOS, recherche en langage naturel, mode hors ligne complet.',
    ],
  },
];

const SEEN_KEY = 'pmos:v1:lastSeenVersion';
const PREFIX = 'pmos:v1:';

function readSeen(): string | null {
  try {
    return localStorage.getItem(SEEN_KEY);
  } catch {
    return null;
  }
}

export function markVersionSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, APP_VERSION);
  } catch {
    // stockage indisponible : on n'insiste pas
  }
}

/** L'utilisateur a-t-il déjà utilisé l'app (favoris, historique, thème…) ? */
function hasPriorUsage(): boolean {
  // Clés techniques écrites par l'app elle-même dès le premier rendu :
  // elles ne prouvent aucun usage réel et ne doivent jamais déclencher
  // le panneau « mise à jour » chez un tout nouvel utilisateur.
  const technical = new Set([SEEN_KEY, `${PREFIX}feedPos`]);
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k !== null && k.startsWith(PREFIX) && !technical.has(k)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Le panneau s'affiche uniquement après une mise à jour chez quelqu'un qui
 * utilisait déjà l'app — jamais au tout premier lancement.
 */
export function shouldShowWhatsNew(): boolean {
  const seen = readSeen();
  if (seen === APP_VERSION) return false;
  if (seen !== null) return true;
  return hasPriorUsage();
}

/** Entrées à présenter (toutes celles publiées après la dernière vue). */
export function unseenChangelog(): ChangelogEntry[] {
  const seen = readSeen();
  if (seen === null) return CHANGELOG.slice(0, 1);
  const idx = CHANGELOG.findIndex((e) => e.version === seen);
  return idx > 0 ? CHANGELOG.slice(0, idx) : CHANGELOG.slice(0, 1);
}
