/**
 * Raccourcis de l'onglet « Pour moi » — 5 entrées maximum (prompt maître, §5).
 * Chaque raccourci mène en un geste à une action, pas à un menu.
 */
export interface Shortcut {
  id: string;
  label: string;
  /** Route interne (HashRouter). */
  to: string;
}

export const SHORTCUTS: Shortcut[] = [
  { id: 'rentre-pas', label: 'Ça ne rentre pas', to: '/sos/ca-rentre-pas' },
  { id: 'confonds', label: 'Je confonds', to: '/methode/tableau-contraste' },
  { id: 'mecanisme', label: 'Mécanisme', to: '/methode/chaine-causale' },
  {
    id: 'formule',
    label: 'Formule / exercice',
    to: '/diagnostic?type=calcul&problem=choix-methode',
  },
  {
    id: 'anki',
    label: 'Est-ce que ça mérite Anki ?',
    to: '/methode/repetition-espacee',
  },
];
