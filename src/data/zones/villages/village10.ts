import type { Zone } from '~/type'
import { attackPotion, defensePotion, potion, vitalityPotion } from '~/data/items/items'
import { shlageball } from '~/data/items/shlageball'

export const village10: Zone = {
  id: 'village-veaux-du-gland',
  name: 'Veaux du Gland sur Marne',
  type: 'village',
  minLevel: 10,
  actions: [],
  village: {
    shop: {
      items: [potion, defensePotion, attackPotion, vitalityPotion, shlageball],
    },
  },
}
