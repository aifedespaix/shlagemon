import type { BaseShlagemon, Zone } from '~/type'

export const savage25: Zone = {
  id: 'marais-moudugenou',
  name: 'Marais Moudugenou',
  type: 'sauvage',
  position: { lat: 59.60569920185441, lng: -66.37334250930522 },
  completionAchievement: 'Épurateur du Marais Moudugenou',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/25-30/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 25,
  maxLevel: 30,
}
