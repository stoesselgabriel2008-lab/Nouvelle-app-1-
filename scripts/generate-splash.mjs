/**
 * Écrans de lancement iOS (apple-touch-startup-image) : iOS les affiche
 * pendant l'ouverture de l'app installée — c'est ce qui fait « vraie app »
 * au lieu d'un flash blanc. Un fichier par taille d'écran (points × densité),
 * relié par media queries dans index.html.
 *
 * Usage : node scripts/generate-splash.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/splash');

// [nom, largeur px, hauteur px]
const SIZES = [
  // iPhone (portrait)
  ['iphone-se', 750, 1334], //  375×667 @2 (SE 2/3, 8)
  ['iphone-xr', 828, 1792], //  414×896 @2 (XR, 11)
  ['iphone-12', 1170, 2532], // 390×844 @3 (12, 13, 14)
  ['iphone-14p', 1179, 2556], // 393×852 @3 (14 Pro, 15, 16)
  ['iphone-16p', 1206, 2622], // 402×874 @3 (16 Pro)
  ['iphone-12m', 1284, 2778], // 428×926 @3 (12/13 Pro Max, 14 Plus)
  ['iphone-14m', 1290, 2796], // 430×932 @3 (14/15 Pro Max, 15/16 Plus)
  ['iphone-16m', 1320, 2868], // 440×956 @3 (16 Pro Max)
  // iPad (portrait + paysage)
  ['ipad-air', 1640, 2360], //   820×1180 @2 (Air 10.9/11)
  ['ipad-air-l', 2360, 1640],
  ['ipad-11', 1668, 2388], //    834×1194 @2 (Pro 11)
  ['ipad-11-l', 2388, 1668],
  ['ipad-13', 2048, 2732], //    1024×1366 @2 (Pro 12.9/13)
  ['ipad-13-l', 2732, 2048],
];

/** Même scène que l'icône : Axel sur indigo profond, centré. */
function svg(w, h) {
  const mark = Math.round(Math.min(w, h) * 0.3);
  const x = (w - mark) / 2;
  const y = (h - mark) / 2 - Math.round(h * 0.02);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d2354" />
      <stop offset="1" stop-color="#0e1027" />
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6fa5ff" />
      <stop offset="1" stop-color="#7b5cff" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g transform="translate(${x}, ${y}) scale(${mark / 120})">
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
    <path d="M50 80c4 5 16 5 20 0" stroke="#1d2150" stroke-width="4.5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;
}

await mkdir(OUT, { recursive: true });
for (const [name, w, h] of SIZES) {
  await sharp(Buffer.from(svg(w, h)))
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT, `${name}.png`));
}
console.log(`${SIZES.length} écrans de lancement générés dans public/splash/`);
