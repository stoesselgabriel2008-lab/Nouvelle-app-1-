import type { Method } from '../types';

/** Rapport au support : notes, relecture. Source V2, §6. */
export const supportMethods: Method[] = [
  {
    id: 'prise-de-notes',
    title: 'Prise de notes ciblée',
    subtitle: 'Cours · Support',
    summary:
      'Le poly reste la source : ne note que le complément oral, la précision de périmètre, l’exemple ou le lien absent du poly. Ne le réécris pas au propre.',
    categories: ['structurer', 'comprendre'],
    subjects: [],
    infoTypes: ['texte'],
    problems: ['concentration', 'comprends-pas'],
    aliases: [
      'prise de notes',
      'notes',
      'annoter',
      'notes cours',
      'fiche',
      'faire des fiches',
      'recopier le cours',
    ],
    keywords: ['complément', 'périmètre', 'abréviations', 'poly'],
    tags: ['support'],
    whenToUse: [
      'Pour les compléments oraux, précisions de périmètre, exemples ou liens absents du poly.',
    ],
    avoid: [
      'Ne réécris pas le poly au propre et ne fabrique pas une fiche esthétique qui ne change pas la restitution.',
    ],
    quickSteps: [
      'Garde le poly comme source.',
      'Note seulement le complément ou la précision.',
      'Utilise des abréviations stables.',
      'Réserve un espace aux questions.',
      'Ne recopie pas au propre sans bénéfice mesurable.',
    ],
    procedure: [
      { text: 'Garder le poly comme source.' },
      {
        text: 'Noter seulement le complément ou la précision.',
        micro: ['N’écris que ce qui n’est PAS déjà dans le poly : précision de périmètre, exemple oral, lien entre chapitres.'],
      },
      { text: 'Utiliser des abréviations stables.', micro: ['Toujours les mêmes : ↑ ↓ → ⚠︎ df (définition), ex (exemple), NP (non exigible).'] },
      {
        text: 'Réserver un espace aux questions.',
        detail: 'Les questions notées deviennent ta liste de questions (voir la fiche dédiée).',
        micro: ['Une marge dédiée ; chaque question marquée d’un « ? » bien visible.'],
      },
      { text: 'Ne pas recopier au propre sans bénéfice mesurable.' },
    ],
    mastery: [
      'Les notes ajoutent une information utile au lieu de dupliquer le support.',
    ],
    example:
      'En amphi : le poly est projeté, tu ne recopies rien — tu notes la précision de périmètre (« pas exigible »), l’exemple donné à l’oral, et ta question en marge.',
    next: { id: 'liste-questions', label: 'Tes questions notées deviennent ta banque de questions.' },
    related: ['liste-questions', 'relecture-surlignage', 'chunking'],
    source: 'Source V2 — §6 Bibliothèque, p. 27-28',
  },
  {
    id: 'relecture-surlignage',
    title: 'Relecture / surlignage : usage limité',
    subtitle: 'Orientation · À ne pas confondre',
    summary:
      'Relire sert à repérer, retrouver, orienter ou corriger un trou identifié — jamais à prouver la maîtrise. La sensation de familiarité n’est pas de la mémoire.',
    categories: ['comprendre'],
    subjects: [],
    infoTypes: ['texte'],
    problems: ['oublie', 'reconnais-seulement'],
    aliases: [
      'relire',
      'relecture',
      'surligner',
      'surlignage',
      'highlighter',
      'stabilo',
      'ça semble familier',
      'je relis tout le temps',
    ],
    keywords: ['familiarité', 'orientation', 'illusion de maîtrise', 'passif'],
    tags: ['usage limité'],
    whenToUse: [
      'Pour repérer le plan, retrouver un passage, orienter l’attention ou corriger un trou identifié.',
    ],
    avoid: [
      'Ne l’utilise pas comme preuve de maîtrise ni comme méthode principale de consolidation.',
    ],
    quickSteps: [
      'Lis avec une question précise.',
      'Surligne seulement les discriminants, si utile.',
      'Ferme le support.',
      'Produis.',
      'Rouvre uniquement pour corriger.',
    ],
    procedure: [
      {
        text: 'Lire avec une question précise.',
        micro: ['Avant d’ouvrir, écris ce que tu cherches : « le critère qui distingue X de Y », « la condition d’application de… ».'],
      },
      {
        text: 'Surligner seulement les discriminants si utile.',
        micro: ['Surligne des MOTS, pas des phrases — uniquement ceux qui tranchent ou qui portent une exception.'],
      },
      { text: 'Fermer le support.' },
      {
        text: 'Produire.',
        detail: 'La relecture n’est finie que lorsqu’elle a déclenché une production.',
        micro: ['Sur feuille blanche ou à voix haute : récite les idées puis les mots-clés de ce que tu viens de lire.'],
      },
      { text: 'Rouvrir uniquement pour corriger.' },
    ],
    mastery: [
      'La relecture conduit à une production, pas à une familiarité confortable.',
    ],
    limits: [
      '« Relire jusqu’à connaître » : la familiarité peut masquer un rappel libre faible.',
    ],
    whyItWorks:
      'Relire crée de la familiarité, pas du rappel : le texte « te parle », donc tu crois le savoir — l’illusion de maîtrise la mieux documentée.',
    example:
      'Tu relis le chapitre et tout te semble connu. Ferme-le et récite les critères diagnostiques : ce qui ne sort pas n’était que familier.',
    next: { id: 'rappel-actif', label: 'Ferme le support et produis — la relecture n’était que l’entrée.' },
    related: ['rappel-actif', 'pretest', 'feuille-blanche'],
    source: 'Source V2 — §6 Bibliothèque, p. 28',
  },
];
