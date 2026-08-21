import { Link } from 'react-router-dom';
import { SOS_PROTOCOLS } from '../content/sos';
import { LargeTitleHeader } from '../ui/LargeTitleHeader';
import { Icon } from '../ui/Icon';

/**
 * SOS : utilisable saturé. Gros boutons, texte court, zéro lecture requise
 * avant d'agir. Les protocoles exacts viennent de la Source V2, §8.
 */
export function SosListPage() {
  return (
    <main className="content">
      <LargeTitleHeader
        title="SOS"
        sub="Choisis ce qui t’arrive. Chaque protocole commence par « Fais ça maintenant »."
      />
      <div className="sos-grid">
        {SOS_PROTOCOLS.map((p) => (
          <Link key={p.id} to={`/sos/${p.id}`} className="sos-btn" viewTransition>
            <span className={`row-icon${p.careNotice === true ? ' row-icon--red' : ''}`}>
              <Icon name={p.careNotice === true ? 'heart' : 'sos'} size={19} />
            </span>
            <span className="row-body">
              <span className="sos-title">{p.title}</span>
              <span className="sos-sub">{p.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
