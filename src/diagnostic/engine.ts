import type { SubjectId } from '../content/types';
import { SUBJECT_LABELS, SUBJECT_ORDER } from '../content/taxonomy';
import type {
  DiagAnswers,
  DiagItemType,
  DiagQuestion,
  Recommendation,
  RecoStep,
} from './model';

/**
 * Diagnostic adaptatif et déterministe — Source V2, §7 (p. 32-34).
 *
 * Principe : ne poser que les questions qui réduisent l'ambiguïté (3 à 5 selon
 * le chemin), puis recommander 1 à 3 méthodes dans un ordre d'utilisation.
 * Le routage reprend la table « Routage recommandé » et la matrice §4.
 * Aucune IA distante : tout est local et reproductible.
 */

// ------------------------------------------------------------- Questions

const Q_ITEM_TYPE: DiagQuestion = {
  id: 'itemType',
  title: 'Qu’as-tu devant toi ?',
  options: [
    { value: 'mecanisme', label: 'Mécanisme / voie / cascade' },
    { value: 'definition', label: 'Définition / concept' },
    { value: 'liste', label: 'Liste / noms / chiffres' },
    { value: 'tableau', label: 'Tableau / classification' },
    { value: 'schema', label: 'Schéma / image / anatomie / histologie' },
    { value: 'chronologie', label: 'Chronologie / embryologie' },
    { value: 'calcul', label: 'Formule / calcul / exercice' },
    { value: 'texte', label: 'Texte / SHS' },
    { value: 'qcm', label: 'QCM / correction' },
    { value: 'inconnu', label: 'Je ne sais pas' },
  ],
};

const Q_NATURE: DiagQuestion = {
  id: 'nature',
  title: 'Le problème est-il surtout…',
  options: [
    { value: 'nom', label: 'Un nom exact à retenir' },
    { value: 'relation', label: 'Une relation ou un mécanisme' },
    { value: 'calcul', label: 'Un calcul ou une formule' },
    { value: 'chronologie', label: 'Une chronologie, un ordre' },
    { value: 'confusion', label: 'Une confusion entre deux choses' },
  ],
};

const Q_PROBLEM: DiagQuestion = {
  id: 'problem',
  title: 'Ton problème principal ?',
  options: [
    { value: 'comprends-pas', label: 'Je ne comprends pas' },
    { value: 'oublie', label: 'Je comprends mais j’oublie' },
    { value: 'reconnais-seulement', label: 'Je reconnais mais je ne rappelle pas' },
    { value: 'melange', label: 'Je mélange / je confonds' },
    { value: 'applique-pas', label: 'Je connais mais je n’arrive pas à appliquer' },
    { value: 'choix-methode', label: 'Je ne sais pas quelle formule / méthode choisir' },
    { value: 'verifier-maitrise', label: 'Je veux vérifier ma maîtrise' },
    { value: 'apprendre-vite', label: 'Je veux apprendre vite une portion déjà comprise' },
  ],
};

const Q_SUBJECT: DiagQuestion = {
  id: 'subject',
  title: 'Quelle matière ?',
  options: [
    ...SUBJECT_ORDER.map((id) => ({ value: id, label: SUBJECT_LABELS[id] })),
    { value: 'autre', label: 'Autre / plusieurs' },
  ],
};

const Q_ORDRE: DiagQuestion = {
  id: 'ordre',
  title: 'L’ordre des éléments compte-t-il ?',
  options: [
    { value: 'oui', label: 'Oui, l’ordre compte' },
    { value: 'non', label: 'Non, seulement l’exhaustivité' },
  ],
};

const Q_POSITION: DiagQuestion = {
  id: 'position',
  title: 'La position sur le schéma porte-t-elle une information ?',
  options: [
    { value: 'oui', label: 'Oui, la position compte' },
    { value: 'non', label: 'Non, c’est surtout la relation' },
  ],
};

const Q_ARBITRAIRE: DiagQuestion = {
  id: 'arbitraire',
  title: 'Cette information est-elle arbitraire ou déductible ?',
  options: [
    { value: 'oui', label: 'Arbitraire : rien ne permet de la déduire' },
    { value: 'non', label: 'Déductible : une logique la relie au reste' },
  ],
};

