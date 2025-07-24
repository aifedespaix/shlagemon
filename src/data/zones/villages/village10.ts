import type { Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  potion,
  vitalityPotion,
  xpPotion,
} from '~/data/items/items'
import { shlageball } from '~/data/items/shlageball'
import { savage05 } from '../savages/05-bois-de-bouffon'

export const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  position: { lat: savage05.position.lat, lng: savage05.position.lng + VILLAGE_OFFSET },
  minLevel: 10,
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
