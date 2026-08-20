import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { setUpdateReady } from './lib/sw';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

const updateSW = registerSW({
  onNeedRefresh() {
    setUpdateReady(() => {
      void updateSW(true);
    });
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
