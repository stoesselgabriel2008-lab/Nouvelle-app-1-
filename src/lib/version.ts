/**
 * Version de l'app et journal des nouveautés, affiché dans le panneau
 * « Quoi de neuf » après chaque mise à jour et depuis Pour moi → Application.
 *
 * À chaque évolution visible : incrémenter APP_VERSION et ajouter une entrée
 * en tête de CHANGELOG (phrases courtes, orientées utilisateur).
 */

export const APP_VERSION = '1.1.0';

export interface ChangelogEntry {
  version: string;
  date: string; // AAAA-MM
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
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
