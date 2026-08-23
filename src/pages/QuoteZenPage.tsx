import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FEED_FILTERS,
  FEED_FILTER_LABELS,
  buildFeed,
  feedAuthorLine,
  filterFeed,
  normalizeFilter,
  type FeedFilter,
} from '../content/feed';
import { QUOTE_THEME_LABELS } from '../content/quotes';
import {
  advanceFeedPos,
  getQuoteFavs,
  isQuoteFav,
  peekFeedPos,
  setZenFilter,
  getZenFilter,
  toggleQuoteFav,
} from '../lib/storage';
import { haptic } from '../lib/haptics';
import { frTypo } from '../lib/typo';
import { Icon } from '../ui/Icon';

/**
 * Mode plein écran, inspiré des meilleures apps de motivation : une phrase à
 * la fois, plein cadre, sur fond profond. Toucher ou glisser (haut/gauche) =
 * suivante ; glisser (bas/droite) = précédente ; cœur = favori ; partage
 * natif. L'ambiance (Motivation, Calme, favoris…) filtre le flux et se
 * retient. L'animation suit la direction du geste.
 */

export function QuoteZenPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FeedFilter>(() => normalizeFilter(getZenFilter()));
  const [panel, setPanel] = useState(false);
  const feed = useMemo(() => filterFeed(buildFeed(), filter, getQuoteFavs()), [filter]);
  const raw = Number.parseInt(params.get('i') ?? '', 10);
  const [pos, setPos] = useState(() =>
    Number.isFinite(raw) && raw >= 0 ? raw : Math.max(0, peekFeedPos()),
  );
  const [dir, setDir] = useState<'up' | 'down' | 'left' | 'right'>('up');
  const [, bump] = useReducer((x: number) => x + 1, 0);
  const [copied, setCopied] = useState(false);
  const touchY = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);

  const item = feed[((pos % feed.length) + feed.length) % feed.length]!;
  const fav = isQuoteFav(item.text);
  const authorLine = feedAuthorLine(item);

  const next = (d: 'up' | 'left' = 'up') => {
    setDir(d);
    setPos((p) => p + 1);
    // Le curseur global avance aussi : à la prochaine ouverture de l'app,
    // on repart plus loin — jamais sur une phrase déjà vue à l'instant.
    advanceFeedPos();
  };
  const prev = (d: 'down' | 'right' = 'down') => {
    setDir(d);
    setPos((p) => (p === 0 ? feed.length - 1 : p - 1));
  };

  const close = () => {
    if (window.history.length > 1) {
      void navigate(-1);
    } else {
      void navigate('/citations', { replace: true });
    }
  };

  const pickFilter = (f: FeedFilter) => {
    setPanel(false);
    if (f === filter) return;
    setZenFilter(f);
    setFilter(f);
    setDir('up');
    setPos(0);
    haptic();
  };

  // Plein écran réel : le fond de page ne défile pas derrière.
  useEffect(() => {
    document.body.classList.add('zen-open');
    return () => document.body.classList.remove('zen-open');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Échap ferme d'abord le panneau d'ambiance, puis le plein écran.
        if (panel) setPanel(false);
        else close();
        return;
      }
      if (panel) return;
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
  }, [panel]);

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
      onClick={() => next()}
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
        } else if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          // Glisse horizontale : même navigation, animation latérale.
          e.preventDefault();
          if (dx < 0) next('left');
          else prev('right');
        }
      }}
    >
      <header className="zen-top" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`zen-btn zen-btn--top${filter !== 'tout' ? ' zen-btn--filtered' : ''}`}
          aria-label="Choisir une ambiance"
          aria-expanded={panel}
          onClick={() => setPanel((p) => !p)}
        >
          <Icon name="filter" size={20} />
        </button>
        <span className="zen-kicker">
          {filter === 'tout' ? QUOTE_THEME_LABELS[item.theme] : FEED_FILTER_LABELS[filter]}
        </span>
        <button type="button" className="zen-close" aria-label="Fermer" onClick={close}>
          <Icon name="close" size={20} />
        </button>
      </header>

      <div className={`zen-body zen-body--${dir}`} key={pos}>
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

      {panel ? (
        <div
          className="zen-filter-wrap"
          onClick={(e) => {
            e.stopPropagation();
            setPanel(false);
          }}
        >
          <div
            className="zen-filter"
            role="dialog"
            aria-label="Ambiance du flux"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="zen-filter-title">Ambiance</p>
            <div className="zen-chips">
              {FEED_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`zen-chip${f === filter ? ' on' : ''}`}
                  aria-pressed={f === filter}
                  onClick={() => pickFilter(f)}
                >
                  {FEED_FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
