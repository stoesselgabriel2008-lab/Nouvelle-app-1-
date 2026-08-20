import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SUBJECTS_BY_ID } from '../content/subjects';
import { pushRecent } from '../lib/storage';
import { BackButton, MethodLinkList, SectionLabel } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { NotFoundPage } from './NotFoundPage';

export function SubjectPage() {
  const { id } = useParams();
  const subject = id !== undefined ? SUBJECTS_BY_ID.get(id) : undefined;

  useEffect(() => {
    if (subject) pushRecent('subject', subject.id);
  }, [subject]);

  if (!subject) return <NotFoundPage />;

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/bibliotheque?tab=matieres" />
        <span />
      </div>
      <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
        <header className="method-header">
          <h1 className="title2">{subject.name}</h1>
          <p className="method-kicker">Protocole matière</p>
        </header>

        <div className="summary-card">
          <p className="section-mini">L’essentiel</p>
          <p>{subject.intro}</p>
        </div>

        <section className="section">
          <SectionLabel>Le protocole, dans l’ordre</SectionLabel>
          <div className="card">
            <ol className="steps">
              {subject.protocol.map((s) => (
                <li key={s.text}>
                  <div>{s.text}</div>
                  {s.detail !== undefined ? (
                    <div className="step-detail">{s.detail}</div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <SectionLabel>Méthodes reliées, par ordre d’utilité</SectionLabel>
          <MethodLinkList ids={subject.methods} />
        </section>

        <section className="section">
          <p className="source-note">
            <Icon name="book" size={15} />
            {subject.source}
          </p>
        </section>
      </main>
    </>
  );
}
