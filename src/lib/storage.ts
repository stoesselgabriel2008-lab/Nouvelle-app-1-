/**
 * Stockage local uniquement — pas de compte, pas de cloud, pas de tracking.
 * Clés versionnées : une mise à jour de l'app ne touche jamais aux données
 * (localStorage survit aux mises à jour du service worker).
 */

const PREFIX = 'pmos:v1:';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Stockage plein ou indisponible : l'app reste fonctionnelle sans persistance.
  }
}

// ---------------------------------------------------------------- Favoris

export function getFavorites(): string[] {
  return read<string[]>('favorites', []);
}

export function isFavorite(methodId: string): boolean {
  return getFavorites().includes(methodId);
}

export function toggleFavorite(methodId: string): string[] {
  const current = getFavorites();
  const next = current.includes(methodId)
    ? current.filter((id) => id !== methodId)
    : [methodId, ...current];
  write('favorites', next);
  return next;
}

// ------------------------------------------------- Personnalité du coach

export type StoredCoachMode = 'classique' | 'sergent' | 'zen';

export function getCoachMode(): StoredCoachMode {
  const v = read<string>('coachMode', 'classique');
  return v === 'sergent' || v === 'zen' ? v : 'classique';
}

export function setCoachMode(mode: StoredCoachMode): void {
  write('coachMode', mode);
}

// ------------------------------------------------------ Mode Déclic (v3.1)

export type TalkTonePref = 'franc' | 'doux';

/** Ton préféré des discours du Déclic (franc par défaut — c'est le concept). */
export function getTalkTone(): TalkTonePref {
  const v = read<string>('talkTone', 'franc');
  return v === 'doux' ? 'doux' : 'franc';
}

export function setTalkTone(tone: TalkTonePref): void {
  write('talkTone', tone);
}

/** « Ta raison, tes mots » — resservie dans les discours. Vide = pas définie. */
export function getWhy(): string {
  return read<string>('why', '');
}

export function setWhy(text: string): void {
  write('why', text.trim().slice(0, 220));
}

// --------------------------------------------- Ambiance du flux (plein écran)

export function getZenFilter(): string {
  return read<string>('zenFilter', 'tout');
}

export function setZenFilter(filter: string): void {
  write('zenFilter', filter);
}

// ------------------------------------------------- Curseur du flux mental

/**
 * Position persistante dans le flux de citations : chaque ouverture de l'app
 * et chaque passage à la suivante avancent ce curseur — on ne retombe jamais
 * sur la même phrase en rouvrant l'app.
 */
export function peekFeedPos(): number {
  return read<number>('feedPos', -1);
}

export function advanceFeedPos(): number {
  const next = peekFeedPos() + 1;
  write('feedPos', next);
  return next;
}

// -------------------------------------------------- Carte d'installation

export function isInstallCardHidden(): boolean {
  return read<boolean>('installCardHidden', false);
}

export function hideInstallCard(): void {
  write('installCardHidden', true);
}

// ------------------------------------------------- Citations favorites (cœur)

/** Identifiée par son texte (unicité garantie par test). */
export function getQuoteFavs(): string[] {
  return read<string[]>('quoteFavs', []);
}

export function isQuoteFav(text: string): boolean {
  return getQuoteFavs().includes(text);
}

export function toggleQuoteFav(text: string): string[] {
  const current = getQuoteFavs();
  const next = current.includes(text)
    ? current.filter((t) => t !== text)
    : [text, ...current];
  write('quoteFavs', next);
  return next;
}

// ------------------------------------------------------ Dernières consultations

export interface RecentEntry {
  kind: 'method' | 'sos' | 'subject';
  id: string;
  at: number;
}

const RECENTS_MAX = 20;

export function getRecents(): RecentEntry[] {
  return read<RecentEntry[]>('recents', []);
}

export function pushRecent(kind: RecentEntry['kind'], id: string): void {
  const now = Date.now();
  const rest = getRecents().filter((r) => !(r.kind === kind && r.id === id));
  write('recents', [{ kind, id, at: now }, ...rest].slice(0, RECENTS_MAX));
}

export function clearRecents(): void {
  write('recents', []);
}

// ------------------------------------------------------ Historique de recherche

const SEARCHES_MAX = 8;

export function getRecentSearches(): string[] {
  return read<string[]>('searches', []);
}

export function pushRecentSearch(query: string): void {
  const q = query.trim();
  if (q.length < 2) return;
  const rest = getRecentSearches().filter(
    (s) => s.toLowerCase() !== q.toLowerCase(),
  );
  write('searches', [q, ...rest].slice(0, SEARCHES_MAX));
}

export function clearRecentSearches(): void {
  write('searches', []);
}

// ---------------------------------------------------------------- Thème

export type ThemePref = 'system' | 'light' | 'dark';

export function getThemePref(): ThemePref {
  try {
    const raw = localStorage.getItem(PREFIX + 'theme');
    if (raw === 'light' || raw === 'dark') return raw;
    return 'system';
  } catch {
    return 'system';
  }
}

export function setThemePref(pref: ThemePref): void {
  try {
    if (pref === 'system') localStorage.removeItem(PREFIX + 'theme');
    else localStorage.setItem(PREFIX + 'theme', pref);
  } catch {
    // ignore
  }
  applyTheme(pref);
}

export function applyTheme(pref: ThemePref): void {
  const root = document.documentElement;
  if (pref === 'system') delete root.dataset['theme'];
  else root.dataset['theme'] = pref;
}
