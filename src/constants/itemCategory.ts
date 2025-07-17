import type { ItemCategory } from '~/type/item'

export const itemCategoryTabColors: Record<ItemCategory, string> = {
  actif: 'bg-red-100 dark:bg-red-900/40',
  passif: 'bg-green-100 dark:bg-green-900/40',
  utilitaire: 'bg-yellow-100 dark:bg-yellow-900/40',
}

export const itemCategoryTabBaseColors: Record<ItemCategory, string> = {
  actif: 'bg-red-50 dark:bg-red-900/20',
  passif: 'bg-green-50 dark:bg-green-900/20',
  utilitaire: 'bg-yellow-50 dark:bg-yellow-900/20',
}

export const itemCategoryTabHoverColors: Record<ItemCategory, string> = {
  actif: 'hover:bg-red-200 dark:hover:bg-red-700',
  passif: 'hover:bg-green-200 dark:hover:bg-green-700',
  utilitaire: 'hover:bg-yellow-200 dark:hover:bg-yellow-700',
}

export const itemCategoryPanelColors: Record<ItemCategory, string> = {
  actif: 'bg-red-50 dark:bg-red-900/20',
  passif: 'bg-green-50 dark:bg-green-900/20',
  utilitaire: 'bg-yellow-50 dark:bg-yellow-900/20',
}
