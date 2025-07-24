import type { BaseShlagemon, Zone } from '~/type'

export const savage30: Zone = {
  id: 'forteresse-petmoalfiak',
  name: 'Forteresse Pètmoalfiak',
  type: 'sauvage',
  position: { lat: 62.91876900690104, lng: -117.7983870967742 },
  completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/30-35/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 30,
  maxLevel: 35,
}
