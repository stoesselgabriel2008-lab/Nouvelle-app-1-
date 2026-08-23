import { beforeEach, describe, expect, it } from 'vitest';
import { respond, greet, ALL_INTENTS, _resetCoachForTests } from '../src/coach/engine';
import { MODES, MODE_ORDER, SAFETY_INTENTS, type CoachMode } from '../src/coach/modes';
import {
  FEED_FILTERS,
  FEED_FILTER_LABELS,
  buildFeed,
  filterFeed,
  normalizeFilter,
} from '../src/content/feed';

/** RNG déterministe pour des tests reproductibles. */
function seededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

beforeEach(() => {
  _resetCoachForTests();
});

const INTENT_IDS = new Set(ALL_INTENTS.map((i) => i.id));

describe('personnalités : intégrité de la configuration', () => {
  it('MODE_ORDER couvre exactement les modes définis', () => {
    expect([...MODE_ORDER].sort()).toEqual(Object.keys(MODES).sort());
    expect(MODE_ORDER[0]).toBe('classique');
  });

  it('chaque mode a un label, une tagline et des accueils substantiels', () => {
    for (const mode of MODE_ORDER) {
      const cfg = MODES[mode];
      expect(cfg.id).toBe(mode);
      expect(cfg.label.length).toBeGreaterThan(2);
      expect(cfg.tagline.length).toBeGreaterThan(5);
      expect(cfg.greetings.length).toBeGreaterThanOrEqual(3);
      for (const g of cfg.greetings) expect(g.length).toBeGreaterThan(40);
      expect(new Set(cfg.greetings).size).toBe(cfg.greetings.length);
    }
  });

  it('les réécritures visent des intentions réelles, jamais les sujets sensibles', () => {
    for (const mode of MODE_ORDER) {
      for (const [intentId, variants] of Object.entries(MODES[mode].overrides)) {
        expect(INTENT_IDS.has(intentId), `${mode}/${intentId} inconnue`).toBe(true);
        expect(SAFETY_INTENTS.has(intentId), `${mode}/${intentId} est un sujet sensible`).toBe(
          false,
        );
        expect(variants.length).toBeGreaterThanOrEqual(3);
        for (const v of variants) expect(v.length).toBeGreaterThan(60);
        expect(new Set(variants).size).toBe(variants.length);
      }
    }
  });

  it('Sergent et Zen couvrent les mêmes situations clés (≥ 20 en v3)', () => {
    const sergent = Object.keys(MODES.sergent.overrides).sort();
    const zen = Object.keys(MODES.zen.overrides).sort();
    expect(sergent.length).toBeGreaterThanOrEqual(20);
    expect(zen).toEqual(sergent);
  });

  it('chaque sujet sensible correspond à une intention réelle de la base', () => {
    for (const id of SAFETY_INTENTS) {
      expect(INTENT_IDS.has(id), `${id} absent de la base`).toBe(true);
    }
  });
});

describe('personnalités : la voix change, la méthode reste', () => {
  it('l’accueil suit le mode choisi', () => {
    for (const mode of MODE_ORDER) {
      const g = greet(seededRng(5), mode);
      expect(MODES[mode].greetings).toContain(g.text);
    }
  });

  it('Sergent réécrit la procrastination en gardant le protocole', () => {
    const r = respond('je procrastine', seededRng(3), 'sergent');
    expect(r.intent).toBe('procrastination');
    expect(MODES.sergent.overrides['procrastination']).toContain(r.text);
    expect(r.links.map((l) => l.to)).toContain('/methode/demarrage-10-minutes');
  });

  it('Zen réécrit la même situation dans sa propre voix', () => {
    const r = respond('je procrastine', seededRng(3), 'zen');
    expect(r.intent).toBe('procrastination');
    expect(MODES.zen.overrides['procrastination']).toContain(r.text);
  });

  it('Classique garde la voix de base (aucune réécriture)', () => {
    const r = respond('je procrastine', seededRng(3));
    expect(MODES.sergent.overrides['procrastination']).not.toContain(r.text);
    expect(MODES.zen.overrides['procrastination']).not.toContain(r.text);
  });

  it('« motive-moi » en Sergent sert la citation PUIS renvoie au travail', () => {
    const r = respond('motive moi', seededRng(4), 'sergent');
    expect(r.intent).toBe('motive-moi');
    expect(r.text).toContain('«'); // la phrase du jour est bien injectée
    expect(MODES.sergent.overrides['motive-moi']!.some((v) => r.text.endsWith(v.split('\n\n')[1]!))).toBe(
      true,
    );
  });

  it('sans réécriture dédiée, le Sergent signe sa réponse (closer)', () => {
    const r = respond('anki me deborde', seededRng(6), 'sergent');
    expect(r.intent).toBe('anki');
    expect(MODES.sergent.closers.some((c) => r.text.endsWith(c))).toBe(true);
  });

  it('les échanges sociaux ne sont jamais signés par un closer', () => {
    const r = respond('merci beaucoup', seededRng(6), 'sergent');
    expect(MODES.sergent.closers.every((c) => !r.text.endsWith(c))).toBe(true);
  });
});

