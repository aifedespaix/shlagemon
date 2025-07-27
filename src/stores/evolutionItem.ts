import type { Item } from '~/type/item'
import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'

export const useEvolutionItemStore = defineStore('evolutionItem', () => {
  const current = ref<Item | null>(null)
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()
  const usage = useItemUsageStore()

  // modal visibility is controlled by this ref
  const isVisible = ref(false)
  const availableMons = computed(() => {
    if (!current.value)
      return []
    return dex.shlagemons.filter((m) => {
      const evolutions = m.base.evolutions ?? (m.base.evolution ? [m.base.evolution] : [])
      return evolutions.some(e => e.condition.type === 'item' && e.condition.value.id === current.value!.id)
    })
  })

  function canUse(item: Item) {
    return dex.shlagemons.some((m) => {
      const evolutions = m.base.evolutions ?? (m.base.evolution ? [m.base.evolution] : [])
      return evolutions.some(e => e.condition.type === 'item' && e.condition.value.id === item.id)
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
      usage.markUsed(current.value.id)
      close()
    }
    return success
  }

  return { current, isVisible, availableMons, open, close, useOn, canUse }
})
