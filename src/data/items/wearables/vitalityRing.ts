import type { WearableItem } from '~/type/item'

export const vitalityRing: WearableItem = {
  id: 'vitality-ring',
  name: 'data.items.wearables.vitalityRing.vitalityRing.name',
  description: 'data.items.wearables.vitalityRing.vitalityRing.description',
  details: 'data.items.wearables.vitalityRing.vitalityRing.details',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:diamond-ring',
  iconClass: 'text-violet-500 dark:text-violet-400',
  unique: true,
  wearable: true,
  effectType: 'vitality',
  percent: 15,
}

export const advancedVitalityRing: WearableItem = {
  id: 'advanced-vitality-ring',
  name: 'data.items.wearables.vitalityRing.advancedVitalityRing.name',
  description: 'data.items.wearables.vitalityRing.advancedVitalityRing.description',
  details: 'data.items.wearables.vitalityRing.advancedVitalityRing.details',
  price: 50,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-violet-600 dark:text-violet-500',
  unique: true,
  wearable: true,
  effectType: 'vitality',
  percent: 25,
}

export const vitalityAmulet: WearableItem = {
  id: 'vitality-amulet',
  name: 'data.items.wearables.vitalityRing.vitalityAmulet.name',
  description: 'data.items.wearables.vitalityRing.vitalityAmulet.description',
  details: 'data.items.wearables.vitalityRing.vitalityAmulet.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-violet-700 dark:text-violet-600',
  unique: true,
  wearable: true,
  effectType: 'vitality',
  percent: 33,
}

export const vitalityWearables = [
  vitalityRing,
  advancedVitalityRing,
  vitalityAmulet,
] as const satisfies WearableItem[]
