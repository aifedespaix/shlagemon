import type { Item } from '~/type/item'

export const vitalityRing: Item = {
  id: 'vitality-ring',
  name: 'Bague Vitalesque',
  description: 'Augmente les PV max du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente ses PV maximum de 15%. Effet cumulable avec les potions de vitalité.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-violet-500 dark:text-violet-400',
  unique: true,
  wearable: true,
}

export const advancedVitalityRing: Item = {
  id: 'advanced-vitality-ring',
  name: 'Bague Vitalesque avancée',
  description: 'Augmente fortement les PV max du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente ses PV maximum de 25%. Effet cumulable avec les potions de vitalité.',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-violet-600 dark:text-violet-500',
  unique: true,
  wearable: true,
}

export const vitalityAmulet: Item = {
  id: 'vitality-amulet',
  name: 'Amulette Vitalesque',
  description: 'Augmente grandement les PV max du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente ses PV maximum de 33%. Effet cumulable avec les potions de vitalité.',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-violet-700 dark:text-violet-600',
  unique: true,
  wearable: true,
}

export const vitalityWearables = [
  vitalityRing,
  advancedVitalityRing,
  vitalityAmulet,
] as const satisfies Item[]
