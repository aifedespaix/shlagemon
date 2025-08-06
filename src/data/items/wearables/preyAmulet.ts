import type { Item } from '~/type/item'

/**
 * Mister Croak prevents its bearer from knocking out foes.
 */
export const preyAmulet: Item = {
  id: 'prey-amulet',
  name: 'data.items.wearables.preyAmulet.name',
  description: 'data.items.wearables.preyAmulet.description',
  details: 'data.items.wearables.preyAmulet.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:frog',
  iconClass: 'text-green-600 dark:text-green-500',
  unique: true,
  wearable: true,
}

export const preyWearables = [preyAmulet] as const
