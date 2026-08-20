// Captures de revue pour les écrans v1.1 (hors suite de tests).
import { chromium, devices } from '@playwright/test';

const BASE = 'http://127.0.0.1:4173/Nouvelle-app-1-/#';
const OUT =
  process.argv[2] ??
  '/tmp/claude-0/-home-user-Nouvelle-app-1-/2cdad411-0176-5a95-8bf4-8cfe69e9c7ad/scratchpad/shots-v11';

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH
    ? { executablePath: process.env.PW_CHROMIUM_PATH }
    : {},
);

async function ctx(scheme = 'light', seed = false) {
  const c = await browser.newContext({ ...devices['iPhone 14 Pro'], defaultBrowserType: undefined, colorScheme: scheme });
  if (seed) {
    await c.addInitScript(() => {
      localStorage.setItem('pmos:v1:lastSeenVersion', '1.0.0');
      localStorage.setItem('pmos:v1:favorites', JSON.stringify(['feynman']));
    });
  }
  return c;
}

// Accueil + section Application.
let c = await ctx();
let p = await c.newPage();
await p.goto(BASE + '/');
await p.waitForTimeout(400);
await p.screenshot({ path: `${OUT}/home-hero.png` });
await p.locator('.section', { hasText: 'Application' }).scrollIntoViewIfNeeded();
await p.waitForTimeout(200);
await p.screenshot({ path: `${OUT}/home-application.png` });
await c.close();

// Panneau Nouveautés (mise à jour simulée).
c = await ctx('light', true);
p = await c.newPage();
await p.goto(BASE + '/');
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/whatsnew.png` });
await c.close();

// Fiche : checklist + pourquoi + ensuite.
c = await ctx('dark');
p = await c.newPage();
await p.goto(BASE + '/methode/rappel-actif');
await p.waitForTimeout(300);
await p.locator('.check-step').nth(0).click();
await p.locator('.check-step').nth(1).click();
await p.screenshot({ path: `${OUT}/methode-checklist-dark.png` });
await p.goto(BASE + '/methode/exemple-resolu');
await p.waitForTimeout(300);
await p.locator('.next-card').scrollIntoViewIfNeeded();
await p.screenshot({ path: `${OUT}/methode-next-dark.png` });
await c.close();

// Minuteur.
c = await ctx();
p = await c.newPage();
await p.goto(BASE + '/methode/demarrage-10-minutes');
await p.waitForTimeout(300);
await p.locator('.timer').scrollIntoViewIfNeeded();
await p.screenshot({ path: `${OUT}/timer.png` });
await c.close();

// Recherche : meilleur résultat.
c = await ctx();
p = await c.newPage();
await p.goto(BASE + '/recherche');
await p.getByRole('searchbox').fill('je melange');
await p.waitForTimeout(350);
await p.screenshot({ path: `${OUT}/search-tophit.png` });
await c.close();

await browser.close();
console.log('done');
