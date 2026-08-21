import { QUOTES, dailySeed, shuffledOrder, type Quote, type QuoteTheme } from './quotes';
import { COACH_LINES } from './coach-lines';

/**
 * Flux du jour : phrases de coach (percutantes, sans auteur) entrelacées avec
 * les citations d'auteurs (sourcées). L'ordre est remélangé chaque jour, le
 * flux commence par une phrase de coach — l'accueil doit frapper juste.
 */

export interface FeedItem {
  kind: 'coach' | 'quote';
  text: string;
  theme: QuoteTheme;
  author?: string;
  note?: string;
  attributed?: boolean;
}

export function quoteToItem(q: Quote): FeedItem {
  const item: FeedItem = { kind: 'quote', text: q.text, theme: q.theme, author: q.author };
  if (q.note !== undefined) item.note = q.note;
  if (q.attributed === true) item.attributed = true;
  return item;
}

export function buildFeed(seed = dailySeed()): FeedItem[] {
  const coach = shuffledOrder(seed ^ 0x9e3779b9, COACH_LINES.length).map((i) => {
    const l = COACH_LINES[i]!;
    return { kind: 'coach', text: l.text, theme: l.theme } as FeedItem;
  });
  const quotes = shuffledOrder(seed, QUOTES.length).map((i) => quoteToItem(QUOTES[i]!));
  // Entrelacement 1:1 tant qu'il reste des phrases de coach, puis les citations.
  const out: FeedItem[] = [];
  const n = Math.max(coach.length, quotes.length);
  for (let i = 0; i < n; i++) {
    if (i < coach.length) out.push(coach[i]!);
    if (i < quotes.length) out.push(quotes[i]!);
  }
  return out;
}

/** Ligne d'attribution affichée sous le texte (vide pour une phrase de coach). */
export function feedAuthorLine(item: FeedItem): string {
  if (item.kind === 'coach' || item.author === undefined) return '';
  return item.attributed === true ? `Attribué à ${item.author}` : item.author;
}
