import type { WearableItem } from '~/type/item'

export const attackRing: WearableItem = {
  id: 'attack-ring',
  name: 'data.items.wearables.attackRing.attackRing.name',
  description: 'data.items.wearables.attackRing.attackRing.description',
  details: 'data.items.wearables.attackRing.attackRing.details',
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
  name: 'data.items.wearables.attackRing.advancedAttackRing.name',
  description: 'data.items.wearables.attackRing.advancedAttackRing.description',
  details: 'data.items.wearables.attackRing.advancedAttackRing.details',
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
  name: 'data.items.wearables.attackRing.attackAmulet.name',
  description: 'data.items.wearables.attackRing.attackAmulet.description',
  details: 'data.items.wearables.attackRing.attackAmulet.details',
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
