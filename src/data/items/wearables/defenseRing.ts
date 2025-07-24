import type { WearableItem } from '~/type/item'

export const defenseRing: WearableItem = {
  id: 'defense-ring',
  nameKey: 'data.items.wearables.defenseRing.defenseRing.name',
  name: 'Bague de défense',
  descriptionKey: 'data.items.wearables.defenseRing.defenseRing.description',
  description: 'Augmente la défense du porteur.',
  detailsKey: 'data.items.wearables.defenseRing.defenseRing.details',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 15%. Effet cumulable avec les potions de défense.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-blue-500 dark:text-blue-400',
  unique: true,
  wearable: true,
  effectType: 'defense',
  percent: 15,
}

export const advancedDefenseRing: WearableItem = {
  id: 'advanced-defense-ring',
  nameKey: 'data.items.wearables.defenseRing.advancedDefenseRing.name',
  name: 'Bague de défense avancée',
  descriptionKey: 'data.items.wearables.defenseRing.advancedDefenseRing.description',
  description: 'Augmente fortement la défense du porteur.',
  detailsKey: 'data.items.wearables.defenseRing.advancedDefenseRing.details',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 25%. Effet cumulable avec les potions de défense.',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-blue-600 dark:text-blue-500',
  unique: true,
  wearable: true,
  effectType: 'defense',
  percent: 25,
}

export const defenseAmulet: WearableItem = {
  id: 'defense-amulet',
  nameKey: 'data.items.wearables.defenseRing.defenseAmulet.name',
  name: 'Amulette de défense',
  descriptionKey: 'data.items.wearables.defenseRing.defenseAmulet.description',
  description: 'Augmente grandement la défense du porteur.',
  detailsKey: 'data.items.wearables.defenseRing.defenseAmulet.details',
  details:
    'Portée par un Shlagémon, elle augmente sa défense de 33%. Effet cumulable avec les potions de défense.',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-blue-700 dark:text-blue-600',
  unique: true,
  wearable: true,
  effectType: 'defense',
  percent: 33,
}

export const defenseWearables = [defenseRing, advancedDefenseRing, defenseAmulet] as const satisfies WearableItem[]
