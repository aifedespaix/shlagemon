export type ItemCurrency = 'shlagidolar' | 'shlagidiamond'

export type ItemCategory = 'actif' | 'passif' | 'utilitaire'

export interface Item {
  id: string
  name: string
  description: string
  /**
   * Detailed explanation of how the item works.
   * When not provided, `description` will be used instead.
   */
  details?: string
  price: number
  /** Currency used to buy this item. Defaults to shlagidolar. */
  currency?: ItemCurrency
  /** Sub-category used to filter items in the UI */
  category?: ItemCategory
  /** Category of the item (consumable, ball, evolution...). */
  type?: string
  /** Iconify icon name */
  icon?: string
  /** UnoCSS classes applied to the icon */
  iconClass?: string
  image?: string
  /** When true, only one instance can be owned */
  unique?: boolean
  /** Whether this item can be equipped by a Shlagémon */
  wearable?: boolean
}

export interface InventoryEntry {
  itemId: string
  qty: number
}
