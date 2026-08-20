import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="content">
      <div className="empty">
        <h1 className="title2">Page introuvable</h1>
        <p className="subhead" style={{ margin: 'var(--sp-3) 0 var(--sp-5)' }}>
          Cette adresse ne correspond à aucune fiche.
        </p>
        <Link to="/" className="btn btn--secondary" style={{ maxWidth: 280, margin: '0 auto' }}>
          Revenir à « Pour moi »
        </Link>
      </div>
    </main>
  );
}
