import { useSyncExternalStore } from 'react';

function subscribe(l: () => void): () => void {
  window.addEventListener('online', l);
  window.addEventListener('offline', l);
  return () => {
    window.removeEventListener('online', l);
    window.removeEventListener('offline', l);
  };
}

/**
 * Pastille discrète quand le réseau coupe. Message volontairement
 * rassurant : tout le contenu est déjà sur l'appareil.
 */
export function OfflineBadge() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
  if (online) return null;
  return (
    <div className="offline-pill" role="status">
      Hors ligne — tout reste disponible
    </div>
  );
}
