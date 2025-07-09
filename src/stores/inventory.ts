import type { Item } from '~/type/item'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { allItems } from '~/data/items/items'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from './achievements'
import { useArenaStore } from './arena'
import { useGameStore } from './game'
import { useShlagedexStore } from './shlagedex'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<Record<string, number>>({})
  const game = useGameStore()
  const dex = useShlagedexStore()
  const arena = useArenaStore()

  interface ListedItem {
    item: Item
    qty: number
  }

  const list = computed(() =>
    Object.entries(items.value).reduce<ListedItem[]>((acc, [id, qty]) => {
      const item = allItems.find(i => i.id === id)
      if (item)
        acc.push({ item, qty })
      return acc
    }, []),
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

  function buy(id: string, qty = 1) {
    const item = allItems.find(i => i.id === id)
    if (!item)
      return false
    if (item.unique && (items.value[id] || dex.shlagemons.some(m => m.heldItemId === id)))
      return false
    const cost = item.price * qty
    if (item.currency === 'shlagidiamond') {
      if (game.shlagidiamond < cost)
        return false
      game.addShlagidiamond(-cost)
    }
    else {
      if (game.shlagidolar < cost)
        return false
      game.addShlagidolar(-cost)
    }
    add(id, qty)
    return true
  }

  function sell(id: string) {
    const item = allItems.find(i => i.id === id)
    if (!item || !items.value[id])
      return
    remove(id)
    game.addShlagidolar(Math.floor(item.price / 2))
  }

  function useItem(id: string) {
    if (arena.inBattle || !items.value[id])
      return false
    notifyAchievement({ type: 'item-used' })
    if (id === 'potion') {
      dex.healActive(50)
      remove(id)
      return true
    }
    if (id === 'defense-potion') {
      dex.boostDefense(10, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'super-defense-potion') {
      dex.boostDefense(25, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'hyper-defense-potion') {
      dex.boostDefense(50, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'attack-potion') {
      dex.boostAttack(10, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'super-attack-potion') {
      dex.boostAttack(25, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'hyper-attack-potion') {
      dex.boostAttack(50, allItems.find(i => i.id === id)?.icon, allItems.find(i => i.id === id)?.iconClass)
      remove(id)
      return true
    }
    if (id === 'super-potion') {
      dex.healActive(100)
      remove(id)
      return true
    }
    if (id === 'hyper-potion') {
      dex.healActive(200)
      remove(id)
      return true
    }
    if (id === 'shlageball'
      || id === 'super-shlageball'
      || id === 'hyper-shlageball') {
      // simple capture of random shlagemon
      const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
      const mon = dex.captureShlagemon(base)
      notifyAchievement({ type: 'capture', shiny: mon.isShiny })
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
