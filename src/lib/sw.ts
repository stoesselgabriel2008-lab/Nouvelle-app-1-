/**
 * Pont minimal entre le service worker (vite-plugin-pwa) et l'UI :
 * - quand une nouvelle version est prête, l'app propose « Recharger »
 *   sans jamais recharger de force ni toucher aux données locales ;
 * - « Vérifier les mises à jour » interroge le service worker à la demande.
 */

let updateFn: (() => void) | null = null;
let registration: ServiceWorkerRegistration | null = null;
const listeners = new Set<() => void>();

export function setUpdateReady(fn: () => void): void {
  updateFn = fn;
  listeners.forEach((l) => l());
}

export function setRegistration(reg: ServiceWorkerRegistration): void {
  registration = reg;
}

export function hasUpdate(): boolean {
  return updateFn !== null;
}

export function applyUpdate(): void {
  updateFn?.();
}

export function subscribeUpdate(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type UpdateCheckResult = 'update' | 'none' | 'unsupported';

/**
 * Vérification manuelle : demande au navigateur de re-télécharger le service
 * worker, puis laisse ~4 s à l'installation pour se déclarer. Si une mise à
 * jour est trouvée, le bandeau « Recharger » apparaît (via setUpdateReady).
 */
export async function checkForUpdates(): Promise<UpdateCheckResult> {
  if (hasUpdate()) return 'update';
  if (registration === null) return 'unsupported';
  try {
    await registration.update();
  } catch {
    return 'unsupported';
  }
  for (let i = 0; i < 8; i++) {
    if (hasUpdate()) return 'update';
    await new Promise((r) => setTimeout(r, 500));
  }
  return hasUpdate() ? 'update' : 'none';
}
