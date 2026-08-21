import { useEffect, useRef, useState } from 'react';

/**
 * Grand titre iOS : en défilant, le titre se replie dans une barre compacte
 * en verre fixée en haut (iPhone uniquement — l'iPad a la sidebar).
 */
export function LargeTitleHeader({ title, sub }: { title: string; sub?: string }) {
  const [compact, setCompact] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (el === null) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e !== undefined) setCompact(!e.isIntersecting);
      },
      { rootMargin: '-1px 0px 0px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className={`compact-bar${compact ? ' on' : ''}`} aria-hidden="true">
        <span>{title}</span>
      </div>
      <div ref={sentinelRef} aria-hidden="true" />
      <h1 className="page-title large-title">{title}</h1>
      {sub !== undefined ? <p className="page-sub subhead">{sub}</p> : null}
    </>
  );
}
