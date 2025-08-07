import type { BaseShlagemon, Zone } from '~/type'

export const savage50: Zone = {
  id: 'route-aguicheuse',
  name: 'data.zones.savages.50-route-aguicheuse.name',
  type: 'sauvage',
  position: { lat: -99.97751394532979, lng: 72.68920595533498 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/50-55/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 50,
  maxLevel: 55,
}
