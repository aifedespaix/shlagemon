import type { Item } from '~/type/item'

export const shopItems: Item[] = [
  {
    id: 'shlageball',
    name: 'Shlage Ball',
    description: 'Permet de capturer des Shlagémons sauvages.',
    price: 10,
    image: '/items/shlageball/shlageball.png',
  },
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
