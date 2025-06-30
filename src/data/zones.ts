import type { Zone } from '~/type/zone'

export const zonesData: Zone[] = [
  {
    id: 'village',
    name: 'Village Paumé',
    type: 'village',
    actions: [
      { id: 'shop', label: 'Entrer le Shop' },
    ],
  },
  {
    id: 'grotte',
    name: 'Grotte Sombre',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Explorer la Grotte' },
    ],
  },
  {
    id: 'plaine',
    name: 'Plaine Verdoyante',
    type: 'sauvage',
    actions: [
      { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
  },
]
