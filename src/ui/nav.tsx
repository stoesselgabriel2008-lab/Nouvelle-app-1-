import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

interface NavEntry {
  to: string;
  label: string;
  /**
   * Libellé compact de la tab bar iPhone. « Bibliothèque » ne tient pas en
   * entier sur les iPhone 320 px sans troncature — interdite par la règle
   * anti-troncature — donc l'onglet s'appelle « Méthodes » (même destination,
   * la page garde son titre « Bibliothèque »).
   */
  tabLabel?: string;
  icon: IconName;
  end?: boolean;
}

const ENTRIES: NavEntry[] = [
  { to: '/', label: 'Pour moi', icon: 'person', end: true },
  { to: '/bibliotheque', label: 'Bibliothèque', tabLabel: 'Méthodes', icon: 'library' },
  { to: '/diagnostic', label: 'Diagnostic', icon: 'diagnostic' },
  { to: '/sos', label: 'SOS', icon: 'sos' },
];

/**
 * iPhone : capsule flottante en verre (4 onglets) + bouton Recherche
 * circulaire séparé — le pattern actuel des tab bars iOS.
 */
export function TabBar() {
  return (
    <nav className="tabbar-wrap" aria-label="Navigation principale">
      <div className="tabbar">
        {ENTRIES.map((e) => (
          <NavLink key={e.to} to={e.to} end={e.end} className="tab-item">
            <Icon name={e.icon} size={23} />
            <span>{e.tabLabel ?? e.label}</span>
          </NavLink>
        ))}
      </div>
      <NavLink to="/recherche" className="tab-search" aria-label="Recherche">
        <Icon name="search" size={24} strokeWidth={1.9} />
      </NavLink>
    </nav>
  );
}

/** iPad / desktop : sidebar persistante. */
export function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Navigation principale">
      <div className="sidebar-brand">
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="15" fill="var(--tint)" />
          <path
            d="M18 44V22.5c0-1.9 2.3-2.9 3.7-1.6l9.6 9 9.5-9c1.4-1.3 3.7-.3 3.7 1.6V44"
            fill="none"
            stroke="#fff"
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Methods OS</span>
      </div>
      {ENTRIES.map((e) => (
        <NavLink key={e.to} to={e.to} end={e.end} className="side-item">
          <Icon name={e.icon} size={21} />
          <span>{e.label}</span>
        </NavLink>
      ))}
      <NavLink to="/recherche" className="side-item">
        <Icon name="search" size={21} />
        <span>Recherche</span>
      </NavLink>
      <div className="sidebar-foot">
        <p>
          Recherche rapide : <span className="kbd">⌘K</span>
        </p>
      </div>
    </nav>
  );
}
