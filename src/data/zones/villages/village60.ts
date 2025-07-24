import type { Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  potion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  vitalityPotion,
  xpPotion,
} from '~/data/items/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { arena60 } from '../../arenas'
import { savage55 } from '../savages/55-vallee-des-chieurs'

export const village60: Zone = {
  id: 'village-cassos-land',
  name: 'Village des Cassos',
  type: 'village',
  position: { lat: savage55.position.lat, lng: savage55.position.lng + VILLAGE_OFFSET },
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
      ],
    },
  },
  miniGame: 'connectfour',
}
