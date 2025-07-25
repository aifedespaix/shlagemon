import type { Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
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
  position: move.bottom(savage75.position, VILLAGE_OFFSET),
  attachedTo: savage75.id,
  actions: [],
  minLevel: 80,
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
