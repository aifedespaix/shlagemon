import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { shopItems } from '~/data/items'
import { useGameStore } from './game'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<Record<string, number>>({})
  const game = useGameStore()

  const list = computed(() =>
    Object.entries(items.value).map(([id, qty]) => ({
      item: shopItems.find(i => i.id === id)!,
      qty,
    })),
  )

  function add(id: string, qty = 1) {
    items.value[id] = (items.value[id] || 0) + qty
  }

  function remove(id: string, qty = 1) {
    if (!items.value[id])
      return
    items.value[id] -= qty
    if (items.value[id] <= 0)
      delete items.value[id]
  }

  function buy(id: string) {
    const item = shopItems.find(i => i.id === id)
    if (!item || game.shlagidolar < item.price)
      return false
    game.addShlagidolar(-item.price)
    add(id)
    return true
  }

  function sell(id: string) {
    const item = shopItems.find(i => i.id === id)
    if (!item || !items.value[id])
      return
    remove(id)
    game.addShlagidolar(Math.floor(item.price / 2))
  }

  function reset() {
    items.value = {}
  }

  return { items, list, add, remove, buy, sell, reset }
}, {
  persist: true,
})
