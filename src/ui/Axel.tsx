import { useId } from 'react';

/**
 * Axel — la mascotte de l'app : un petit neurone sympathique (dendrites en
 * épi, axone en queue). Dessiné à la main en SVG, quatre expressions.
 * Principes retenus des meilleures mascottes (grands yeux expressifs, formes
 * rondes, palette vive) — personnage original, aucune ressemblance voulue.
 */

export type AxelMood = 'happy' | 'cheer' | 'think' | 'care';

export function Axel({ mood = 'happy', size = 64 }: { mood?: AxelMood; size?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = `axg-${uid}`;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" className="axel">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6fa5ff" />
          <stop offset="100%" stopColor="#7b5cff" />
        </linearGradient>
      </defs>

      {/* Dendrites (l'épi) — trois brins terminés par un bouton synaptique. */}
      <g stroke="#5f6ee0" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M45 34c-4-8-2-14 3-19" />
        <path d="M60 30c0-8 2-13 7-17" />
        <path d="M75 34c5-6 6-12 3-18" />
      </g>
      <circle cx="48" cy="14" r="4.6" fill="#5f6ee0" />
      <circle cx="67" cy="12" r="4.6" fill="#5f6ee0" />
      <circle cx="78" cy="15" r="4.6" fill="#5f6ee0" />

      {/* Axone (la queue). */}
      <path
        d="M92 88c8 2 13 7 14 14"
        stroke="#5f6ee0"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="107" cy="104" r="5.4" fill="#5f6ee0" />

      {/* Corps. */}
      <ellipse cx="60" cy="68" rx="42" ry="40" fill={`url(#${g})`} />
      <ellipse cx="48" cy="54" rx="18" ry="12" fill="#ffffff" opacity="0.14" />

      {/* Joues. */}
      <ellipse cx="36" cy="78" rx="7.5" ry="5" fill="#ff9fb0" opacity="0.55" />
      <ellipse cx="84" cy="78" rx="7.5" ry="5" fill="#ff9fb0" opacity="0.55" />

      {/* Yeux et bouche selon l'humeur. */}
      {mood === 'cheer' ? (
        <g stroke="#1d2150" strokeWidth="5" strokeLinecap="round" fill="none">
          {/* Yeux fermés de joie (^ ^) et grand sourire ouvert. */}
          <path d="M38 62c3-6 11-6 14 0" />
          <path d="M68 62c3-6 11-6 14 0" />
          <path d="M46 78c4 9 24 9 28 0" fill="#1d2150" stroke="none" />
          <path d="M46 78c4 9 24 9 28 0" />
        </g>
      ) : (
        <>
          <ellipse cx="45" cy="64" rx="10.5" ry="12" fill="#ffffff" />
          <ellipse cx="75" cy="64" rx="10.5" ry="12" fill="#ffffff" />
          {mood === 'think' ? (
            <>
              <circle cx="47.5" cy="60" r="5" fill="#1d2150" />
              <circle cx="77.5" cy="60" r="5" fill="#1d2150" />
              <circle cx="49.3" cy="58.2" r="1.7" fill="#ffffff" />
              <circle cx="79.3" cy="58.2" r="1.7" fill="#ffffff" />
              <path
                d="M53 82c3-2 8-2 11 1"
                stroke="#1d2150"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sourcil interrogateur. */}
              <path
                d="M67 46c4-3 10-3 14 0"
                stroke="#1d2150"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === 'care' ? (
            <>
              <circle cx="45" cy="65" r="5" fill="#1d2150" />
              <circle cx="75" cy="65" r="5" fill="#1d2150" />
              <circle cx="46.8" cy="63.2" r="1.7" fill="#ffffff" />
              <circle cx="76.8" cy="63.2" r="1.7" fill="#ffffff" />
              {/* Sourcils doux, sourire calme. */}
              <path
                d="M36 50c3-3 8-4 12-2"
                stroke="#1d2150"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M84 50c-3-3-8-4-12-2"
                stroke="#1d2150"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M52 81c3 3 13 3 16 0"
                stroke="#1d2150"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              <circle cx="46.5" cy="64.5" r="5.4" fill="#1d2150" />
              <circle cx="76.5" cy="64.5" r="5.4" fill="#1d2150" />
              <circle cx="48.4" cy="62.4" r="1.9" fill="#ffffff" />
              <circle cx="78.4" cy="62.4" r="1.9" fill="#ffffff" />
              <path
                d="M50 80c4 5 16 5 20 0"
                stroke="#1d2150"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
        </>
      )}
    </svg>
  );
}
