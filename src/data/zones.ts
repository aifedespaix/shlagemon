import type { Zone } from '~/type/zone'

export const zonesData: Zone[] = [
  {
    id: 'village',
    name: 'Village Paumé',
    type: 'village',
    actions: [
      { id: 'shop', label: 'Entrer le Shop' },
    ],
    minLevel: 0,
    maxLevel: 0,
  },
  {
    id: 'grotte',
    name: 'Grotte Sombre',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Explorer la Grotte' },
    ],
    minLevel: 10,
    maxLevel: 20,
  },
  {
    id: 'plaine',
    name: 'Plaine Verdoyante',
    type: 'sauvage',
    actions: [
      { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 1,
    maxLevel: 10,
  },
  {
    id: 'ravin-rattatak',
    name: 'Ravin Rattatak',
    type: 'sauvage',
    actions: [
      { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 20,
    maxLevel: 30,
  },
  {
    id: 'marais-smogogo',
    name: 'Marais Smogogo',
    type: 'sauvage',
    actions: [
      { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 30,
    maxLevel: 40,
  },
  {
    id: 'forteresse-machoak',
    name: 'Forteresse Machoak',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Explorer la Forteresse' },
    ],
    minLevel: 40,
    maxLevel: 50,
  },
  {
    id: 'mont-dracatombe',
    name: 'Mont Dracatombe',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Gravir le Mont' },
    ],
    minLevel: 50,
    maxLevel: 60,
  },
  {
    id: 'catacombes-tenefrites',
    name: 'Catacombes Ténéfrites',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Fouiller les Catacombes' },
    ],
    minLevel: 60,
    maxLevel: 70,
  },
  {
    id: 'zone-ultraflop',
    name: 'Zone Ultra-Flop',
    type: 'sauvage',
    actions: [
      { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 80,
    maxLevel: 90,
  },
  {
    id: 'dome-mewpocalypse',
    name: 'Dôme Mewpocalypse',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Affronter la Fin' },
    ],
    minLevel: 90,
    maxLevel: 100,
  },
]
