import type { BaseShlagemon, Zone } from '~/type'

export const savage95: Zone = {
  id: 'cratere-des-legends',
  name: 'Cratère des Légends',
  type: 'sauvage',
position: {lat: -209.1195616434194, lng: 87.64014121687441},
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/95-100/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 95,
  maxLevel: 100,
}
