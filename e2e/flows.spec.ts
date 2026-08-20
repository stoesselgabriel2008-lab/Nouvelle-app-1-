import { expect, test } from '@playwright/test';

/** Parcours produit clés : problème → action en quelques secondes. */

test('recherche : « je melange » mène au tableau de contraste', async ({ page }) => {
  await page.goto('#/recherche');
  await page.getByRole('searchbox').fill('je melange');
  const first = page.locator('.tophit');
  await expect(first).toContainText('Tableau de contraste A/B');
  await first.click();
  await expect(page).toHaveURL(/methode\/tableau-contraste/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Tableau de contraste A/B',
  );
});

test('recherche : fautes et accents tolérés (« mecanisme biocel »)', async ({ page }) => {
  await page.goto('#/recherche');
  await page.getByRole('searchbox').fill('mecanisme biocel');
  await expect(page.locator('.tophit')).toBeVisible();
});

test('diagnostic : mécanisme + confusion + biocell → plan anti-confusion ordonné', async ({
  page,
}) => {
  await page.goto('#/diagnostic');
  await page.getByRole('button', { name: 'Mécanisme / voie / cascade' }).click();
  await page.getByRole('button', { name: 'Je mélange / je confonds' }).click();
  await page.getByRole('button', { name: 'Biologie cellulaire' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Voilà quoi faire maintenant',
  );
  await expect(page.locator('.reco-step').first()).toContainText('Tableau de contraste A/B');
  await page.getByRole('link', { name: /Ouvrir la méthode/ }).first().click();
  await expect(page).toHaveURL(/methode\/tableau-contraste/);
});

test('diagnostic : raccourci pré-rempli « Formule / exercice » (3e question directe)', async ({
  page,
}) => {
  await page.goto('#/diagnostic?type=calcul&problem=choix-methode');
  await expect(page.getByRole('heading', { level: 2 })).toContainText('Quelle matière ?');
  await page.getByRole('button', { name: 'Physique', exact: true }).click();
  await expect(page.locator('.reco-step').first()).toContainText('Exemple entièrement résolu');
});

test('SOS : panique → protocole N-R-A-R immédiat', async ({ page }) => {
  await page.goto('#/sos');
  await page.getByRole('link', { name: /Je panique pendant une question/ }).click();
  await expect(page.getByText('Fais ça maintenant')).toBeVisible();
  await expect(page.locator('.steps > li').first()).toContainText('Nomme');
});

test('SOS : détresse persistante → orientation vers un soutien humain, app ≠ soin', async ({
  page,
}) => {
  await page.goto('#/sos/detresse');
  await expect(page.locator('.care-note')).toContainText('pas un soin');
});

test('favoris : persistants après rechargement', async ({ page }) => {
  await page.goto('#/methode/feynman');
  await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
  await page.goto('#/');
  await expect(
    page.locator('.section', { hasText: 'Favoris' }).locator('.row-title'),
  ).toContainText(['Méthode de Feynman / Teach-back vérifié']);
  await page.reload();
  await expect(
    page.locator('.section', { hasText: 'Favoris' }).locator('.row-title'),
  ).toContainText(['Méthode de Feynman / Teach-back vérifié']);
});

test('historique : les dernières consultations apparaissent et s’effacent', async ({ page }) => {
  await page.goto('#/methode/chaine-causale');
  await page.goto('#/');
  const section = page.locator('.section', { hasText: 'Dernières consultations' });
  await expect(section.locator('.row-title').first()).toContainText('Chaîne causale');
  await section.getByRole('button', { name: 'Effacer' }).click();
  await expect(section.locator('.row-title')).toHaveCount(0);
});

test('deep link : rechargement direct d’une fiche fonctionne', async ({ page }) => {
  await page.goto('#/methode/palais-mental');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Palais mental / Méthode des loci',
  );
});

test('fiche méthode : structure progressive complète', async ({ page }) => {
  await page.goto('#/methode/feynman');
  await expect(page.getByText('En 20 secondes')).toBeVisible();
  await expect(page.getByText('Quand l’utiliser')).toBeVisible();
  await expect(page.getByText('Quand ne pas l’utiliser comme ça')).toBeVisible();
  await expect(page.getByText('Fais ça maintenant')).toBeVisible();
  await expect(page.getByText('C’est acquis si…')).toBeVisible();
  // La procédure complète s'ouvre par un bouton explicite — jamais coupée en silence.
  await page.getByRole('button', { name: 'Voir la procédure complète' }).click();
  await expect(page.locator('.steps--neutral > li').first()).toBeVisible();
  // Limites scientifiques présentes (Feynman seul ne prouve pas la maîtrise).
  await expect(page.getByText('Limites et nuances')).toBeVisible();
});

test('bibliothèque : matières et repères accessibles', async ({ page }) => {
  await page.goto('#/bibliotheque?tab=matieres');
  await page.getByRole('link', { name: /Histologie/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Histologie');
  await expect(page.locator('.steps > li').first()).toContainText('Faible grossissement');
});
