import type { BaseShlagemon, Zone } from '~/type'

export const savage25: Zone = {
  id: 'marais-moudugenou',
  name: 'data.zones.savages.25-marais-moudugenou.name',
  type: 'sauvage',
  position: { lat: -54.98765803014342, lng: 77.18697270471463 },
  completionAchievement: 'data.zones.savages.25-marais-moudugenou.completionAchievement',
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/25-30/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 25,
  maxLevel: 30,
}
