import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, type IconName } from './Icon';
import { getMethod } from '../content/methods/index';
import { isFavorite, toggleFavorite } from '../lib/storage';

export function SectionLabel({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <h2 className="section-label">
      <span>{children}</span>
      {action ? <span className="section-action">{action}</span> : null}
    </h2>
  );
}

export function Row({
  to,
  icon,
  iconRed,
  title,
  sub,
  onClick,
}: {
  to?: string;
  icon?: IconName;
  iconRed?: boolean;
  title: ReactNode;
  sub?: ReactNode;
  onClick?: () => void;
}) {
  const body = (
    <>
      {icon ? (
        <span className={`row-icon${iconRed ? ' row-icon--red' : ''}`}>
          <Icon name={icon} size={19} />
        </span>
      ) : null}
      <span className="row-body">
        <span className="row-title">{title}</span>
        {sub ? <span className="row-sub">{sub}</span> : null}
      </span>
      <span className="row-chevron">
        <Icon name="chevronRight" size={16} strokeWidth={2.2} />
      </span>
    </>
  );
  if (to !== undefined) {
    return (
      <Link className="row" to={to} viewTransition>
        {body}
      </Link>
    );
  }
  return (
    <button type="button" className="row" onClick={onClick}>
      {body}
    </button>
  );
}

/** Liste de méthodes par IDs — titres complets, jamais tronqués. */
export function MethodLinkList({ ids, icon = 'grid' }: { ids: string[]; icon?: IconName }) {
  return (
    <ul className="list">
      {ids.map((id) => {
        const m = getMethod(id);
        if (!m) return null;
        return (
          <li key={id}>
            <Row to={`/methode/${id}`} icon={icon} title={m.title} sub={m.subtitle} />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Repli explicite : le contenu long n'est jamais coupé silencieusement,
 * il s'ouvre via un bouton nommé (« Voir la procédure complète »).
 */
export function Disclose({
  label,
  openLabel,
  children,
  defaultOpen = false,
}: {
  label: string;
  openLabel?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        className="disclose"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{open ? (openLabel ?? label) : label}</span>
        <Icon name="chevronDown" size={17} strokeWidth={2.1} />
      </button>
      {open ? <div style={{ marginTop: 'var(--sp-3)' }}>{children}</div> : null}
    </div>
  );
}

export function FavoriteButton({ methodId }: { methodId: string }) {
  const [fav, setFav] = useState(() => isFavorite(methodId));
  return (
    <button
      type="button"
      className="icon-btn"
      aria-pressed={fav}
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onClick={() => {
        toggleFavorite(methodId);
        setFav((f) => !f);
      }}
    >
      <Icon name={fav ? 'starFill' : 'star'} size={22} />
    </button>
  );
}

export function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else navigate(fallback);
      }}
      aria-label="Retour"
    >
      <Icon name="chevronLeft" size={20} strokeWidth={2.1} />
      <span>Retour</span>
    </button>
  );
}

export function TagRow({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="chip-row" style={{ gap: 'var(--sp-1)' }}>
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  );
}
