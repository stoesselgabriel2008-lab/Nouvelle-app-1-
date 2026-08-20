# PASS Methods OS

**Méthode → diagnostic → action.** Une PWA spécialisée qui répond en quelques
secondes à : *« Je suis devant ce cours ou ce problème : quelle méthode dois-je
utiliser maintenant, exactement, étape par étape ? »*

Source de contenu unique : `PASS_Methods_App_Source_V2.pdf` (la correspondance
exhaustive PDF → app est dans [`CONTENT_COVERAGE.md`](CONTENT_COVERAGE.md)).

- **Pour moi** — règles personnalisées, méthodes adaptées, favoris, dernières consultations, raccourcis.
- **Bibliothèque** — 47 fiches méthodes (quand / quand éviter / fais ça maintenant / procédure complète / Anki / c'est acquis si), 12 protocoles matière, repères (algorithme, matrice, mythes, sources).
- **Diagnostic** — 3 à 5 questions adaptatives, locales et déterministes → 1 à 3 méthodes dans l'ordre, justifiées.
- **SOS** — 10 protocoles très courts pour redémarrer, « Fais ça maintenant » en premier.
- **Recherche** — fuzzy locale : accents, fautes, pluriels, abréviations, langage étudiant (« ça rentre pas », « j melange », « anki quoi mettre »…).

Pas de calendrier, pas de méthode des J, pas de planner, pas de todo-list,
pas de clone d'Anki, pas de compte, pas de tracking. Tout est local.

## Stack

React 19 · TypeScript strict · Vite 6 · vite-plugin-pwa (Workbox) ·
react-router (HashRouter) · MiniSearch · Vitest · Playwright.
Aucune donnée ne quitte l'appareil ; l'app entière fonctionne hors ligne après
le premier chargement.

```
src/
  content/      ← TOUT le contenu (méthodes, matières, SOS, profil, repères)
  search/       ← normalisation française + index MiniSearch
  diagnostic/   ← questionnaire adaptatif + routage déterministe
  pages/  ui/   ← vues et composants (aucun contenu en dur dans les vues)
  styles/       ← design system (tokens, base anti-troncature, composants)
  lib/          ← stockage local (favoris, historique, thème), pont SW
tests/          ← unités : intégrité contenu, recherche (§24), diagnostic (§25)
e2e/            ← Playwright : anti-troncature ×5 viewports, offline, parcours
```

## Développement

```bash
npm install
npm run dev        # serveur de dev
npm test           # tests unitaires (Vitest)
npm run build      # typecheck + build production + service worker
npm run preview    # sert le build sur http://127.0.0.1:4173/Nouvelle-app-1-/
npm run test:e2e   # Playwright (utilise le build ; PW_CHROMIUM_PATH pour un
                   # chromium externe si besoin)
npm run icons      # régénère les icônes PWA depuis le vectoriel (sharp)
```

## Ajouter une méthode ou un alias

1. Ouvrir le fichier de la catégorie dans `src/content/methods/` (ou en créer un).
2. Ajouter un objet `Method` complet (voir `src/content/types.ts`) — champs
   obligatoires : `id` (slug stable, devient l'URL `/#/methode/<id>`), `title`,
   `summary`, `whenToUse`, `avoid`, `quickSteps` (3-8), `procedure`, `mastery`,
   `aliases`, `source`.
3. S'il s'agit d'un nouveau fichier, l'importer dans `src/content/methods/index.ts`.
4. **Un alias seulement ?** Ajouter la chaîne dans le tableau `aliases` de la
   fiche : la recherche l'indexe automatiquement.
5. Lier la méthode où c'est pertinent : `related` d'autres fiches,
   `methods` d'une matière (`subjects.ts`), d'un SOS (`sos.ts`), du diagnostic
   (`diagnostic/engine.ts`).
6. `npm test` — l'intégrité (IDs, liens, complétude) est vérifiée automatiquement.

Recherche, bibliothèque, diagnostic et liens se mettent à jour sans toucher aux
composants React.

## Publier une évolution (panneau « Quoi de neuf »)

1. Incrémenter `APP_VERSION` dans `src/lib/version.ts`.
2. Ajouter une entrée en tête de `CHANGELOG` (phrases courtes, orientées
   utilisateur).
3. Pousser : au prochain lancement après mise à jour, l'app affiche le panneau
   Nouveautés ; le bandeau « Recharger » gère l'installation de la nouvelle
   version sans toucher aux données locales.

## Installer sur iPhone (sans App Store)

1. Ouvrir **https://stoesselgabriel2008-lab.github.io/Nouvelle-app-1-/** dans Safari.
2. Bouton **Partager** → **« Sur l'écran d'accueil »** → **Ajouter**.
3. Lancer « Methods OS » depuis l'écran d'accueil : plein écran, hors ligne,
   favoris et historique conservés. (Excellente aussi sur iPad : sidebar, ⌘K.)

## Déploiement

Push sur `main` (ou la branche de développement configurée) → GitHub Actions
(`.github/workflows/deploy.yml`) : tests → build → publication du dossier
`dist/` sur la branche `gh-pages`, servie par GitHub Pages.
Le chemin de base (`/Nouvelle-app-1-/`) est fixé dans `vite.config.ts` et doit
correspondre exactement au nom du dépôt (sensible à la casse).
Si Pages était désactivé : Settings → Pages → « Deploy from a branch » →
`gh-pages` / root (une seule fois).
