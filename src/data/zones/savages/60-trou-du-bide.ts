import type { BaseShlagemon, Zone } from '~/type'

export const savage60: Zone = {
  id: 'trou-du-bide',
  name: 'Trou du Bide',
  type: 'sauvage',
  position: { lat: -2.6241509975089934, lng: -92.6800752171216 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/60-65/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 60,
  maxLevel: 65,
}
