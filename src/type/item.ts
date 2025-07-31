import type { I18nKey } from './i18n'

export type ItemCurrency = 'shlagidolar' | 'shlagidiamond'

export type ItemCategory = 'actif' | 'passif' | 'utilitaire' | 'activable'

export interface Item {
  id: string
  name: I18nKey
  description: I18nKey
  /**
   * Detailed explanation of how the item works.
   * When not provided, `description` will be used instead.
   */
  details?: I18nKey
  price?: number
  /** Currency used to buy this item. Defaults to shlagidolar. */
  currency?: ItemCurrency
  /** Sub-category used to filter items in the UI */
  category?: ItemCategory
  /** Category of the item (consumable, ball, evolution...). */
  type?: string
  /** Numeric value describing the item's power. */
  power?: number
  /** Iconify icon name */
  icon?: string
  /** UnoCSS classes applied to the icon */
  iconClass?: string
  image?: string
  /** When true, only one instance can be owned */
  unique?: boolean
  /** Whether this item can be equipped by a Shlagémon */
  wearable?: boolean
  /** Identifier of the sound effect played when the item is used */
  sfxId?: import('~/data/sfx').SfxId
}

export interface WearableItem extends Item {
  effectType: 'attack' | 'defense' | 'vitality' | 'xp'
  percent: number
}

export interface InventoryEntry {
  itemId: string
  qty: number
}
