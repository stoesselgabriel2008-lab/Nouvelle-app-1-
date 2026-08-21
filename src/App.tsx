import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType,
} from 'react-router-dom';
import { Sidebar, TabBar } from './ui/nav';
import { WhatsNewGate } from './ui/WhatsNew';
import { OfflineBadge } from './ui/OfflineBadge';
import { applyUpdate, hasUpdate, subscribeUpdate } from './lib/sw';

const scrollPositions = new Map<string, number>();

/** Haut de page en avant ; position restaurée au retour. */
function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  useLayoutEffect(() => {
    if (navType === 'POP') {
      window.scrollTo(0, scrollPositions.get(location.key) ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
    return () => {
      scrollPositions.set(location.key, window.scrollY);
    };
  }, [location, navType]);
  return null;
}

/**
 * Filet de sécurité View Transitions : si une navigation par hashchange
 * (retour très rapide, URL saisie) arrive pendant une transition active,
 * la route peut diverger du hash. On vérifie après coup et on resynchronise.
 */
function HashSyncGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const locRef = useRef(location);
  locRef.current = location;

  useEffect(() => {
    let timer: number | undefined;
    const check = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const raw = window.location.hash.slice(1) || '/';
        const current =
          locRef.current.pathname + locRef.current.search + locRef.current.hash;
        if (raw !== current) {
          void navigate(raw, { replace: true });
        }
      }, 300);
    };
    window.addEventListener('hashchange', check);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', check);
    };
  }, [navigate]);
  return null;
}

function UpdateToast() {
  const ready = useSyncExternalStore(subscribeUpdate, hasUpdate, () => false);
  if (!ready) return null;
  return (
    <div className="update-toast" role="status">
      <span className="subhead">Nouvelle version disponible.</span>
      <button type="button" className="btn btn--quiet" onClick={() => applyUpdate()}>
        Recharger
      </button>
    </div>
  );
}

export function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        void navigate('/recherche', { viewTransition: true });
        return;
      }
      // « / » ouvre la recherche (hors champs de saisie), comme partout ailleurs.
      const target = e.target as HTMLElement | null;
      const typing =
        target !== null &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        void navigate('/recherche', { viewTransition: true });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <ScrollManager />
        <HashSyncGuard />
        <Outlet />
      </div>
      <TabBar />
      <UpdateToast />
      <OfflineBadge />
      <WhatsNewGate />
    </div>
  );
}
