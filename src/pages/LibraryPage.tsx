import { useSearchParams } from 'react-router-dom';
import { METHODS } from '../content/methods/index';
import { SUBJECTS } from '../content/subjects';
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from '../content/taxonomy';
import type { CategoryId } from '../content/types';
import { MethodLinkList, Row, SectionLabel } from '../ui/bits';
import { SearchPill } from '../ui/SearchPill';

type Tab = 'methodes' | 'matieres' | 'reperes';

const REFERENCES: { id: string; title: string; sub: string }[] = [
  {
    id: 'algorithme',
    title: 'Algorithme universel d’un cours',
    sub: 'Orienter → … → Entretenir : les 10 étapes',
  },
  {
    id: 'matrice',
    title: 'Quel outil pour quel type d’information ?',
    sub: 'La matrice type → méthode',
  },
  { id: 'mythes', title: 'Mythes et limites', sub: 'Dix idées trompeuses, version sûre' },
  { id: 'sources', title: 'Sources et niveau de preuve', sub: 'D’où vient ce contenu' },
];

export function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab | null) ?? 'methodes';
  const cat = params.get('cat') as CategoryId | null;

  const setTab = (t: Tab) => {
    const next = new URLSearchParams(params);
    if (t === 'methodes') next.delete('tab');
    else next.set('tab', t);
    next.delete('cat');
    setParams(next, { replace: false });
  };

  const setCat = (c: CategoryId | null) => {
    const next = new URLSearchParams(params);
    if (c === null) next.delete('cat');
    else next.set('cat', c);
    setParams(next, { replace: false });
  };

  return (
    <main className="content">
      <h1 className="page-title large-title">Bibliothèque</h1>
      <p className="page-sub subhead">
        {METHODS.length} méthodes — chacune dit quand l’utiliser, quand l’éviter, et quoi
        faire maintenant.
      </p>

      <SearchPill />

      <div className="seg" role="tablist" aria-label="Sections de la bibliothèque" style={{ marginTop: 'var(--sp-4)' }}>
        <button
          type="button"
          aria-pressed={tab === 'methodes'}
          onClick={() => setTab('methodes')}
        >
          Méthodes
        </button>
        <button
          type="button"
          aria-pressed={tab === 'matieres'}
          onClick={() => setTab('matieres')}
        >
          Matières
        </button>
        <button
          type="button"
          aria-pressed={tab === 'reperes'}
          onClick={() => setTab('reperes')}
        >
          Repères
        </button>
      </div>

      {tab === 'methodes' ? (
        <>
          <div className="chip-row" style={{ marginTop: 'var(--sp-4)' }}>
            <button
              type="button"
              className={`chip${cat === null ? ' chip--on' : ''}`}
              onClick={() => setCat(null)}
            >
              Tout
            </button>
            {CATEGORY_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${cat === c ? ' chip--on' : ''}`}
                onClick={() => setCat(cat === c ? null : c)}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>

          {cat !== null ? (
            <section className="section">
              <SectionLabel>{CATEGORY_LABELS[cat]}</SectionLabel>
              <p className="footnote muted" style={{ margin: '0 var(--sp-1) var(--sp-2)' }}>
                {CATEGORY_DESCRIPTIONS[cat]}
              </p>
              <MethodLinkList
                ids={METHODS.filter((m) => m.categories.includes(cat)).map((m) => m.id)}
              />
            </section>
          ) : (
            CATEGORY_ORDER.map((c) => {
              const ids = METHODS.filter((m) => m.categories[0] === c).map((m) => m.id);
              if (ids.length === 0) return null;
              return (
                <section className="section" key={c}>
                  <SectionLabel>{CATEGORY_LABELS[c]}</SectionLabel>
                  <p
                    className="footnote muted"
                    style={{ margin: '0 var(--sp-1) var(--sp-2)' }}
                  >
                    {CATEGORY_DESCRIPTIONS[c]}
                  </p>
                  <MethodLinkList ids={ids} />
                </section>
              );
            })
          )}
        </>
      ) : null}

      {tab === 'matieres' ? (
        <section className="section">
          <SectionLabel>Protocoles par matière</SectionLabel>
          <ul className="list">
            {SUBJECTS.map((s) => (
              <li key={s.id}>
                <Row
                  to={`/matiere/${s.id}`}
                  icon="book"
                  title={s.name}
                  sub={`${s.protocol.length} étapes · ${s.methods.length} méthodes reliées`}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === 'reperes' ? (
        <section className="section">
          <SectionLabel>Repères transversaux</SectionLabel>
          <ul className="list">
            {REFERENCES.map((r) => (
              <li key={r.id}>
                <Row to={`/reperes/${r.id}`} icon="info" title={r.title} sub={r.sub} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
