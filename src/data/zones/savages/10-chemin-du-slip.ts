import type { BaseShlagemon, Zone } from '~/type'

export const savage10: Zone = {
  id: 'chemin-du-slip',
  name: 'Chemin du Slip',
  type: 'sauvage',
  position: { lat: -61.48619277344812, lng: 145.9028535980149 },
  completionAchievement: 'Explorateur de la Grotte du Slip',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/10-15/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 10,
  maxLevel: 15,
}
