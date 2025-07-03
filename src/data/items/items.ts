import type { Item } from '~/type/item'
import { balls } from './shlageball'

export const shopItems: Item[] = [
  ...balls,
  {
    id: 'potion',
    name: 'Potion Dégueulasse',
    description: 'Soigne 50 HP de votre Shlagémon.',
    details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
    price: 5,
  },
  {
    id: 'spray',
    name: 'Spray Anti-Odeur',
    description: 'Augmente temporairement la défense.',
    details: 'Un aérosol étrange qui renforce brièvement la défense de votre Shlagémon actif.',
    price: 7,
  },
]
