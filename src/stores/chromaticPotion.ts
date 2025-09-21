import type { Item } from '~/type/item'
import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { useInventoryStore } from './inventory'
import { useItemUsageStore } from './itemUsage'
import { useShlagedexStore } from './shlagedex'

export const useChromaticPotionStore = defineStore('chromaticPotion', () => {
  const current = ref<Item | null>(null)
  const isVisible = ref(false)
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()
  const usage = useItemUsageStore()

  const availableMons = computed(() => dex.shlagemons)

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
    const newState = dex.toggleShiny(mon)
    if (newState === null)
      return false
    inventory.remove(current.value.id)
    usage.markUsed(current.value.id)
    const name = i18n.global.t(mon.base.name)
    const key = newState
      ? 'stores.chromaticPotion.toast.shiny'
      : 'stores.chromaticPotion.toast.normal'
    toast.success(i18n.global.t(key, { name }))
    close()
    return true
  }

  return { current, isVisible, availableMons, open, close, useOn }
})
