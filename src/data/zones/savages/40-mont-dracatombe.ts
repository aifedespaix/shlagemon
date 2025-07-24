import type { BaseShlagemon, Zone } from '~/type'

export const savage40: Zone = {
  id: 'mont-dracatombe',
  name: 'Mont Cul',
  type: 'sauvage',
  position: { lat: 37.17512580969415, lng: -103.22171603598018 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/40-45/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 40,
  maxLevel: 45,
}
