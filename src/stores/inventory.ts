import type { Item } from '~/type/item'
import { defineStore } from 'pinia'
import { allItems } from '~/data/items/items'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from './achievements'
import { useArenaStore } from './arena'
import { useCaptureLimitModalStore } from './captureLimitModal'
import { useFeatureLockStore } from './featureLock'
import { useGameStore } from './game'
import { useItemUsageStore } from './itemUsage'
import { usePlayerStore } from './player'
import { useShlagedexStore } from './shlagedex'
import { useTrainerBattleStore } from './trainerBattle'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<Record<string, number>>({})
  const game = useGameStore()
  const dex = useShlagedexStore()
  const _arena = useArenaStore()
  const _trainerBattle = useTrainerBattleStore()
  const featureLock = useFeatureLockStore()
  const player = usePlayerStore()
  const captureLimitModal = useCaptureLimitModalStore()
  const itemUsage = useItemUsageStore()

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
    if (featureLock.isInventoryLocked || !items.value[id])
      return false

    notifyAchievement({ type: 'item-used' })

    const item = allItems.find(i => i.id === id)
    if (!item)
      return false
    const { icon, iconClass } = item

    const capture = () => {
      const level = 1
      if (level > player.captureLevelCap) {
        captureLimitModal.open(level)
        return false
      }
      const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
      const mon = dex.captureShlagemon(base)
      notifyAchievement({ type: 'capture', shiny: mon.isShiny })
      remove(id)
      return true
    }

    const handlers: Record<string, () => boolean> = {
      'potion': () => {
        dex.healActive(50)
        remove(id)
        return true
      },
      'defense-potion': () => {
        dex.boostDefense(10, icon, iconClass)
        remove(id)
        return true
      },
      'super-defense-potion': () => {
        dex.boostDefense(25, icon, iconClass)
        remove(id)
        return true
      },
      'hyper-defense-potion': () => {
        dex.boostDefense(50, icon, iconClass)
        remove(id)
        return true
      },
      'attack-potion': () => {
        dex.boostAttack(10, icon, iconClass)
        remove(id)
        return true
      },
      'super-attack-potion': () => {
        dex.boostAttack(25, icon, iconClass)
        remove(id)
        return true
      },
      'hyper-attack-potion': () => {
        dex.boostAttack(50, icon, iconClass)
        remove(id)
        return true
      },
      'vitality-potion': () => {
        dex.boostVitality(10, icon, iconClass)
        remove(id)
        return true
      },
      'super-vitality-potion': () => {
        dex.boostVitality(25, icon, iconClass)
        remove(id)
        return true
      },
      'hyper-vitality-potion': () => {
        dex.boostVitality(50, icon, iconClass)
        remove(id)
        return true
      },
      'xp-potion': () => {
        dex.boostXp(10, icon, iconClass)
        remove(id)
        return true
      },
      'super-xp-potion': () => {
        dex.boostXp(25, icon, iconClass)
        remove(id)
        return true
      },
      'hyper-xp-potion': () => {
        dex.boostXp(50, icon, iconClass)
        remove(id)
        return true
      },
      'super-potion': () => {
        dex.healActive(100)
        remove(id)
        return true
      },
      'hyper-potion': () => {
        dex.healActive(200)
        remove(id)
        return true
      },
      'shlageball': capture,
      'super-shlageball': capture,
      'hyper-shlageball': capture,
    }

    const handler = handlers[id]
    const result = handler ? handler() : false
    if (result)
      itemUsage.markUsed(id)
    return result
  }

  function reset() {
    items.value = {}
  }

  return { items, list, add, remove, buy, sell, useItem, reset }
}, {
  persist: true,
})
