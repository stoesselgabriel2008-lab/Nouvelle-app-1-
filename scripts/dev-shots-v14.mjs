import { chromium, devices } from '@playwright/test';
const BASE = 'http://127.0.0.1:4173/Nouvelle-app-1-/#';
const OUT = process.env.SHOT_DIR ?? 'shots-v14';
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH });

// iPhone — accueil (citation + méthode du jour), page Citations, filtre.
const ctx = await browser.newContext({ ...devices['iPhone 14 Pro'], defaultBrowserType: undefined });
const p = await ctx.newPage();
await p.goto(BASE + '/');
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/home-quote.png` });
await p.locator('.quote-tap').click();
await p.waitForTimeout(700);
await p.screenshot({ path: `${OUT}/home-quote-next.png` });
await p.goto(BASE + '/citations');
await p.waitForTimeout(400);
await p.screenshot({ path: `${OUT}/citations.png` });
await p.getByRole('button', { name: 'Persévérance' }).click();
await p.waitForTimeout(300);
await p.screenshot({ path: `${OUT}/citations-filtre.png` });
// Sombre
await p.emulateMedia({ colorScheme: 'dark' });
await p.goto(BASE + '/');
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/home-quote-dark.png` });
await ctx.close();

// iPad — accueil + citations en deux colonnes.
const ctx2 = await browser.newContext({ ...devices['iPad Pro 11 landscape'], defaultBrowserType: undefined });
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/citations');
await p2.waitForTimeout(400);
await p2.screenshot({ path: `${OUT}/citations-ipad.png` });
await p2.goto(BASE + '/');
await p2.waitForTimeout(400);
await p2.screenshot({ path: `${OUT}/home-ipad.png` });
await ctx2.close();

await browser.close();
console.log('done');
