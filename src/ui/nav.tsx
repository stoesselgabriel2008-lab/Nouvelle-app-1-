import { useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { haptic } from '../lib/haptics';
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
 * circulaire séparé.
 * v3.0.1 : onglets « pilule extensible » (le pattern de barre le plus copié —
 * navigation bar Material 3 / CodePen) : icône seule au repos, l'onglet actif
 * s'étire en pilule pleine couleur avec son nom, les voisins glissent.
 * Un glissement du doigt SUR la capsule change d'onglet, comme Safari iOS.
 */
export function TabBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const touch = useRef<{ x: number; y: number } | null>(null);

  const active = ENTRIES.findIndex((e) =>
    e.end === true ? pathname === e.to : pathname.startsWith(e.to),
  );

  const swipeTo = (delta: number) => {
    const from = active === -1 ? 0 : active;
    const next = Math.min(ENTRIES.length - 1, Math.max(0, from + delta));
    if (next === active) return;
    haptic(6);
    void navigate(ENTRIES[next]!.to, { viewTransition: true });
  };

  return (
    <nav className="tabbar-wrap" aria-label="Navigation principale">
      <div
        className="tabbar"
        onTouchStart={(e) => {
          const t = e.touches[0];
          touch.current = t !== undefined ? { x: t.clientX, y: t.clientY } : null;
        }}
        onTouchEnd={(e) => {
          const start = touch.current;
          const t = e.changedTouches[0];
          touch.current = null;
          if (start === null || t === undefined) return;
          const dx = t.clientX - start.x;
          const dy = t.clientY - start.y;
          if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            e.preventDefault();
            swipeTo(dx < 0 ? 1 : -1);
          }
        }}
      >
        {ENTRIES.map((e) => (
          <NavLink
            key={e.to}
            to={e.to}
            end={e.end}
            className="tab-item"
            viewTransition
            aria-label={e.tabLabel ?? e.label}
            onClick={() => haptic(5)}
          >
            <Icon name={e.icon} size={23} />
            <span>{e.tabLabel ?? e.label}</span>
          </NavLink>
        ))}
      </div>
      <NavLink to="/recherche" className="tab-search" aria-label="Recherche" viewTransition>
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
        <NavLink key={e.to} to={e.to} end={e.end} className="side-item" viewTransition>
          <Icon name={e.icon} size={21} />
          <span>{e.label}</span>
        </NavLink>
      ))}
      <NavLink to="/recherche" className="side-item" viewTransition>
        <Icon name="search" size={21} />
        <span>Recherche</span>
      </NavLink>
      <div className="side-sep" aria-hidden="true" />
      <NavLink to="/coach" className="side-item" viewTransition>
        <Icon name="heart" size={21} />
        <span>Axel, ton coach</span>
      </NavLink>
      <NavLink to="/citations" className="side-item" viewTransition>
        <Icon name="expand" size={21} />
        <span>Citations</span>
      </NavLink>
      <div className="sidebar-foot">
        <p>
          Recherche rapide : <span className="kbd">⌘K</span>
        </p>
      </div>
    </nav>
  );
}
