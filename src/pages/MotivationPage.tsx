import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PUNCHLINES } from '../content/punchlines';
import { TALK_SITUATIONS } from '../content/talks';
import { dailySeed } from '../content/quotes';
import { haptic } from '../lib/haptics';
import { getTalkTone, getWhy, setTalkTone, setWhy, type TalkTonePref } from '../lib/storage';
import { frTypo } from '../lib/typo';
import { BackButton, SectionLabel } from '../ui/bits';
import { Icon } from '../ui/Icon';

/**
 * Le hub du mode Déclic — le pilier motivation.
 * Tu choisis ta situation, tu choisis le ton (Franc par défaut : sec, direct),
 * et l'écran suivant te parle pour de vrai, puis te lance sur 10 minutes.
 * « Ta raison » est locale, écrite par toi, resservie dans les discours.
 */

export function MotivationPage() {
  const [tone, setTone] = useState<TalkTonePref>(() => getTalkTone());
  const [punchIdx, setPunchIdx] = useState(() => dailySeed() % PUNCHLINES.length);
  const [why, setWhyState] = useState(() => getWhy());
  const [editingWhy, setEditingWhy] = useState(false);
  const [draftWhy, setDraftWhy] = useState(why);

  const toneIdx = tone === 'franc' ? 0 : 1;

  const switchTone = (next: TalkTonePref) => {
    if (next === tone) return;
    haptic(8);
    setTalkTone(next);
    setTone(next);
  };

  const saveWhy = () => {
    setWhy(draftWhy);
    setWhyState(draftWhy.trim().slice(0, 220));
    setEditingWhy(false);
  };

  const situations = useMemo(() => TALK_SITUATIONS, []);

  return (
    <>
      <div className="topbar">
        <BackButton fallback="/" />
      </div>
      <main className="content">
        <header className="declic-head">
          <h1 className="title2">Déclic</h1>
          <p className="declic-sub">
            {frTypo(
              'Choisis où tu en es. On te parle pour de vrai — puis tu te lances : 10 minutes, tout de suite.',
            )}
          </p>
        </header>

        <section className="punch-card" aria-label="La phrase du moment">
          <p className="punch-kicker">La claque du moment</p>
          <p className="punch-text">{frTypo(PUNCHLINES[punchIdx]!)}</p>
          <button
            type="button"
            className="punch-again"
            onClick={() => {
              haptic(5);
              setPunchIdx((i) => (i + 1) % PUNCHLINES.length);
            }}
          >
            Une autre
            <Icon name="arrow" size={14} />
          </button>
        </section>

        <div className="mode-switch mode-switch--2" role="tablist" aria-label="Ton des discours">
          <span
            className="mode-ind2"
            aria-hidden="true"
            style={{ transform: `translateX(${toneIdx * 100}%)` }}
          />
          <button
            type="button"
            role="tab"
            aria-selected={tone === 'franc'}
            className={tone === 'franc' ? 'on' : ''}
            onClick={() => switchTone('franc')}
          >
            Franc
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tone === 'doux'}
            className={tone === 'doux' ? 'on' : ''}
            onClick={() => switchTone('doux')}
          >
            Doux
          </button>
        </div>
        <p className="mode-tagline">
          {tone === 'franc'
            ? 'Sec, direct, exigeant — la voix qui te remet au travail.'
            : 'Bienveillant, posé — la voix qui t’aide à repartir.'}
        </p>

        <section className="declic-grid" aria-label="Où tu en es ?">
          <SectionLabel>Où tu en es, là ?</SectionLabel>
          {situations.map((s) => (
            <Link
              key={s.id}
              to={`/motivation/declic?s=${s.id}`}
              className={`declic-card${s.safety === true ? ' declic-card--soft' : ''}`}
              viewTransition
            >
              <span className="declic-card-icon" aria-hidden="true">
                <Icon name={s.icon} size={20} />
              </span>
              <span className="declic-card-body">
                <span className="declic-card-label">{frTypo(s.label)}</span>
                <span className="declic-card-sub">{s.sub}</span>
              </span>
              <Icon name="chevronRight" size={16} />
            </Link>
          ))}
        </section>

        <section className="why-card" aria-label="Ta raison">
          <p className="punch-kicker">Ta raison, tes mots</p>
          {editingWhy ? (
            <>
              <textarea
                className="why-input"
                value={draftWhy}
                onChange={(e) => setDraftWhy(e.target.value)}
                maxLength={220}
                rows={3}
                placeholder="Pourquoi tu fais tout ça — écris-le avec tes mots. Il te sera resservi au bon moment."
                aria-label="Ta raison"
              />
              <div className="why-actions">
                <button type="button" className="btn" onClick={saveWhy}>
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setDraftWhy(why);
                    setEditingWhy(false);
                  }}
                >
                  Annuler
                </button>
              </div>
            </>
          ) : why !== '' ? (
            <>
              <p className="why-text">{frTypo(`« ${why} »`)}</p>
              <p className="why-note">
                Écrit par toi. Les discours te le rappelleront au bon moment.
              </p>
              <button type="button" className="punch-again" onClick={() => setEditingWhy(true)}>
                Modifier
                <Icon name="chevronRight" size={14} />
              </button>
            </>
          ) : (
            <>
              <p className="why-note">
                {frTypo(
                  'Écris en une phrase pourquoi tu fais tout ça — la vraie raison, la tienne. Les jours durs, on te la remettra sous les yeux : rien ne motive plus que tes propres mots.',
                )}
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setDraftWhy('');
                  setEditingWhy(true);
                }}
              >
                Écrire ma raison
              </button>
            </>
          )}
        </section>

        <p className="declic-foot">
          {frTypo(
            'Envie de citations classiques ? Le plein écran en a des centaines, triées et sourcées.',
          )}
        </p>
        <Link to="/citations/plein-ecran" className="btn btn--secondary" viewTransition>
          Ouvrir les citations
        </Link>
      </main>
    </>
  );
}
