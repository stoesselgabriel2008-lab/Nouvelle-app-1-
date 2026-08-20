# CONTENT_COVERAGE — PASS Methods OS

Ce fichier relie **chaque partie de `PASS_Methods_App_Source_V2.pdf`** (« Source V2 », 38 pages)
à sa destination dans l'application. Il est vérifié par les tests
(`tests/content.test.ts` verrouille les 47 méthodes, 12 matières, 10 SOS, 6 règles,
10 étapes d'algorithme, 15 types, 10 mythes, 7 sources).

## Sections du PDF → destinations

| PDF (section, pages) | Destination dans l'app | Fichier de contenu |
| --- | --- | --- |
| §1 Architecture idéale (p. 2-3) | Les 5 destinations : Pour moi · Bibliothèque · Diagnostic · SOS · Recherche ; structure de fiche en 10 couches | `src/App.tsx`, `src/pages/MethodPage.tsx` |
| §2 Profil fonctionnel (p. 3-4) | Pour moi → « Mes règles » (6 règles) + « Mon profil en bref » (6 signaux) ; champ « Adapté à moi » des fiches ; jamais présenté comme un style d'apprentissage fixe | `src/content/profile.ts` |
| §3 Algorithme universel (p. 4-5) | Bibliothèque → Repères → « Algorithme universel d'un cours » (10 étapes, méthodes liées) | `src/content/reference.ts` (`ALGORITHM_STEPS`) |
| §4 Matrice type → méthode (p. 5-6) | Bibliothèque → Repères → « Quel outil pour quel type d'information ? » (15 types) ; **appliquée automatiquement par le Diagnostic** | `src/content/reference.ts` (`INFO_TYPE_MATRIX`), `src/diagnostic/engine.ts` |
| §5 Méthodes par matière (p. 6-8) | Bibliothèque → Matières : 12 pages avec protocole complet + méthodes reliées | `src/content/subjects.ts` |
| §6 Bibliothèque des méthodes (p. 8-32) | Bibliothèque → Méthodes : **47 fiches**, chacune avec En 20 s / Quand / Quand éviter / Fais ça maintenant / Procédure complète / Adapté à moi / Anki / C'est acquis si / Limites / Méthodes proches / Mots-clés / Source | `src/content/methods/*.ts` (10 fichiers) |
| §7 Diagnostic (p. 32-34) | Onglet Diagnostic : questionnaire adaptatif **3 à 5 questions**, déterministe et local ; routage conforme à la table « Routage recommandé » | `src/diagnostic/engine.ts`, `src/diagnostic/model.ts` |
| §8 SOS (p. 34-35) | Onglet SOS : **10 protocoles**, « Fais ça maintenant » en premier ; détresse persistante → encart soutien humain, l'app ne se présente jamais comme un soin | `src/content/sos.ts` |
| §9 Recherche & mots-clés (p. 35-36) | Onglet Recherche : fuzzy local (MiniSearch), tous les alias des 9 groupes injectés dans les fiches concernées + alias par fiche (« Recherche : … » du PDF) | `src/search/engine.ts`, champs `aliases`/`keywords` des contenus |
| §10 Anti-troncature (p. 36) | Règles CSS globales (pas de line-clamp, pas d'ellipsis, hauteur intrinsèque, repli explicite « Voir la procédure complète », comparaisons verticales sur petit écran) + tests E2E dédiés | `src/styles/base.css`, `src/styles/components.css`, `e2e/layout.spec.ts` |
| §11 Mythes / versions sûres (p. 36-37) | Bibliothèque → Repères → « Mythes et limites » (10 entrées) + champ « Limites et nuances » des fiches concernées | `src/content/reference.ts` (`MYTHS`) |
| §12 Sources & niveau de preuve (p. 37-38) | Bibliothèque → Repères → « Sources et niveau de preuve » (hiérarchie + 7 repères + note de prudence) ; lien « Source dans le guide » au pied de chaque fiche | `src/content/reference.ts` |
| Annexe — Contrat de contenu (p. 38) | Respecté point par point : 5 onglets, pas de planner/calendrier/todo, couche 20 s + procédure complète, recherche exhaustive, rien de tronqué | l'app entière |

## Les 47 fiches méthodes (§6) et leur route

Chaque fiche est accessible à `/#/methode/<id>` et indexée dans la recherche.

| # | Méthode (PDF) | id / route |
| --- | --- | --- |
| 1 | Rappel actif / Retrieval practice | `rappel-actif` |
| 2 | Feuille blanche | `feuille-blanche` |
| 3 | Blurting | `blurting` |
| 4 | Méthode de Feynman / Teach-back vérifié | `feynman` |
| 5 | Auto-explication | `auto-explication` |
| 6 | Prétest / Pretesting | `pretest` |
| 7 | Liste de questions | `liste-questions` |
| 8 | Chunking / Hiérarchisation | `chunking` |
| 9 | Mind map de mémoire | `mind-map` |
| 10 | Carte conceptuelle | `carte-conceptuelle` |
| 11 | Chaîne causale | `chaine-causale` |
| 12 | Perturbation « si… alors… » | `perturbations` |
| 13 | Tableau de contraste A/B | `tableau-contraste` |
| 14 | Frise chronologique | `frise-chronologique` |
| 15 | Imagerie mentale interactive | `imagerie-interactive` |
| 16 | Association phonétique | `association-phonetique` |
| 17 | Acronyme / Acrostiche | `acronyme` |
| 18 | Histoire / Chaînage narratif | `histoire-chainage` |
| 19 | Palais mental / Méthode des loci | `palais-mental` |
| 20 | Double représentation : mots + schéma | `double-representation` |
| 21 | Reconstruction de schéma | `reconstruction-schema` |
| 22 | Image Occlusion | `image-occlusion` |
| 23 | Exemple entièrement résolu | `exemple-resolu` |
| 24 | Complétion / Fading | `fading` |
| 25 | Exercice à froid | `exercice-a-froid` |
| 26 | Variation de problème | `variation` |
| 27 | Entrelacement / Interleaving | `interleaving` |
| 28 | QCM actif proposition par proposition | `qcm-actif` |
| 29 | Correction par cause / Carnet d'erreurs | `correction-par-cause` |
| 30 | Calibration de confiance | `calibration-confiance` |
| 31 | Rappel différé | `rappel-differe` |
| 32 | Répétition espacée / FSRS | `repetition-espacee` |
| 33 | Carte Question/Réponse | `carte-qr` |
| 34 | Cloze ciblé | `cloze-cible` |
| 35 | Carte calcul | `carte-calcul` |
| 36 | Carte piège / contraste | `carte-contraste` |
| 37 | Audit d'un deck partagé | `audit-deck` |
| 38 | Prise de notes ciblée | `prise-de-notes` |
| 39 | Relecture / surlignage : usage limité | `relecture-surlignage` |
| 40 | Pomodoro / Timeboxing | `pomodoro` |
| 41 | Protocole de démarrage en 10 minutes | `demarrage-10-minutes` |
| 42 | Réduction de friction numérique | `friction-numerique` |
| 43 | Journée minimale | `journee-minimale` |
| 44 | Triage du retard 24-72 h | `triage-retard` |
| 45 | N-R-A-R : stress aigu | `nrar-stress` |
| 46 | Révision rapide | `revision-rapide` |
| 47 | Simulation / Mode examen | `simulation-examen` |

**Aucune méthode du PDF n'a été supprimée.** Le test `tests/content.test.ts`
échoue si l'une des 47 disparaît.

## Matières (§5) — 12/12

`biocell`, `biochimie`, `chimie`, `physique`, `biophysique`, `biostats`,
`anatomie`, `histologie`, `embryologie`, `sante-publique`, `medicament`, `shs`
→ chacune à `/#/matiere/<id>` avec le protocole complet du PDF (5 à 8 étapes)
et ses méthodes reliées. Pas de page matière « 3 lignes ».

## SOS (§8) — 10/10

`ca-rentre-pas`, `commencer`, `fatigue`, `retard`, `qcm-rates`, `anki-deborde`,
`panique`, `vingt-minutes`, `comprends-plus-rien`, `detresse`
→ chacun à `/#/sos/<id>`. Le protocole `detresse` affiche l'encart
« soutien humain » et ne présente jamais l'app comme un soin.

## Routage diagnostic (§7) — conformité vérifiée par test

| Situation du PDF | Sortie du moteur (testée) |
| --- | --- |
| Mécanisme + je ne comprends pas | chaîne causale → Feynman → perturbations |
| Mécanisme + je mélange | tableau A/B (discriminant roi) → carte contraste → interleaving |
| Noms arbitraires + j'oublie | chunking/contextualisation → imagerie ciblée → Anki (→ rappel différé) |
| Définition + je reconnais seulement | rappel actif → carte Q/R → QCM reformulé |
| Formule + je ne sais pas quand l'utiliser | exemple résolu → fading → exercice à froid (→ interleaving) |
| Schéma + je ne retiens pas | reconstruction (orientation, repères) → Image Occlusion → vue nouvelle à distance |
| QCM raté | correction par cause → QCM actif → retest différé |
| Je n'arrive pas à commencer | SOS « Je n'arrive pas à commencer » → protocole 10 minutes |
| Saturé / en retard | SOS « Je suis en retard » → triage 24-72 h → journée minimale |

## Alias de recherche (§9) — 9 groupes injectés

Mémoire, Mécanismes, Confusion, Visuel, Calcul, Anki, Méthodes, SOS, Exam :
chaque terme du PDF est porté par les champs `aliases`/`keywords` de la fiche
la plus pertinente (+ les lignes « Recherche : … » de chaque fiche du PDF).
Les requêtes du prompt maître (§24) sont verrouillées par `tests/search.test.ts`.

## Choix éditorial documenté

- L'onglet iPhone de la Bibliothèque est libellé **« Méthodes »** dans la tab bar :
  « Bibliothèque » ne tient pas en entier sur un iPhone de 320 px sans troncature,
  interdite par le §10. La page garde son titre « Bibliothèque » et la sidebar
  iPad affiche le libellé complet.
