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
  image?: string
}

export interface InventoryEntry {
  itemId: string
  qty: number
}
