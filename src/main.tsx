import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { setRegistration, setUpdateReady } from './lib/sw';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
