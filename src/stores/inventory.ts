import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { shopItems } from '~/data/items'
import { allShlagemons } from '~/data/shlagemons'
import { useGameStore } from './game'
import { useShlagedexStore } from './shlagedex'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<Record<string, number>>({})
  const game = useGameStore()
  const dex = useShlagedexStore()

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

  function useItem(id: string) {
    if (!items.value[id])
      return false
    if (id === 'potion') {
      dex.healActive(50)
      remove(id)
      return true
    }
    if (id === 'spray') {
      dex.boostDefense(5)
      remove(id)
      return true
    }
    if (id === 'shlageball') {
      // simple capture of random shlagemon
      const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
      dex.createShlagemon(base)
      remove(id)
      return true
    }
    return false
  }

  function reset() {
    items.value = {}
  }

  return { items, list, add, remove, buy, sell, useItem, reset }
}, {
  persist: true,
})
