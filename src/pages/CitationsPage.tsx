import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QUOTES, QUOTE_THEME_LABELS, type QuoteTheme } from '../content/quotes';
import { COACH_LINES } from '../content/coach-lines';
import { quoteToItem, type FeedItem } from '../content/feed';
import { getQuoteFavs } from '../lib/storage';
import { frTypo } from '../lib/typo';
import { BackButton } from '../ui/bits';
import { Icon } from '../ui/Icon';

/**
 * Toute la banque : citations d'auteurs (sourcées, « Attribué à » quand la
 * provenance est populaire) et phrases du coach (écrites pour l'app, signées
 * Axel — jamais de fausse attribution). Filtrable par thème et par favoris.
 */

const THEMES: QuoteTheme[] = [
  'discipline',
  'perseverance',
  'calme',
  'savoir',
  'medecine',
  'courage',
];

type Filter = 'all' | 'favs' | 'coach' | QuoteTheme;

const ALL_ITEMS: FeedItem[] = [
  ...COACH_LINES.map((l): FeedItem => ({ kind: 'coach', text: l.text, theme: l.theme })),
  ...QUOTES.map(quoteToItem),
];

function ItemCard({ item }: { item: FeedItem }) {
  return (
    <li className="card quote-item">
      <figure>
        <blockquote>
          <p>{frTypo(`« ${item.text} »`)}</p>
        </blockquote>
        <figcaption>
          {item.kind === 'coach' ? (
            <span className="quote-coach-tag">Axel · ton coach</span>
          ) : (
            <>
              {item.attributed === true ? `Attribué à ${item.author}` : item.author}
              {item.note !== undefined ? (
                <span className="quote-note"> — {item.note}</span>
              ) : null}
            </>
          )}
        </figcaption>
      </figure>
    </li>
  );
}

export function CitationsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [favs] = useState<string[]>(() => getQuoteFavs());

  const list = ALL_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'coach') return item.kind === 'coach';
    if (filter === 'favs') return favs.includes(item.text);
    return item.theme === filter;
  });

  const countLabel =
    filter === 'all'
      ? `${list.length} entrées : ${QUOTES.length} citations vérifiées + ${COACH_LINES.length} phrases du coach.`
      : filter === 'favs'
        ? `${list.length} dans tes favoris.`
        : filter === 'coach'
          ? `${list.length} phrases du coach — écrites pour l’app, sans fausse attribution.`
          : `${list.length} entrées — ${QUOTE_THEME_LABELS[filter]}.`;

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/" />
        <span />
      </div>
      <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
        <h1 className="title2">Citations</h1>
        <p className="page-sub subhead" style={{ marginTop: 'var(--sp-2)' }}>
          Des citations réelles et sourcées, des phrases de coach assumées — et
          zéro fausse citation : les apocryphes connus sont bannis.
        </p>

        <Link to="/citations/plein-ecran" className="zen-launch" viewTransition>
          <span>
            <span className="zen-launch-title">Mode plein écran</span>
            <span className="zen-launch-sub">Une phrase à la fois, comme un fond d’écran.</span>
          </span>
          <Icon name="expand" size={20} />
        </Link>

        <div className="chip-row" role="group" aria-label="Filtrer">
          <button
            type="button"
            className={`chip${filter === 'all' ? ' chip--on' : ''}`}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button
            type="button"
            className={`chip${filter === 'favs' ? ' chip--on' : ''}`}
            aria-pressed={filter === 'favs'}
            onClick={() => setFilter('favs')}
          >
            <Icon name="heart" size={14} />
            Favoris
          </button>
          <button
            type="button"
            className={`chip${filter === 'coach' ? ' chip--on' : ''}`}
            aria-pressed={filter === 'coach'}
            onClick={() => setFilter('coach')}
          >
            Coach
          </button>
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip${filter === t ? ' chip--on' : ''}`}
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
            >
              {QUOTE_THEME_LABELS[t]}
            </button>
          ))}
        </div>

        <p className="footnote muted-3" style={{ margin: 'var(--sp-3) var(--sp-1) 0' }}>
          {countLabel}
        </p>

        {filter === 'favs' && list.length === 0 ? (
          <div className="card" style={{ marginTop: 'var(--sp-3)' }}>
            <p className="subhead muted">
              Aucun favori pour l’instant. En plein écran, touche le cœur pour
              retrouver une phrase ici.
            </p>
          </div>
        ) : (
          <section className="section" style={{ marginTop: 'var(--sp-3)' }}>
            <ul className="quote-grid">
              {list.map((item) => (
                <ItemCard key={item.text} item={item} />
              ))}
            </ul>
          </section>
        )}

        <p className="footnote muted-3" style={{ margin: 'var(--sp-4) var(--sp-1) 0' }}>
          Une citation ne remplace jamais une méthode : si le moral flanche vraiment,
          ouvre l’onglet SOS.
        </p>
      </main>
    </>
  );
}
