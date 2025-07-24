import type { Zone } from '~/type'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  potion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  thunderStone,
  vitalityPotion,
  xpPotion,
} from '~/data/items/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { arena40 } from '../../arenas'

export const village40: Zone = {
  id: 'village-paume',
  name: 'Village Paumé du cul',
  type: 'village',
  position: { lat: 36, lng: -100 },
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
        potion,
        superPotion,
        defensePotion,
        superDefensePotion,
        attackPotion,
        superAttackPotion,
        vitalityPotion,
        superVitalityPotion,
        xpPotion,
        superXpPotion,
        capturePotion,
        superCapturePotion,
        shlageball,
        superShlageball,
      ],
    },
  },
  miniGame: 'battleship',
}
