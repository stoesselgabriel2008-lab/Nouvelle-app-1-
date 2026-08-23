import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildFeed, feedAuthorLine, filterFeed, normalizeFilter } from '../content/feed';
import { haptic } from '../lib/haptics';
import { advanceFeedPos, getQuoteFavs, getZenFilter } from '../lib/storage';
import { frTypo } from '../lib/typo';
import { Icon } from './Icon';

/**
 * Carte « coach mental » de l'accueil. La position dans le flux est
 * PERSISTANTE : chaque ouverture de l'app avance d'une phrase, et la rotation
 * (8 s) continue d'avancer le même curseur — on ne retombe jamais sur la même
 * citation en rouvrant l'app. Toucher la carte ouvre le plein écran sur la
 * phrase affichée. Pause quand l'onglet est caché ; pas de rotation si
 * l'utilisateur préfère réduire les animations.
 */

const ROTATE_MS = 8_000;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function QuoteCard() {
  // L'ambiance choisie en plein écran s'applique aussi à la carte d'accueil.
  const feed = useMemo(
    () => filterFeed(buildFeed(), normalizeFilter(getZenFilter()), getQuoteFavs()),
    [],
  );
  // Chaque montage (ouverture de l'app, retour à l'accueil) = phrase suivante.
  const [pos, setPos] = useState(() => advanceFeedPos());
  // Direction de l'animation : rotation douce par défaut, glisse au doigt.
  const [dir, setDir] = useState<'auto' | 'left' | 'right'>('auto');
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) {
        setDir('auto');
        setPos(advanceFeedPos());
      }
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const index = ((pos % feed.length) + feed.length) % feed.length;
  const item = feed[index]!;
  const authorLine = feedAuthorLine(item);
  const long = item.text.length > 140;

  return (
    <Link
      to={`/citations/plein-ecran?i=${index}`}
      className={`quote-hero quote-hero--${item.theme}`}
      viewTransition
      aria-label="Ouvrir les citations en plein écran"
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = t !== undefined ? { x: t.clientX, y: t.clientY } : null;
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        const t = e.changedTouches[0];
        touch.current = null;
        if (start === null || t === undefined) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        // Glisser horizontalement fait défiler les phrases sans quitter l'accueil.
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          e.preventDefault();
          haptic(6);
          if (dx < 0) {
            setDir('left');
            setPos(advanceFeedPos());
          } else {
            setDir('right');
            setPos((p) => p - 1);
          }
        }
      }}
    >
      <span className="quote-hero-top">
        <span className="quote-hero-kicker">Coach mental</span>
        <Icon name="expand" size={16} />
      </span>
      <span className={`quote-hero-body quote-hero-body--${dir}`} key={pos}>
        <span className={`quote-hero-text${long ? ' quote-hero-text--long' : ''}`}>
          {frTypo(item.text)}
        </span>
        <span className="quote-hero-author">
          {authorLine !== '' ? authorLine : 'Axel · ton coach'}
        </span>
      </span>
    </Link>
  );
}
