import type { EggType } from './egg'
import type { ItemId } from '~/data/items'
import { defineStore } from 'pinia'

export const eggIds = ['oeuf-feu', 'oeuf-eau', 'oeuf-herbe', 'oeuf-psy', 'oeuf-foudre'] as const
export type EggItemId = typeof eggIds[number]

/**
 * Represents a single breeding egg stored in the player's egg box.
 */
export interface BreedingEggItem {
  /** Unique identifier used for tracking and removal. */
  readonly id: string
  /** Identifier of the Shlagémon that will hatch from the egg. */
  readonly monId: string
  /** Primary type driving the egg color. */
  readonly type: EggType
  /** Forced rarity applied when the egg hatches. */
  readonly rarity: number
}

export const useEggBoxStore = defineStore('eggBox', () => {
  const unlocked = ref(false)
  const eggs = ref<Partial<Record<EggItemId, number>>>({})
  const breeding = ref<BreedingEggItem[]>([])
  const isModalOpen = ref(false)

  function open() {
    isModalOpen.value = true
  }

  function close() {
    isModalOpen.value = false
  }

  function addEgg(id: EggItemId, qty = 1) {
    eggs.value[id] = (eggs.value[id] || 0) + qty
  }

  function removeEgg(id: EggItemId, qty = 1) {
    if (!eggs.value[id])
      return
    eggs.value[id]! -= qty
    if (eggs.value[id]! <= 0)
      delete eggs.value[id]
  }

  /**
   * Add a new breeding egg to the box.
   */
  function addBreedingEgg(monId: string, type: EggType, rarity: number) {
    breeding.value.push({
      id: `${Date.now()}-${Math.random()}`,
      monId,
      type,
      rarity,
    })
  }

  /**
   * Remove a breeding egg by its identifier.
   */
  function removeBreedingEgg(id: string) {
    const idx = breeding.value.findIndex(e => e.id === id)
    if (idx !== -1)
      breeding.value.splice(idx, 1)
  }

  function importFromInventory(items: MaybeRef<Partial<Record<ItemId, number>>>) {
    const source = unref(items)
    for (const id of eggIds) {
      const count = source[id]
      if (count && count > 0) {
        addEgg(id, count)
        delete source[id]
      }
    }
  }

  function unlock() {
    unlocked.value = true
  }

  function reset() {
    unlocked.value = false
    eggs.value = {}
    breeding.value = []
    isModalOpen.value = false
  }

  return {
    unlocked,
    eggs,
    breeding,
    isModalOpen,
    open,
    close,
    addEgg,
    removeEgg,
    addBreedingEgg,
    removeBreedingEgg,
    importFromInventory,
    unlock,
    reset,
  }
}, {
  persist: {
    pick: ['unlocked', 'eggs', 'breeding'],
  },
})
