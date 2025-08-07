import type { BaseShlagemon, Zone } from '~/type'

export const savage55: Zone = {
  id: 'vallee-des-chieurs',
  name: 'data.zones.savages.55-vallee-des-chieurs.name',
  type: 'sauvage',
  position: { lat: -109.72531606028684, lng: 92.67928039702232 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/55-60/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 55,
  maxLevel: 60,
}
