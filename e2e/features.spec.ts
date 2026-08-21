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

test('recherche : champ en haut de l’écran, tab bar effacée pendant la saisie', async ({
  page,
}) => {
  await page.goto('#/recherche');
  const input = page.getByRole('searchbox');
  const box = await input.boundingBox();
  expect(box, 'champ de recherche introuvable').not.toBeNull();
  // Le champ vit en HAUT de la page (fini la barre flottante que le clavier
  // iOS faisait remonter) : il doit être dans le premier tiers de l'écran.
  const viewport = page.viewportSize();
  expect(box!.y).toBeLessThan((viewport?.height ?? 800) / 3);

  const width = viewport?.width ?? 1280;
  if (width < 740) {
    await expect(page.locator('.tabbar-wrap')).toBeVisible();
    await input.focus();
    await expect(page.locator('.tabbar-wrap')).toBeHidden();
    await input.blur();
    await expect(page.locator('.tabbar-wrap')).toBeVisible();
  }
});

test('micro-étapes : le geste exact est visible dans la procédure complète', async ({
  page,
}) => {
  await page.goto('#/methode/rappel-actif');
  await page.getByRole('button', { name: 'Voir la procédure complète' }).click();
  const micro = page.locator('.micro-steps li').first();
  await expect(micro).toBeVisible();
  await expect(micro).toContainText('surlignant');
});

test('mode pas-à-pas : chaque étape défile jusqu’à « C’est acquis si »', async ({ page }) => {
  await page.goto('#/methode/rappel-actif');
  await page.getByRole('button', { name: 'Suivre pas à pas' }).click();
  const guided = page.locator('.guided');
  await expect(guided).toBeVisible();
  await expect(guided).toContainText('Étape 1 sur 6');
  await expect(guided).toContainText('Étudier / comprendre une unité courte.');
  for (let i = 0; i < 5; i++) {
    await guided.getByRole('button', { name: /Étape suivante/ }).click();
  }
  await guided.getByRole('button', { name: 'Terminer' }).click();
  await expect(guided).toContainText('Procédure terminée');
  await expect(guided).toContainText('C’est acquis si…');
  await guided.getByRole('button', { name: 'Fermer' }).click();
  await expect(guided).toBeHidden();
});

test('reprendre : l’accueil propose la méthode en cours', async ({ page }) => {
  await page.goto('#/methode/rappel-actif');
  await page.locator('.check-step').first().click();
  await page.goto('#/');
  const section = page.locator('.section', { hasText: 'Reprendre' });
  await expect(section.locator('.row-title')).toContainText(
    'Rappel actif / Retrieval practice',
  );
  await expect(section).toContainText('1/5');
});

test('grand titre : la barre compacte apparaît au défilement (iPhone)', async ({ page }) => {
  const width = page.viewportSize()?.width ?? 1280;
  test.skip(width >= 740, 'barre compacte réservée aux écrans iPhone');
  await page.goto('#/bibliotheque');
  const bar = page.locator('.compact-bar');
  await expect(bar).not.toHaveClass(/on/);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(bar).toHaveClass(/on/);
  await expect(bar).toContainText('Bibliothèque');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).not.toHaveClass(/on/);
});

test('minuteur : anneau de progression présent et fonctionnel', async ({ page }) => {
  await page.goto('#/methode/pomodoro');
  await expect(page.locator('.timer-ring svg')).toBeVisible();
  await expect(page.locator('.timer-display')).toHaveText('25:00');
  await page.getByRole('button', { name: '45 min' }).click();
  await expect(page.locator('.timer-display')).toHaveText('45:00');
});

