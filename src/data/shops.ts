import type { Shop } from '~/type'
import {
  attackPotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  hyperVitalityPotion,
  multiExp,
  potion,
  superAttackPotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  thunderStone,
  vitalityPotion,
  xpPotion,
} from './items/items'
import { hyperShlageball, shlageball, superShlageball } from './items/shlageball'

export const shops: Shop[] = [
  {
    id: 'village-veaux-du-gland',
    level: 10,
    items: [potion, defensePotion, attackPotion, vitalityPotion, shlageball],
  },
  {
    id: 'village-boule',
    level: 25,
    items: [potion, xpPotion, superPotion, superDefensePotion, superAttackPotion, superVitalityPotion, superShlageball, shlageball, thunderStone],
  },
  {
    id: 'village-paume',
    level: 50,
    items: [hyperPotion, hyperDefensePotion, hyperAttackPotion, hyperVitalityPotion, hyperShlageball, multiExp],
  },
]

export function getShop(id: string): Shop | undefined {
  return shops.find(s => s.id === id)
}
