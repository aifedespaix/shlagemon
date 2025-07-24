import type { BaseShlagemon, Zone } from '~/type'

export const savage50: Zone = {
  id: 'route-aguicheuse',
  name: 'Route Aguicheuse',
  type: 'sauvage',
  position: { lat: 14.449697402363375, lng: -64.31153678421705 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/50-55/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 50,
  maxLevel: 55,
}
