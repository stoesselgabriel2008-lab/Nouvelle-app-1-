import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SOS_BY_ID } from '../content/sos';
import { pushRecent } from '../lib/storage';
import { BackButton, MethodLinkList, SectionLabel } from '../ui/bits';
import { FocusTimer, TIMER_CONFIGS } from '../ui/FocusTimer';
import { Icon } from '../ui/Icon';
import { NotFoundPage } from './NotFoundPage';

export function SosPage() {
  const { id } = useParams();
  const sos = id !== undefined ? SOS_BY_ID.get(id) : undefined;

  useEffect(() => {
    if (sos) pushRecent('sos', sos.id);
  }, [sos]);

  if (!sos) return <NotFoundPage />;

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/sos" />
        <span />
      </div>
      <main className="content" style={{ paddingTop: 'var(--sp-2)' }}>
        <header className="method-header">
          <h1 className="title2">{sos.title}</h1>
          <p className="method-kicker">{sos.tagline}</p>
        </header>

        <section className="section" style={{ marginTop: 'var(--sp-4)' }}>
          <SectionLabel>Fais ça maintenant</SectionLabel>
          <div className="card">
            <ol className="steps">
              {sos.doNow.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </section>

        {TIMER_CONFIGS[sos.id] !== undefined ? (
          <section className="section">
            <SectionLabel>Minuteur</SectionLabel>
            <div className="card">
              <FocusTimer
                presets={TIMER_CONFIGS[sos.id]!.presets}
                note={TIMER_CONFIGS[sos.id]!.note}
              />
            </div>
          </section>
        ) : null}

        {sos.then !== undefined && sos.then.length > 0 ? (
          <section className="section">
            <SectionLabel>Ensuite, si besoin</SectionLabel>
            <div className="card">
              <ul className="fact-list">
                {sos.then.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {sos.careNotice === true ? (
          <section className="section">
            <div className="care-note">
              <p>
                <strong>Important.</strong> Cette application est un outil de méthodes de
                travail — pas un soin. Si ton fonctionnement, ton sommeil ou ta sécurité
                se dégradent, la bonne action est un soutien humain : un proche, un
                médecin, le service de santé de ton université.
              </p>
            </div>
          </section>
        ) : null}

        {sos.methods.length > 0 ? (
          <section className="section">
            <SectionLabel>Pour approfondir une fois relancé·e</SectionLabel>
            <MethodLinkList ids={sos.methods} />
          </section>
        ) : null}

        <section className="section">
          <p className="source-note">
            <Icon name="book" size={15} />
            {sos.source}
          </p>
        </section>
      </main>
    </>
  );
}
