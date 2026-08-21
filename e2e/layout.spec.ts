import { expect, test, type Page } from '@playwright/test';

/**
 * Anti-troncature (Source V2, §10 — non négociable) :
 * - aucun scroll horizontal de page ;
 * - aucun titre ni texte méthodologique coupé (ni en largeur, ni en hauteur) ;
 * - pas de line-clamp / text-overflow: ellipsis sur les contenus ;
 * - tient au zoom texte élevé.
 * Vérifié sur : iPhone 320 px, grand iPhone, iPad portrait, iPad paysage, desktop.
 */

const ROUTES = [
  '#/',
  '#/bibliotheque',
  '#/bibliotheque?tab=matieres',
  '#/bibliotheque?tab=reperes',
  '#/methode/tableau-contraste',
  '#/methode/demarrage-10-minutes',
  '#/methode/qcm-actif',
  '#/matiere/sante-publique',
  '#/diagnostic',
  '#/sos',
  '#/sos/detresse',
  '#/recherche',
  '#/reperes/matrice',
  '#/reperes/mythes',
];

async function assertNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - window.innerWidth;
  });
  expect(overflow, 'scroll horizontal de page interdit').toBeLessThanOrEqual(1);
}

async function assertNoClippedText(page: Page) {
  const clipped = await page.evaluate(() => {
    const selectors =
      'h1, h2, h3, .row-title, .sos-title, .tab-item span, .chip, .btn, .option-btn span, .steps > li, .summary-card p, .micro-steps li, .why-card p';
    const bad: string[] = [];
    const hides = (v: string) => v === 'hidden' || v === 'clip';
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(selectors))) {
      if (el.offsetParent === null && el.tagName !== 'BODY') continue;
      const cs = getComputedStyle(el);
      if (cs.webkitLineClamp !== 'none' && cs.webkitLineClamp !== '') {
        bad.push(`line-clamp: ${el.textContent?.slice(0, 40) ?? ''}`);
      }
      if (cs.textOverflow === 'ellipsis' && cs.overflow !== 'visible') {
        bad.push(`ellipsis: ${el.textContent?.slice(0, 40) ?? ''}`);
      }
      // Un débordement ne masque du texte que si l'élément le rogne.
      // (overflow visible = rien de caché ; auto/scroll = défilement volontaire.)
      if (hides(cs.overflowX) && el.scrollWidth > el.clientWidth + 1) {
        bad.push(
          `coupé en largeur (${el.scrollWidth}>${el.clientWidth}): ${el.textContent?.slice(0, 40) ?? ''}`,
        );
      }
      if (hides(cs.overflowY) && el.scrollHeight > el.clientHeight + 2) {
        bad.push(
          `coupé en hauteur (${el.scrollHeight}>${el.clientHeight}): ${el.textContent?.slice(0, 40) ?? ''}`,
        );
      }
    }
    return bad;
  });
  expect(clipped, `textes coupés : ${clipped.join(' | ')}`).toHaveLength(0);
}

for (const route of ROUTES) {
  test(`aucune troncature sur ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    await assertNoHorizontalScroll(page);
    await assertNoClippedText(page);
  });
}

test('zoom texte élevé (type dynamique) : rien ne casse', async ({ page }) => {
  await page.goto('#/methode/tableau-contraste');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '22px';
  });
  await page.waitForTimeout(200);
  await assertNoHorizontalScroll(page);
  await assertNoClippedText(page);
});

test('dark mode : aucune troncature et fond correct', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('#/sos');
  await page.waitForLoadState('networkidle');
  await assertNoHorizontalScroll(page);
  await assertNoClippedText(page);
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  expect(bg).toBe('rgb(0, 0, 0)');
});

test('la navigation principale est visible et complète', async ({ page }) => {
  await page.goto('#/');
  await page.waitForLoadState('networkidle');
  // iPhone (<740 px) : tab bar flottante ; iPad / desktop : sidebar.
  const width = page.viewportSize()?.width ?? 1280;
  if (width < 740) {
    await expect(page.locator('.tabbar-wrap')).toBeVisible();
    await expect(page.locator('.tab-item')).toHaveCount(4);
    await expect(page.locator('.tab-search')).toBeVisible();
  } else {
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.side-item')).toHaveCount(5);
  }
});
