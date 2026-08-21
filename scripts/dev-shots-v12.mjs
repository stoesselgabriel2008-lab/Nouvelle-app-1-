// Captures de revue v1.2 : recherche en haut, pas-à-pas, micro-étapes.
import { chromium, devices } from '@playwright/test';

const BASE = 'http://127.0.0.1:4173/Nouvelle-app-1-/#';
const OUT =
  process.argv[2] ??
  '/tmp/claude-0/-home-user-Nouvelle-app-1-/2cdad411-0176-5a95-8bf4-8cfe69e9c7ad/scratchpad/shots-v12';

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH
    ? { executablePath: process.env.PW_CHROMIUM_PATH }
    : {},
);

const ctx = await browser.newContext({
  ...devices['iPhone 14 Pro'],
  defaultBrowserType: undefined,
});
const p = await ctx.newPage();

// Recherche : champ en haut, résultats sous le champ, saisie active.
await p.goto(BASE + '/recherche');
await p.getByRole('searchbox').fill('histo image');
await p.waitForTimeout(350);
await p.screenshot({ path: `${OUT}/search-top.png` });

// Micro-étapes dans la procédure complète.
await p.goto(BASE + '/methode/feuille-blanche');
await p.getByRole('button', { name: 'Voir la procédure complète' }).click();
await p.waitForTimeout(250);
await p.locator('.micro-steps').first().scrollIntoViewIfNeeded();
await p.screenshot({ path: `${OUT}/micro-steps.png` });

// Mode pas-à-pas, étape avec micro.
await p.goto(BASE + '/methode/tableau-contraste');
await p.getByRole('button', { name: 'Suivre pas à pas' }).click();
await p.waitForTimeout(250);
await p.getByRole('button', { name: /Étape suivante/ }).click();
await p.waitForTimeout(250);
await p.screenshot({ path: `${OUT}/guided-step.png` });
for (let i = 0; i < 4; i++) {
  await p.getByRole('button', { name: /Étape suivante|Terminer/ }).click();
  await p.waitForTimeout(120);
}
await p.screenshot({ path: `${OUT}/guided-done.png` });

await ctx.close();
await browser.close();
console.log('done');
