import type { Item } from '~/type/item'
import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useInventoryStore } from './inventory'
import { useItemUsageStore } from './itemUsage'
import { useShlagedexStore } from './shlagedex'

export const useOdorElixirStore = defineStore('odorElixir', () => {
  const current = ref<Item | null>(null)
  const isVisible = ref(false)
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()
  const usage = useItemUsageStore()

  const availableMons = computed(() =>
    dex.shlagemons.filter(m => !m.rarityFollowsLevel),
  )

  function open(item: Item) {
    current.value = item
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
    current.value = null
  }

  function useOn(mon: DexShlagemon) {
    if (!current.value)
      return false
    dex.applyOdorElixir(mon)
    inventory.remove(current.value.id)
    usage.markUsed(current.value.id)
    close()
    return true
  }

  return { current, isVisible, availableMons, open, close, useOn }
})
