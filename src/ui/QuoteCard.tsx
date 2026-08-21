import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QUOTES,
  QUOTE_THEME_LABELS,
  dailySeed,
  shuffledQuoteOrder,
} from '../content/quotes';
import { Icon } from './Icon';

/**
 * Citation sur l'accueil : l'ordre est remélangé chaque jour (graine = date),
 * puis les citations défilent toutes les 12 s — la nouvelle arrive en fondu
 * (remontage animé via `key`). Un toucher passe à la suivante et repart le
 * compte à rebours. La rotation s'arrête quand l'onglet est caché, et n'existe
 * pas du tout si l'utilisateur préfère réduire les animations.
 */

const ROTATE_MS = 12_000;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function QuoteCard() {
  const [order] = useState<number[]>(() => shuffledQuoteOrder(dailySeed()));
  const [pos, setPos] = useState(0);
  // Recréé à chaque toucher : le compte à rebours de 12 s repart de zéro.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setPos((p) => p + 1);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [cycle]);

  const quote = QUOTES[order[pos % order.length] ?? 0]!;

  return (
    <section className="quote-card" aria-label="Citation pour le mental">
      <button
        type="button"
        className="quote-tap"
        onClick={() => {
          setCycle((c) => c + 1);
          setPos((p) => p + 1);
        }}
        title="Citation suivante"
      >
        <span className="quote-body" key={pos}>
          <span className="quote-text">« {quote.text} »</span>
          <span className="quote-author">
            {quote.attributed === true ? `Attribué à ${quote.author}` : quote.author}
            {quote.note !== undefined ? (
              <span className="quote-note"> — {quote.note}</span>
            ) : null}
          </span>
        </span>
      </button>
      <div className="quote-foot">
        <span className="quote-kicker">{QUOTE_THEME_LABELS[quote.theme]}</span>
        <Link to="/citations" className="quote-all" viewTransition>
          Toutes les citations
          <Icon name="chevronRight" size={13} />
        </Link>
      </div>
    </section>
  );
}
