import type { BaseShlagemon, Zone } from '~/type'

export const savage15: Zone = {
  id: 'ravin-fesse-molle',
  name: 'Ravin de la Fesse Molle',
  type: 'sauvage',
  position: { lat: 62.76491912684052, lng: 5.573356079404462 },
  completionAchievement: 'Sauveur du Ravin de la Fesse Molle',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/15-20/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 15,
  maxLevel: 20,
}
