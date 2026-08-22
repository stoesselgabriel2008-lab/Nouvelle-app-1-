import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildFeed, feedAuthorLine } from '../content/feed';
import { advanceFeedPos } from '../lib/storage';
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
  const feed = useMemo(() => buildFeed(), []);
  // Chaque montage (ouverture de l'app, retour à l'accueil) = phrase suivante.
  const [pos, setPos] = useState(() => advanceFeedPos());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setPos(advanceFeedPos());
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
    >
      <span className="quote-hero-top">
        <span className="quote-hero-kicker">Coach mental</span>
        <Icon name="expand" size={16} />
      </span>
      <span className="quote-hero-body" key={pos}>
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
