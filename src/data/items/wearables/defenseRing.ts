import type { Item } from '~/type/item'

export const defenseRing: Item = {
  id: 'defense-ring',
  name: 'Bague de défense',
  description: 'Augmente la défense du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 15%. Effet cumulable avec les potions de défense.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-blue-500 dark:text-blue-400',
  unique: true,
  wearable: true,
}

export const advancedDefenseRing: Item = {
  id: 'advanced-defense-ring',
  name: 'Bague de défense avancée',
  description: 'Augmente fortement la défense du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 25%. Effet cumulable avec les potions de défense.',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-blue-600 dark:text-blue-500',
  unique: true,
  wearable: true,
}

export const defenseAmulet: Item = {
  id: 'defense-amulet',
  name: 'Amulette de défense',
  description: 'Augmente grandement la défense du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 33%. Effet cumulable avec les potions de défense.',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-blue-700 dark:text-blue-600',
  unique: true,
  wearable: true,
}

export const defenseWearables = [defenseRing, advancedDefenseRing, defenseAmulet] as const satisfies Item[]
