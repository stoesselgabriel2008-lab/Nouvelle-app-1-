import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Method } from '../content/types';
import { getMethod } from '../content/methods/index';
import { Icon } from './Icon';

/**
 * Mode pas-à-pas : la procédure complète, une étape par écran, avec les
 * micro-étapes. Zéro distraction — on lit, on fait, on passe à la suivante.
 */
export function GuidedMode({ method, onClose }: { method: Method; onClose: () => void }) {
  const steps = method.procedure;
  const total = steps.length;
  const [index, setIndex] = useState(0);
  const finished = index >= total;
  const step = finished ? undefined : steps[index];
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, total));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, total]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [index]);

  const next = method.next !== undefined ? getMethod(method.next.id) : undefined;

  return (
    <div className="guided" role="dialog" aria-modal="true" aria-label={`Pas à pas : ${method.title}`}>
      <div className="guided-head">
        <div className="guided-progress" aria-hidden="true">
          <span
            style={{ width: `${Math.round((Math.min(index, total) / total) * 100)}%` }}
          />
        </div>
        <div className="guided-meta">
          <span className="footnote muted">
            {finished ? 'Terminé' : `Étape ${index + 1} sur ${total}`} · {method.title}
          </span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Quitter le pas-à-pas"
            onClick={onClose}
          >
            <Icon name="close" size={19} strokeWidth={2.1} />
          </button>
        </div>
      </div>

      <div className="guided-body" ref={bodyRef}>
        <div className="guided-inner" key={index}>
        {!finished && step !== undefined ? (
          <>
            <p className="guided-num" aria-hidden="true">
              {index + 1}
            </p>
            <h2 className="title2">{step.text}</h2>
            {step.detail !== undefined ? (
              <p className="subhead muted" style={{ marginTop: 'var(--sp-3)' }}>
                {step.detail}
              </p>
            ) : null}
            {step.micro !== undefined && step.micro.length > 0 ? (
              <div className="card" style={{ marginTop: 'var(--sp-5)' }}>
                <p className="section-mini">Concrètement</p>
                <ul className="micro-steps micro-steps--lg">
                  {step.micro.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <span className="guided-done-icon" aria-hidden="true">
              <Icon name="check" size={30} strokeWidth={2.4} />
            </span>
            <h2 className="title2">Procédure terminée</h2>
            <div className="card" style={{ marginTop: 'var(--sp-5)' }}>
              <p className="section-mini">C’est acquis si…</p>
              <ul className="fact-list fact-list--check">
                {method.mastery.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            {next !== undefined && method.next !== undefined ? (
              <Link
                to={`/methode/${next.id}`}
                className="next-card"
                style={{ marginTop: 'var(--sp-4)' }}
                onClick={onClose}
                viewTransition
              >
                <span style={{ minWidth: 0 }}>
                  <span className="next-kicker">Ensuite</span>
                  <h3 className="headline">{next.title}</h3>
                  <p>{method.next.label}</p>
                </span>
                <Icon name="arrow" size={20} />
              </Link>
            ) : null}
          </>
        )}
        </div>
      </div>

      <div className="guided-foot">
        {index > 0 ? (
          <button
            type="button"
            className="btn btn--secondary"
            style={{ flex: '0 0 auto', width: 'auto' }}
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          >
            Précédent
          </button>
        ) : null}
        {finished ? (
          <button type="button" className="btn" onClick={onClose}>
            Fermer
          </button>
        ) : (
          <button type="button" className="btn" onClick={() => setIndex((i) => i + 1)}>
            {index === total - 1 ? 'Terminer' : 'Étape suivante'}
          </button>
        )}
      </div>
    </div>
  );
}
