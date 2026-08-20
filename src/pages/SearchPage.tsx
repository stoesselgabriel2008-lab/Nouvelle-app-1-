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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && trimmed.length >= 2) {
                pushRecentSearch(trimmed);
                setRecent(getRecentSearches());
                if (results[0] !== undefined) navigate(results[0].route);
              }
            }}
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
          <p className="subhead" style={{ margin: 'var(--sp-2) 0 var(--sp-4)' }}>
            Essaie un mot du problème (« je confonds », « formule ») — ou laisse le
            diagnostic trouver pour toi.
          </p>
          <div style={{ display: 'grid', gap: 'var(--sp-2)', maxWidth: 340, margin: '0 auto' }}>
            <button type="button" className="btn" onClick={() => navigate('/diagnostic')}>
              Lancer le diagnostic
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => navigate('/sos')}>
              Ouvrir les protocoles SOS
            </button>
          </div>
        </div>
      ) : (
        <section className="section" style={{ marginTop: 'var(--sp-2)' }}>
          {results[0] !== undefined ? (
            <button
              type="button"
              className="tophit"
              onClick={() => openResult(results[0]!.route)}
            >
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="tophit-kind">
                  Meilleur résultat · {KIND_LABEL[results[0].kind]}
                </span>
                <h2>{results[0].title}</h2>
                <p>{results[0].summary}</p>
              </span>
              <Icon name="chevronRight" size={17} strokeWidth={2.2} />
            </button>
          ) : null}
          {results.length > 1 ? (
            <ul className="list" style={{ marginTop: 'var(--sp-3)' }}>
              {results.slice(1).map((r) => (
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
          ) : null}
        </section>
      )}
    </main>
  );
}
