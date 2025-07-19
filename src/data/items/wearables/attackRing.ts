import type { WearableItem } from '~/type/item'

export const attackRing: WearableItem = {
  id: 'attack-ring',
  name: 'Bague d\'attaque',
  description: 'Augmente l\'attaque du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente son attaque de 15%. Effet cumulable avec les potions d\'attaque.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-orange-500 dark:text-orange-400',
  unique: true,
  wearable: true,
  effectType: 'attack',
  percent: 15,
}

export const advancedAttackRing: WearableItem = {
  id: 'advanced-attack-ring',
  name: 'Bague d\'attaque avancée',
  description: 'Augmente fortement l\'attaque du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente son attaque de 25%. Effet cumulable avec les potions d\'attaque.',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-orange-600 dark:text-orange-500',
  unique: true,
  wearable: true,
  effectType: 'attack',
  percent: 25,
}

export const attackAmulet: WearableItem = {
  id: 'attack-amulet',
  name: 'Amulette d\'attaque',
  description: 'Augmente grandement l\'attaque du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente son attaque de 33%. Effet cumulable avec les potions d\'attaque.',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-orange-700 dark:text-orange-600',
  unique: true,
  wearable: true,
  effectType: 'attack',
  percent: 33,
}

export const attackWearables = [attackRing, advancedAttackRing, attackAmulet] as const satisfies WearableItem[]
