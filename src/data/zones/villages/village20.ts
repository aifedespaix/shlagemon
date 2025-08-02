import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  potion,
  specialPotion,
  vitalityPotion,
  xpPotion,
} from '~/data/items'
import { shlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { arena20 } from '../../arenas'
import { savage15 } from '../savages/15-ravin-fesse-molle'

export const village20: Zone = {
  id: 'village-boule',
  name: 'Village Sux-Mais-Bouls',
  type: 'village',
  villageType: 'basic',
  position: move.bottom(savage15.position, VILLAGE_OFFSET),
  map: {
    center: { lat: -108.82683723294275, lng: 129.0780945055184 },
    min: { lat: -65.17799438678692, lng: 38.305163018997845 },
    max: { lat: -165.3373077053635, lng: 219.9377655671633 },
  },
  attachedTo: savage15.id as SavageZoneId,
  actions: [
    { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 20,
  pois: [
    {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: -123.0286330525291, lng: 94.55584198442665 },
      icon: 'i-carbon-shop',
    },
    {
      id: 'arena',
      type: 'arena',
      label: 'Arène du Village',
      position: { lat: -95.74953852889057, lng: 154.42777039911124 },
      icon: 'i-carbon-trophy',
    },
    {
      id: 'minigame',
      type: 'minigame',
      label: 'Mini-jeu',
      position: { lat: -113.82454584408723, lng: 69.16446745959803 },
      icon: 'i-carbon-game-console',
    },
  ],
  arena: {
    get arena() { return arena20 },
    completed: false,
  },
  village: {
    shop: {
      items: [
        potion,
        defensePotion,
        attackPotion,
        vitalityPotion,
        xpPotion,
        capturePotion,
        shlageball,
        specialPotion,
      ],
    },
  },
  miniGame: 'tictactoe',
}
