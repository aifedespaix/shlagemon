import type { BaseShlagemon, Zone } from '~/type'

export const savage95: Zone = {
  id: 'cratere-des-legends',
  name: 'Cratère des Légends',
  type: 'sauvage',
  position: { lat: -78.57025813012717, lng: -58.52758422787182 },
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
