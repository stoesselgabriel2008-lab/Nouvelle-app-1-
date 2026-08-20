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
import { Disclose, MethodLinkList, Row, SectionLabel } from '../ui/bits';
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

export function ForMePage() {
  const [favorites] = useState<string[]>(() => getFavorites());
  const [recents, setRecents] = useState<RecentEntry[]>(() => getRecents());
  const [theme, setTheme] = useState<ThemePref>(() => getThemePref());
  const forMeMethods = METHODS.filter((m) => m.forMe === true).map((m) => m.id);

  return (
    <main className="content">
      <h1 className="page-title large-title">Pour moi</h1>
      <p className="page-sub subhead">
        Un problème, une méthode, tout de suite.
      </p>

      <div className="chip-row">
        {SHORTCUTS.map((s) => (
          <Link key={s.id} to={s.to} className="chip chip--tint">
            <Icon name="bolt" size={15} strokeWidth={2} />
            {s.label}
          </Link>
        ))}
      </div>

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

      <section className="section">
        <SectionLabel
          action={
            recents.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  clearRecents();
                  setRecents([]);
                }}
              >
                Effacer
              </button>
            ) : undefined
          }
        >
          Dernières consultations
        </SectionLabel>
        {recents.length === 0 ? (
          <div className="card">
            <p className="subhead muted">Les fiches consultées apparaîtront ici.</p>
          </div>
        ) : (
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
        )}
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
      </section>
    </main>
  );
}
