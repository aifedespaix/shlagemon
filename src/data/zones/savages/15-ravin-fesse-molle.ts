import type { BaseShlagemon, Zone } from '~/type'

export const savage15: Zone = {
  id: 'ravin-fesse-molle',
  name: 'data.zones.savages.15-ravin-fesse-molle.name',
  type: 'sauvage',
  position: { lat: -66.48506565291328, lng: 175.63808933002483 },
  completionAchievement: 'Sauveur du Ravin de la Fesse Molle',
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/15-20/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 15,
  maxLevel: 20,
}
