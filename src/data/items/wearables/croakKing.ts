import type { Item } from '~/type/item'

/**
 * Croak King is a unique wearable that protects shiny foes
 * by leaving them at 1 HP instead of knocking them out.
 */
export const croakKing: Item = {
  id: 'croak-king',
  name: 'data.items.wearables.croakKing.name',
  description: 'data.items.wearables.croakKing.description',
  details: 'data.items.wearables.croakKing.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:frog-prince',
  iconClass: 'text-green-500 dark:text-green-400',
  unique: true,
  wearable: true,
}

export const croakWearables = [croakKing] as const
