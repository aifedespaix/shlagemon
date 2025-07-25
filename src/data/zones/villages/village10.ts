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
import { move } from '~/utils/position'
import { savage05 } from '../savages/05-bois-de-bouffon'

export const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  position: move.bottom(savage05.position, VILLAGE_OFFSET),
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
