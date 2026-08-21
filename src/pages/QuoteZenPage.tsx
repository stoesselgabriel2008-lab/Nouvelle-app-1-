import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { buildFeed, feedAuthorLine } from '../content/feed';
import { QUOTE_THEME_LABELS } from '../content/quotes';
import { isQuoteFav, toggleQuoteFav } from '../lib/storage';
import { frTypo } from '../lib/typo';
import { Icon } from '../ui/Icon';

/**
 * Mode plein écran, inspiré des meilleures apps de motivation : une phrase à
 * la fois, plein cadre, sur fond profond. Toucher ou glisser vers le haut =
 * suivante ; glisser vers le bas = précédente ; cœur = favori ; partage natif.
 */

function haptic(): void {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* indisponible : tant pis */
  }
}

export function QuoteZenPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const feed = useMemo(() => buildFeed(), []);
  const start = Number.parseInt(params.get('i') ?? '0', 10);
  const [pos, setPos] = useState(Number.isFinite(start) && start >= 0 ? start : 0);
  const [, bump] = useReducer((x: number) => x + 1, 0);
  const [copied, setCopied] = useState(false);
  const touchY = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);

  const item = feed[pos % feed.length]!;
  const fav = isQuoteFav(item.text);
  const authorLine = feedAuthorLine(item);

  const next = () => setPos((p) => p + 1);
  const prev = () => setPos((p) => (p === 0 ? feed.length - 1 : p - 1));

  const close = () => {
    if (window.history.length > 1) {
      void navigate(-1);
    } else {
      void navigate('/citations', { replace: true });
    }
  };

  // Plein écran réel : le fond de page ne défile pas derrière.
  useEffect(() => {
    document.body.classList.add('zen-open');
    return () => document.body.classList.remove('zen-open');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const share = async () => {
    const line = authorLine !== '' ? `« ${item.text} » — ${authorLine}` : `« ${item.text} »`;
    try {
      if (navigator.share !== undefined) {
        await navigator.share({ text: line });
        return;
      }
      throw new Error('no-share');
    } catch {
      try {
        await navigator.clipboard.writeText(line);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        /* ni partage ni presse-papiers : rien à faire */
      }
    }
  };

  const long = item.text.length > 150;

  return (
    <div
      className={`zen zen--${item.theme}`}
      role="region"
      aria-label="Citations en plein écran"
      onClick={next}
      onTouchStart={(e) => {
        touchY.current = e.touches[0]?.clientY ?? null;
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const y0 = touchY.current;
        const t = e.changedTouches[0];
        if (y0 === null || t === undefined) return;
        const dy = t.clientY - y0;
        const dx = t.clientX - (touchX.current ?? t.clientX);
        touchY.current = null;
        if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) {
          e.preventDefault();
          if (dy < 0) next();
          else prev();
        }
      }}
    >
      <header className="zen-top" onClick={(e) => e.stopPropagation()}>
        <span className="zen-kicker">{QUOTE_THEME_LABELS[item.theme]}</span>
        <button type="button" className="zen-close" aria-label="Fermer" onClick={close}>
          <Icon name="close" size={20} />
        </button>
      </header>

      <div className="zen-body" key={pos}>
        <p className={`zen-text${long ? ' zen-text--long' : ''}`}>{frTypo(item.text)}</p>
        {authorLine !== '' ? (
          <p className="zen-author">
            {authorLine}
            {item.note !== undefined ? <span className="zen-note"> · {item.note}</span> : null}
          </p>
        ) : (
          <p className="zen-author zen-author--coach">Axel · ton coach</p>
        )}
      </div>

      <footer className="zen-actions" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="zen-btn" aria-label="Partager" onClick={() => void share()}>
          <Icon name="share" size={24} />
        </button>
        <button
          type="button"
          className={`zen-btn${fav ? ' zen-btn--fav' : ''}`}
          aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-pressed={fav}
          onClick={() => {
            toggleQuoteFav(item.text);
            haptic();
            bump();
          }}
        >
          <Icon name={fav ? 'heartFill' : 'heart'} size={24} />
        </button>
      </footer>

      <p className="zen-hint" aria-hidden="true">
        Touche l’écran pour la suivante
      </p>
      {copied ? (
        <p className="zen-copied" role="status">
          Copié
        </p>
      ) : null}
    </div>
  );
}