test.describe('coach mental : citations', () => {
  test('accueil : la carte immersive ouvre le plein écran sur la même phrase', async ({
    page,
  }) => {
    await page.goto('#/');
    const hero = page.locator('.quote-hero');
    await expect(hero).toBeVisible();
    const before = (await page.locator('.quote-hero-text').textContent()) ?? '';
    expect(before.length).toBeGreaterThan(10);
    await hero.click();
    await expect(page).toHaveURL(/citations\/plein-ecran/);
    await expect(page.locator('.zen-text')).toHaveText(before);
  });

  test('plein écran : toucher = suivante, cœur = favori retrouvé dans la liste', async ({
    page,
  }) => {
    await page.goto('#/citations/plein-ecran');
    const text = page.locator('.zen-text');
    const first = (await text.textContent()) ?? '';
    await page.locator('.zen-body').click();
    await expect(text).not.toHaveText(first);
    const favText = (await text.textContent()) ?? '';
    const heart = page.getByRole('button', { name: 'Ajouter aux favoris' });
    await heart.click();
    await expect(
      page.getByRole('button', { name: 'Retirer des favoris' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Fermer' }).click();
    await expect(page).not.toHaveURL(/plein-ecran/);
    await page.goto('#/citations');
    await page.getByRole('button', { name: 'Favoris' }).click();
    await expect(page.locator('.quote-item')).toContainText([favText.slice(0, 40)]);
  });

  test('page Citations : filtres thème et coach', async ({ page }) => {
    await page.goto('#/citations');
    await expect(page.locator('.zen-launch')).toContainText('Mode plein écran');
    const items = page.locator('.quote-item');
    const all = await items.count();
    expect(all).toBeGreaterThanOrEqual(350);
    await page.getByRole('button', { name: 'Persévérance' }).click();
    await expect(page.getByText(/entrées — Persévérance/)).toBeVisible();
    const filtered = await items.count();
    expect(filtered).toBeGreaterThan(10);
    expect(filtered).toBeLessThan(all);
    await page.getByRole('button', { name: 'Coach', exact: true }).click();
    await expect(page.getByText(/phrases du coach/)).toBeVisible();
    await expect(items.first()).toContainText('Axel');
  });

  test('méthode du jour : la carte mène à la fiche', async ({ page }) => {
    await page.goto('#/');
    const daily = page.locator('.daily-card');
    await expect(daily).toContainText('Méthode du jour');
    await daily.click();
    await expect(page).toHaveURL(/methode\//);
    await expect(page.locator('h1')).not.toBeEmpty();
  });
});

test.describe('Axel, le coach', () => {
  test('accueil → chat : accueil d’Axel, réponse méthode avec lien', async ({ page }) => {
    await page.goto('#/');
    await page.locator('.coach-card').click();
    await expect(page).toHaveURL(/coach/);
    await expect(page.locator('.bubble--axel').first()).toContainText('Axel');
    await page.getByRole('textbox', { name: 'Ton message à Axel' }).fill('je procrastine');
    await page.getByRole('button', { name: 'Envoyer' }).click();
    await expect(page.locator('.bubble--me')).toContainText('je procrastine');
    const reply = page.locator('.chat-row--axel .bubble--axel').last();
    await expect(reply.locator('.bubble-link').first()).toContainText('Démarrage', {
      timeout: 5_000,
    });
  });

  test('les réponses varient : deux fois la même question, deux formulations', async ({
    page,
  }) => {
    await page.goto('#/coach');
    const input = page.getByRole('textbox', { name: 'Ton message à Axel' });
    const send = page.getByRole('button', { name: 'Envoyer' });
    // Le voyant « Axel écrit » partage la classe bubble--axel : on l'exclut.
    const bubbles = page.locator('.chat-row--axel .bubble--axel:not(.bubble--typing)');
    await input.fill('je stresse');
    await send.click();
    await expect(bubbles).toHaveCount(2, { timeout: 5_000 });
    const first = (await bubbles.last().textContent()) ?? '';
    expect(first.length).toBeGreaterThan(20);
    await input.fill('je stresse');
    await send.click();
    await expect(bubbles).toHaveCount(3, { timeout: 5_000 });
    const second = (await bubbles.last().textContent()) ?? '';
    expect(second.length).toBeGreaterThan(20);
    expect(second).not.toBe(first);
  });

  test('détresse : Axel oriente vers des humains et le protocole', async ({ page }) => {
    await page.goto('#/coach');
    await page.getByRole('textbox', { name: 'Ton message à Axel' }).fill('je vais craquer');
    await page.getByRole('button', { name: 'Envoyer' }).click();
    const reply = page.locator('.chat-row--axel .bubble--axel').last();
    await expect(reply).toContainText('3114', { timeout: 5_000 });
    await expect(reply.locator('.bubble-link')).toContainText('Détresse');
  });

  test('les suggestions rapides envoient et répondent', async ({ page }) => {
    await page.goto('#/coach');
    await page.getByRole('button', { name: 'Motive-moi' }).click();
    const reply = page.locator('.chat-row--axel .bubble--axel').last();
    await expect(reply).toContainText('«', { timeout: 5_000 });
  });
});

test('vérification manuelle des mises à jour : un retour clair', async ({ page }) => {
  await page.goto('#/');
  await page.getByText('Vérifier les mises à jour').click();
  await expect(
    page.getByText(/dernière version|Recharger|impossible|Vérification/),
  ).toBeVisible({ timeout: 10_000 });
});
