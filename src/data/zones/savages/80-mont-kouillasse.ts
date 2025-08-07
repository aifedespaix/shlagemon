import type { BaseShlagemon, Zone } from '~/type'

export const savage80: Zone = {
  id: 'mont-kouillasse',
  name: 'data.zones.savages.80-mont-kouillasse.name',
  type: 'sauvage',
  position: { lat: -145.97988089845296, lng: 78.68610421836229 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/80-85/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 80,
  maxLevel: 85,
}
