/**
 * Version de l'app et journal des nouveautés, affiché dans le panneau
 * « Quoi de neuf » après chaque mise à jour et depuis Pour moi → Application.
 *
 * À chaque évolution visible : incrémenter APP_VERSION et ajouter une entrée
 * en tête de CHANGELOG (phrases courtes, orientées utilisateur).
 */

export const APP_VERSION = '1.4.0';

export interface ChangelogEntry {
  version: string;
  date: string; // AAAA-MM
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
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
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k !== null && k.startsWith(PREFIX) && k !== SEEN_KEY) return true;
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
