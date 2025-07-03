import type { Item } from './item'

export interface Shop {
  id: string
  /** Minimum level required to access this shop */
  level: number
  items: Item[]
}
