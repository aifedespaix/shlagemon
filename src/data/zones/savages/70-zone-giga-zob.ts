import type { BaseShlagemon, Zone } from '~/type'

export const savage70: Zone = {
  id: 'zone-giga-zob',
  name: 'Aire du Giga Zob',
  type: 'sauvage',
  position: { lat: -28.907548890595773, lng: -103.39741004962782 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/70-75/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 70,
  maxLevel: 75,
}
