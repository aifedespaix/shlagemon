import type { Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
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
import { move } from '~/utils/position'
import { arena40 } from '../../arenas'
import { savage35 } from '../savages/35-route-du-nawak'

export const village40: Zone = {
  id: 'village-paume',
  name: 'Village Paumé du cul',
  type: 'village',
  position: move.left(savage35.position, VILLAGE_OFFSET),
  attachedTo: savage35.id,
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
