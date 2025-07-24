import type { BaseShlagemon, Zone } from '~/type'

export const savage55: Zone = {
  id: 'vallee-des-chieurs',
  name: 'Vallée des Chieurs',
  type: 'sauvage',
  position: { lat: 23.430970482637584, lng: -124.31523883230909 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/55-60/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 55,
  maxLevel: 60,
}
