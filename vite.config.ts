import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Base publique : le site est servi par GitHub Pages sous
// https://stoesselgabriel2008-lab.github.io/Nouvelle-app-1-/
// (chemin sensible à la casse — il doit correspondre exactement au nom du dépôt).
const BASE = '/Nouvelle-app-1-/';

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon.svg'],
      manifest: {
        id: BASE,
        name: 'PASS Methods OS',
        short_name: 'Methods OS',
        description:
          'Méthode → diagnostic → action. La bonne méthode de travail PASS, tout de suite, étape par étape. Fonctionne hors ligne.',
        lang: 'fr',
        dir: 'ltr',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'any',
        background_color: '#f2f2f7',
        theme_color: '#f2f2f7',
        categories: ['education', 'productivity'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        // Les écrans de lancement ne servent qu'à iOS au démarrage : inutile
        // de les mettre dans le cache hors ligne de l'app.
        globIgnores: ['**/splash/**'],
        navigateFallback: `${BASE}index.html`,
        // Tout le contenu est embarqué dans le bundle : après le premier
        // chargement, l'app entière (bibliothèque, diagnostic, SOS, recherche)
        // est disponible hors ligne.
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
      },
    }),
  ],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