describe('personnalités : garde-fou des sujets sensibles', () => {
  const runFor = (input: string, mode: CoachMode, seed: number) => {
    _resetCoachForTests();
    return respond(input, seededRng(seed), mode);
  };

  it('la détresse répond à l’identique dans les trois modes, avec le 3114', () => {
    const base = runFor('je vais craquer', 'classique', 11);
    expect(base.text).toContain('3114');
    for (const mode of ['sergent', 'zen'] as const) {
      const r = runFor('je vais craquer', mode, 11);
      expect(r.text).toBe(base.text);
      expect(r.mood).toBe(base.mood);
    }
  });

  it('le moral bas garde la voix bienveillante, sans closer de mode', () => {
    const base = runFor('gros coup de mou aujourd’hui', 'classique', 12);
    expect(base.intent).toBe('moral-bas');
    for (const mode of ['sergent', 'zen'] as const) {
      const r = runFor('gros coup de mou aujourd’hui', mode, 12);
      expect(r.intent).toBe('moral-bas');
      expect(r.text).toBe(base.text);
      expect(MODES[mode].closers.every((c) => !r.text.endsWith(c))).toBe(true);
    }
  });

  it('la panique reste en voix de base même en Sergent', () => {
    const base = runFor('je fais une crise de panique', 'classique', 13);
    const sergent = runFor('je fais une crise de panique', 'sergent', 13);
    expect(sergent.text).toBe(base.text);
  });

  it('v3 : les nouvelles situations sensibles gardent la voix de base partout', () => {
    const cases: [string, string][] = [
      ['mon grand-père est décédé', 'deuil'],
      ['je me fais harceler à la fac', 'harcelement'],
      ['mon copain m’a quitté', 'rupture-amoureuse'],
      ['je me sens seul ce soir', 'solitude'],
      ['je travaille trop sans m’arrêter', 'surmenage'],
      ['je suis trop énervé', 'colere'],
    ];
    for (const [msg, intent] of cases) {
      const base = runFor(msg, 'classique', 21);
      expect(base.intent, msg).toBe(intent);
      for (const mode of ['sergent', 'zen'] as const) {
        const r = runFor(msg, mode, 21);
        expect(r.text, `${msg} (${mode})`).toBe(base.text);
        expect(MODES[mode].closers.every((c) => !r.text.endsWith(c))).toBe(true);
      }
    }
  });

  it('v3 : les nouvelles réécritures Sergent/Zen sont réellement servies', () => {
    // startsWith : une phrase « second sujet » peut légitimement s'ajouter après.
    _resetCoachForTests();
    const s = respond('je suis accro à mon téléphone', seededRng(9), 'sergent');
    expect(s.intent).toBe('addiction-ecrans');
    expect(
      MODES.sergent.overrides['addiction-ecrans']!.some((v) => s.text.startsWith(v)),
    ).toBe(true);
    _resetCoachForTests();
    const z = respond('jai eu une bonne note enfin', seededRng(9), 'zen');
    expect(z.intent).toBe('bonne-note');
    expect(MODES.zen.overrides['bonne-note']!.some((v) => z.text.startsWith(v))).toBe(true);
  });
});

