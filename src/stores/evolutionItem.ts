import type { Item } from '~/type/item'
import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

export const useEvolutionItemStore = defineStore('evolutionItem', () => {
  const current = ref<Item | null>(null)
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()

  const isVisible = ref(false)
  watch(isVisible, (v) => {
    if (!v)
      current.value = null
  })
  const availableMons = computed(() => {
    if (!current.value)
      return []
    return dex.shlagemons.filter((m) => {
      const evo = m.base.evolution
      return evo && evo.condition.type === 'item' && evo.condition.value.id === current.value!.id
    })
  })

  function canUse(item: Item) {
    return dex.shlagemons.some((m) => {
      const evo = m.base.evolution
      return evo && evo.condition.type === 'item' && evo.condition.value.id === item.id
    })
  }

  function open(item: Item) {
    current.value = item
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
    current.value = null
  }

  async function useOn(mon: DexShlagemon) {
    if (!current.value)
      return false
    const success = await dex.evolveWithItem(mon, current.value)
    if (success) {
      inventory.remove(current.value.id)
      close()
    }
    return success
  }

  return { current, isVisible, availableMons, open, close, useOn, canUse }
})
