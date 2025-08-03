import type { BaseShlagemon, Zone } from '~/type'

export const savage30: Zone = {
  id: 'forteresse-petmoalfiak',
  name: 'Forteresse Pètmoalfiak',
  type: 'sauvage',
  position: { lat: -68.98450209264584, lng: 99.18995037220844 },
  completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak',
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/30-35/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 30,
  maxLevel: 35,
}
