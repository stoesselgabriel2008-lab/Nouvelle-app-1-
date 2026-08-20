import type { Method } from '../types';
import { socleMethods } from './socle';
import { comprendreMethods } from './comprendre';
import { structurerMethods } from './structurer';
import { mnemotechniquesMethods } from './mnemotechniques';
import { visuelMethods } from './visuel';
import { appliquerMethods } from './appliquer';
import { testerMethods } from './tester';
import { ankiMethods } from './anki';
import { supportMethods } from './support';
import { focusMethods } from './focus';

/** Toutes les méthodes de la Source V2, §6 — 47 fiches. */
export const METHODS: Method[] = [
  ...socleMethods,
  ...comprendreMethods,
  ...structurerMethods,
  ...mnemotechniquesMethods,
  ...visuelMethods,
  ...appliquerMethods,
  ...testerMethods,
  ...ankiMethods,
  ...supportMethods,
  ...focusMethods,
];

export const METHODS_BY_ID: ReadonlyMap<string, Method> = new Map(
  METHODS.map((m) => [m.id, m]),
);

export function getMethod(id: string): Method | undefined {
  return METHODS_BY_ID.get(id);
}
