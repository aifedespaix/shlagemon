import type { BaseShlagemon, Zone } from '~/type'

export const savage70: Zone = {
  id: 'zone-giga-zob',
  name: 'data.zones.savages.70-zone-giga-zob.name',
  type: 'sauvage',
  position: { lat: -151.2159609598476, lng: 58.94602977667493 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/70-75/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 70,
  maxLevel: 75,
}
