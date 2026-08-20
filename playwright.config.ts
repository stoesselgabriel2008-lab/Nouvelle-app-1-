import { defineConfig, devices } from '@playwright/test';

/**
 * E2E : anti-troncature multi-viewports, offline PWA, parcours produit.
 * Tout tourne sur le build de production servi par `vite preview`.
 */

const BASE_URL = 'http://127.0.0.1:4173/Nouvelle-app-1-/';

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    // Chromium préinstallé de l'environnement (indépendant de la version npm).
    launchOptions: process.env['PW_CHROMIUM_PATH']
      ? { executablePath: process.env['PW_CHROMIUM_PATH'] }
      : {},
  },
  webServer: {
    command: 'npm run preview',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    {
      // Plus petit iPhone retenu : 320 px de large.
      name: 'iphone-se',
      use: { ...devices['iPhone SE'], browserName: 'chromium' },
    },
    {
      name: 'iphone-pro-max',
      use: { ...devices['iPhone 14 Pro Max'], browserName: 'chromium' },
    },
    {
      name: 'ipad-portrait',
      use: { ...devices['iPad Pro 11'], browserName: 'chromium' },
    },
    {
      name: 'ipad-landscape',
      use: { ...devices['iPad Pro 11 landscape'], browserName: 'chromium' },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
