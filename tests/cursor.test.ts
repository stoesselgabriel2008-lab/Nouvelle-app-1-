import { beforeEach, describe, expect, it, vi } from 'vitest';
import { advanceFeedPos, peekFeedPos } from '../src/lib/storage';
import { buildFeed } from '../src/content/feed';

/**
 * Le curseur persistant du flux mental : c'est lui qui garantit qu'on ne
 * retombe jamais sur la même citation en rouvrant l'app.
 */

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
  });
});

describe('curseur du flux', () => {
  it('avance à chaque appel et persiste', () => {
    expect(peekFeedPos()).toBe(-1);
    expect(advanceFeedPos()).toBe(0);
    expect(advanceFeedPos()).toBe(1);
    expect(advanceFeedPos()).toBe(2);
    expect(peekFeedPos()).toBe(2);
    // La valeur est bien écrite sous la clé versionnée.
    expect(store.get('pmos:v1:feedPos')).toBe('2');
  });

  it('deux ouvertures consécutives donnent toujours deux phrases différentes', () => {
    const feed = buildFeed(20260822);
    for (let i = 0; i < 500; i++) {
      const a = feed[advanceFeedPos() % feed.length]!;
      const b = feed[advanceFeedPos() % feed.length]!;
      expect(b.text, `position ${i}`).not.toBe(a.text);
    }
  });

  it('stockage indisponible : l’app ne casse pas (retombe au début)', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('indisponible');
      },
      setItem: () => {
        throw new Error('indisponible');
      },
    });
    expect(peekFeedPos()).toBe(-1);
    expect(advanceFeedPos()).toBe(0);
  });
});
