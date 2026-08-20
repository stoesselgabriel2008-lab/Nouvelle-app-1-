import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { diagnose, nextQuestion } from '../diagnostic/engine';
import type { DiagAnswers, DiagQuestionId } from '../diagnostic/model';
import { getMethod } from '../content/methods/index';
import { SUBJECTS_BY_ID } from '../content/subjects';
import { SectionLabel } from '../ui/bits';
import { Icon } from '../ui/Icon';

function initialAnswers(params: URLSearchParams): DiagAnswers {
  const a: DiagAnswers = {};
  const type = params.get('type');
  const problem = params.get('problem');
  if (type !== null) a.itemType = type as DiagAnswers['itemType'];
  if (problem !== null) a.problem = problem as DiagAnswers['problem'];
  return a;
}

export function DiagnosticPage() {
  const [params] = useSearchParams();
  const [answers, setAnswers] = useState<DiagAnswers>(() => initialAnswers(params));
  const [trail, setTrail] = useState<DiagQuestionId[]>([]);

  const question = useMemo(() => nextQuestion(answers), [answers]);
  const answeredCount = trail.length;

  const answer = (id: DiagQuestionId, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }) as DiagAnswers);
    setTrail((t) => [...t, id]);
  };

  const undo = () => {
    const last = trail[trail.length - 1];
    if (last === undefined) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[last];
      return next;
    });
    setTrail((t) => t.slice(0, -1));
  };

  const restart = () => {
    setAnswers({});
    setTrail([]);
  };

  if (question !== null) {
    const dots = Math.max(answeredCount + 2, 3);
    return (
      <main className="content">
        <h1 className="page-title large-title">Diagnostic</h1>
        <p className="page-sub subhead">
          3 à 5 questions, puis une marche à suivre précise. Tout se passe sur ton
          appareil.
        </p>
        <div className="diag-progress" aria-hidden="true">
          {Array.from({ length: Math.min(dots, 5) }, (_, i) => (
            <span key={i} className={i < answeredCount ? 'on' : ''} />
          ))}
        </div>
        <h2 className="title3" style={{ marginBottom: 'var(--sp-3)' }}>
          {question.title}
        </h2>
        <ul className="option-list">
          {question.options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className="option-btn"
                onClick={() => answer(question.id, o.value)}
              >
                <span>{o.label}</span>
                <Icon name="chevronRight" size={16} strokeWidth={2.2} />
              </button>
            </li>
          ))}
        </ul>
        {answeredCount > 0 ? (
          <button
            type="button"
            className="btn btn--quiet"
            style={{ marginTop: 'var(--sp-4)' }}
            onClick={undo}
          >
            ← Question précédente
          </button>
        ) : null}
      </main>
    );
  }

  const reco = diagnose(answers);
  const subject =
    reco.subjectId !== undefined ? SUBJECTS_BY_ID.get(reco.subjectId) : undefined;

  return (
    <main className="content">
      <h1 className="page-title large-title">Voilà quoi faire maintenant</h1>
      <p className="page-sub subhead">{reco.reason}</p>

      <section className="section" style={{ marginTop: 'var(--sp-4)' }}>
        <ul className="option-list" style={{ gap: 'var(--sp-3)' }}>
          {reco.steps.map((s, i) => {
            const m = getMethod(s.methodId);
            if (!m) return null;
            return (
              <li key={s.methodId} className="card">
                <div className="reco-step">
                  <span className="reco-num">{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 className="headline">{m.title}</h2>
                    <p className="subhead muted" style={{ marginTop: 4 }}>
                      {s.why}
                    </p>
                    <Link
                      to={`/methode/${m.id}`}
                      className="btn btn--secondary"
                      style={{ marginTop: 'var(--sp-3)' }}
                    >
                      Ouvrir la méthode
                      <Icon name="chevronRight" size={15} strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {reco.caution !== undefined ? (
        <section className="section">
          <div className="card" style={{ background: 'var(--tint-soft)', boxShadow: 'none' }}>
            <p className="subhead">{reco.caution}</p>
          </div>
        </section>
      ) : null}

      {subject !== undefined ? (
        <section className="section">
          <SectionLabel>Protocole matière</SectionLabel>
          <Link to={`/matiere/${subject.id}`} className="btn btn--secondary">
            Voir le protocole {subject.name}
          </Link>
        </section>
      ) : null}

      {reco.alsoSee !== undefined && reco.alsoSee.length > 0 ? (
        <section className="section">
          <SectionLabel>Ensuite, éventuellement</SectionLabel>
          <div className="chip-row">
            {reco.alsoSee.map((id) => {
              const m = getMethod(id);
              if (!m) return null;
              return (
                <Link key={id} to={`/methode/${id}`} className="chip">
                  {m.title}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="section">
        <button type="button" className="btn btn--quiet" onClick={restart}>
          Recommencer le diagnostic
        </button>
      </section>
    </main>
  );
}
