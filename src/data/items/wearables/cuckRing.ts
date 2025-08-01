import type { Item } from '~/type/item'

export const cuckRing: Item = {
  id: 'cuck-ring',
  name: 'data.items.wearables.cuckRing.name',
  description: 'data.items.wearables.cuckRing.description',
  details: 'data.items.wearables.cuckRing.details',
  price: 150,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:ring',
  iconClass: 'text-violet-500 dark:text-violet-400',
  unique: true,
  wearable: true,
}

export const cuckWearables = [cuckRing] as const
