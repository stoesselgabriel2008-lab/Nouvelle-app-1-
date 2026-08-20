import type { PersonalRule, ProfileSignal } from './types';

/**
 * Profil fonctionnel personnalisé — Source V2, §2 (p. 3-4).
 *
 * IMPORTANT (nuance de la source) : ce profil n'est PAS un « style
 * d'apprentissage » fixe. C'est un profil fonctionnel observé sur des tâches
 * différentes ; la méthode doit toujours être adaptée aussi à la nature du
 * contenu.
 */
export const PROFILE_NOTE =
  'Ce profil n’est pas un « style d’apprentissage » fixe. Il s’agit d’observations fonctionnelles sur des tâches différentes : la méthode s’adapte toujours aussi à la nature du contenu.';

export const PROFILE_SIGNALS: ProfileSignal[] = [
  {
    signal: 'Imagerie associative interactive',
    consequence:
      'Très forte sur les essais : les associations imagées et actives ont été retenues nettement mieux que la répétition verbale simple.',
  },
  {
    signal: 'Structuration / ordre',
    consequence:
      'Fort levier : l’architecture, la hiérarchie et l’ordre sont souvent mieux conservés que des détails isolés.',
  },
  {
    signal: 'Mécanismes',
    consequence:
      'La logique générale est souvent mieux retenue que les étiquettes exactes des intermédiaires.',
  },
  {
    signal: 'Noms arbitraires',
    consequence:
      'Plus fragiles ; ils peuvent s’interférer entre mécanismes proches.',
  },
  {
    signal: 'Reconnaissance vs rappel',
    consequence:
      'La reconnaissance en QCM peut être très forte alors que le rappel libre du nom précis reste incomplet.',
  },
  {
    signal: 'Visuo-spatial',
    consequence:
      'Bon, mais l’effet le plus net vient de l’imagerie interactive et de la structure, pas d’une « mémoire photographique ».',
  },
];

export const PERSONAL_RULES: PersonalRule[] = [
  {
    id: 'structure-abord',
    rule: 'Structure d’abord : carte, hiérarchie, compartiments, chronologie ou modèle avant les détails.',
    methods: ['chunking', 'mind-map', 'chaine-causale', 'frise-chronologique'],
  },
  {
    id: 'association-ciblee',
    rule: 'Pour un détail arbitraire qui résiste, autoriser une association imagée / phonétique de quelques secondes — mais seulement si elle rappelle sans ambiguïté la cible.',
    methods: ['imagerie-interactive', 'association-phonetique'],
  },
  {
    id: 'produire-avant-conclure',
    rule: 'Toujours produire sans support avant de conclure « je connais » : la reconnaissance peut masquer une faiblesse de rappel.',
    methods: ['rappel-actif', 'feuille-blanche', 'calibration-confiance'],
  },
  {
    id: 'contraste-ab',
    rule: 'Quand deux notions se ressemblent, arrêter l’apprentissage séparé et faire un contraste A/B avec un discriminant principal.',
    methods: ['tableau-contraste', 'carte-contraste', 'interleaving'],
  },
  {
    id: 'logique-vs-noms',
    rule: 'Pour les mécanismes, séparer « logique de la chaîne » et « noms exacts », puis retester les noms à distance.',
    methods: ['chaine-causale', 'rappel-differe', 'carte-qr'],
  },
  {
    id: 'mnemo-non-industrielle',
    rule: 'Ne jamais industrialiser les mnémotechniques : elles sont un crochet pour l’arbitraire, pas une façon de remplacer une relation compréhensible.',
    methods: ['imagerie-interactive', 'association-phonetique', 'palais-mental'],
  },
];

export const PROFILE_SOURCE = 'Source V2 — §2 Profil fonctionnel, p. 3-4';
