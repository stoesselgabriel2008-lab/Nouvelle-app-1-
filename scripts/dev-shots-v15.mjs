import { chromium, devices } from '@playwright/test';
const BASE = 'http://127.0.0.1:4173/Nouvelle-app-1-/#';
const OUT = process.env.SHOT_DIR ?? 'shots-v15';
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH });

const ctx = await browser.newContext({ ...devices['iPhone 14 Pro'], defaultBrowserType: undefined });
const p = await ctx.newPage();

// Accueil : héro citation sombre + carte Axel.
await p.goto(BASE + '/');
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/home.png` });

// Plein écran.
await p.locator('.quote-hero').click();
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/zen.png` });
await p.locator('.zen-body').click();
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/zen-next.png` });

// Chat Axel : accueil + réponse procrastination + détresse.
await p.goto(BASE + '/coach');
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/coach.png` });
await p.getByRole('textbox').fill('je procrastine');
await p.getByRole('button', { name: 'Envoyer' }).click();
await p.waitForTimeout(1400);
await p.screenshot({ path: `${OUT}/coach-reply.png` });
await p.getByRole('textbox').fill('je vais craquer');
await p.getByRole('button', { name: 'Envoyer' }).click();
await p.waitForTimeout(1400);
await p.screenshot({ path: `${OUT}/coach-detresse.png` });

// Citations : lanceur plein écran + filtre coach.
await p.goto(BASE + '/citations');
await p.waitForTimeout(400);
await p.screenshot({ path: `${OUT}/citations.png` });

await ctx.close();

// iPad paysage : accueil + coach.
const ctx2 = await browser.newContext({ ...devices['iPad Pro 11 landscape'], defaultBrowserType: undefined });
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/');
await p2.waitForTimeout(500);
await p2.screenshot({ path: `${OUT}/home-ipad.png` });
await p2.goto(BASE + '/coach');
await p2.waitForTimeout(500);
await p2.screenshot({ path: `${OUT}/coach-ipad.png` });
await ctx2.close();

await browser.close();
console.log('done');
