import type { BaseShlagemon, Zone } from '~/type'

export const savage35: Zone = {
  id: 'route-du-nawak',
  name: 'data.zones.savages.35-route-du-nawak.name',
  type: 'sauvage',
  position: { lat: -80.23196607144244, lng: 61.694665012406944 },
  completionAchievement: 'Voyageur de la Route du Nawak',
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/35-40/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 35,
  maxLevel: 40,
}
