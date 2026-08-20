import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SHORTCUTS } from '../content/shortcuts';
import { PERSONAL_RULES, PROFILE_NOTE, PROFILE_SIGNALS, PROFILE_SOURCE } from '../content/profile';
import { METHODS, getMethod } from '../content/methods/index';
import { SUBJECTS_BY_ID } from '../content/subjects';
import { SOS_BY_ID } from '../content/sos';
import {
  clearRecents,
  getFavorites,
  getRecents,
  getThemePref,
  setThemePref,
  type RecentEntry,
  type ThemePref,
} from '../lib/storage';
import { APP_VERSION } from '../lib/version';
import { checkForUpdates, type UpdateCheckResult } from '../lib/sw';
import { Disclose, MethodLinkList, Row, SectionLabel } from '../ui/bits';
import { openWhatsNew } from '../ui/WhatsNew';
import { Icon } from '../ui/Icon';

function recentTarget(r: RecentEntry): { title: string; route: string; sub: string } | null {
  if (r.kind === 'method') {
    const m = getMethod(r.id);
    return m ? { title: m.title, route: `/methode/${m.id}`, sub: m.subtitle } : null;
  }
  if (r.kind === 'sos') {
    const s = SOS_BY_ID.get(r.id);
    return s ? { title: s.title, route: `/sos/${s.id}`, sub: 'Protocole SOS' } : null;
  }
  const s = SUBJECTS_BY_ID.get(r.id);
  return s ? { title: s.name, route: `/matiere/${s.id}`, sub: 'Protocole matière' } : null;
}

