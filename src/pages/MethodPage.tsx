import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMethod } from '../content/methods/index';
import { SUBJECTS_BY_ID } from '../content/subjects';
import { CATEGORY_LABELS, INFO_TYPE_LABELS, PROBLEM_LABELS, SUBJECT_LABELS } from '../content/taxonomy';
import { pushRecent } from '../lib/storage';
import { BackButton, Disclose, FavoriteButton, MethodLinkList, SectionLabel, TagRow } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { NotFoundPage } from './NotFoundPage';

export function MethodPage() {
  const { id } = useParams();
  const method = id !== undefined ? getMethod(id) : undefined;

  useEffect(() => {
    if (method) pushRecent('method', method.id);
  }, [method]);

  if (!method) return <NotFoundPage />;

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/bibliotheque" />
        <FavoriteButton methodId={method.id} />
      </div>
      <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
        <header className="method-header">
          <h1 className="title2">{method.title}</h1>
          <p className="method-kicker">{method.subtitle}</p>
        </header>

        <div className="summary-card">
          <p className="section-mini">En 20 secondes</p>
          <p>{method.summary}</p>
        </div>

        <section className="section">
          <SectionLabel>Quand l’utiliser</SectionLabel>
          <div className="card">
            <ul className="fact-list fact-list--check">
              {method.whenToUse.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <SectionLabel>Quand ne pas l’utiliser comme ça</SectionLabel>
          <div className="card">
            <ul className="fact-list fact-list--avoid">
              {method.avoid.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <SectionLabel>Fais ça maintenant</SectionLabel>
          <div className="card">
            <ol className="steps">
              {method.quickSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <Disclose
            label="Voir la procédure complète"
            openLabel="Procédure complète"
          >
            <div className="card">
              <ol className="steps steps--neutral">
                {method.procedure.map((s) => (
                  <li key={s.text}>
                    <div>{s.text}</div>
                    {s.detail !== undefined ? (
                      <div className="step-detail">{s.detail}</div>
                    ) : null}
                  </li>
                ))}
              </ol>
              {method.example !== undefined ? (
                <>
                  <hr className="divider" />
                  <p className="section-mini">Exemple PASS</p>
                  <p className="subhead muted">{method.example}</p>
                </>
              ) : null}
            </div>
          </Disclose>
        </section>

        {method.personal !== undefined && method.personal.length > 0 ? (
          <section className="section">
            <SectionLabel>Adapté à moi</SectionLabel>
            <div className="card" style={{ background: 'var(--tint-soft)', boxShadow: 'none' }}>
              <ul className="fact-list">
                {method.personal.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {method.anki !== undefined ? (
          <section className="section">
            <SectionLabel>Anki</SectionLabel>
            <div className="anki-cols">
              <div className="anki-col anki-col--yes">
                <p className="section-mini">À mettre éventuellement</p>
                <ul className="fact-list">
                  {method.anki.yes.map((y) => (
                    <li key={y}>{y}</li>
                  ))}
                </ul>
              </div>
              <div className="anki-col">
                <p className="section-mini">Mérite plutôt autre chose</p>
                <ul className="fact-list">
                  {method.anki.no.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
            {method.anki.note !== undefined ? (
              <p className="footnote muted" style={{ margin: 'var(--sp-2) var(--sp-1) 0' }}>
                {method.anki.note}
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="section">
          <SectionLabel>C’est acquis si…</SectionLabel>
          <div className="card">
            <ul className="fact-list fact-list--check">
              {method.mastery.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </section>

        {method.limits !== undefined && method.limits.length > 0 ? (
          <section className="section">
            <SectionLabel>Limites et nuances</SectionLabel>
            <div className="card">
              <ul className="fact-list">
                {method.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {method.subjects.length > 0 ? (
          <section className="section">
            <SectionLabel>Matières où elle brille</SectionLabel>
            <div className="chip-row">
              {method.subjects.map((s) => {
                const subject = SUBJECTS_BY_ID.get(s);
                if (!subject) return null;
                return (
                  <Link key={s} to={`/matiere/${s}`} className="chip">
                    {SUBJECT_LABELS[s]}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {method.related.length > 0 ? (
          <section className="section">
            <SectionLabel>Méthodes proches</SectionLabel>
            <MethodLinkList ids={method.related} />
          </section>
        ) : null}

        <section className="section">
          <SectionLabel>Mots-clés</SectionLabel>
          <TagRow
            tags={[
              ...method.categories.map((c) => CATEGORY_LABELS[c]),
              ...method.infoTypes.map((t) => INFO_TYPE_LABELS[t]),
              ...method.problems.map((p) => PROBLEM_LABELS[p]),
              ...method.aliases.slice(0, 6),
            ]}
          />
        </section>

        <section className="section">
          <p className="source-note">
            <Icon name="book" size={15} />
            {method.source}
          </p>
        </section>
      </main>
    </>
  );
}
