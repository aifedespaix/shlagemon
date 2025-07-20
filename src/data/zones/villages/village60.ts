import type { Zone } from '~/type'
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

export const village60: Zone = {
  id: 'village-cassos-land',
  name: 'Village des Cassos',
  type: 'village',
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
