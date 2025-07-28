import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  mysteriousPotion,
  potion,
  specialPotion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  vitalityPotion,
  xpPotion,
} from '~/data/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { arena60 } from '../../arenas'
import { savage55 } from '../savages/55-vallee-des-chieurs'

export const village60: Zone = {
  id: 'village-cassos-land',
  name: 'Village des Cassos',
  type: 'village',
  villageType: 'hyper',
  position: move.top(savage55.position, VILLAGE_OFFSET),
  attachedTo: savage55.id as SavageZoneId,
  actions: [
    { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 60,
  arena: {
    get arena() { return arena60 },
    completed: false,
  },
  village: {
    shop: {
      items: [
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
        hyperPotion,
        hyperAttackPotion,
        hyperDefensePotion,
        specialPotion,
        mysteriousPotion,
      ],
    },
  },
  miniGame: 'connectfour',
}
