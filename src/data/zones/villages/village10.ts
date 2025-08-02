import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  potion,
  vitalityPotion,
  xpPotion,
} from '~/data/items'
import { shlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { savage05 } from '../savages/05-bois-de-bouffon'

export const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  villageType: 'basic',
  position: move.top(savage05.position, VILLAGE_OFFSET),
  map: {
    center: { lat: -128.3159249148255, lng: 127.4328236465197 },
    min: { lat: -68.58182967755516, lng: 12.569215081433299 },
    max: { lat: -223.8693257092728, lng: 230.550003014107 },
  },
  attachedTo: savage05.id as SavageZoneId,
  minLevel: 10,
  pois: [
    {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: -146.07951922399792, lng: 120.74474410140175 },
      icon: 'i-carbon-money',
    },
  ],
  actions: [],
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
      ],
    },
  },
}
