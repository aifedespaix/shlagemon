import type { BaseShlagemon, Zone } from '~/type'

export const savage90: Zone = {
  id: 'canyon-a-la-derp',
  name: 'Canyon à la Derp',
  type: 'sauvage',
  position: { lat: -191.42375029581757, lng: 84.11421646610381 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/90-95/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 90,
  maxLevel: 95,
}
