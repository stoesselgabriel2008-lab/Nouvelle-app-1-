/**
 * Génère toutes les icônes de la PWA à partir d'un même dessin vectoriel :
 * Axel (la mascotte) sur fond indigo profond — l'identité de l'app sur
 * l'écran d'accueil.
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

const DEFS = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#232a68" />
      <stop offset="1" stop-color="#12142e" />
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6fa5ff" />
      <stop offset="1" stop-color="#7b5cff" />
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.32" r="0.75">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>`;

/** Axel (mêmes formes que src/ui/Axel.tsx, humeur joyeuse), viewBox 120. */
const AXEL = `
  <g stroke="#5f6ee0" stroke-width="5" stroke-linecap="round" fill="none">
    <path d="M45 34c-4-8-2-14 3-19" />
    <path d="M60 30c0-8 2-13 7-17" />
    <path d="M75 34c5-6 6-12 3-18" />
  </g>
  <circle cx="48" cy="14" r="4.6" fill="#5f6ee0" />
  <circle cx="67" cy="12" r="4.6" fill="#5f6ee0" />
  <circle cx="78" cy="15" r="4.6" fill="#5f6ee0" />
  <path d="M92 88c8 2 13 7 14 14" stroke="#5f6ee0" stroke-width="6" stroke-linecap="round" fill="none" />
  <circle cx="107" cy="104" r="5.4" fill="#5f6ee0" />
  <ellipse cx="60" cy="68" rx="42" ry="40" fill="url(#body)" />
  <ellipse cx="48" cy="54" rx="18" ry="12" fill="#ffffff" opacity="0.14" />
  <ellipse cx="36" cy="78" rx="7.5" ry="5" fill="#ff9fb0" opacity="0.55" />
  <ellipse cx="84" cy="78" rx="7.5" ry="5" fill="#ff9fb0" opacity="0.55" />
  <ellipse cx="45" cy="64" rx="10.5" ry="12" fill="#ffffff" />
  <ellipse cx="75" cy="64" rx="10.5" ry="12" fill="#ffffff" />
  <circle cx="46.5" cy="64.5" r="5.4" fill="#1d2150" />
  <circle cx="76.5" cy="64.5" r="5.4" fill="#1d2150" />
  <circle cx="48.4" cy="62.4" r="1.9" fill="#ffffff" />
  <circle cx="78.4" cy="62.4" r="1.9" fill="#ffffff" />
  <path d="M50 80c4 5 16 5 20 0" stroke="#1d2150" stroke-width="4.5" stroke-linecap="round" fill="none" />`;

function scene(axelScale, rounded) {
  const size = 120 * axelScale;
  const x = (512 - size) / 2;
  const y = (512 - size) / 2 + 10; // léger ancrage bas, l'épi respire en haut
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${DEFS}
  <rect width="512" height="512" ${rounded ? 'rx="116"' : ''} fill="url(#bg)"/>
  <rect width="512" height="512" ${rounded ? 'rx="116"' : ''} fill="url(#halo)"/>
  <g transform="translate(${x}, ${y}) scale(${axelScale})">${AXEL}</g>
</svg>`;
}

const rounded = scene(3.1, true);
const fullBleed = scene(3.1, false);
const maskable = scene(2.5, false);

await mkdir(OUT, { recursive: true });

await sharp(Buffer.from(rounded)).resize(512, 512).png().toFile(path.join(OUT, 'icon-512.png'));
await sharp(Buffer.from(rounded)).resize(192, 192).png().toFile(path.join(OUT, 'icon-192.png'));
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile(path.join(OUT, 'maskable-512.png'));
await sharp(Buffer.from(fullBleed)).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
await writeFile(path.join(OUT, 'favicon.svg'), rounded, 'utf8');

console.log('Icônes générées dans public/icons/');
