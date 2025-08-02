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
  map: {
    center: { lat: -128.86990141619194, lng: 127.53694175172706 },
    min: { lat: -14.990000281498553, lng: 59.272751738277265 },
    max: { lat: -240.1074661467385, lng: 227.54806801227295 },
  },
  attachedTo: savage45.id as SavageZoneId,
  actions: [],
  minLevel: 50,
  pois: [
    {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: -90.42928956259831, lng: 157.01426300421073 },
      icon: 'i-carbon-shop',
    },
    {
      id: 'arena',
      type: 'arena',
      label: 'Arène des Flageolets',
      position: { lat: -164.06202154659638, lng: 156.93085810742366 },
      icon: 'i-carbon-trophy',
    },
    {
      id: 'minigame',
      type: 'minigame',
      label: 'Mini-jeu',
      position: { lat: -34.5505474676239, lng: 173.4937918691157 },
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
