import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PUNCHLINES } from '../content/punchlines';
import { findSituation, type TalkTone } from '../content/talks';
import { haptic } from '../lib/haptics';
import { getTalkTone, getWhy } from '../lib/storage';
import { frTypo } from '../lib/typo';
import { Icon } from '../ui/Icon';

/**
 * L'écran du Déclic : le discours plein cadre, puis le contrat de 10 minutes
 * lancé SUR PLACE — le passage de la parole à l'acte sans changer d'écran.
 * La situation sensible (« tout lâcher ») est toujours en voix douce, sans
 * minuteur ni pression : son action, c'est le protocole Détresse.
 */

const CONTRACT_SECONDS = 10 * 60;

/** Anti-répétition immédiate par situation+ton (mémoire de session). */
const lastPick = new Map<string, number>();

function pickTalk(key: string, pool: string[]): number {
  let idx = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && idx === lastPick.get(key)) idx = (idx + 1) % pool.length;
  lastPick.set(key, idx);
  return idx;
}

function fmt(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type Phase = 'talk' | 'timer' | 'done';

export function TalkPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const situation = findSituation(params.get('s') ?? '');
  const tone: TalkTone =
    situation?.safety === true ? 'doux' : getTalkTone() === 'doux' ? 'doux' : 'franc';
  const pool = situation === null ? [] : tone === 'franc' ? situation.franc : situation.doux;

  const [talkIdx, setTalkIdx] = useState(() =>
    situation === null || pool.length === 0 ? 0 : pickTalk(`${situation.id}:${tone}`, pool),
  );
  const [punchIdx, setPunchIdx] = useState(() => Math.floor(Math.random() * PUNCHLINES.length));
  const [phase, setPhase] = useState<Phase>('talk');
  const [remaining, setRemaining] = useState(CONTRACT_SECONDS);
  const endAtRef = useRef(0);
  const why = getWhy();

  const close = () => {
    if (window.history.length > 1) void navigate(-1);
    else void navigate('/motivation', { replace: true });
  };

  // Plein écran réel, comme le mode citations.
  useEffect(() => {
    document.body.classList.add('zen-open');
    return () => document.body.classList.remove('zen-open');
  }, []);

  useEffect(() => {
    if (phase !== 'timer') return;
    endAtRef.current = Date.now() + CONTRACT_SECONDS * 1000;
    const id = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        window.clearInterval(id);
        haptic(30);
        setPhase('done');
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [phase]);

  if (situation === null) {
    return (
      <div className="talk talk--doux" role="region" aria-label="Déclic">
        <header className="talk-top">
          <span className="talk-kicker">Déclic</span>
          <button type="button" className="zen-close" aria-label="Fermer" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="talk-body">
          <p className="talk-text">
            {frTypo('Situation inconnue — retourne au Déclic et choisis où tu en es.')}
          </p>
          <Link to="/motivation" className="talk-cta" viewTransition>
            Ouvrir le Déclic
          </Link>
        </div>
      </div>
    );
  }

  const talk = pool[talkIdx] ?? pool[0] ?? '';
  const safety = situation.safety === true;

  return (
    <div className={`talk talk--${tone}`} role="region" aria-label="Discours du Déclic">
      <header className="talk-top">
        <span className="talk-kicker">{frTypo(situation.label)}</span>
        <button type="button" className="zen-close" aria-label="Fermer" onClick={close}>
          <Icon name="close" size={20} />
        </button>
      </header>

      {phase === 'talk' ? (
        <>
          <div className="talk-body" key={`${talkIdx}-${tone}`}>
            {talk.split('\n\n').map((p, i) => (
              <p key={i} className="talk-text">
                {frTypo(p)}
              </p>
            ))}
            {why !== '' ? (
              <div className="talk-why">
                <p className="talk-why-kicker">Et rappelle-toi pourquoi — tes mots à toi :</p>
                <p className="talk-why-text">{frTypo(`« ${why} »`)}</p>
              </div>
            ) : null}
            {!safety ? <p className="talk-punch">{frTypo(PUNCHLINES[punchIdx]!)}</p> : null}
          </div>

          <footer className="talk-actions">
            {safety ? (
              <Link to={situation.fiche.to} className="talk-cta" viewTransition>
                {situation.fiche.label}
                <Icon name="chevronRight" size={18} />
              </Link>
            ) : (
              <button
                type="button"
                className="talk-cta"
                onClick={() => {
                  haptic(12);
                  setRemaining(CONTRACT_SECONDS);
                  setPhase('timer');
                }}
              >
                Je m’y mets — 10 minutes
                <Icon name="bolt" size={18} />
              </button>
            )}
            <div className="talk-secondary">
              {!safety ? (
                <Link to={situation.fiche.to} className="talk-link" viewTransition>
                  {situation.fiche.label}
                </Link>
              ) : (
                <Link to="/coach" className="talk-link" viewTransition>
                  Parler à Axel
                </Link>
              )}
              {pool.length > 1 ? (
                <button
                  type="button"
                  className="talk-link"
                  onClick={() => {
                    haptic(5);
                    setTalkIdx(pickTalk(`${situation.id}:${tone}`, pool));
                    setPunchIdx(Math.floor(Math.random() * PUNCHLINES.length));
                  }}
                >
                  Un autre discours
                </button>
              ) : null}
            </div>
          </footer>
        </>
      ) : phase === 'timer' ? (
        <div className="talk-body talk-body--timer">
          <p className="talk-timer-kicker">Contrat en cours</p>
          <p className="talk-timer" aria-live="off">
            {fmt(remaining)}
          </p>
          <p className="talk-timer-sub">
            {frTypo(
              tone === 'franc'
                ? 'Poly ouvert, téléphone loin. Reviens quand ça sonne — pas avant.'
                : 'Poly ouvert, téléphone posé. Reviens à la sonnerie — tout va bien se passer.',
            )}
          </p>
          <button
            type="button"
            className="talk-link talk-link--stop"
            onClick={() => setPhase('talk')}
          >
            Arrêter le contrat
          </button>
        </div>
      ) : (
        <div className="talk-body talk-body--timer">
          <p className="talk-timer-kicker">Contrat rempli</p>
          <p className="talk-done-title">{frTypo('10 minutes. Faites.')}</p>
          <p className="talk-timer-sub">
            {frTypo(
              tone === 'franc'
                ? 'Tu vois ? La flemme n’a pas survécu. Maintenant ne casse pas la machine : enchaîne.'
                : 'Et voilà — la machine est lancée. Le plus dur est derrière toi : continue en douceur.',
            )}
          </p>
          <footer className="talk-actions">
            <button
              type="button"
              className="talk-cta"
              onClick={() => {
                haptic(12);
                setRemaining(CONTRACT_SECONDS);
                setPhase('timer');
              }}
            >
              Encore 10 minutes
              <Icon name="bolt" size={18} />
            </button>
            <div className="talk-secondary">
              <Link to={situation.fiche.to} className="talk-link" viewTransition>
                {situation.fiche.label}
              </Link>
              <button type="button" className="talk-link" onClick={close}>
                Fermer
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
