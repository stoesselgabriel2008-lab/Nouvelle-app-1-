/**
 * Micro-typographie fran\u00e7aise : jamais de ponctuation orpheline en d\u00e9but
 * de ligne. Appliqu\u00e9 \u00e0 l'affichage (bulles, citations), pas au stockage.
 */

const NBSP = '\u00a0';

export function frTypo(input: string): string {
  return input
    .replace(/\u00ab /g, '\u00ab' + NBSP)
    .replace(/ ([:;!?\u00bb])/g, NBSP + '$1');
}
