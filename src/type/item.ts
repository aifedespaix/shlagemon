export interface Item {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export interface InventoryEntry {
  itemId: string
  qty: number
}
