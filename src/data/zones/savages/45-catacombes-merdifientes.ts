import type { BaseShlagemon, Zone } from '~/type'

export const savage45: Zone = {
  id: 'catacombes-merdifientes',
  name: 'Catacombes Merdifientes',
  type: 'sauvage',
  position: { lat: 40.16387728802661, lng: -51.83120632053309 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/45-50/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 45,
  maxLevel: 50,
}
