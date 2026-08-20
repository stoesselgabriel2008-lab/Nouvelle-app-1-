import { useState } from 'react';
import { Icon } from './Icon';

/**
 * « Fais ça maintenant » en version cochable : on applique la méthode en
 * direct, étape par étape. L'état est gardé pour la session de travail
 * (sessionStorage) — il repart proprement à la prochaine session.
 */

function keyFor(id: string): string {
  return `pmos:steps:${id}`;
}

function readDone(id: string): number[] {
  try {
    const raw = sessionStorage.getItem(keyFor(id));
    return raw === null ? [] : (JSON.parse(raw) as number[]);
  } catch {
    return [];
  }
}

function writeDone(id: string, done: number[]): void {
  try {
    sessionStorage.setItem(keyFor(id), JSON.stringify(done));
  } catch {
    // stockage indisponible : la coche reste visuelle
  }
}

export function StepChecklist({ id, steps }: { id: string; steps: string[] }) {
  const [done, setDone] = useState<number[]>(() => readDone(id));

  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((d) => d !== i) : [...done, i];
    setDone(next);
    writeDone(id, next);
  };

  const reset = () => {
    setDone([]);
    writeDone(id, []);
  };

  return (
    <div>
      <ol className="steps steps--check">
        {steps.map((s, i) => {
          const isDone = done.includes(i);
          return (
            <li key={s} className={isDone ? 'is-done' : ''}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => toggle(i)}
                className="check-step"
              >
                <span className="check-dot" aria-hidden="true">
                  {isDone ? <Icon name="check" size={15} strokeWidth={2.6} /> : i + 1}
                </span>
                <span className="check-text">{s}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="check-meta">
        <span className="footnote muted-3" aria-live="polite">
          {done.length === steps.length
            ? 'Toutes les étapes sont faites.'
            : `${done.length}/${steps.length} étapes cochées — touche une étape quand elle est faite.`}
        </span>
        {done.length > 0 ? (
          <button type="button" className="btn btn--quiet check-reset" onClick={reset}>
            Réinitialiser
          </button>
        ) : null}
      </div>
    </div>
  );
}
