import type { BaseShlagemon, Zone } from '~/type'

export const savage95: Zone = {
  id: 'cratere-des-legends',
  name: 'data.zones.savages.95-cratere-des-legends.name',
  type: 'sauvage',
  position: { lat: -209.1195616434194, lng: 87.64014121687441 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/95-99/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 95,
  maxLevel: 99,
}
