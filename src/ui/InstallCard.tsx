import { useState } from 'react';
import { hideInstallCard, isInstallCardHidden } from '../lib/storage';
import { Icon } from './Icon';

/**
 * Le chemin vers la « vraie app ». Sur iPhone/iPad, sans App Store et sans
 * payer, Apple n'offre qu'une seule voie : l'installation depuis Safari.
 * Une fois faite, l'app est plein écran, hors ligne, avec son icône et son
 * écran de lancement — indiscernable d'une native pour l'usage quotidien.
 * La carte disparaît une fois l'app installée (ou sur « Plus tard »).
 */

export function isInstalled(): boolean {
  try {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  } catch {
    return false;
  }
}

export function InstallCard() {
  const [hidden, setHidden] = useState(() => isInstallCardHidden());
  if (isInstalled() || hidden) return null;

  return (
    <section className="install-card" aria-label="Installer l’application">
      <div className="install-head">
        <img
          src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
          alt=""
          width={54}
          height={54}
          className="install-icon"
        />
        <div>
          <p className="install-title">Installe la vraie app</p>
          <p className="install-sub">Gratuit, sans compte, sans App Store — 30 secondes.</p>
        </div>
      </div>
      <ol className="install-steps">
        <li>
          <span>
            Ouvre cette page dans <strong>Safari</strong>
          </span>
        </li>
        <li>
          <span>
            Touche{' '}
            <span className="install-share">
              <Icon name="share" size={14} strokeWidth={2} />
              Partager
            </span>
          </span>
        </li>
        <li>
          <span>
            Choisis «&nbsp;<strong>Sur l’écran d’accueil</strong>&nbsp;», puis Ajouter
          </span>
        </li>
      </ol>
      <p className="install-note">
        Résultat : une app plein écran avec son icône et son écran de lancement, qui
        marche hors ligne. Tes données restent sur l’appareil.
      </p>
      <div className="install-actions">
        <button
          type="button"
          className="install-later"
          onClick={() => {
            hideInstallCard();
            setHidden(true);
          }}
        >
          Plus tard
        </button>
      </div>
    </section>
  );
}
