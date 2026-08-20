import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

/** Faux champ de recherche : un geste, et on est dans la vraie recherche. */
export function SearchPill({ label = 'Rechercher une méthode, un problème…' }: { label?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="search-pill"
      onClick={() => navigate('/recherche')}
    >
      <Icon name="search" size={18} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}
