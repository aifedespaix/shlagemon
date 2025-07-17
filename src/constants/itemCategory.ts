import type { ItemCategory } from '~/type/item'

export const itemCategoryTabColors: Record<ItemCategory, string> = {
  actif: 'bg-red-200 dark:bg-red-700',
  passif: 'bg-green-200 dark:bg-green-700',
  utilitaire: 'bg-yellow-200 dark:bg-yellow-700',
}

export const itemCategoryPanelColors: Record<ItemCategory, string> = {
  actif: 'bg-red-50 dark:bg-red-900/20',
  passif: 'bg-green-50 dark:bg-green-900/20',
  utilitaire: 'bg-yellow-50 dark:bg-yellow-900/20',
}