const Q_DEJA_PRODUIT: DiagQuestion = {
  id: 'dejaProduit',
  title: 'As-tu déjà réussi à la produire sans support ?',
  options: [
    { value: 'oui', label: 'Oui, au moins une fois' },
    { value: 'non', label: 'Non, jamais sans le cours' },
  ],
};

/**
 * Question suivante selon les réponses déjà données. Retourne null quand le
 * diagnostic peut conclure. 3 questions minimum, 5 maximum.
 */
export function nextQuestion(a: DiagAnswers): DiagQuestion | null {
  if (a.itemType === undefined) return Q_ITEM_TYPE;
  if (a.itemType === 'inconnu' && a.nature === undefined) return Q_NATURE;
  // « confusion » répond déjà à la question du problème : ne pas la reposer.
  if (a.problem === undefined && !(a.itemType === 'inconnu' && a.nature === 'confusion')) {
    return Q_PROBLEM;
  }
  if (a.subject === undefined) return Q_SUBJECT;

  const effective = effectiveType(a);
  const problem = effectiveProblem(a);

  if (effective === 'liste' && a.ordre === undefined && problem !== 'comprends-pas') {
    return Q_ORDRE;
  }
  if (
    effective === 'liste' &&
    (problem === 'oublie' || problem === 'reconnais-seulement') &&
    a.arbitraire === undefined &&
    // « Un nom exact à retenir » est arbitraire par construction :
    // inutile de poser la question (redondance = question en trop).
    a.nature !== 'nom'
  ) {
    return Q_ARBITRAIRE;
  }
  if (
    effective === 'schema' &&
    (problem === 'oublie' || problem === 'reconnais-seulement') &&
    a.position === undefined
  ) {
    return Q_POSITION;
  }
  if (effective === 'definition' && problem === 'oublie' && a.dejaProduit === undefined) {
    return Q_DEJA_PRODUIT;
  }
  if (effective === 'mecanisme' && problem === 'oublie' && a.nature === undefined) {
    return Q_NATURE;
  }
  return null;
}

function effectiveType(a: DiagAnswers): DiagItemType {
  if (a.itemType !== 'inconnu' && a.itemType !== undefined) return a.itemType;
  switch (a.nature) {
    case 'nom':
      return 'liste';
    case 'relation':
      return 'mecanisme';
    case 'calcul':
      return 'calcul';
    case 'chronologie':
      return 'chronologie';
    case 'confusion':
      return a.itemType === 'inconnu' ? 'definition' : 'definition';
    default:
      return 'definition';
  }
}

function effectiveProblem(a: DiagAnswers): NonNullable<DiagAnswers['problem']> {
  if (a.itemType === 'inconnu' && a.nature === 'confusion') return 'melange';
  return a.problem ?? 'oublie';
}

// ------------------------------------------------------------- Routage

function step(methodId: string, why: string): RecoStep {
  return { methodId, why };
}

function subjectOf(a: DiagAnswers): SubjectId | undefined {
  return a.subject !== undefined && a.subject !== 'autre' ? a.subject : undefined;
}

/**
 * Recommandation déterministe. Toujours 1 à 3 méthodes, dans l'ordre
 * d'utilisation, avec une justification courte.
 */
