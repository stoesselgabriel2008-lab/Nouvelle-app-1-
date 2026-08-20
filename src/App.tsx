import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
} from 'react-router-dom';
import { Sidebar, TabBar } from './ui/nav';
import { applyUpdate, hasUpdate, subscribeUpdate } from './lib/sw';
import { ForMePage } from './pages/ForMePage';
import { LibraryPage } from './pages/LibraryPage';
import { MethodPage } from './pages/MethodPage';
import { SubjectPage } from './pages/SubjectPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { SosListPage } from './pages/SosListPage';
import { SosPage } from './pages/SosPage';
import { SearchPage } from './pages/SearchPage';
import { ReferencePage } from './pages/ReferencePage';
import { NotFoundPage } from './pages/NotFoundPage';

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

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('/recherche');
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
        <Routes>
          <Route path="/" element={<ForMePage />} />
          <Route path="/bibliotheque" element={<LibraryPage />} />
          <Route path="/methode/:id" element={<MethodPage />} />
          <Route path="/matiere/:id" element={<SubjectPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/sos" element={<SosListPage />} />
          <Route path="/sos/:id" element={<SosPage />} />
          <Route path="/recherche" element={<SearchPage />} />
          <Route path="/reperes/:id" element={<ReferencePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <TabBar />
      <UpdateToast />
    </div>
  );
}
