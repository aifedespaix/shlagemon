import type { Item } from '~/type/item'
import { balls } from './shlageball'

export const shopItems: Item[] = [
  ...balls,
  {
    id: 'potion',
    name: 'Potion Dégueulasse',
    description: 'Soigne 50 HP de votre Shlagémon.',
    price: 5,
  },
  {
    id: 'spray',
    name: 'Spray Anti-Odeur',
    description: 'Augmente temporairement la défense.',
    price: 7,
  },
]
