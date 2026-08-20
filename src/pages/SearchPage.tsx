import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAll } from '../search/engine';
import {
  clearRecentSearches,
  getRecentSearches,
  pushRecentSearch,
} from '../lib/storage';
import { Row, SectionLabel } from '../ui/bits';
import { Icon } from '../ui/Icon';

const EXAMPLES = [
  'ça rentre pas',
  'je mélange deux protéines',
  'feuille blanche',
  'anki quoi mettre',
  'formule physique',
  'histo image',
];

const KIND_LABEL: Record<string, string> = {
  method: 'Méthode',
  subject: 'Matière',
  sos: 'SOS',
  reference: 'Repère',
};

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(() => getRecentSearches());
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => searchAll(query, 24), [query]);
  const trimmed = query.trim();

  const openResult = (route: string) => {
    if (trimmed.length >= 2) {
      pushRecentSearch(trimmed);
      setRecent(getRecentSearches());
    }
    navigate(route);
  };

  return (
    <main className="content">
      <h1 className="page-title large-title">Recherche</h1>
      <p className="page-sub subhead">
        Écris comme tu parles : « ça rentre pas », « je melange », « mécanisme biocell »…
      </p>

      <div className="searchbar-wrap">
        <div className="searchbar">
          <Icon name="search" size={19} strokeWidth={2} />
          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Méthode, problème, matière…"
            aria-label="Rechercher une méthode"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 0 ? (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <Icon name="close" size={17} strokeWidth={2.1} />
            </button>
          ) : null}
        </div>
      </div>

      {trimmed.length === 0 ? (
        <>
          <section className="section" style={{ marginTop: 'var(--sp-2)' }}>
            <SectionLabel>Essaie par exemple</SectionLabel>
            <div className="chip-row">
              {EXAMPLES.map((e) => (
                <button key={e} type="button" className="chip" onClick={() => setQuery(e)}>
                  {e}
                </button>
              ))}
            </div>
          </section>
          {recent.length > 0 ? (
            <section className="section">
              <SectionLabel
                action={
                  <button
                    type="button"
                    onClick={() => {
                      clearRecentSearches();
                      setRecent([]);
                    }}
                  >
                    Effacer
                  </button>
                }
              >
                Recherches récentes
              </SectionLabel>
              <ul className="list">
                {recent.map((r) => (
                  <li key={r}>
                    <Row icon="clock" title={r} onClick={() => setQuery(r)} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      ) : results.length === 0 ? (
        <div className="empty">
          <p className="headline">Rien trouvé pour « {query} »</p>
          <p className="subhead" style={{ marginTop: 'var(--sp-2)' }}>
            Essaie un mot du problème (« je confonds », « formule ») ou passe par le
            Diagnostic.
          </p>
        </div>
      ) : (
        <section className="section" style={{ marginTop: 'var(--sp-2)' }}>
          <ul className="list">
            {results.map((r) => (
              <li key={`${r.kind}:${r.refId}`}>
                <Row
                  icon={
                    r.kind === 'sos'
                      ? 'sos'
                      : r.kind === 'subject'
                        ? 'book'
                        : r.kind === 'reference'
                          ? 'info'
                          : 'grid'
                  }
                  iconRed={r.kind === 'sos'}
                  title={r.title}
                  sub={`${KIND_LABEL[r.kind]} · ${r.subtitle}`}
                  onClick={() => openResult(r.route)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
