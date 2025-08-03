import type { BaseShlagemon, Zone } from '~/type'

export const savage45: Zone = {
  id: 'catacombes-merdifientes',
  name: 'Catacombes Merdifientes',
  type: 'sauvage',
  position: { lat: -100.97728852122282, lng: 14.218238213399502 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/45-50/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 45,
  maxLevel: 50,
}