const THEME_OPTIONS: { value: ThemePref; label: string }[] = [
  { value: 'system', label: 'Système' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
];

function isInstalled(): boolean {
  try {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  } catch {
    return false;
  }
}

const CHECK_LABELS: Record<UpdateCheckResult | 'checking', string> = {
  checking: 'Vérification…',
  update: 'Mise à jour trouvée — bouton « Recharger » ci-dessous.',
  none: 'Tu as déjà la dernière version.',
  unsupported: 'Vérification impossible ici — recharge simplement la page.',
};

export function ForMePage() {
  const [favorites] = useState<string[]>(() => getFavorites());
  const [recents, setRecents] = useState<RecentEntry[]>(() => getRecents());
  const [theme, setTheme] = useState<ThemePref>(() => getThemePref());
  const [checkState, setCheckState] = useState<UpdateCheckResult | 'checking' | 'idle'>(
    'idle',
  );
  const forMeMethods = METHODS.filter((m) => m.forMe === true).map((m) => m.id);
  const installed = isInstalled();

  const runCheck = async () => {
    setCheckState('checking');
    setCheckState(await checkForUpdates());
  };

  return (
    <main className="content">
      <h1 className="page-title large-title">Pour moi</h1>
      <p className="page-sub subhead">Un problème, une méthode, tout de suite.</p>

      <Link to="/diagnostic" className="hero-card">
        <span style={{ minWidth: 0 }}>
          <h2>Un blocage, là, maintenant ?</h2>
          <p>3 à 5 questions et tu sais exactement quoi faire.</p>
        </span>
        <Icon name="arrow" size={22} />
      </Link>

      <div className="chip-row">
        {SHORTCUTS.map((s) => (
          <Link key={s.id} to={s.to} className="chip chip--tint">
            <Icon name="bolt" size={15} strokeWidth={2} />
            {s.label}
          </Link>
        ))}
      </div>

      <section className="section">
        <SectionLabel>Favoris</SectionLabel>
        {favorites.length === 0 ? (
          <div className="card">
            <p className="subhead muted">
              Aucun favori pour l’instant. Sur une fiche méthode, touche l’étoile pour la
              retrouver ici.
            </p>
          </div>
        ) : (
          <MethodLinkList ids={favorites} icon="starFill" />
        )}
      </section>

      {recents.length > 0 ? (
        <section className="section">
          <SectionLabel
            action={
              <button
                type="button"
                onClick={() => {
                  clearRecents();
                  setRecents([]);
                }}
              >
                Effacer
              </button>
            }
          >
            Dernières consultations
          </SectionLabel>
          <ul className="list">
            {recents.slice(0, 8).map((r) => {
              const t = recentTarget(r);
              if (!t) return null;
              return (
                <li key={`${r.kind}:${r.id}`}>
                  <Row to={t.route} icon="clock" title={t.title} sub={t.sub} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="section">
        <SectionLabel>Mes règles</SectionLabel>
        <ul className="list">
          {PERSONAL_RULES.map((r, i) => (
            <li key={r.id}>
              <div className="row" style={{ alignItems: 'flex-start' }}>
                <span className="row-icon">
                  <span className="subhead" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </span>
                </span>
                <span className="row-body">
                  <span className="row-title" style={{ fontWeight: 400 }}>
                    {r.rule}
                  </span>
                  <span className="row-sub">
                    {r.methods.map((id, j) => {
                      const m = getMethod(id);
                      if (!m) return null;
                      return (
                        <span key={id}>
                          {j > 0 ? ' · ' : ''}
                          <Link to={`/methode/${id}`}>{m.title}</Link>
                        </span>
                      );
                    })}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="footnote muted-3" style={{ margin: 'var(--sp-2) var(--sp-1) 0' }}>
          {PROFILE_NOTE}
        </p>
      </section>

      <section className="section">
        <SectionLabel>Méthodes qui marchent particulièrement bien pour moi</SectionLabel>
        <MethodLinkList ids={forMeMethods} icon="check" />
      </section>

      <section className="section">
        <SectionLabel>Mon profil en bref</SectionLabel>
        <Disclose label="Voir le profil fonctionnel" openLabel="Masquer le profil">
          <div className="card">
            <ul className="fact-list">
              {PROFILE_SIGNALS.map((s) => (
                <li key={s.signal}>
                  <strong>{s.signal}.</strong>{' '}
                  <span className="muted">{s.consequence}</span>
                </li>
              ))}
            </ul>
            <p className="source-note" style={{ marginTop: 'var(--sp-3)' }}>
              <Icon name="book" size={15} />
              {PROFILE_SOURCE}
            </p>
          </div>
        </Disclose>
      </section>

      <section className="section">
        <SectionLabel>Application</SectionLabel>
        <ul className="list">
          <li>
            <Row
              icon="info"
              title="Quoi de neuf dans cette version"
              sub={`Version ${APP_VERSION}`}
              onClick={() => openWhatsNew()}
            />
          </li>
          <li>
            <Row
              icon="arrow"
              title="Vérifier les mises à jour"
              sub={checkState === 'idle' ? 'La vérification est aussi automatique.' : CHECK_LABELS[checkState]}
              onClick={() => {
                void runCheck();
              }}
            />
          </li>
        </ul>
        {!installed ? (
          <div style={{ marginTop: 'var(--sp-3)' }}>
            <Disclose label="Installer l’app sur iPhone / iPad" openLabel="Installation">
              <div className="card">
                <ol className="steps steps--neutral">
                  <li>Ouvre cette page dans Safari.</li>
                  <li>
                    Touche le bouton Partager, puis « Sur l’écran d’accueil », puis
                    Ajouter.
                  </li>
                  <li>
                    Lance « Methods OS » depuis l’écran d’accueil : plein écran, hors
                    ligne, favoris conservés.
                  </li>
                </ol>
              </div>
            </Disclose>
          </div>
        ) : null}
      </section>

      <section className="section">
        <SectionLabel>Apparence</SectionLabel>
        <div className="seg" role="group" aria-label="Thème">
          {THEME_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              aria-pressed={theme === o.value}
              onClick={() => {
                setThemePref(o.value);
                setTheme(o.value);
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="footnote muted-3" style={{ margin: 'var(--sp-3) var(--sp-1) 0' }}>
          PASS Methods OS {APP_VERSION} · données 100 % locales, sans compte ni suivi.
        </p>
      </section>
    </main>
  );
}
