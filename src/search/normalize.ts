/**
 * Normalisation française pour la recherche : accents, casse, ligatures,
 * pluriels naïfs. Appliquée identiquement à l'indexation et à la requête,
 * ce qui rend « proteines », « Protéine » et « PROTÉINES » équivalents.
 */

const COMBINING_MARKS = /[\u0300-\u036f]/g;

export function foldText(input: string): string {
  return input
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'ae')
    .replace(/[’']/g, ' ')
    .toLowerCase();
}

/** Singularisation naïve, suffisante pour la recherche (pas pour l'affichage). */
export function singularize(term: string): string {
  if (term.length <= 3) return term;
  if (term.endsWith('aux')) return term.slice(0, -3) + 'al';
  if (term.endsWith('s') || term.endsWith('x')) return term.slice(0, -1);
  return term;
}

export function normalizeTerm(term: string): string {
  return singularize(foldText(term).trim());
}

/** Version « phrase » : normalise et compacte les espaces, sans singulariser. */
export function foldPhrase(input: string): string {
  return foldText(input).replace(/\s+/g, ' ').trim();
}
