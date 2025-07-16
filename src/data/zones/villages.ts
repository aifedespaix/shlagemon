import type { Zone } from '~/type'
import {
  attackPotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  hyperVitalityPotion,
  multiExp,
  potion,
  superAttackPotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  thunderStone,
  vitalityPotion,
  xpPotion,
} from '../items/items'
import { hyperShlageball, shlageball, superShlageball } from '../items/shlageball'

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
      level: 10,
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
      level: 25,
      items: [
        potion,
        xpPotion,
        superPotion,
        superDefensePotion,
        superAttackPotion,
        superVitalityPotion,
        superShlageball,
        shlageball,
        thunderStone,
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
      level: 50,
      items: [
        hyperPotion,
        hyperDefensePotion,
        hyperAttackPotion,
        hyperVitalityPotion,
        hyperShlageball,
        multiExp,
      ],
    },
  },
}

export const villageZones: Zone[] = [
  village10,
  village20,
  village40,
]
