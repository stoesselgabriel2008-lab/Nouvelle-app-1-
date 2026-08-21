import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { Layout } from './App';
import { setRegistration, setUpdateReady } from './lib/sw';
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
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

const updateSW = registerSW({
  onNeedRefresh() {
    setUpdateReady(() => {
      void updateSW(true);
    });
  },
  onRegisteredSW(_url, reg) {
    if (reg) setRegistration(reg);
  },
});

// Routeur en mode « data » : indispensable pour les View Transitions natives
// (crossfade du navigateur entre les pages, comme une app iOS).
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ForMePage /> },
      { path: 'bibliotheque', element: <LibraryPage /> },
      { path: 'methode/:id', element: <MethodPage /> },
      { path: 'matiere/:id', element: <SubjectPage /> },
      { path: 'diagnostic', element: <DiagnosticPage /> },
      { path: 'sos', element: <SosListPage /> },
      { path: 'sos/:id', element: <SosPage /> },
      { path: 'recherche', element: <SearchPage /> },
      { path: 'reperes/:id', element: <ReferencePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
