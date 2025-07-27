import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import { arena80 } from '~/data/arenas'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperAttackPotion,
  hyperCapturePotion,
  hyperDefensePotion,
  hyperPotion,
  hyperVitalityPotion,
  hyperXpPotion,
  potion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  ultraSteroid,
  vitalityPotion,
  xpPotion,
} from '~/data/items/items'
import { hyperShlageball, shlageball, superShlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { savage75 } from '../savages/75-route-so-dom'

export const village80: Zone = {
  id: 'village-clitoland',
  name: 'Clito Land',
  type: 'village',
  villageType: 'hyper',
  position: move.right(savage75.position, VILLAGE_OFFSET),
  attachedTo: savage75.id as SavageZoneId,
  actions: [],
  minLevel: 80,
  arena: {
    get arena() { return arena80 },
    completed: false,
  },
  village: {
    shop: {
      items: [
        potion,
        superPotion,
        hyperPotion,
        defensePotion,
        superDefensePotion,
        hyperDefensePotion,
        attackPotion,
        superAttackPotion,
        hyperAttackPotion,
        vitalityPotion,
        superVitalityPotion,
        hyperVitalityPotion,
        xpPotion,
        superXpPotion,
        hyperXpPotion,
        capturePotion,
        superCapturePotion,
        hyperCapturePotion,
        shlageball,
        superShlageball,
        hyperShlageball,
        ultraSteroid,
      ],
    },
  },
  miniGame: 'shlagmind',
}
