import { describe, expect, it } from 'vitest';
import { searchAll } from '../src/search/engine';

/** IDs des N premiers résultats. */
function topIds(query: string, n = 3): string[] {
  return searchAll(query, n).map((h) => `${h.kind}:${h.refId}`);
}

function first(query: string): string | undefined {
  return topIds(query, 1)[0];
}

describe('recherche — requêtes naturelles du prompt (§24)', () => {
  it('« ca rentre pas » → SOS Ça ne rentre pas', () => {
    expect(first('ca rentre pas')).toBe('sos:ca-rentre-pas');
  });

  it('« j melange » → tableau de contraste dans le top 3', () => {
    expect(topIds('j melange')).toContain('method:tableau-contraste');
  });

  it('« mecanisme biocell » → chaîne causale ou matière biocell en tête', () => {
    const ids = topIds('mecanisme biocell');
    expect(
      ids.includes('method:chaine-causale') || ids.includes('subject:biocell'),
    ).toBe(true);
  });

  it('« voie proteine » → chaîne causale dans le top 3', () => {
    expect(topIds('voie proteine')).toContain('method:chaine-causale');
  });

  it('« exo physique » → exercice à froid dans le top 3', () => {
    expect(topIds('exo physique')).toContain('method:exercice-a-froid');
  });

  it('« formule unite » → carte calcul dans le top 3', () => {
    expect(topIds('formule unite')).toContain('method:carte-calcul');
  });

  it('« histo image » → Image Occlusion ou matière histologie dans le top 3', () => {
    const ids = topIds('histo image');
    expect(
      ids.includes('method:image-occlusion') || ids.includes('subject:histologie'),
    ).toBe(true);
  });

  it('« feuille blanche » → fiche Feuille blanche en premier', () => {
    expect(first('feuille blanche')).toBe('method:feuille-blanche');
  });

  it('« feynman » → fiche Feynman en premier', () => {
    expect(first('feynman')).toBe('method:feynman');
  });

  it('« blurting » → fiche Blurting en premier', () => {
    expect(first('blurting')).toBe('method:blurting');
  });

  it('« mindmap » (sans espace) → Mind map en premier', () => {
    expect(first('mindmap')).toBe('method:mind-map');
  });

  it('« loci » et « palais mental » → Palais mental en premier', () => {
    expect(first('palais mental')).toBe('method:palais-mental');
    expect(first('loci')).toBe('method:palais-mental');
  });

  it('« mnemo » → une mnémotechnique dans le top 3', () => {
    const ids = topIds('mnemo');
    expect(
      ids.some((id) =>
        [
          'method:association-phonetique',
          'method:imagerie-interactive',
          'method:acronyme',
        ].includes(id),
      ),
    ).toBe(true);
  });

  it('« anki quoi mettre » → Répétition espacée / FSRS en premier', () => {
    expect(first('anki quoi mettre')).toBe('method:repetition-espacee');
  });

  it('« cloze » → Cloze ciblé en premier', () => {
    expect(first('cloze')).toBe('method:cloze-cible');
  });

  it('« deck prepa » → Audit d’un deck partagé en premier', () => {
    expect(first('deck prepa')).toBe('method:audit-deck');
  });

  it('« rappel libre » → feuille blanche ou rappel actif en tête', () => {
    const ids = topIds('rappel libre', 2);
    expect(
      ids.includes('method:feuille-blanche') || ids.includes('method:rappel-actif'),
    ).toBe(true);
  });

  it('« reconnaissance » → rappel actif dans le top 3', () => {
    expect(topIds('reconnaissance')).toContain('method:rappel-actif');
  });

  it('« stress » → N-R-A-R ou SOS panique en tête', () => {
    const ids = topIds('stress', 2);
    expect(
      ids.includes('method:nrar-stress') || ids.includes('sos:panique'),
    ).toBe(true);
  });

  it('« retard » → triage du retard ou SOS retard en tête', () => {
    const ids = topIds('retard', 2);
    expect(
      ids.includes('method:triage-retard') || ids.includes('sos:retard'),
    ).toBe(true);
  });

  it('« je reconnais mais je n’arrive pas à réciter » → rappel actif dans le top 3', () => {
    expect(topIds('je reconnais mais je n arrive pas a reciter')).toContain(
      'method:rappel-actif',
    );
  });
});

describe('recherche — robustesse (accents, casse, pluriels, fautes)', () => {
  it('accents et casse indifférents', () => {
    expect(first('PROTÉINES')).toBe(first('proteines'));
    expect(first('mécanisme')).toBe(first('mecanisme'));
  });

  it('pluriel / singulier indifférents', () => {
    expect(first('mnémotechniques')).toBe(first('mnémotechnique'));
  });

  it('fautes de frappe tolérées (fuzzy)', () => {
    expect(first('feynmann')).toBe('method:feynman');
    expect(first('palai mental')).toBe('method:palais-mental');
    expect(topIds('interleavin')).toContain('method:interleaving');
  });

  it('« bio cell » en deux mots trouve la matière biocell', () => {
    expect(topIds('bio cell', 5)).toContain('subject:biocell');
  });

  it('requête vide → aucun résultat, sans erreur', () => {
    expect(searchAll('')).toHaveLength(0);
    expect(searchAll('   ')).toHaveLength(0);
  });

  it('chaque requête utile renvoie au moins un résultat', () => {
    const queries = [
      'ca rentre pas',
      'j oublie',
      'je melange',
      'biocell',
      'cascade',
      'formule',
      'unité',
      'histo image',
      'anki',
      'stress',
      'retard',
      'blurting',
      'mind map',
      'pomodoro',
      'dopamine detox',
      'qcm',
    ];
    for (const q of queries) {
      expect(searchAll(q).length, `aucun résultat pour « ${q} »`).toBeGreaterThan(0);
    }
  });
});
