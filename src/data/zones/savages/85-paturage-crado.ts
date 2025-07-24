import type { BaseShlagemon, Zone } from '~/type'

export const savage85: Zone = {
  id: 'paturage-crado',
  name: 'Pâturage Crado',
  type: 'sauvage',
  position: { lat: -27.443103072062925, lng: -40.08974795747376 },
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
