// Captures rapides pour revue visuelle (hors suite de tests).
import { chromium, devices } from '@playwright/test';

const BASE = 'http://127.0.0.1:4173/Nouvelle-app-1-/#';
const OUT = process.argv[2] ?? '/tmp/claude-0/-home-user-Nouvelle-app-1-/2cdad411-0176-5a95-8bf4-8cfe69e9c7ad/scratchpad/shots';

const targets = [
  ['home', '/'],
  ['bibliotheque', '/bibliotheque'],
  ['methode', '/methode/tableau-contraste'],
  ['diagnostic', '/diagnostic'],
  ['sos', '/sos'],
  ['sos-detresse', '/sos/detresse'],
  ['recherche', '/recherche'],
  ['matiere', '/matiere/histologie'],
];

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH
    ? { executablePath: process.env.PW_CHROMIUM_PATH }
    : {},
);

async function shoot(deviceName, suffix, colorScheme) {
  const dev = devices[deviceName];
  const ctx = await browser.newContext({
    ...dev,
    defaultBrowserType: undefined,
    colorScheme,
  });
  const page = await ctx.newPage();
  for (const [name, route] of targets) {
    await page.goto(BASE + route);
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${OUT}/${suffix}-${name}.png`, fullPage: false });
  }
  await ctx.close();
}

await shoot('iPhone 14 Pro', 'iphone-light', 'light');
await shoot('iPhone 14 Pro', 'iphone-dark', 'dark');
await shoot('iPad Pro 11', 'ipad-light', 'light');
await browser.close();
console.log('done');
