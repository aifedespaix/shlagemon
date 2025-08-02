import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  defibrillator,
  hyperCapturePotion,
  lighter,
  pissBottle,
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
} from '~/data/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { savage45 } from '../savages/45-catacombes-merdifientes'

export const village50: Zone = {
  id: 'village-caca-boudin',
  name: 'Village Fiente-sur-Mer',
  type: 'village',
  villageType: 'super',
  position: move.top(savage45.position, VILLAGE_OFFSET),
  mapCenter: { lat: 0, lng: 0 },
  attachedTo: savage45.id as SavageZoneId,
  actions: [],
  minLevel: 50,
  pois: [
    {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: 0, lng: 0 },
      icon: 'i-carbon-shop',
    },
    {
      id: 'arena',
      type: 'arena',
      label: 'Arène des Flageolets',
      position: { lat: 10, lng: 5 },
      icon: 'i-carbon-trophy',
    },
    {
      id: 'minigame-xxx',
      type: 'minigame',
      label: 'Mini-jeu xxx',
      position: { lat: -10, lng: -5 },
      icon: 'i-carbon-game-console',
    },
  ],
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
        lighter,
        pissBottle,
        defibrillator,
      ],
    },
    poulailler: {
      icon: 'i-game-icons:bird-house',
    },
  },
  miniGame: 'taquin',
}
