// Smoke test du site déployé (GitHub Pages) : navigation, recherche,
// diagnostic, manifest et service worker.
import { chromium } from '@playwright/test';

const BASE = process.argv[2] ?? 'https://stoesselgabriel2008-lab.github.io/Nouvelle-app-1-/';
const results = [];
const ok = (name, cond) => {
  results.push([cond ? 'PASS' : 'FAIL', name]);
  if (!cond) process.exitCode = 1;
};

const proxy = process.env.HTTPS_PROXY ?? process.env.https_proxy;
const browser = await chromium.launch({
  ...(process.env.PW_CHROMIUM_PATH
    ? { executablePath: process.env.PW_CHROMIUM_PATH }
    : {}),
  ...(proxy ? { proxy: { server: proxy } } : {}),
});
// ignoreHTTPSErrors : le proxy sortant de l'environnement ré-émet les
// certificats avec sa propre CA, inconnue du magasin de Chromium.
const context = await browser.newContext({ ignoreHTTPSErrors: true });
const page = await context.newPage();

// Accueil.
const resp = await page.goto(BASE, { waitUntil: 'networkidle' });
ok('accueil HTTP 200', resp?.status() === 200);
ok('titre « Pour moi » visible', await page.getByRole('heading', { name: 'Pour moi' }).isVisible());

// Manifest + icônes + SW enregistrables.
const manifest = await page.evaluate(async (base) => {
  const r = await fetch(base + 'manifest.webmanifest');
  return r.ok ? r.json() : null;
}, BASE);
ok('manifest accessible', manifest !== null);
ok('manifest standalone', manifest?.display === 'standalone');
const swReady = await page.evaluate(async () => {
  try {
    const reg = await navigator.serviceWorker.ready;
    return reg.active !== null;
  } catch {
    return false;
  }
});
ok('service worker actif', swReady);

// Recherche réelle.
await page.goto(BASE + '#/recherche');
await page.getByRole('searchbox').fill('je melange');
ok(
  'recherche « je melange » → Tableau de contraste A/B',
  await page
    .locator('.list .row')
    .first()
    .textContent()
    .then((t) => t?.includes('Tableau de contraste A/B') ?? false),
);

// Fiche méthode en deep link.
await page.goto(BASE + '#/methode/feynman');
await page.reload();
ok(
  'deep link fiche Feynman',
  await page.getByRole('heading', { level: 1 }).textContent().then((t) => t?.includes('Feynman') ?? false),
);

// Diagnostic complet.
await page.goto(BASE + '#/diagnostic');
await page.getByRole('button', { name: 'Mécanisme / voie / cascade' }).click();
await page.getByRole('button', { name: 'Je mélange / je confonds' }).click();
await page.getByRole('button', { name: 'Biologie cellulaire' }).click();
ok(
  'diagnostic → tableau de contraste',
  await page.locator('.reco-step').first().textContent().then((t) => t?.includes('Tableau de contraste') ?? false),
);

// SOS.
await page.goto(BASE + '#/sos/panique');
ok('SOS panique → N-R-A-R', await page.getByText('Fais ça maintenant').isVisible());

// Icône Apple touch.
const iconStatus = await page.evaluate(async (base) => {
  const r = await fetch(base + 'icons/apple-touch-icon.png');
  return r.status;
}, BASE);
ok('apple-touch-icon servie', iconStatus === 200);

await browser.close();
for (const [s, n] of results) console.log(`${s}  ${n}`);
console.log(process.exitCode === 1 ? 'SMOKE: FAIL' : 'SMOKE: OK');
