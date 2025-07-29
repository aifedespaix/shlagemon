import type { WearableItem } from '~/type/item'

export const xpRing: WearableItem = {
  id: 'xp-ring',
  name: 'data.items.wearables.xpRing.xpRing.name',
  description: 'data.items.wearables.xpRing.xpRing.description',
  details: 'data.items.wearables.xpRing.xpRing.details',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-green-600 dark:text-green-400',
  unique: true,
  wearable: true,
  effectType: 'xp',
  percent: 15,
}

export const advancedXpRing: WearableItem = {
  id: 'advanced-xp-ring',
  name: 'data.items.wearables.xpRing.advancedXpRing.name',
  description: 'data.items.wearables.xpRing.advancedXpRing.description',
  details: 'data.items.wearables.xpRing.advancedXpRing.details',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-green-700 dark:text-green-500',
  unique: true,
  wearable: true,
  effectType: 'xp',
  percent: 25,
}

export const xpAmulet: WearableItem = {
  id: 'xp-amulet',
  name: 'data.items.wearables.xpRing.xpAmulet.name',
  description: 'data.items.wearables.xpRing.xpAmulet.description',
  details: 'data.items.wearables.xpRing.xpAmulet.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-green-800 dark:text-green-600',
  unique: true,
  wearable: true,
  effectType: 'xp',
  percent: 33,
}

export const xpWearables = [xpRing, advancedXpRing, xpAmulet] as const satisfies WearableItem[]
