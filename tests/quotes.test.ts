import { describe, expect, it } from 'vitest';
import {
  QUOTES,
  QUOTE_THEME_LABELS,
  dailySeed,
  shuffledQuoteOrder,
} from '../src/content/quotes';

/**
 * La banque de citations est un contenu éditorial avec des règles strictes :
 * réelles uniquement, provenance indiquée ou attribution honnête, apocryphes
 * connus bannis. Ces tests verrouillent ces règles.
 */

const THEMES = Object.keys(QUOTE_THEME_LABELS);

describe('banque de citations', () => {
  it('contient une réserve suffisante pour une rotation longue', () => {
    expect(QUOTES.length).toBeGreaterThanOrEqual(250);
  });

  it('aucun doublon de texte', () => {
    const texts = new Set(QUOTES.map((q) => q.text));
    expect(texts.size).toBe(QUOTES.length);
  });

  it('texte et auteur toujours renseignés, longueurs raisonnables', () => {
    for (const q of QUOTES) {
      expect(q.text.trim().length, q.text).toBeGreaterThan(10);
      expect(q.text.length, q.text).toBeLessThan(320);
      expect(q.author.trim().length, q.text).toBeGreaterThan(1);
    }
  });

  it('chaque thème existe et est utilisé largement', () => {
    for (const q of QUOTES) {
      expect(THEMES, `thème inconnu : ${q.theme}`).toContain(q.theme);
    }
    for (const t of THEMES) {
      const n = QUOTES.filter((q) => q.theme === t).length;
      expect(n, `thème trop pauvre : ${t}`).toBeGreaterThanOrEqual(15);
    }
  });

  it('toute citation d’auteur a une source documentée ou est marquée « Attribué à »', () => {
    for (const q of QUOTES) {
      const isProverb = /proverbe|devise|maxime|adage/i.test(q.author);
      if (isProverb) continue;
      const ok = q.note !== undefined || q.attributed === true;
      expect(ok, `${q.author} : « ${q.text.slice(0, 60)} »`).toBe(true);
    }
  });

  it('les apocryphes connus sont bannis (liste noire)', () => {
    // Chaque entrée : [motif dans le texte, auteur concerné]. Ces phrases
    // circulent partout mais n'ont jamais été dites/écrites par cet auteur.
    const blacklist: [RegExp, RegExp][] = [
      [/impossible jusqu|semble toujours impossible/i, /mandela/i],
      [/je ne perds jamais|soit je gagne, soit j.apprends/i, /mandela/i],
      [/échec en échec/i, /churchill/i],
      [/folie.*(recommencer|même chose)|même chose.*résultat différent/i, /einstein/i],
      [/poisson.*grimper|grimper.*arbre/i, /einstein/i],
      [/soyez le changement|incarnez le changement/i, /gandhi/i],
      [/chance.*préparation|préparation.*opportunité/i, /sén[eè]que/i],
      [/peu importe.*lentement|lentement.*ne t.arrêtes/i, /confucius/i],
      [/savaient pas que c.était impossible|ignoraient que c.était impossible/i, /twain/i],
      [/persévérance.*secret.*triomphes/i, /hugo/i],
      [/plus fort.*survit|espèce.*adaptable/i, /darwin/i],
    ];
    for (const q of QUOTES) {
      for (const [textPat, authorPat] of blacklist) {
        const hit = textPat.test(q.text) && authorPat.test(q.author);
        expect(hit, `apocryphe détecté : ${q.author} — ${q.text}`).toBe(false);
      }
    }
  });

  it('les guillemets sont ajoutés par l’interface, pas stockés dans le texte', () => {
    for (const q of QUOTES) {
      expect(q.text.startsWith('«'), q.text).toBe(false);
      expect(q.text.endsWith('»'), q.text).toBe(false);
    }
  });
});

describe('rotation déterministe', () => {
  it('même graine → même ordre ; graines différentes → ordres différents', () => {
    const a = shuffledQuoteOrder(20260821);
    const b = shuffledQuoteOrder(20260821);
    const c = shuffledQuoteOrder(20260822);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it('l’ordre est une permutation complète de la banque', () => {
    const order = shuffledQuoteOrder(20260821);
    expect(order.length).toBe(QUOTES.length);
    expect(new Set(order).size).toBe(QUOTES.length);
    expect(Math.min(...order)).toBe(0);
    expect(Math.max(...order)).toBe(QUOTES.length - 1);
  });

  it('la graine du jour encode la date (stable dans la journée)', () => {
    expect(dailySeed(new Date(2026, 7, 21))).toBe(20260821);
    expect(dailySeed(new Date(2026, 0, 1))).toBe(20260101);
  });
});
