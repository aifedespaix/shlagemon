import type { BaseShlagemon, Zone } from '~/type'

export const savage60: Zone = {
  id: 'trou-du-bide',
  name: 'data.zones.savages.60-trou-du-bide.name',
  type: 'sauvage',
  position: { lat: -118.72328724332411, lng: 48.45124069478908 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/60-65/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 60,
  maxLevel: 65,
}
