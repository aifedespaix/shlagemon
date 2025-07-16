import type { Zone } from '~/type'
import {
  attackPotion,
  defensePotion,
  multiExp,
  potion,
  steroids,
  superAttackPotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  thunderStone,
  vitalityPotion,
  xpPotion,
} from '../items/items'
import { shlageball, superShlageball } from '../items/shlageball'

const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  actions: [
    // { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 10,
  village: {
    shop: {
      items: [potion, defensePotion, attackPotion, vitalityPotion, shlageball],
    },
  },
}

const village20: Zone = {
  id: 'village-boule',
  name: 'Village Sux-Mais-Bouls',
  type: 'village',
  actions: [],
  minLevel: 20,
  village: {
    shop: {
      items: [
        xpPotion,
        superDefensePotion,
        superAttackPotion,
        superVitalityPotion,
        superShlageball,
      ],
    },
  },
}

const village40: Zone = {
  id: 'village-paume',
  name: 'Village Paumé du cul',
  type: 'village',
  actions: [],
  minLevel: 40,
  village: {
    shop: {
      items: [
        multiExp,
        thunderStone,
      ],
    },
  },
}

const village50: Zone = {
  id: 'village-caca-boudin',
  name: 'Village du Caca Boudin',
  type: 'village',
  actions: [],
  minLevel: 50,
  village: {
    shop: {
      items: [
        superXpPotion,
        superPotion,
        steroids,
      ],
    },
  },
}

export const villageZones: Zone[] = [
  village10,
  village20,
  village40,
  village50,
]
