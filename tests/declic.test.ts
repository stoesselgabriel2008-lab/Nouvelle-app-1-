import { describe, expect, it } from 'vitest';
import { PUNCHLINES } from '../src/content/punchlines';
import { TALK_SITUATIONS, findSituation } from '../src/content/talks';
import { METHODS } from '../src/content/methods/index';
import { SOS_PROTOCOLS } from '../src/content/sos';

/**
 * Intégrité du mode Déclic : les garanties qui comptent —
 * couverture des tons, sujet sensible protégé, liens réels, textes uniques.
 */

const ROUTES = new Set<string>([
  '/citations/plein-ecran',
  ...METHODS.map((m) => `/methode/${m.id}`),
  ...SOS_PROTOCOLS.map((s) => `/sos/${s.id}`),
]);

describe('mode Déclic : situations', () => {
  it('au moins 12 situations, ids uniques, libellés fournis', () => {
    expect(TALK_SITUATIONS.length).toBeGreaterThanOrEqual(12);
    const ids = new Set(TALK_SITUATIONS.map((s) => s.id));
    expect(ids.size).toBe(TALK_SITUATIONS.length);
    for (const s of TALK_SITUATIONS) {
      expect(s.label.length, s.id).toBeGreaterThan(5);
      expect(s.sub.length, s.id).toBeGreaterThan(1);
    }
  });

  it('chaque situation normale a ≥ 3 discours francs et ≥ 2 doux, substantiels', () => {
    for (const s of TALK_SITUATIONS) {
      if (s.safety === true) continue;
      expect(s.franc.length, s.id).toBeGreaterThanOrEqual(3);
      expect(s.doux.length, s.id).toBeGreaterThanOrEqual(2);
      for (const t of [...s.franc, ...s.doux]) {
        expect(t.length, s.id).toBeGreaterThan(300);
        expect(t, s.id).toContain('\n\n');
      }
    }
  });

  it('la situation sensible : douce uniquement, orientée humains, action Détresse', () => {
    const sensitive = TALK_SITUATIONS.filter((s) => s.safety === true);
    expect(sensitive.length).toBeGreaterThanOrEqual(1);
    for (const s of sensitive) {
      expect(s.franc, s.id).toHaveLength(0);
      expect(s.doux.length, s.id).toBeGreaterThanOrEqual(3);
      expect(s.fiche.to, s.id).toBe('/sos/detresse');
      // Chaque discours oriente vers de vraies personnes (3114 / médecin / proche).
      for (const t of s.doux) {
        expect(/3114|médecin|proche/.test(t), s.id).toBe(true);
      }
    }
  });

  it('tous les discours sont uniques et toutes les fiches liées existent', () => {
    const seen = new Set<string>();
    for (const s of TALK_SITUATIONS) {
      expect(ROUTES.has(s.fiche.to), `${s.id} → ${s.fiche.to}`).toBe(true);
      for (const t of [...s.franc, ...s.doux]) {
        expect(seen.has(t), `doublon dans ${s.id}`).toBe(false);
        seen.add(t);
      }
    }
  });

  it('dur sur l’action, jamais insultant : aucun discours ne rabaisse la personne', () => {
    const interdits = /\b(nul|nulle|idiot|idiote|débile|minable|pathétique|honte à toi)\b/i;
    for (const s of TALK_SITUATIONS) {
      for (const t of [...s.franc, ...s.doux]) {
        // « nulle part » est un idiome neutre, pas une attaque.
        const epure = t.replace(/nulle part/gi, '');
        expect(interdits.test(epure), `${s.id} : « ${t.slice(0, 60)}… »`).toBe(false);
      }
    }
  });

  it('findSituation retrouve par id et rend null sinon', () => {
    expect(findSituation('pas-commence')?.label).toContain('commencé');
    expect(findSituation('inconnue')).toBeNull();
  });
});

describe('mode Déclic : punchlines', () => {
  it('au moins 100, uniques, courtes, jamais insultantes', () => {
    expect(PUNCHLINES.length).toBeGreaterThanOrEqual(100);
    expect(new Set(PUNCHLINES).size).toBe(PUNCHLINES.length);
    const interdits = /\b(idiot|débile|minable|pathétique)\b/i;
    for (const p of PUNCHLINES) {
      expect(p.length, p).toBeGreaterThan(15);
      expect(p.length, p).toBeLessThan(200);
      expect(interdits.test(p), p).toBe(false);
    }
  });
});
