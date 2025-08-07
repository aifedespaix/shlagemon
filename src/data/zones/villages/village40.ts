import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  mysteriousPotion,
  potion,
  specialPotion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  thunderStone,
  vitalityPotion,
  xpPotion,
} from '~/data/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { savage35 } from '../savages/35-route-du-nawak'

export const village40: Zone = {
  id: 'village-paume',
  name: 'data.zones.villages.village40.name',
  type: 'village',
  villageType: 'super',
  position: move.top(savage35.position, VILLAGE_OFFSET),
  map: {
    center: { lat: -127.06984353481602, lng: 128.9771022802009 },
    min: { lat: -47.261887403464115, lng: 49.331635953771865 },
    max: { lat: -180.3130616319912, lng: 218.6204041725481 },
  },
  attachedTo: savage35.id as SavageZoneId,
  minLevel: 40,
  pois: {
    shop: {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: -114.23873372627645, lng: 141.84235428026966 },
      items: [
        thunderStone,
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
        specialPotion,
        mysteriousPotion,
      ],
    },
    arena: {
      id: 'arena',
      type: 'arena',
      label: 'Arène du Village',
      position: { lat: -92.54040358702598, lng: 106.11098650533404 },
    },
    minigame: {
      id: 'minigame',
      type: 'minigame',
      label: 'Mini-jeu',
      position: { lat: -133.93798499659755, lng: 190.74887868514963 },
      miniGame: 'battleship',
    },
  },
}
