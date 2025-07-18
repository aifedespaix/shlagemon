import type { Item } from '~/type/item'

export const xpRing: Item = {
  id: 'xp-ring',
  name: 'Anneau d\'expérience',
  description: 'Augmente l\'XP du porteur.',
  details:
    'Porté par un Shlagémon, il augmente l\'expérience gagnée en combat de 15%. Effet cumulable avec les potions d\'expérience.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-green-600 dark:text-green-400',
  unique: true,
  wearable: true,
}

export const advancedXpRing: Item = {
  id: 'advanced-xp-ring',
  name: 'Anneau d\'expérience avancé',
  description: 'Augmente fortement l\'XP du porteur.',
  details:
    'Porté par un Shlagémon, il augmente l\'expérience gagnée en combat de 25%. Effet cumulable avec les potions d\'expérience.',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-green-700 dark:text-green-500',
  unique: true,
  wearable: true,
}

export const xpAmulet: Item = {
  id: 'xp-amulet',
  name: 'Amulette d\'expérience',
  description: 'Augmente grandement l\'XP du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente l\'expérience gagnée en combat de 33%. Effet cumulable avec les potions d\'expérience.',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-green-800 dark:text-green-600',
  unique: true,
  wearable: true,
}

export const xpWearables = [xpRing, advancedXpRing, xpAmulet] as const satisfies Item[]
