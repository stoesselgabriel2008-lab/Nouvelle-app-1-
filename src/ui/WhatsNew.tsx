import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  APP_VERSION,
  CHANGELOG,
  markVersionSeen,
  shouldShowWhatsNew,
  unseenChangelog,
  type ChangelogEntry,
} from '../lib/version';
import { Icon } from './Icon';

/**
 * Panneau « Quoi de neuf » :
 * - s'ouvre tout seul après une mise à jour (jamais au premier lancement) ;
 * - s'ouvre à la demande depuis Pour moi → Application ;
 * - se ferme d'un geste (bouton, fond, Échap) et ne revient pas pour la
 *   même version.
 */

type Mode = 'closed' | 'auto' | 'browse';
let mode: Mode = 'closed';
const listeners = new Set<() => void>();

function setMode(m: Mode): void {
  mode = m;
  listeners.forEach((l) => l());
}

export function openWhatsNew(): void {
  setMode('browse');
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function WhatsNewGate() {
  const current = useSyncExternalStore(subscribe, () => mode, () => 'closed' as Mode);
  // Décision prise dès le rendu initial : les effets des pages (historique
  // des consultations…) écrivent dans le stockage AVANT les effets de ce
  // composant — décider ici garantit qu'un tout premier lancement, même sur
  // un lien profond, n'est jamais pris pour une mise à jour.
  const [autoShow] = useState(() => shouldShowWhatsNew());
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoShow) {
      setEntries(unseenChangelog());
      setMode('auto');
    } else {
      markVersionSeen();
    }
  }, [autoShow]);

  useEffect(() => {
    if (current === 'closed') return;
    if (current === 'browse') setEntries(CHANGELOG);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [current]);

  const close = () => {
    markVersionSeen();
    setMode('closed');
  };

  if (current === 'closed') return null;

  return (
    <div className="sheet-backdrop" onClick={close}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsnew-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-head">
          <div>
            <h2 id="whatsnew-title" className="title3">
              {current === 'auto' ? 'L’app a été mise à jour' : 'Quoi de neuf'}
            </h2>
            <p className="footnote muted" style={{ marginTop: 2 }}>
              Version {APP_VERSION}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            aria-label="Fermer"
            onClick={close}
          >
            <Icon name="close" size={19} strokeWidth={2.1} />
          </button>
        </div>
        <div className="sheet-body">
          {entries.map((e) => (
            <section key={e.version} className="sheet-section">
              {entries.length > 1 ? (
                <p className="section-mini">Version {e.version}</p>
              ) : null}
              <ul className="fact-list fact-list--check">
                {e.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="sheet-foot">
          <button type="button" className="btn" onClick={close}>
            Compris
          </button>
        </div>
      </div>
    </div>
  );
}
