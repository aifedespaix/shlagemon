import type { Shop } from '~/type'
import {
  attackPotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  potion,
  superAttackPotion,
  superDefensePotion,
  superPotion,
  thunderStone,
} from './items/items'
import { hyperShlageball, shlageball, superShlageball } from './items/shlageball'

export const shops: Shop[] = [
  {
    id: 'village-veaux-du-gland',
    level: 10,
    items: [potion, defensePotion, attackPotion, shlageball],
  },
  {
    id: 'village-boule',
    level: 25,
    items: [potion, superPotion, superDefensePotion, superAttackPotion, superShlageball, shlageball, thunderStone],
  },
  {
    id: 'village-paume',
    level: 50,
    items: [hyperPotion, hyperDefensePotion, hyperAttackPotion, hyperShlageball],
  },
]

export function getShop(id: string): Shop | undefined {
  return shops.find(s => s.id === id)
}
