import { beforeEach, describe, expect, it } from 'vitest';
import { greet, respond, QUICK_CHIPS, _resetCoachForTests } from '../src/coach/engine';
import { COACH_LINES } from '../src/content/coach-lines';
import { QUOTES, QUOTE_THEME_LABELS } from '../src/content/quotes';
import { buildFeed } from '../src/content/feed';

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

describe('moteur du coach : compréhension', () => {
  it('reconnaît la procrastination et propose le démarrage 10 minutes', () => {
    const r = respond('je procrastine depuis ce matin', seededRng(1));
    expect(r.intent).toBe('procrastination');
    expect(r.links.map((l) => l.to)).toContain('/methode/demarrage-10-minutes');
  });

  it('comprend accents, majuscules et ponctuation', () => {
    expect(respond('JE STRESSE !!!', seededRng(1)).intent).toBe('stress');
    expect(respond('ca rentre pas', seededRng(1)).intent).toBe('ca-rentre-pas');
    expect(respond('Ça ne rentre pas…', seededRng(1)).intent).toBe('ca-rentre-pas');
    expect(respond('je confonds deux notions', seededRng(1)).intent).toBe('confusion');
  });

  it('comprend le langage étudiant abrégé', () => {
    expect(respond('flemme totale', seededRng(1)).intent).toBe('procrastination');
    expect(respond('anki me deborde', seededRng(1)).intent).toBe('anki');
    expect(respond('jsuis deborde jamais a jour', seededRng(1)).intent).toBe('retard');
    expect(respond('je rate mes qcm', seededRng(1)).intent).toBe('qcm');
  });

  it('« concours » ne déclenche jamais l’intention vexée (mot court borné)', () => {
    const r = respond('peur du concours', seededRng(1));
    expect(r.intent).not.toBe('vexant');
  });

  it('matière : « comment bosser l’anatomie » renvoie le protocole Anatomie', () => {
    const r = respond('comment bosser l’anatomie ?', seededRng(1));
    expect(r.intent).toBe('matiere');
    expect(r.links.map((l) => l.to)).toContain('/matiere/anatomie');
  });

  it('question inconnue : le repli propose le diagnostic sans inventer', () => {
    const r = respond('xkcd blorp 42', seededRng(1));
    expect(r.intent).toBe('fallback');
    expect(r.links.map((l) => l.to)).toContain('/diagnostic');
  });
});

describe('moteur du coach : sécurité', () => {
  it('la détresse passe avant tout et oriente vers des humains (3114)', () => {
    const r = respond('je vais craquer et je rate tous mes qcm', seededRng(1));
    expect(r.intent).toBe('detresse');
    expect(r.text).toContain('3114');
    expect(r.links.map((l) => l.to)).toContain('/sos/detresse');
    expect(r.mood).toBe('care');
  });

  it('chaque variante détresse mentionne un humain et jamais un « soin » par l’app', () => {
    const seen = new Set<string>();
    for (let s = 1; s < 40; s++) {
      const r = respond('envie de tout abandonner', seededRng(s));
      seen.add(r.text);
      expect(r.text).toMatch(/3114|proche|médecin/);
    }
    expect(seen.size).toBeGreaterThan(1);
  });
});

describe('moteur du coach : variation naturelle', () => {
  it('jamais deux fois la même formulation d’affilée, quel que soit le hasard', () => {
    for (let s = 1; s < 30; s++) {
      _resetCoachForTests();
      const rng = seededRng(s);
      const a = respond('je procrastine', rng);
      const b = respond('je procrastine', rng);
      expect(b.text).not.toBe(a.text);
    }
  });

  it('« motive-moi » injecte une vraie phrase de la banque', () => {
    const r = respond('motive moi', seededRng(7));
    expect(r.intent).toBe('motive-moi');
    const hasLine = COACH_LINES.some((l) => r.text.includes(l.text));
    expect(hasLine).toBe(true);
  });

  it('l’accueil varie aussi', () => {
    const rng = seededRng(3);
    expect(greet(rng).text).not.toBe(greet(rng).text);
  });

  it('les suggestions rapides sont toutes comprises (jamais de repli)', () => {
    for (const chip of QUICK_CHIPS) {
      _resetCoachForTests();
      const r = respond(chip, seededRng(2));
      expect(r.intent, chip).not.toBe('fallback');
    }
  });
});

describe('phrases du coach (banque)', () => {
  it('réserve conséquente, textes uniques et courts', () => {
    expect(COACH_LINES.length).toBeGreaterThanOrEqual(90);
    const texts = new Set(COACH_LINES.map((l) => l.text));
    expect(texts.size).toBe(COACH_LINES.length);
    for (const l of COACH_LINES) {
      expect(l.text.length, l.text).toBeLessThan(200);
      expect(Object.keys(QUOTE_THEME_LABELS), l.text).toContain(l.theme);
    }
  });

  it('aucun recouvrement avec les citations (pas de doublon inter-banques)', () => {
    const quoteTexts = new Set(QUOTES.map((q) => q.text));
    for (const l of COACH_LINES) {
      expect(quoteTexts.has(l.text), l.text).toBe(false);
    }
  });
});

describe('flux du jour', () => {
  it('déterministe à graine égale, différent d’un jour à l’autre', () => {
    expect(buildFeed(20260821)).toEqual(buildFeed(20260821));
    expect(buildFeed(20260821)).not.toEqual(buildFeed(20260822));
  });

  it('contient toute la banque, commence par une phrase de coach', () => {
    const feed = buildFeed(20260821);
    expect(feed.length).toBe(QUOTES.length + COACH_LINES.length);
    expect(feed[0]!.kind).toBe('coach');
    expect(feed.some((f) => f.kind === 'quote')).toBe(true);
    const texts = new Set(feed.map((f) => f.text));
    expect(texts.size).toBe(feed.length);
  });
});
