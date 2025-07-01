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
    id: 'village-boule',
    name: 'Village Sux-Mais-Bouls',
    type: 'village',
    actions: [
      { id: 'shop', label: 'Entrer le Shop' },
    ],
    minLevel: 40,
    maxLevel: 0,
  },
  {
    id: 'village-veaux-du-gland',
    name: 'Veaux du Gland sur Marne',
    type: 'village',
    actions: [
      { id: 'shop', label: 'Entrer le Shop' },
    ],
    minLevel: 80,
    maxLevel: 0,
  },
  {
    id: 'plaine',
    name: 'Plaine Verdoyante',
    type: 'sauvage',
    actions: [
      // { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 1,
    maxLevel: 10,
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
    id: 'ravin-anusmerite',
    name: 'Ravin anusmérite',
    type: 'sauvage',
    actions: [
      // { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 20,
    maxLevel: 30,
  },
  {
    id: 'marais-putaclick',
    name: 'Marais Putaclick',
    type: 'sauvage',
    actions: [
      // { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 30,
    maxLevel: 40,
  },
  {
    id: 'forteresse-petmoalfiak',
    name: 'Forteresse Pètmoalfiak',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Explorer la Forteresse' },
    ],
    minLevel: 40,
    maxLevel: 50,
  },
  {
    id: 'mont-dracatombe',
    name: 'Mont Cul',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Gravir le Mont' },
    ],
    minLevel: 50,
    maxLevel: 60,
  },
  {
    id: 'catacombes-merdifientes',
    name: 'Catacombes merdifientes',
    type: 'grotte',
    actions: [
      { id: 'explore', label: 'Fouiller les Catacombes' },
    ],
    minLevel: 60,
    maxLevel: 70,
  },
  {
    id: 'zone-giga-zob',
    name: 'Zone Giga-Zob',
    type: 'sauvage',
    actions: [
      // { id: 'battle', label: 'Chercher un Shlagémon' },
    ],
    minLevel: 80,
    maxLevel: 90,
  },
  {
    id: 'route-so-dom',
    name: 'Route So d\'Ôme',
    type: 'grotte',
    actions: [
      // { id: 'explore', label: 'Affronter la Fin' },
    ],
    minLevel: 90,
    maxLevel: 100,
  },
]
