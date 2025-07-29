import type { WearableItem } from '~/type/item'

export const defenseRing: WearableItem = {
  id: 'defense-ring',
  name: 'data.items.wearables.defenseRing.defenseRing.name',
  description: 'data.items.wearables.defenseRing.defenseRing.description',
  details: 'data.items.wearables.defenseRing.defenseRing.details',
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
  name: 'data.items.wearables.defenseRing.advancedDefenseRing.name',
  description: 'data.items.wearables.defenseRing.advancedDefenseRing.description',
  details: 'data.items.wearables.defenseRing.advancedDefenseRing.details',
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
  name: 'data.items.wearables.defenseRing.defenseAmulet.name',
  description: 'data.items.wearables.defenseRing.defenseAmulet.description',
  details: 'data.items.wearables.defenseRing.defenseAmulet.details',
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
