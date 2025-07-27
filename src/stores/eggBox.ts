import type { ItemId } from '~/data/items'
import { defineStore } from 'pinia'

export const eggIds = ['oeuf-feu', 'oeuf-eau', 'oeuf-herbe', 'oeuf-psy', 'oeuf-foudre'] as const
export type EggItemId = typeof eggIds[number]

export const useEggBoxStore = defineStore('eggBox', () => {
  const unlocked = ref(false)
  const eggs = ref<Partial<Record<EggItemId, number>>>({})
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

  function importFromInventory(items: Partial<Record<ItemId, number>>) {
    for (const id of eggIds) {
      const count = items[id]
      if (count && count > 0) {
        addEgg(id, count)
        delete items[id]
      }
    }
  }

  function unlock() {
    unlocked.value = true
  }

  function reset() {
    unlocked.value = false
    eggs.value = {}
    isModalOpen.value = false
  }

  return { unlocked, eggs, isModalOpen, open, close, addEgg, removeEgg, importFromInventory, unlock, reset }
}, {
  persist: true,
})
