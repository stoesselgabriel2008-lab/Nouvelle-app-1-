import { Link, useParams } from 'react-router-dom';
import {
  ALGORITHM_FORMULA,
  ALGORITHM_STEPS,
  INFO_TYPE_MATRIX,
  MYTHS,
  PRUDENCE_NOTE,
  RESEARCH_SOURCES,
  SOURCE_HIERARCHY,
} from '../content/reference';
import { getMethod } from '../content/methods/index';
import { BackButton, SectionLabel } from '../ui/bits';
import { NotFoundPage } from './NotFoundPage';

function MethodChips({ ids }: { ids: string[] }) {
  return (
    <div className="chip-row" style={{ marginTop: 'var(--sp-2)' }}>
      {ids.map((id) => {
        const m = getMethod(id);
        if (!m) return null;
        return (
          <Link key={id} to={`/methode/${id}`} className="chip">
            {m.title}
          </Link>
        );
      })}
    </div>
  );
}

export function ReferencePage() {
  const { id } = useParams();

  if (id === 'algorithme') {
    return (
      <>
        <div className="topbar">
          <BackButton fallback="/bibliotheque?tab=reperes" />
          <span />
        </div>
        <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
          <h1 className="title2">Algorithme universel d’un cours</h1>
          <div className="summary-card">
            <p className="section-mini">Formule directrice</p>
            <p style={{ fontWeight: 600 }}>{ALGORITHM_FORMULA}</p>
          </div>
          <section className="section">
            <ul className="option-list" style={{ gap: 'var(--sp-3)' }}>
              {ALGORITHM_STEPS.map((s) => (
                <li key={s.name} className="card">
                  <h2 className="headline">{s.name}</h2>
                  <p className="subhead muted" style={{ marginTop: 4 }}>
                    {s.action}
                  </p>
                  <MethodChips ids={s.methods} />
                </li>
              ))}
            </ul>
          </section>
          <p className="source-note">Source V2 — §3, p. 4-5</p>
        </main>
      </>
    );
  }

  if (id === 'matrice') {
    return (
      <>
        <div className="topbar">
          <BackButton fallback="/bibliotheque?tab=reperes" />
          <span />
        </div>
        <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
          <h1 className="title2">Quel outil pour quel type d’information ?</h1>
          <p className="page-sub subhead" style={{ marginTop: 'var(--sp-2)' }}>
            La méthode dominante pour chaque type — le Diagnostic applique cette matrice
            automatiquement.
          </p>
          <section className="section">
            <ul className="option-list" style={{ gap: 'var(--sp-3)' }}>
              {INFO_TYPE_MATRIX.map((e) => (
                <li key={e.id} className="card">
                  <h2 className="headline">{e.name}</h2>
                  <p className="subhead muted" style={{ marginTop: 4 }}>
                    {e.route}
                  </p>
                  <MethodChips ids={e.methods} />
                </li>
              ))}
            </ul>
          </section>
          <p className="source-note">Source V2 — §4, p. 5-6</p>
        </main>
      </>
    );
  }

  if (id === 'mythes') {
    return (
      <>
        <div className="topbar">
          <BackButton fallback="/bibliotheque?tab=reperes" />
          <span />
        </div>
        <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
          <h1 className="title2">Mythes et limites</h1>
          <p className="page-sub subhead" style={{ marginTop: 'var(--sp-2)' }}>
            Les limites comptent autant que les méthodes : version trompeuse, version
            sûre.
          </p>
          <section className="section">
            <ul className="option-list" style={{ gap: 'var(--sp-3)' }}>
              {MYTHS.map((m) => (
                <li key={m.myth} className="card">
                  <h2 className="headline" style={{ color: 'var(--red)' }}>
                    {m.myth}
                  </h2>
                  <p className="subhead" style={{ marginTop: 6 }}>
                    {m.truth}
                  </p>
                  <MethodChips ids={m.methods} />
                </li>
              ))}
            </ul>
          </section>
          <p className="source-note">Source V2 — §11, p. 36-37</p>
        </main>
      </>
    );
  }

  if (id === 'sources') {
    return (
      <>
        <div className="topbar">
          <BackButton fallback="/bibliotheque?tab=reperes" />
          <span />
        </div>
        <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
          <h1 className="title2">Sources et niveau de preuve</h1>
          <section className="section">
            <SectionLabel>Hiérarchie du contenu</SectionLabel>
            <div className="card">
              <ol className="steps steps--neutral">
                {SOURCE_HIERARCHY.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </section>
          <section className="section">
            <SectionLabel>Repères de recherche</SectionLabel>
            <ul className="option-list" style={{ gap: 'var(--sp-3)' }}>
              {RESEARCH_SOURCES.map((s) => (
                <li key={s.domain} className="card">
                  <h2 className="headline">{s.domain}</h2>
                  <p className="subhead muted" style={{ marginTop: 4 }}>
                    {s.reference}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section className="section">
            <div className="card" style={{ background: 'var(--tint-soft)', boxShadow: 'none' }}>
              <p className="section-mini">Note de prudence</p>
              <p className="subhead">{PRUDENCE_NOTE}</p>
            </div>
          </section>
          <p className="source-note" style={{ marginTop: 'var(--sp-4)' }}>
            Source V2 — §12, p. 37-38
          </p>
        </main>
      </>
    );
  }

  return <NotFoundPage />;
}
