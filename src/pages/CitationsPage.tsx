import { useState } from 'react';
import {
  QUOTES,
  QUOTE_THEME_LABELS,
  type Quote,
  type QuoteTheme,
} from '../content/quotes';
import { BackButton } from '../ui/bits';

/**
 * Toute la banque de citations, filtrable par thème. Chaque entrée est réelle :
 * l'œuvre ou le contexte est indiqué quand il est documenté, et les phrases de
 * provenance populaire sont honnêtement marquées « Attribué à ».
 */

const THEMES: QuoteTheme[] = [
  'discipline',
  'perseverance',
  'calme',
  'savoir',
  'medecine',
  'courage',
];

function QuoteItem({ q }: { q: Quote }) {
  return (
    <li className="card quote-item">
      <figure>
        <blockquote>
          <p>« {q.text} »</p>
        </blockquote>
        <figcaption>
          {q.attributed === true ? `Attribué à ${q.author}` : q.author}
          {q.note !== undefined ? <span className="quote-note"> — {q.note}</span> : null}
        </figcaption>
      </figure>
    </li>
  );
}

export function CitationsPage() {
  const [theme, setTheme] = useState<QuoteTheme | 'all'>('all');
  const list = theme === 'all' ? QUOTES : QUOTES.filter((q) => q.theme === theme);

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/" />
        <span />
      </div>
      <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
        <h1 className="title2">Citations</h1>
        <p className="page-sub subhead" style={{ marginTop: 'var(--sp-2)' }}>
          {QUOTES.length} citations réelles, choisies pour tenir sur la durée d’une
          année de PASS. La source est indiquée quand elle est documentée ; sinon la
          phrase est honnêtement marquée « Attribué à ».
        </p>

        <div className="chip-row" role="group" aria-label="Filtrer par thème">
          <button
            type="button"
            className={`chip${theme === 'all' ? ' chip--on' : ''}`}
            aria-pressed={theme === 'all'}
            onClick={() => setTheme('all')}
          >
            Toutes
          </button>
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip${theme === t ? ' chip--on' : ''}`}
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
            >
              {QUOTE_THEME_LABELS[t]}
            </button>
          ))}
        </div>

        <p className="footnote muted-3" style={{ margin: 'var(--sp-3) var(--sp-1) 0' }}>
          {theme === 'all'
            ? `${list.length} citations, tous thèmes confondus.`
            : `${list.length} citations — ${QUOTE_THEME_LABELS[theme]}.`}
        </p>

        <section className="section" style={{ marginTop: 'var(--sp-3)' }}>
          <ul className="quote-grid">
            {list.map((q) => (
              <QuoteItem key={q.text} q={q} />
            ))}
          </ul>
        </section>

        <p className="footnote muted-3" style={{ margin: 'var(--sp-4) var(--sp-1) 0' }}>
          Une citation ne remplace jamais une méthode : si le moral flanche vraiment,
          ouvre l’onglet SOS.
        </p>
      </main>
    </>
  );
}
