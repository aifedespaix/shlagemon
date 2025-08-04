import type { Item } from '~/type/item'

export const frogKing: Item = {
  id: 'frog-king',
  name: 'data.items.wearables.frogKing.name',
  description: 'data.items.wearables.frogKing.description',
  details: 'data.items.wearables.frogKing.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:frog-prince',
  iconClass: 'text-yellow-500 dark:text-yellow-400',
  unique: true,
  wearable: true,
}

export const frogWearables = [frogKing] as const
