import type { BaseShlagemon, Zone } from '~/type'

export const savage75: Zone = {
  id: 'route-so-dom',
  name: `Route So'Dom`,
  type: 'sauvage',
  position: { lat: -125.22182198662881, lng: 82.18449131513648 },
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/75-80/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 75,
  maxLevel: 80,
}