describe('v3 : couche savoir', () => {
  it('répond avec les chiffres des fiches (pomodoro, intervalles, anki)', () => {
    _resetCoachForTests();
    const pomo = respond('pomodoro combien de temps ?', seededRng(4));
    expect(pomo.intent).toBe('k-duree-pomodoro');
    expect(pomo.text).toContain('25');
    expect(pomo.links.map((l) => l.to)).toContain('/methode/pomodoro');

    _resetCoachForTests();
    const esp = respond('quels intervalles pour la répétition espacée', seededRng(4));
    expect(esp.intent).toBe('k-intervalles');
    expect(esp.text).toContain('J+1');

    _resetCoachForTests();
    const anki = respond('combien de cartes par jour sur anki', seededRng(4));
    expect(anki.intent).toBe('k-cartes-par-jour');
    expect(anki.text).toContain('20');
  });

  it('une question précise bat la carte d’identité générique de la fiche', () => {
    _resetCoachForTests();
    const r = respond('c’est quoi les intervalles de la répétition espacée ?', seededRng(4));
    expect(r.intent).toBe('k-intervalles');
  });

  it('« c’est quoi X » sans question précise reste une entité', () => {
    _resetCoachForTests();
    const r = respond('c’est quoi le blurting ?', seededRng(4));
    expect(r.intent).toBe('entite:blurting');
  });

  it('les limites sont dites honnêtement (hors-champ, numerus)', () => {
    _resetCoachForTests();
    const web = respond('cherche sur internet stp', seededRng(4));
    expect(web.intent).toBe('hors-champ');
    expect(web.text.toLowerCase()).toContain('local');

    _resetCoachForTests();
    const num = respond('combien de places en médecine ?', seededRng(4));
    expect(num.intent).toBe('numerus-places');
    expect(num.text).toMatch(/scolarit|universit/i);
  });
});

describe('ambiances du flux (filterFeed)', () => {
  const feed = buildFeed(123);

  it('chaque ambiance a un libellé, « tout » ouvre la liste', () => {
    expect(FEED_FILTERS[0]).toBe('tout');
    for (const f of FEED_FILTERS) {
      expect(FEED_FILTER_LABELS[f].length).toBeGreaterThan(2);
    }
    expect(FEED_FILTER_LABELS.courage).toBe('Motivation');
  });

  it('normalizeFilter tolère les valeurs inconnues', () => {
    expect(normalizeFilter('tout')).toBe('tout');
    expect(normalizeFilter('courage')).toBe('courage');
    expect(normalizeFilter('n’importe quoi')).toBe('tout');
    expect(normalizeFilter('')).toBe('tout');
  });

  it('filtre par thème : uniquement le thème demandé', () => {
    const calme = filterFeed(feed, 'calme', []);
    expect(calme.length).toBeGreaterThan(0);
    expect(calme.length).toBeLessThan(feed.length);
    for (const item of calme) expect(item.theme).toBe('calme');
  });

  it('« coach » et « citations » séparent les deux sources', () => {
    const coach = filterFeed(feed, 'coach', []);
    const quotes = filterFeed(feed, 'citations', []);
    expect(coach.length).toBeGreaterThan(0);
    expect(quotes.length).toBeGreaterThan(0);
    for (const item of coach) expect(item.kind).toBe('coach');
    for (const item of quotes) expect(item.kind).toBe('quote');
    expect(coach.length + quotes.length).toBe(feed.length);
  });

  it('« favoris » ne garde que les phrases aimées', () => {
    const fav = feed[4]!.text;
    const out = filterFeed(feed, 'favoris', [fav]);
    expect(out.length).toBeGreaterThan(0);
    for (const item of out) expect(item.text).toBe(fav);
  });

  it('ne renvoie JAMAIS un flux vide (repli sur tout)', () => {
    expect(filterFeed(feed, 'favoris', []).length).toBe(feed.length);
    expect(filterFeed(feed, 'favoris', ['texte-inexistant']).length).toBe(feed.length);
  });
});
