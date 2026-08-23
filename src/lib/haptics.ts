/**
 * Retour haptique discret (iOS/Android via l'API Vibration quand elle existe).
 * Toujours silencieux en cas d'absence — jamais d'erreur, jamais de bruit.
 */
export function haptic(ms = 8): void {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* indisponible : tant pis */
  }
}
