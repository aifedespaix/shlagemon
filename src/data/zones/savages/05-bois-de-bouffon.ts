import type { BaseShlagemon, Zone } from '~/type'

export const savage05: Zone = {
  id: 'bois-de-bouffon',
  name: 'Bois des Bouffons',
  type: 'sauvage',
  position: {lat: -42.49047583148054, lng: 103.92369727047145},
  completionAchievement: 'Bûcheron du Bois de Bouffon',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/05-10/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 5,
  maxLevel: 10,
}
