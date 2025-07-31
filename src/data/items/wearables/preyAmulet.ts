import type { Item } from '~/type/item'

export const preyAmulet: Item = {
  id: 'prey-amulet',
  name: 'data.items.wearables.preyAmulet.name',
  description: 'data.items.wearables.preyAmulet.description',
  details: 'data.items.wearables.preyAmulet.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:necklace',
  iconClass: 'text-violet-600 dark:text-violet-500',
  unique: true,
  wearable: true,
}

export const preyWearables = [preyAmulet] as const
