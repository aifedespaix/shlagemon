import type { BaseShlagemon, Zone } from '~/type'

export const savage85: Zone = {
  id: 'paturage-crado',
  name: 'Pâturage Crado',
  type: 'sauvage',
position: {lat: -146.00878391249714, lng: 98.67630272952854},
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/85-90/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 85,
  maxLevel: 90,
}
