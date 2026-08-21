/**
 * Jeu d'icônes vectorielles maison (24×24, trait 1.7, currentColor).
 * Style proche de SF Symbols ; aucun emoji n'est utilisé comme icône.
 */

export type IconName =
  | 'person'
  | 'library'
  | 'diagnostic'
  | 'sos'
  | 'search'
  | 'star'
  | 'starFill'
  | 'clock'
  | 'chevronRight'
  | 'chevronDown'
  | 'chevronLeft'
  | 'close'
  | 'arrow'
  | 'book'
  | 'check'
  | 'trash'
  | 'bolt'
  | 'info'
  | 'heart'
  | 'heartFill'
  | 'share'
  | 'expand'
  | 'send'
  | 'grid';

const PATHS: Record<IconName, React.ReactNode> = {
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 19.4c1.5-3 4.1-4.6 7.2-4.6s5.7 1.6 7.2 4.6" />
    </>
  ),
  library: (
    <>
      <path d="M5 4.5h3v15H5z" />
      <path d="M10.5 4.5h3v15h-3z" />
      <path d="m16.2 5.5 2.9-.6 2 14.7-3 .6z" />
    </>
  ),
  diagnostic: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2.5" />
      <path d="M9.5 4.8V3.4h5v1.4" />
      <path d="m8.8 13 2.2 2.2 4.4-4.6" />
    </>
  ),
  sos: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 3.8v4.8M12 15.4v4.8M3.8 12h4.8M15.4 12h4.8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 4.4 4.4" />
    </>
  ),
  star: (
    <path d="m12 3.6 2.5 5.2 5.7.7-4.2 3.9 1.1 5.6-5.1-2.8-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7z" />
  ),
  starFill: (
    <path
      fill="currentColor"
      stroke="none"
      d="m12 3.2 2.7 5.5 6 .75-4.4 4.1 1.15 5.95L12 16.55l-5.45 2.95L7.7 13.55l-4.4-4.1 6-.75z"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  chevronRight: <path d="m9 5.5 6.5 6.5L9 18.5" />,
  chevronDown: <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />,
  chevronLeft: <path d="M15 5.5 8.5 12l6.5 6.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M7 17 17 7M9 7h8v8" />,
  book: (
    <>
      <path d="M12 6.2c-1.6-1.4-3.9-1.9-7-1.6v13.7c3.1-.3 5.4.2 7 1.5 1.6-1.3 3.9-1.8 7-1.5V4.6c-3.1-.3-5.4.2-7 1.6Z" />
      <path d="M12 6.2v13.6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  trash: (
    <>
      <path d="M5 7h14M10 7V5h4v2M7 7l.8 12.5h8.4L17 7" />
      <path d="M10.3 10.5v6M13.7 10.5v6" />
    </>
  ),
  bolt: <path d="M13.2 3 5.8 13.4h4.6L10.8 21l7.4-10.4h-4.6z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M12 19.5C7 15.7 4 12.9 4 9.6 4 7.3 5.8 5.5 8 5.5c1.6 0 3 .9 4 2.3 1-1.4 2.4-2.3 4-2.3 2.2 0 4 1.8 4 4.1 0 3.3-3 6.1-8 9.9Z" />
  ),
  heartFill: (
    <path
      d="M12 19.5C7 15.7 4 12.9 4 9.6 4 7.3 5.8 5.5 8 5.5c1.6 0 3 .9 4 2.3 1-1.4 2.4-2.3 4-2.3 2.2 0 4 1.8 4 4.1 0 3.3-3 6.1-8 9.9Z"
      fill="currentColor"
    />
  ),
  share: (
    <>
      <path d="M12 3.5v11" />
      <path d="M8.5 6.5 12 3l3.5 3.5" />
      <path d="M7 10H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1" />
    </>
  ),
  expand: (
    <>
      <path d="M14.5 4.5H19.5V9.5" />
      <path d="M9.5 19.5H4.5V14.5" />
      <path d="M19.5 4.5 13.8 10.2" />
      <path d="M4.5 19.5l5.7-5.7" />
    </>
  ),
  send: <path d="M4.5 12 19 5.2 15.6 19l-4.2-4.6L4.5 12Zm6.9 2.4L19 5.2" />,
  grid: (
    <>
      <rect x="4.5" y="4.5" width="6.4" height="6.4" rx="1.6" />
      <rect x="13.1" y="4.5" width="6.4" height="6.4" rx="1.6" />
      <rect x="4.5" y="13.1" width="6.4" height="6.4" rx="1.6" />
      <rect x="13.1" y="13.1" width="6.4" height="6.4" rx="1.6" />
    </>
  ),
};

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.7,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
