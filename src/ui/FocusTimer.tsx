import { useEffect, useRef, useState } from 'react';

/**
 * Minuteur minimal pour les protocoles chronométrés (démarrage en
 * 10 minutes, Pomodoro, session courte). Volontairement simple :
 * pas de sons, pas de statistiques — juste le temps, lisible de loin.
 */

export interface TimerPreset {
  label: string;
  minutes: number;
}

function fmt(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function FocusTimer({ presets, note }: { presets: TimerPreset[]; note?: string }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx] ?? presets[0]!;
  const total = preset.minutes * 60;
  const [remaining, setRemaining] = useState(total);
  const [running, setRunning] = useState(false);
  const endAtRef = useRef<number | null>(null);

  // Décompte basé sur l'horloge (pas d'accumulation de dérive).
  useEffect(() => {
    if (!running) return;
    endAtRef.current = Date.now() + remaining * 1000;
    const tick = () => {
      const end = endAtRef.current;
      if (end === null) return;
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        setRunning(false);
        if ('vibrate' in navigator) navigator.vibrate?.(200);
      }
    };
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Le temps restant s'affiche dans l'onglet pendant que ça tourne.
  useEffect(() => {
    if (running) document.title = `${fmt(remaining)} · Methods OS`;
    return () => {
      document.title = 'PASS Methods OS';
    };
  }, [running, remaining]);

  const selectPreset = (i: number) => {
    setPresetIdx(i);
    setRunning(false);
    setRemaining((presets[i]?.minutes ?? preset.minutes) * 60);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(total);
  };

  const finished = remaining === 0;
  const progress = total > 0 ? (total - remaining) / total : 0;

  return (
    <div className="timer" role="timer" aria-label={`Minuteur ${preset.label}`}>
      {presets.length > 1 && !running ? (
        <div className="chip-row" role="group" aria-label="Durée" style={{ justifyContent: 'center' }}>
          {presets.map((p, i) => (
            <button
              key={p.label}
              type="button"
              className={`chip${i === presetIdx ? ' chip--on' : ''}`}
              aria-pressed={i === presetIdx}
              onClick={() => selectPreset(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="timer-ring" aria-hidden={false}>
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle className="ring-track" cx="80" cy="80" r="70" />
          <circle
            className="ring-progress"
            cx="80"
            cy="80"
            r="70"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 70}
          />
        </svg>
        <p className="timer-display" aria-live={finished ? 'polite' : 'off'}>
          {finished ? 'Temps écoulé' : fmt(remaining)}
        </p>
      </div>
      {finished ? (
        <p className="subhead muted" style={{ textAlign: 'center' }}>
          Continue si tu es lancé·e — sinon, réduis encore l’unité et repars.
        </p>
      ) : null}
      <div className="timer-actions">
        <button
          type="button"
          className="btn"
          onClick={() => (finished ? (reset(), setRunning(true)) : setRunning((r) => !r))}
        >
          {finished ? 'Recommencer' : running ? 'Pause' : 'Démarrer'}
        </button>
        {!finished && (running || remaining !== total) ? (
          <button type="button" className="btn btn--quiet" onClick={reset}>
            Réinitialiser
          </button>
        ) : null}
      </div>
      {note !== undefined ? (
        <p className="footnote muted-3" style={{ textAlign: 'center' }}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Minuteurs proposés, par fiche ou protocole. */
export const TIMER_CONFIGS: Record<string, { presets: TimerPreset[]; note?: string }> = {
  'demarrage-10-minutes': {
    presets: [{ label: '10 min', minutes: 10 }],
    note: 'Le contrat ne porte que sur ces 10 minutes.',
  },
  pomodoro: {
    presets: [
      { label: '25 min', minutes: 25 },
      { label: '45 min', minutes: 45 },
      { label: '50 min', minutes: 50 },
      { label: 'Pause 5', minutes: 5 },
      { label: 'Pause 10', minutes: 10 },
    ],
    note: 'C’est un réglage, pas une loi : ne coupe pas un raisonnement utile.',
  },
  commencer: {
    presets: [{ label: '10 min', minutes: 10 }],
    note: 'Le contrat ne porte que sur ces 10 minutes.',
  },
  'vingt-minutes': {
    presets: [
      { label: '20 min', minutes: 20 },
      { label: '30 min', minutes: 30 },
    ],
    note: 'Circuit court : rappel, erreurs, distinctions, QCM ciblés.',
  },
};
