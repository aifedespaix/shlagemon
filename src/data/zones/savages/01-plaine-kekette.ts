import type { BaseShlagemon, Zone } from '~/type'

export const savage01: Zone = {
  id: 'plaine-kekette',
  name: 'data.zones.savages.01-plaine-kekette.name',
  type: 'sauvage',
  position: { lat: -24.24453346540599, lng: 130.0249991878924 },
  completionAchievement: 'Fendeur de la Plaine Kékette',
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/01-05/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 1,
  maxLevel: 5,
}
