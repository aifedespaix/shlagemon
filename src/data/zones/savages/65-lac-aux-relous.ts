import type { BaseShlagemon, Zone } from '~/type'

export const savage65: Zone = {
  id: 'lac-aux-relous',
  name: 'Lac aux Relous',
  type: 'sauvage',
  position: { lat: 0.03320602577323381, lng: -131.87589174937966 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/65-70/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 65,
  maxLevel: 70,
}
