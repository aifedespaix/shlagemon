import type { BaseShlagemon, Zone } from '~/type'

export const savage80: Zone = {
  id: 'mont-kouillasse',
  name: 'Mont Kouillasse',
  type: 'sauvage',
  position: { lat: -16.792819357295993, lng: -80.55090725806453 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/80-85/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 80,
  maxLevel: 85,
}
