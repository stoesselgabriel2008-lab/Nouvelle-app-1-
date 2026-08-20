/**
 * Pont minimal entre le service worker (vite-plugin-pwa) et l'UI :
 * quand une nouvelle version est prête, l'app propose « Recharger »
 * sans jamais recharger de force ni toucher aux données locales.
 */

let updateFn: (() => void) | null = null;
const listeners = new Set<() => void>();

export function setUpdateReady(fn: () => void): void {
  updateFn = fn;
  listeners.forEach((l) => l());
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
