import type { BaseShlagemon, Zone } from '~/type'

export const savage35: Zone = {
  id: 'route-du-nawak',
  name: 'Route du Nawak',
  type: 'sauvage',
  position: { lat: 49.27840457342957, lng: -150.65909972084367 },
  completionAchievement: 'Voyageur de la Route du Nawak',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/35-40/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 35,
  maxLevel: 40,
}
