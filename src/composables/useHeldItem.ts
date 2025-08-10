import type { Ref } from 'vue'
import type { Item } from '~/type/item'
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items'

/**
 * Resolves the held item for a given shlagemon.
 */
export function useHeldItem(mon: Ref<DexShlagemon>) {
  return computed<Item | null>(() => {
    const id = mon.value.heldItemId
    return id ? allItems.find(i => i.id === id) ?? null : null
  })
}
