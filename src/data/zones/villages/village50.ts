import type { Zone } from '~/type'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperCapturePotion,
  potion,
  steroids,
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

export const village50: Zone = {
  id: 'village-caca-boudin',
  name: 'Village Fiente-sur-Mer',
  type: 'village',
  position: { lat: 41, lng: -52 },
  actions: [],
  minLevel: 50,
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
        hyperCapturePotion,
        steroids,
      ],
    },
    poulailler: {
      icon: 'i-game-icons:bird-house',
    },
  },
  miniGame: 'taquin',
}
