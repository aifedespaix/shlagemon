import type { BaseShlagemon, Zone } from '~/type'

export const savage75: Zone = {
  id: 'route-so-dom',
  name: `Route So'Dom`,
  type: 'sauvage',
  position: { lat: -37.703417971080256, lng: -69.30657762096776 },
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/75-80/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 75,
  maxLevel: 80,
}
