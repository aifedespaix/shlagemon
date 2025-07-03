import type { Shop } from '~/type'
import {
  defensePotion,
  hyperPotion,
  potion,
  superPotion,
} from './items/items'
import { hyperShlageball, shlageball, superShlageball } from './items/shlageball'

export const shops: Shop[] = [
  {
    id: 'village-veaux-du-gland',
    level: 10,
    items: [potion, defensePotion, shlageball],
  },
  {
    id: 'village-boule',
    level: 25,
    items: [potion, superPotion, superShlageball, shlageball],
  },
  {
    id: 'village-paume',
    level: 50,
    items: [hyperPotion, hyperShlageball],
  },
]

export function getShop(id: string): Shop | undefined {
  return shops.find(s => s.id === id)
}
