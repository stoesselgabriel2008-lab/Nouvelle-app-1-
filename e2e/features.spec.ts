import { expect, test } from '@playwright/test';
import { APP_VERSION } from '../src/lib/version';

/** Fonctionnalités v1.1 : nouveautés, checklist, minuteur, récap, recherche. */

test.describe('panneau « Quoi de neuf »', () => {
  test('apparaît après une mise à jour, se ferme, ne revient pas', async ({ page }) => {
    // Utilisateur existant (favoris présents) venant d'une version antérieure.
    // Le semis ne s'applique qu'au premier chargement : les rechargements
    // suivants doivent voir l'état réel (version marquée comme vue).
    await page.addInitScript(() => {
      if (localStorage.getItem('e2e:seeded') === null) {
        localStorage.setItem('e2e:seeded', '1');
        localStorage.setItem('pmos:v1:lastSeenVersion', '1.0.0');
        localStorage.setItem('pmos:v1:favorites', JSON.stringify(['feynman']));
      }
    });
    await page.goto('#/');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('L’app a été mise à jour');
    await expect(dialog).toContainText(`Version ${APP_VERSION}`);
    await expect(dialog).toContainText('Minuteur intégré');
    await dialog.getByRole('button', { name: 'Compris' }).click();
    await expect(dialog).toBeHidden();
    await page.reload();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('jamais au tout premier lancement ; consultable depuis Pour moi', async ({ page }) => {
    await page.goto('#/');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByText('Quoi de neuf dans cette version').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Quoi de neuf');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});

test('étapes cochables : coche, progression, réinitialisation', async ({ page }) => {
  await page.goto('#/methode/rappel-actif');
  const steps = page.locator('.check-step');
  await expect(steps.first()).toHaveAttribute('aria-pressed', 'false');
  await steps.first().click();
  await expect(steps.first()).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.check-meta')).toContainText('1/5');
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(steps.first()).toHaveAttribute('aria-pressed', 'false');
});

test('minuteur : présent sur le protocole 10 minutes, démarre et tourne', async ({ page }) => {
  await page.goto('#/methode/demarrage-10-minutes');
  const display = page.locator('.timer-display');
  await expect(display).toHaveText('10:00');
  await page.getByRole('button', { name: 'Démarrer' }).click();
  await expect(display).not.toHaveText('10:00', { timeout: 5_000 });
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
});

test('minuteur SOS 20-30 minutes : deux durées au choix', async ({ page }) => {
  await page.goto('#/sos/vingt-minutes');
  await expect(page.locator('.timer-display')).toHaveText('20:00');
  await page.getByRole('button', { name: '30 min' }).click();
  await expect(page.locator('.timer-display')).toHaveText('30:00');
});

test('fiche : « Pourquoi ça marche » et « Ensuite » présents et fonctionnels', async ({
  page,
}) => {
  await page.goto('#/methode/exemple-resolu');
  await expect(page.locator('.why-card')).toContainText('Pourquoi ça marche');
  const next = page.locator('.next-card');
  await expect(next).toContainText('Complétion / Fading');
  await next.click();
  await expect(page).toHaveURL(/methode\/fading/);
});

test('diagnostic : le récapitulatif des réponses accompagne le résultat', async ({ page }) => {
  await page.goto('#/diagnostic');
  await page.getByRole('button', { name: 'Mécanisme / voie / cascade' }).click();
  await page.getByRole('button', { name: 'Je mélange / je confonds' }).click();
  await page.getByRole('button', { name: 'Biologie cellulaire' }).click();
  const recap = page.locator('.answers-recap');
  await expect(recap).toContainText('Mécanisme / voie / cascade');
  await expect(recap).toContainText('Je mélange / je confonds');
  await expect(recap).toContainText('Biologie cellulaire');
  await page.getByRole('button', { name: '← Modifier la dernière réponse' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toContainText('Quelle matière ?');
});

test('recherche : meilleur résultat mis en avant avec son résumé', async ({ page }) => {
  await page.goto('#/recherche');
  await page.getByRole('searchbox').fill('feuille blanche');
  const top = page.locator('.tophit');
  await expect(top).toContainText('Feuille blanche');
  await expect(top).toContainText('Meilleur résultat');
  await expect(top.locator('p')).not.toBeEmpty();
  await top.click();
  await expect(page).toHaveURL(/methode\/feuille-blanche/);
});

test('recherche sans résultat : le diagnostic prend le relais', async ({ page }) => {
  await page.goto('#/recherche');
  await page.getByRole('searchbox').fill('zzzzzzzzzz');
  await page.getByRole('button', { name: 'Lancer le diagnostic' }).click();
  await expect(page).toHaveURL(/diagnostic/);
});

test('Pour moi : la carte d’entrée mène au diagnostic, la Bibliothèque a son champ de recherche', async ({
  page,
}) => {
  await page.goto('#/');
  await page.locator('.hero-card').click();
  await expect(page).toHaveURL(/diagnostic/);
  await page.goto('#/bibliotheque');
  await page.locator('.search-pill').click();
  await expect(page).toHaveURL(/recherche/);
});

test('vérification manuelle des mises à jour : un retour clair', async ({ page }) => {
  await page.goto('#/');
  await page.getByText('Vérifier les mises à jour').click();
  await expect(
    page.getByText(/dernière version|Recharger|impossible|Vérification/),
  ).toBeVisible({ timeout: 10_000 });
});
