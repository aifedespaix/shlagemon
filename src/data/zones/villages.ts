import type { Zone } from '~/type'

const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  actions: [
    { id: 'shop', label: 'Entrer dans le Magasin' },
    // { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 10,
}

const village20: Zone = {
  id: 'village-boule',
  name: 'Village Sux-Mais-Bouls',
  type: 'village',
  actions: [{ id: 'shop', label: 'Entrer dans le Magasin' }],
  minLevel: 20,
}

const village40: Zone = {
  id: 'village-paume',
  name: 'Village Paumé du cul',
  type: 'village',
  actions: [{ id: 'shop', label: 'Entrer dans le Magasin' }],
  minLevel: 40,
}

export const villageZones: Zone[] = [
  village10,
  village20,
  village40,
]
