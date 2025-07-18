import type { Zone } from '~/type'
import { arena20, arena40, arena60 } from '../arenas'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperAttackPotion,
  hyperCapturePotion,
  hyperDefensePotion,
  hyperPotion,
  potion,
  steroids,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  thunderStone,
  ultraSteroid,
  vitalityPotion,
  xpPotion,
} from '../items/items'
import { hyperShlageball, shlageball, superShlageball } from '../items/shlageball'

const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  minLevel: 10,
  actions: [],
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
  actions: [
    { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 20,
  arena: {
    get arena() { return arena20 },
    completed: false,
  },
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
  miniGame: 'tictactoe',
}

const village40: Zone = {
  id: 'village-paume',
  name: 'Village Paumé du cul',
  type: 'village',
  actions: [],
  minLevel: 40,
  arena: {
    get arena() { return arena40 },
    completed: false,
  },
  village: {
    shop: {
      items: [
        thunderStone,
        superXpPotion,
        superDefensePotion,
        superAttackPotion,
        superVitalityPotion,
      ],
    },
  },
  miniGame: 'battleship',
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
        capturePotion,
        superXpPotion,
        superPotion,
        hyperCapturePotion,
        steroids,
      ],
    },
    poulailler: {
      icon: 'i-game-icons:bird-house',
    },
  },
}

const village60: Zone = {
  id: 'village-cassos-land',
  name: 'Village des Cassos',
  type: 'village',
  actions: [],
  minLevel: 60,
  arena: {
    get arena() { return arena60 },
    completed: false,
  },
  village: {
    shop: {
      items: [
        hyperPotion,
        hyperAttackPotion,
        hyperDefensePotion,
        superCapturePotion,
      ],
    },
  },
}
const village80: Zone = {
  id: 'village-clitoland',
  name: 'Clito Land',
  type: 'village',
  actions: [],
  minLevel: 80,
  village: {
    shop: {
      items: [
        hyperShlageball,
        hyperPotion,
        ultraSteroid,
      ],
    },
  },
}

export const villageZones: Zone[] = [
  village10,
  village20,
  village40,
  village50,
  village60,
  village80,
]
