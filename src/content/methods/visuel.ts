import type { Method } from '../types';

/** Visuel et spatial : schémas, planches, occlusion. Source V2, §6. */
export const visuelMethods: Method[] = [
  {
    id: 'reconstruction-schema',
    title: 'Reconstruction de schéma',
    subtitle: 'Visuel · Anatomie · Biocell',
    summary:
      'Observe l’orientation et les gros repères, cache le schéma, puis redessine de mémoire — même grossièrement. Le dessin est un test fonctionnel, pas une œuvre.',
    categories: ['representer', 'memoriser', 'se-tester'],
    subjects: ['anatomie', 'histologie', 'biocell', 'embryologie'],
    infoTypes: ['schema'],
    problems: ['oublie', 'reconnais-seulement', 'verifier-maitrise'],
    aliases: [
      'redessiner',
      'schéma de mémoire',
      'dessin de mémoire',
      'reconstruire le schéma',
      'dessiner sans regarder',
      'refaire le schéma',
    ],
    keywords: ['orientation', 'repères', 'relations', 'spatial', 'planche', 'coupe'],
    tags: ['visuel'],
    whenToUse: [
      'Quand la position, les rapports ou l’organisation sont exigibles.',
    ],
    avoid: [
      'Ne vise pas une œuvre graphique : le dessin est un test fonctionnel.',
    ],
    quickSteps: [
      'Observe l’orientation et les gros repères.',
      'Cache le schéma.',
      'Redessine les repères.',
      'Ajoute les relations importantes.',
      'Compare aux légendes.',
      'Refais sur une vue différente si disponible.',
    ],
    procedure: [
      { text: 'Observer l’orientation et les gros repères.', detail: 'Plan de coupe, droite/gauche, supérieur/inférieur, antérieur/postérieur — avant tout détail.' },
      { text: 'Cacher le schéma.' },
      { text: 'Redessiner les repères.', detail: 'Les gros repères d’abord, même grossièrement : la précision viendra après la structure.' },
      { text: 'Ajouter les relations importantes.', detail: 'Rapports, trajets, contiguïtés : ce sont eux qui tombent en QCM.' },
      { text: 'Comparer aux légendes.' },
      { text: 'Refaire sur une vue différente si disponible.', detail: 'Ne jamais apprendre une seule planche : c’est la variation de vue qui prouve la maîtrise.' },
    ],
    example:
      'Coupe du rein : redessine contour, cortex, médulla, hile — puis place les vaisseaux, puis compare et refais sur une coupe d’un autre atlas.',
    personal: [
      'Bon complément à ton sens de la structure et du spatial.',
    ],
    anki: {
      yes: ['Les légendes ou positions isolées qui résistent : en Image Occlusion.'],
      no: ['La reconstruction complète : elle se refait sur papier, pas en carte.'],
    },
    mastery: [
      'Tu peux reconstruire les relations, pas seulement reconnaître l’image.',
    ],
    whyItWorks:
      'Reconnaître une planche déjà vue ne prouve rien : c’est la reconstruction des repères et des rapports qui montre que la structure est à toi — et elle survit au changement de vue.',
    next: { id: 'image-occlusion', label: 'Fixe en occlusion les légendes qui ont résisté au redessin.' },
    related: ['image-occlusion', 'feuille-blanche', 'double-representation', 'frise-chronologique'],
    source: 'Source V2 — §6 Bibliothèque, p. 19-20',
  },
  {
    id: 'image-occlusion',
    title: 'Image Occlusion',
    subtitle: 'Anki · Visuel',
    summary:
      'Masque une légende ou une petite zone logique d’une figure officielle dans Anki, réponds avant de révéler, et varie les vues. Un rappel ciblé là où la position porte l’information.',
    categories: ['anki', 'memoriser'],
    subjects: ['anatomie', 'histologie', 'biocell', 'embryologie'],
    infoTypes: ['schema'],
    problems: ['oublie', 'reconnais-seulement'],
    aliases: [
      'image occlusion',
      'occlusion',
      'masquer légende',
      'anki image',
      'anatomie image',
      'histo image',
      'cacher les légendes',
    ],
    keywords: ['figure', 'planche', 'légende', 'masque', 'anki', 'position'],
    tags: ['anki', 'visuel'],
    whenToUse: [
      'Pour anatomie, histologie, structures ou schémas où une légende / position mérite un rappel ciblé.',
    ],
    avoid: [
      'Ne masque pas 20 éléments à la fois sans contexte.',
      'Évite si la relation est mieux apprise par compréhension.',
    ],
    quickSteps: [
      'Choisis une figure officielle.',
      'Masque une cible ou un petit groupe logique.',
      'Réponds avant de révéler.',
      'Ajoute fonction, rapport ou piège dans le champ extra — pas un paragraphe.',
      'Varie les vues si possible.',
    ],
    procedure: [
      { text: 'Choisir une figure officielle.', detail: 'Celle du poly : c’est elle qui fait foi le jour de l’épreuve.' },
      { text: 'Masquer une cible ou un petit groupe logique.' },
      { text: 'Répondre avant de révéler.' },
      { text: 'Ajouter fonction / rapport / piège dans l’extra, pas un paragraphe.' },
      { text: 'Varier les vues si possible.', detail: 'Une autre coupe, un autre grossissement : l’objectif est de reconnaître la structure, pas l’image.' },
    ],
    mastery: [
      'Tu identifies la cible sur une vue ou un contexte qui n’est pas strictement identique.',
    ],
    example:
      'Planche d’histologie du poly : masque une seule structure par carte, réponds avant de révéler, et ajoute dans l’extra le critère qui permet de la reconnaître sur une autre lame.',
    next: { id: 'rappel-differe', label: 'Valide sur une vue différente, pas sur la même image.' },
    related: ['reconstruction-schema', 'repetition-espacee', 'carte-qr'],
    source: 'Source V2 — §6 Bibliothèque, p. 20',
  },
];
