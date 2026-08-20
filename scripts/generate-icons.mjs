/**
 * Génère toutes les icônes de la PWA à partir d'un même dessin vectoriel :
 * - icons/icon-192.png, icons/icon-512.png (purpose any, coins arrondis)
 * - icons/maskable-512.png (pleine surface + zone de sécurité)
 * - icons/apple-touch-icon.png (180×180, pleine surface — iOS applique son masque)
 * - icons/favicon.svg
 *
 * Usage : npm run icons
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/icons');

const GRADIENT = `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d66ec" />
      <stop offset="1" stop-color="#0745ad" />
    </linearGradient>
  </defs>`;

/** Le monogramme « M » (Methods) — trait continu, géométrie simple. */
function glyph(scale = 1, offset = 0) {
  const s = (n) => n * scale + offset;
  return `<path d="M ${s(144)} ${s(354)} V ${s(186)} c 0 ${-15 * scale} ${18 * scale} ${-23 * scale} ${29.5 * scale} ${-13 * scale} l ${82.5 * scale} ${77 * scale} l ${82.5 * scale} ${-77 * scale} c ${11.5 * scale} ${-10 * scale} ${29.5 * scale} ${-2 * scale} ${29.5 * scale} ${13 * scale} V ${s(354)}"
    fill="none" stroke="#ffffff" stroke-width="${38 * scale}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT}
  <rect width="512" height="512" rx="116" fill="url(#g)"/>
  ${glyph()}
</svg>`;

const fullBleed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT}
  <rect width="512" height="512" fill="url(#g)"/>
  ${glyph(0.82, 512 * 0.09)}
</svg>`;

await mkdir(OUT, { recursive: true });

await sharp(Buffer.from(rounded)).resize(512, 512).png().toFile(path.join(OUT, 'icon-512.png'));
await sharp(Buffer.from(rounded)).resize(192, 192).png().toFile(path.join(OUT, 'icon-192.png'));
await sharp(Buffer.from(fullBleed)).resize(512, 512).png().toFile(path.join(OUT, 'maskable-512.png'));
await sharp(Buffer.from(fullBleed)).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
await writeFile(path.join(OUT, 'favicon.svg'), rounded, 'utf8');

console.log('Icônes générées dans public/icons/');
