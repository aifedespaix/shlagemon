import type { I18nKey } from './i18n'

export type ItemCurrency = 'shlagidolar' | 'shlagidiamond' | 'shlagpur'

export type ItemCategory = 'actif' | 'passif' | 'utilitaire' | 'activable' | 'battle'

interface ItemBase {
  id: string
  name: I18nKey
  description: I18nKey
  /**
   * Detailed explanation of how the item works.
   * When not provided, `description` will be used instead.
   */
  details?: I18nKey
  /** Parameters for the `description` i18n key. */
  descriptionParams?: Record<string, unknown>
  /** Parameters for the `details` i18n key. */
  detailsParams?: Record<string, unknown>
  price?: number
  /** Currency used to buy this item. Defaults to shlagidolar. */
  currency?: ItemCurrency
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

export interface ItemBattle extends ItemBase {
  category: 'battle'
  /** Cooldown in seconds shared with all battle items. */
  battleCooldown: number
}

export interface ItemStandard extends ItemBase {
  category?: Exclude<ItemCategory, 'battle'>
}

export type Item = ItemStandard | ItemBattle

export interface WearableItem extends ItemStandard {
  effectType: 'attack' | 'defense' | 'vitality' | 'xp'
  percent: number
}

export interface InventoryEntry {
  itemId: string
  qty: number
}
