import type { BaseShlagemon, Zone } from '~/type'

export const savage20: Zone = {
  id: 'precipice-nanard',
  name: 'Précipice du Vieux Nanard',
  type: 'sauvage',
  position: { lat: 70.31491594472914, lng: -43.41598781817605 },
  completionAchievement: 'Dénicheur du Vieux Nanard',
  actions: [],
  shlagemons: Object.entries(import.meta.glob<{ default: BaseShlagemon }>(
    '../../shlagemons/20-25/*.ts',
    { eager: true },
  ))
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: 20,
  maxLevel: 25,
}
