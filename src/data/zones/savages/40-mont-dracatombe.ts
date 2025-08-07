import type { BaseShlagemon, Zone } from '~/type'

export const savage40: Zone = {
  id: 'mont-dracatombe',
  name: 'data.zones.savages.40-mont-dracatombe.name',
  type: 'sauvage',
  position: { lat: -87.23038810269365, lng: 41.95446650124069 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/40-45/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 40,
  maxLevel: 45,
}
