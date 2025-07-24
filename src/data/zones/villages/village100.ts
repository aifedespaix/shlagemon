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
import { savage95 } from '../savages/95-cratere-des-legends'

export const village100: Zone = {
  id: 'village-giga-schlag',
  name: 'Citadelle Giga-Schlag',
  type: 'village',
  position: { lat: savage95.position.lat, lng: savage95.position.lng + VILLAGE_OFFSET },
  actions: [
    { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 100,
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
  miniGame: 'shlagpairs',
}
