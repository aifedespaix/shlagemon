import type { BaseShlagemon, Zone } from '~/type'

export const savage65: Zone = {
  id: 'lac-aux-relous',
  name: 'Lac aux Relous',
  type: 'sauvage',
position: {lat: -140.96827155694405, lng: 36.45719602977667},
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
