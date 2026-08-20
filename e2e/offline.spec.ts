import { expect, test } from '@playwright/test';

/**
 * PWA hors ligne : après un premier chargement, TOUT fonctionne sans réseau —
 * accueil, bibliothèque, fiche, diagnostic, SOS, recherche, favoris.
 * (Exécuté sur le projet desktop ; le service worker est identique partout.)
 */

test.describe('mode hors ligne', () => {
  test.skip(({ browserName, isMobile }) => isMobile || browserName !== 'chromium');

  test('l’app entière fonctionne sans réseau après le premier chargement', async ({
    page,
    context,
  }) => {
    await page.goto('#/');
    await page.waitForLoadState('networkidle');

    // Attendre l'installation + activation du service worker et le precache.
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      if (reg.active === null) throw new Error('SW inactif');
    });
    await page.waitForFunction(async () => {
      const keys = await caches.keys();
      if (keys.length === 0) return false;
      const cache = await caches.open(keys[0]!);
      const entries = await cache.keys();
      return entries.length > 3;
    });

    // Second chargement : la page passe sous le contrôle du SW.
    await page.reload();
    await page.waitForLoadState('networkidle');

    await context.setOffline(true);

    // Rechargement complet, réseau coupé.
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Pour moi');

    // Bibliothèque.
    await page.goto('#/bibliotheque');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bibliothèque');

    // Fiche méthode.
    await page.goto('#/methode/rappel-actif');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Rappel actif / Retrieval practice',
    );

    // Diagnostic.
    await page.goto('#/diagnostic');
    await page.getByRole('button', { name: 'Définition / concept' }).click();
    await page
      .getByRole('button', { name: 'Je reconnais mais je ne rappelle pas' })
      .click();
    await page.getByRole('button', { name: 'Santé publique' }).click();
    await expect(page.locator('.reco-step').first()).toContainText('Rappel actif');

    // SOS.
    await page.goto('#/sos/vingt-minutes');
    await expect(page.getByText('Fais ça maintenant')).toBeVisible();

    // Recherche.
    await page.goto('#/recherche');
    await page.getByRole('searchbox').fill('feuille blanche');
    await expect(page.locator('.list .row').first()).toContainText('Feuille blanche');

    // Favoris (stockage local, hors ligne).
    await page.goto('#/methode/blurting');
    await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
    await page.goto('#/');
    await expect(
      page.locator('.section', { hasText: 'Favoris' }).locator('.row-title'),
    ).toContainText(['Blurting']);

    await context.setOffline(false);
  });

  test('une mise à jour du service worker n’efface pas les données locales', async ({
    page,
  }) => {
    await page.goto('#/methode/pomodoro');
    await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
    // Simule un cycle de mise à jour : désenregistrer le SW et purger les caches
    // (ce que fait une nouvelle version au pire), puis recharger.
    await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    });
    await page.goto('#/');
    await page.reload();
    await expect(
      page.locator('.section', { hasText: 'Favoris' }).locator('.row-title'),
    ).toContainText(['Pomodoro / Timeboxing']);
  });
});
