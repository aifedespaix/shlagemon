import type { ItemCategory } from '~/type/item'

export const itemCategoryTabColors: Record<ItemCategory, string> = {
  actif: 'text-red-700 border-white/50',
  passif: 'text-green-700 border-white/50',
  utilitaire: 'text-orange-700 border-white/50',
  activable: 'text-fuchsia-700 border-white/50',
  battle: 'text-blue-700 border-white/50',
}

export const itemCategoryTabBaseColors: Record<ItemCategory, string> = {
  actif: '',
  passif: '',
  utilitaire: '',
  activable: '',
  battle: '',
}

export const itemCategoryTabHoverColors: Record<ItemCategory, string> = {
  actif: 'hover:bg-red-200 dark:hover:bg-red-700',
  passif: 'hover:bg-green-200 dark:hover:bg-green-700',
  utilitaire: 'hover:bg-yellow-200 dark:hover:bg-yellow-700',
  activable: 'hover:bg-fuchsia-200 dark:hover:bg-fuchsia-700',
  battle: 'hover:bg-blue-200 dark:hover:bg-blue-700',
}

export const itemCategoryPanelColors: Record<ItemCategory, string> = {
  actif: 'bg-red-50 dark:bg-red-900/20',
  passif: 'bg-green-50 dark:bg-green-900/20',
  utilitaire: 'bg-yellow-50 dark:bg-yellow-900/20',
  activable: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
  battle: 'bg-blue-50 dark:bg-blue-900/20',
}