export function diagnose(a: DiagAnswers): Recommendation {
  const type = effectiveType(a);
  const problem = effectiveProblem(a);
  const subjectId = subjectOf(a);

  // ---- QCM / correction : le type prime (Source V2 : « QCM raté »). ----
  if (type === 'qcm') {
    if (problem === 'verifier-maitrise') {
      return {
        steps: [
          step('simulation-examen', 'Teste sous contraintes réelles : temps, grille, mélange.'),
          step('calibration-confiance', 'Compare confiance et exactitude pour repérer les fausses certitudes.'),
          step('correction-par-cause', 'Code chaque erreur pour la corriger par sa cause.'),
        ],
        reason: 'La maîtrise en QCM se vérifie en conditions d’épreuve, pas item par item.',
        subjectId,
      };
    }
    return {
      steps: [
        step('correction-par-cause', 'Identifie la cause exacte : K/C/T/L/F/Tps/G.'),
        step('qcm-actif', 'Retravaille proposition par proposition, mot décisif compris.'),
        step('rappel-differe', 'Reteste à distance, sous une autre formulation.'),
      ],
      reason:
        'Cause → correction adaptée → retest : une erreur de QCM n’est pas automatiquement une carte.',
      subjectId,
      caution: 'Toute erreur ne mérite pas une flashcard : la correction dépend de la cause.',
    };
  }

  // ---- Je mélange / je confonds : priorité absolue au contraste. ----
  if (problem === 'melange') {
    const isCalc = type === 'calcul';
    return {
      steps: isCalc
        ? [
            step('tableau-contraste', 'Mets les deux modèles côte à côte, avec leurs conditions d’application.'),
            step('interleaving', 'Mélange les familles d’exercices pour apprendre à choisir.'),
            step('exercice-a-froid', 'Vérifie le choix de modèle sans indice du chapitre.'),
          ]
        : [
            step('tableau-contraste', 'Arrête l’apprentissage séparé : A et B côte à côte, discriminant roi identifié.'),
            step('carte-contraste', 'Fixe le critère qui tranche dans une carte piège / contraste.'),
            step('interleaving', 'Alterne des questions A/B pour stabiliser la discrimination.'),
          ],
      reason:
        'Contraste A/B → discriminant roi → alternance : c’est la séquence anti-confusion de ton guide.',
      subjectId,
    };
  }

  // ---- Par type × problème. ----
  switch (type) {
    case 'mecanisme': {
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('chaine-causale', 'Reconstruis la logique : état initial, déclencheur, intermédiaires, résultat.'),
            step('feynman', 'Explique la chaîne sans support, puis vérifie au poly.'),
            step('perturbations', 'Prouve le transfert : « si X est bloqué, alors… ».'),
          ],
          reason: 'La logique d’abord, les noms ensuite ; l’explication se vérifie toujours.',
          subjectId,
          alsoSee: ['auto-explication'],
        };
      }
      if (problem === 'oublie' && a.nature === 'nom') {
        return {
          steps: [
            step('imagerie-interactive', 'Accroche chaque nom rebelle par une image interactive ciblée.'),
            step('carte-qr', 'Fixe le couple nom ↔ fonction dans une carte atomique.'),
            step('rappel-differe', 'Reteste les noms à distance : c’est là qu’ils glissent.'),
          ],
          reason:
            'Ta logique de chaîne tient ; ce sont les étiquettes qui glissent. Sépare logique et noms, puis reteste à distance.',
          subjectId,
          alsoSee: ['association-phonetique', 'carte-contraste'],
        };
      }
      if (problem === 'oublie') {
        return {
          steps: [
            step('chaine-causale', 'Reconstruis la chaîne de mémoire, maillon par maillon.'),
            step('perturbations', 'Teste « si… alors… » pour ancrer les transitions.'),
            step('rappel-differe', 'Revalide à distance, sous une autre formulation.'),
          ],
          reason: 'Un mécanisme se retient par sa causalité, pas par récitation.',
          subjectId,
        };
      }
      if (problem === 'reconnais-seulement') {
        return {
          steps: [
            step('feuille-blanche', 'Restitue la chaîne entière sur page vide, sans indice.'),
            step('chaine-causale', 'Compare ta restitution à la structure canonique.'),
            step('rappel-differe', 'Reteste plus tard sans support.'),
          ],
          reason: 'Reconnaître un mécanisme n’est pas le produire : force le rappel libre.',
          subjectId,
        };
      }
      if (problem === 'applique-pas' || problem === 'choix-methode') {
        return {
          steps: [
            step('perturbations', 'Entraîne-toi à prédire les conséquences d’un blocage.'),
            step('qcm-actif', 'Applique sur des QCM, proposition par proposition.'),
            step('variation', 'Change le point d’entrée : conséquence → mécanisme possible.'),
          ],
          reason: 'L’application d’un mécanisme, c’est la prédiction — pas la récitation.',
          subjectId,
        };
      }
      if (problem === 'verifier-maitrise') {
        return {
          steps: [
            step('feuille-blanche', 'Restitution complète sans support.'),
            step('perturbations', '« Si X manque… » : le test de compréhension réelle.'),
            step('calibration-confiance', 'Vérifie que ta certitude est calibrée.'),
          ],
          reason: 'Acquis = rappelé + expliqué + perturbé avec succès.',
          subjectId,
        };
      }
      break;
    }

    case 'definition': {
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('feynman', 'Explique la définition avec tes mots, puis reviens au vocabulaire exact.'),
            step('rappel-actif', 'Produis la formulation exacte sans support.'),
            step('carte-qr', 'Fixe-la dans une carte Question / Réponse.'),
          ],
          reason: 'Comprendre le sens → rappel libre → formulation exacte.',
          subjectId,
        };
      }
      if (problem === 'reconnais-seulement') {
        return {
          steps: [
            step('rappel-actif', 'Produis la définition avant de la reconnaître : ferme le support.'),
            step('carte-qr', 'Carte Q/R sur la formulation exacte.'),
            step('qcm-actif', 'Reteste en QCM reformulé, mot décisif repéré.'),
          ],
          reason:
            'Rappel actif → formulation exacte → carte Q/R → QCM reformulé : la séquence exacte de ton guide.',
          subjectId,
          caution:
            'Vigilance de ton profil : la reconnaissance peut masquer une faiblesse de rappel.',
        };
      }
      if (problem === 'oublie') {
        if (a.dejaProduit === 'non') {
          return {
            steps: [
              step('rappel-actif', 'Commence par produire sans support : c’est l’étape jamais faite.'),
              step('carte-qr', 'Puis seulement, fixe la formulation en carte.'),
              step('rappel-differe', 'Reteste à distance.'),
            ],
            reason: 'Ce qui n’a jamais été produit sans support n’est pas encore mémorisé.',
            subjectId,
          };
        }
        return {
          steps: [
            step('carte-qr', 'Entretiens la formulation exacte en carte atomique.'),
            step('cloze-cible', 'Cloze ciblé si le contexte de la phrase aide.'),
            step('rappel-differe', 'Valide la survie au délai.'),
          ],
          reason: 'Déjà produite une fois : le problème est l’entretien, pas l’encodage.',
          subjectId,
        };
      }
      if (problem === 'verifier-maitrise') {
        return {
          steps: [
            step('rappel-actif', 'Formulation exacte, sans support.'),
            step('qcm-actif', 'QCM reformulés avec pièges de lecture.'),
            step('calibration-confiance', 'Confiance vs exactitude.'),
          ],
          reason: 'Une définition est acquise produite ET reconnue sous reformulation.',
          subjectId,
        };
      }
      break;
    }

    case 'liste': {
      const arbitraire = a.arbitraire !== 'non';
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('chunking', 'Cherche d’abord la structure : 3 à 7 catégories fidèles au cours.'),
            step('feynman', 'Explique ce que la liste regroupe et pourquoi.'),
          ],
          reason: 'Une liste incomprise est d’abord un problème de structure.',
          subjectId,
        };
      }
      if (a.ordre === 'oui') {
        return {
          steps: arbitraire
            ? [
                step('histoire-chainage', 'Chaîne narrative courte : chaque item appelle le suivant.'),
                step('acronyme', 'Ou un acronyme si les initiales s’y prêtent.'),
                step('rappel-differe', 'Production dans l’ordre, puis retest à distance.'),
              ]
            : [
                step('frise-chronologique', 'Ordonne avec « ce qui change » sur chaque flèche.'),
                step('rappel-actif', 'Produis la séquence sans support.'),
                step('rappel-differe', 'Reteste l’ordre à distance : c’est lui qui glisse en différé.'),
              ],
          reason: arbitraire
            ? 'Ordre + arbitraire : chaîne, histoire minimale, puis carte seulement pour les maillons fragiles.'
            : 'Ordre porteur de sens : la frise et la production dans l’ordre suffisent souvent.',
          subjectId,
        };
      }
      if (arbitraire) {
        return {
          steps: [
            step('chunking', 'Structure et contextualise d’abord : catégories, invariants.'),
            step('imagerie-interactive', 'Accroche imagée / phonétique ciblée pour ce qui résiste.'),
            step('repetition-espacee', 'Anki pour les items validés, puis rappel différé.'),
          ],
          reason:
            'Structure / contextualisation → imagerie ciblée → Anki → rappel différé : la route de ton guide pour les noms arbitraires.',
          subjectId,
          alsoSee: ['association-phonetique', 'rappel-differe'],
        };
      }
      return {
        steps: [
          step('chunking', 'Catégorise : la hiérarchie avant les items.'),
          step('feuille-blanche', 'Restitue l’exhaustivité de mémoire.'),
          step('repetition-espacee', 'Cartes seulement pour les items qui manquent au retest.'),
        ],
        reason: 'Liste déductible : la structure fait l’essentiel du travail.',
        subjectId,
      };
    }

    case 'tableau': {
      return {
        steps: [
          step('chunking', 'Axes, invariants, oppositions, exceptions — dans cet ordre.'),
          step('rappel-actif', 'Rappel progressif des cellules, ligne par ligne.'),
          step('carte-contraste', 'Cartes uniquement pour les oppositions qui se confondent.'),
        ],
        reason: 'Un tableau s’apprend par ses axes et ses exceptions, pas cellule par cellule.',
        subjectId,
        alsoSee: ['tableau-contraste'],
      };
    }

    case 'schema': {
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('reconstruction-schema', 'Orientation et gros repères d’abord.'),
            step('double-representation', 'Aligne mots et schéma : chacun doit régénérer l’autre.'),
          ],
          reason: 'Un schéma se comprend par son orientation et ses relations.',
          subjectId,
        };
      }
      const withPosition = a.position !== 'non';
      return {
        steps: [
          step('reconstruction-schema', 'Orientation → gros repères → reconstruction de mémoire.'),
          ...(withPosition
            ? [step('image-occlusion', 'Image Occlusion sur les légendes / positions qui résistent.')]
            : [step('feuille-blanche', 'Restitue les relations sur page vide.')]),
          step('rappel-differe', 'Refais sur une vue nouvelle, à distance.'),
        ],
        reason:
          'Orientation → gros repères → reconstruction → vue nouvelle → occlusion : la route visuelle de ton guide.',
        subjectId,
      };
    }

    case 'chronologie': {
      return {
        steps: [
          step('frise-chronologique', 'Avant → transformation → après, avec « ce qui change » sur chaque flèche.'),
          step('reconstruction-schema', 'Redessine les transitions clés.'),
          step('rappel-differe', 'Teste l’ordre et un décalage, à distance.'),
        ],
        reason: 'Une chronologie s’apprend par ses transformations, pas par ses dates seules.',
        subjectId,
        alsoSee: ['repetition-espacee'],
      };
    }

    case 'calcul': {
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('exemple-resolu', 'Étudie une solution complète en te demandant « pourquoi cette étape ? ».'),
            step('auto-explication', 'Relie chaque étape à une règle ou une hypothèse du cours.'),
            step('fading', 'Puis retire l’aide progressivement.'),
          ],
          reason: 'Chez le novice, l’exemple résolu expliqué bat l’exercice à l’aveugle.',
          subjectId,
        };
      }
      if (problem === 'choix-methode' || problem === 'applique-pas') {
        return {
          steps: [
            step('exemple-resolu', 'Modèle et hypothèses d’abord : vois comment le choix se fait.'),
            step('fading', 'Complète des exemples de plus en plus troués.'),
            step('exercice-a-froid', 'Choisis le modèle seul, sans indice du chapitre.'),
          ],
          reason:
            'Modèle / hypothèses → exemple résolu → fading → exercice à froid → entrelacement : la montée en autonomie de ton guide.',
          subjectId,
          alsoSee: ['interleaving'],
          caution: 'L’entrelacement vient après l’acquisition initiale, pas avant.',
        };
      }
      if (problem === 'oublie') {
        return {
          steps: [
            step('auto-explication', 'Reprends la formule par sens, variables, unités, hypothèses.'),
            step('carte-calcul', 'Automatise l’application courte en carte calcul.'),
            step('exercice-a-froid', 'Applique à froid avec contrôle dimensionnel.'),
          ],
          reason: 'Une formule tient par ses variables et ses conditions, pas par sa forme.',
          subjectId,
        };
      }
      if (problem === 'verifier-maitrise') {
        return {
          steps: [
            step('exercice-a-froid', 'Résous sans indice, contrôle et interprète.'),
            step('variation', 'Change données, inconnue ou formulation.'),
            step('interleaving', 'Mélange les familles : le choix fait partie de la maîtrise.'),
          ],
          reason: 'Maîtriser = choisir le modèle et réussir sous variation.',
          subjectId,
        };
      }
      if (problem === 'reconnais-seulement') {
        return {
          steps: [
            step('rappel-actif', 'Écris la formule et ses conditions sans support.'),
            step('carte-calcul', 'Automatise les applications courtes.'),
            step('exercice-a-froid', 'Puis résous à froid.'),
          ],
          reason: 'Reconnaître une formule ne suffit pas : produis-la avec ses hypothèses.',
          subjectId,
        };
      }
      break;
    }

    case 'texte': {
      if (problem === 'comprends-pas') {
        return {
          steps: [
            step('chunking', 'Dégage notions, thèse, arguments, limites.'),
            step('liste-questions', 'Transforme titres et objectifs en questions.'),
            step('feynman', 'Explique la thèse avec tes mots, puis vérifie les formulations du cours.'),
          ],
          reason: 'Définition → thèse → arguments → distinctions → plan → production.',
          subjectId,
        };
      }
      return {
        steps: [
          step('liste-questions', 'Questions de définition, causalité, contraste, limites.'),
          step('feuille-blanche', 'Plans de 5 minutes et QROC produits sans support.'),
          step('rappel-differe', 'Reteste à distance en changeant la formulation.'),
        ],
        reason: 'Un texte se maîtrise par la production de plans et de réponses, pas par relecture.',
        subjectId,
      };
    }

    default:
      break;
  }

  // ---- Fallbacks par problème (tout type restant). ----
  switch (problem) {
    case 'comprends-pas':
      return {
        steps: [
          step('feynman', 'Explique simplement, repère les mots-écrans, corrige au poly.'),
          step('auto-explication', 'Justifie chaque étape par une règle du cours.'),
        ],
        reason: 'Comprendre d’abord : simple → précis → formulation du poly.',
        subjectId,
      };
    case 'applique-pas':
      return {
        steps: [
          step('exemple-resolu', 'Repars d’un exemple entièrement résolu et expliqué.'),
          step('variation', 'Puis varie l’énoncé en gardant le principe.'),
          step('qcm-actif', 'Applique en QCM, proposition par proposition.'),
        ],
        reason: 'De l’exemple expliqué vers le transfert, aide en moins à chaque pas.',
        subjectId,
      };
    case 'choix-methode':
      return {
        steps: [
          step('exemple-resolu', 'Observe comment le choix de méthode se justifie.'),
          step('interleaving', 'Entraîne le choix sur des séries mélangées.'),
        ],
        reason: 'Choisir est une compétence : elle s’entraîne en mélange, pas en série homogène.',
        subjectId,
      };
    case 'verifier-maitrise':
      return {
        steps: [
          step('feuille-blanche', 'Restitution structurée sans support.'),
          step('qcm-actif', 'QCM proposition par proposition.'),
          step('calibration-confiance', 'Compare confiance et exactitude.'),
        ],
        reason: 'Acquis = rappelé, expliqué, distingué, appliqué.',
        subjectId,
        alsoSee: ['rappel-differe', 'simulation-examen'],
      };
    case 'apprendre-vite':
      return {
        steps: [
          step('revision-rapide', 'Circuit court : rappel, erreurs, distinctions, chiffres, QCM.'),
          step('blurting', 'Blurting sur les sections déjà comprises.'),
          step('repetition-espacee', 'Cartes uniquement pour ce qui a résisté.'),
        ],
        reason: 'Rendement maximal sur portion comprise : produire, cibler, ne rien reconstruire.',
        subjectId,
      };
    case 'reconnais-seulement':
      return {
        steps: [
          step('rappel-actif', 'Produis avant de reconnaître : ferme le support.'),
          step('feuille-blanche', 'Restitution complète de la portion.'),
          step('carte-qr', 'Fixe les éléments qui manquent en cartes.'),
        ],
        reason: 'La reconnaissance masque une faiblesse de rappel : force la production.',
        subjectId,
        caution: 'Vigilance de ton profil : reconnaissance forte ≠ rappel libre acquis.',
      };
    case 'oublie':
    default:
      return {
        steps: [
          step('rappel-actif', 'Ferme le support et produis.'),
          step('feuille-blanche', 'Restitue la structure, code les trous.'),
          step('rappel-differe', 'Reteste à distance sous une autre forme.'),
        ],
        reason: 'Produire, corriger les trous, revalider à distance : le socle du guide.',
        subjectId,
      };
  }
}
