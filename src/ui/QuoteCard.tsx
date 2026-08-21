import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildFeed, feedAuthorLine } from '../content/feed';
import { frTypo } from '../lib/typo';
import { Icon } from './Icon';

/**
 * Carte « coach mental » de l'accueil : un aperçu sombre et immersif du mode
 * plein écran. Le flux du jour (phrases de coach + citations vérifiées) défile
 * toutes les 12 s ; toucher la carte ouvre le plein écran sur la même phrase.
 * La rotation se met en pause quand l'onglet est caché et disparaît si
 * l'utilisateur préfère réduire les animations.
 */

const ROTATE_MS = 12_000;
/** Sur la carte compacte, on ne fait tourner que les textes courts. */
const CARD_MAX_LEN = 150;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function QuoteCard() {
  const feed = useMemo(() => buildFeed(), []);
  const short = useMemo(
    () =>
      feed
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.text.length <= CARD_MAX_LEN),
    [feed],
  );
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setPos((p) => p + 1);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = short[pos % short.length] ?? { item: feed[0]!, index: 0 };
  const { item } = current;
  const authorLine = feedAuthorLine(item);

  return (
    <Link
      to={`/citations/plein-ecran?i=${current.index}`}
      className={`quote-hero quote-hero--${item.theme}`}
      viewTransition
      aria-label="Ouvrir les citations en plein écran"
    >
      <span className="quote-hero-top">
        <span className="quote-hero-kicker">Coach mental</span>
        <Icon name="expand" size={16} />
      </span>
      <span className="quote-hero-body" key={pos}>
        <span className="quote-hero-text">{frTypo(item.text)}</span>
        <span className="quote-hero-author">
          {authorLine !== '' ? authorLine : 'Axel · ton coach'}
        </span>
      </span>
    </Link>
  );
}
