/**
 * Modèle de contenu de PASS Methods OS.
 *
 * Tout le contenu méthodologique vient de « PASS_Methods_App_Source_V2.pdf »
 * (référencé ci-dessous comme « Source V2 »). Le contenu vit ici, pas dans les
 * composants React : ajouter une méthode = ajouter un objet `Method` dans
 * src/content/methods/ et, si besoin, des alias. Rien d'autre à toucher —
 * recherche, diagnostic, bibliothèque et liens se mettent à jour tout seuls.
 */

export type SubjectId =
  | 'biocell'
  | 'biochimie'
  | 'chimie'
  | 'physique'
  | 'biophysique'
  | 'biostats'
  | 'anatomie'
  | 'histologie'
  | 'embryologie'
  | 'sante-publique'
  | 'medicament'
  | 'shs';

export type CategoryId =
  | 'comprendre'
  | 'structurer'
  | 'memoriser'
  | 'representer'
  | 'appliquer'
  | 'se-tester'
  | 'corriger'
  | 'anki'
  | 'mnemotechniques'
  | 'focus';

/** Types d'information de la matrice (Source V2, section 4). */
export type InfoTypeId =
  | 'definition'
  | 'nom-arbitraire'
  | 'association-arbitraire'
  | 'liste-ordonnee'
  | 'liste-non-ordonnee'
  | 'mecanisme'
  | 'notions-proches'
  | 'tableau'
  | 'schema'
  | 'chronologie'
  | 'formule'
  | 'calcul'
  | 'experience'
  | 'texte'
  | 'erreur-qcm';

/** Problèmes d'apprentissage (diagnostic, section 7 + SOS, section 8). */
export type ProblemId =
  | 'comprends-pas'
  | 'oublie'
  | 'reconnais-seulement'
  | 'melange'
  | 'applique-pas'
  | 'choix-methode'
  | 'verifier-maitrise'
  | 'apprendre-vite'
  | 'demarrer'
  | 'concentration'
  | 'fatigue'
  | 'retard'
  | 'stress'
  | 'qcm-rate'
  | 'anki-deborde';

export interface ProcedureStep {
  /** Étape telle que formulée dans la Source V2. */
  text: string;
  /** Précision issue du corpus (matrice, protocole matière, règles), si utile. */
  detail?: string;
  /**
   * Micro-étapes : le geste exact à exécuter, dans l'ordre, avec le
   * vocabulaire du corpus. Elles opérationnalisent l'étape sans la remplacer.
   */
  micro?: string[];
}

export interface AnkiGuidance {
  /** Ce qui mérite éventuellement une carte. */
  yes: string[];
  /** Ce qui mérite plutôt autre chose. */
  no: string[];
  note?: string;
}

export interface Method {
  /** Slug stable : sert d'URL (/methode/:id), d'ID de recherche et de routage diagnostic. */
  id: string;
  title: string;
  /** Sous-titre catégoriel de la fiche (badges de la Source V2). */
  subtitle: string;
  /** « EN 20 SECONDES » : synthèse très courte. */
  summary: string;
  categories: CategoryId[];
  /** Matières particulièrement concernées ([] = transversale). */
  subjects: SubjectId[];
  infoTypes: InfoTypeId[];
  problems: ProblemId[];
  /** Expressions naturelles/étudiantes qui doivent mener à cette fiche. */
  aliases: string[];
  keywords: string[];
  tags: string[];
  whenToUse: string[];
  /** « Quand ne pas l'utiliser comme ça ». */
  avoid: string[];
  /** « Fais ça maintenant » : 3 à 8 étapes actionnables. */
  quickSteps: string[];
  /** Procédure complète, fidèle à la Source V2 (jamais tronquée, repli explicite). */
  procedure: ProcedureStep[];
  /** Exemple PASS concret (illustration). */
  example?: string;
  /** « Adapté à moi » — uniquement si la Source V2 contient une adaptation. */
  personal?: string[];
  anki?: AnkiGuidance;
  /** « C'est acquis si… ». */
  mastery: string[];
  /** Limites et nuances scientifiques (section 11 de la Source V2). */
  limits?: string[];
  /**
   * « Pourquoi ça marche » : une phrase sérieuse et claire, adossée aux
   * repères de recherche de la Source V2 (§12). Réservée aux méthodes où la
   * justification éclaire vraiment l'usage.
   */
  whyItWorks?: string;
  /** Suite logique : la méthode qui vient naturellement après celle-ci. */
  next?: { id: string; label: string };
  /** IDs des méthodes proches. */
  related: string[];
  /** Référence discrète vers la Source V2 (section, pages). */
  source: string;
  /** Mise en avant dans « Pour moi » (profil fonctionnel, section 2). */
  forMe?: boolean;
}

export interface Subject {
  id: SubjectId;
  name: string;
  /** Nom court pour puces et filtres. */
  short: string;
  /** Ce que la matière exige méthodologiquement. */
  intro: string;
  /** Protocole complet de la Source V2, section 5. */
  protocol: ProcedureStep[];
  /** Méthodes pertinentes, dans l'ordre d'utilité. */
  methods: string[];
  aliases: string[];
  source: string;
}

export interface SosProtocol {
  id: string;
  /** Libellé du bouton, tel quel. */
  title: string;
  /** Une ligne de contexte. */
  tagline: string;
  /** « Fais ça maintenant » — très court, lisible en état de saturation. */
  doNow: string[];
  /** Ensuite, si besoin. */
  then?: string[];
  /** Méthodes liées pour approfondir une fois redémarré. */
  methods: string[];
  aliases: string[];
  /**
   * Protocole de détresse : affichage d'un encart « soutien humain », et
   * jamais de présentation de l'app comme un soin.
   */
  careNotice?: boolean;
  source: string;
}

export interface ProfileSignal {
  signal: string;
  consequence: string;
}

export interface PersonalRule {
  id: string;
  rule: string;
  /** Méthodes qui appliquent la règle. */
  methods: string[];
}

export interface Myth {
  myth: string;
  truth: string;
  /** Méthodes concernées. */
  methods: string[];
}

export interface AlgorithmStep {
  name: string;
  action: string;
  methods: string[];
}

export interface InfoTypeEntry {
  id: InfoTypeId;
  name: string;
  /** Méthode dominante (chaîne d'action de la matrice). */
  route: string;
  methods: string[];
}

export interface SourceEntry {
  domain: string;
  reference: string;
}
