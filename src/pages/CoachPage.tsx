import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { greet, respond, QUICK_CHIPS, type CoachLink } from '../coach/engine';
import { frTypo } from '../lib/typo';
import { Axel, type AxelMood } from '../ui/Axel';
import { BackButton } from '../ui/bits';
import { Icon } from '../ui/Icon';

/**
 * Le salon d'Axel. Conversation 100 % locale : les réponses viennent du moteur
 * d'intentions (aucun réseau), la discussion vit le temps de la session.
 */

interface Msg {
  who: 'axel' | 'me';
  text: string;
  links?: CoachLink[];
  mood?: AxelMood;
}

const STORE_KEY = 'pmos:coach:session';

function loadMsgs(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (raw === null) return [];
    return JSON.parse(raw) as Msg[];
  } catch {
    return [];
  }
}

function saveMsgs(msgs: Msg[]): void {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs));
  } catch {
    /* session pleine : la conversation reste en mémoire */
  }
}

export function CoachPage() {
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    const stored = loadMsgs();
    if (stored.length > 0) return stored;
    const g = greet();
    return [{ who: 'axel', text: g.text, mood: g.mood }];
  });
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    saveMsgs(msgs);
    // Instantané à l'ouverture, fluide ensuite (sinon le défilement d'arrivée
    // « traîne » jusque sur la page suivante).
    endRef.current?.scrollIntoView({
      block: 'end',
      behavior: msgs.length > 1 ? 'smooth' : 'auto',
    });
  }, [msgs, typing]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const lastMood: AxelMood =
    [...msgs].reverse().find((m) => m.who === 'axel')?.mood ?? 'happy';

  const send = (raw: string) => {
    const text = raw.trim();
    if (text === '' || typing) return;
    setDraft('');
    setMsgs((m) => [...m, { who: 'me', text }]);
    setTyping(true);
    // Petit délai « il écrit… » : la réponse instantanée sonne machine.
    timerRef.current = window.setTimeout(() => {
      const r = respond(text);
      setMsgs((m) => [...m, { who: 'axel', text: r.text, links: r.links, mood: r.mood }]);
      setTyping(false);
    }, 500 + Math.random() * 500);
  };

  const reset = () => {
    window.clearTimeout(timerRef.current);
    setTyping(false);
    const g = greet();
    setMsgs([{ who: 'axel', text: g.text, mood: g.mood }]);
  };

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/" />
        <button type="button" className="coach-reset" onClick={reset} aria-label="Nouvelle conversation">
          <Icon name="trash" size={18} />
        </button>
      </div>
      <main className="content coach" style={{ paddingTop: 'var(--sp-2)' }}>
        <header className="coach-head">
          <span className="coach-head-avatar">
            <Axel mood={lastMood} size={72} />
          </span>
          <div>
            <h1 className="title2">Axel</h1>
            <p className="coach-status">
              Coach méthodes · 100 % local, rien ne quitte ton appareil
            </p>
          </div>
        </header>

        <div className="chat" aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-row chat-row--${m.who}`}>
              {m.who === 'axel' ? (
                <span className="chat-avatar" aria-hidden="true">
                  <Axel mood={m.mood ?? 'happy'} size={34} />
                </span>
              ) : null}
              <div className={`bubble bubble--${m.who}`}>
                {m.text.split('\n\n').map((part, j) => (
                  <p key={j}>{frTypo(part)}</p>
                ))}
                {m.links !== undefined && m.links.length > 0 ? (
                  <div className="bubble-links">
                    {m.links.map((l) => (
                      <Link key={l.to} to={l.to} className="bubble-link" viewTransition>
                        {l.label}
                        <Icon name="chevronRight" size={13} />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="chat-row chat-row--axel">
              <span className="chat-avatar" aria-hidden="true">
                <Axel mood="think" size={34} />
              </span>
              <div className="bubble bubble--axel bubble--typing" aria-label="Axel écrit">
                <span className="tdot" />
                <span className="tdot" />
                <span className="tdot" />
              </div>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="composer">
          <div className="coach-chips" role="group" aria-label="Suggestions">
            {QUICK_CHIPS.map((c) => (
              <button key={c} type="button" className="chip" onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>
          <form
            className="coach-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Dis ce qui coince…"
              aria-label="Ton message à Axel"
              autoComplete="off"
              enterKeyHint="send"
            />
            <button
              type="submit"
              className="coach-send"
              aria-label="Envoyer"
              disabled={draft.trim() === ''}
              // Le champ garde le focus (le clavier reste ouvert pour enchaîner),
              // et le composer ne saute pas sous le doigt au moment du toucher.
              onMouseDown={(e) => e.preventDefault()}
            >
              <Icon name="send" size={20} />
            </button>
          </form>
          <p className="coach-note">
            Axel n’est pas un professionnel de santé — si ça ne va vraiment pas, le
            protocole Détresse oriente vers de vraies personnes.
          </p>
        </div>
      </main>
    </>
  );
}
