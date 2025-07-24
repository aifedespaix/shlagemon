import type { BaseShlagemon, Zone } from '~/type'

export const savage01: Zone = {
  id: 'plaine-kekette',
  name: 'Plaine Kékette',
  type: 'sauvage',
  position: { lat: 80, lng: -10 },
  completionAchievement: 'Fendeur de la Plaine Kékette',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/01-05/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 1,
  maxLevel: 5,
}
