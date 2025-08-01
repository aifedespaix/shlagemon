import { defineStore } from 'pinia'

export const useItemUsageStore = defineStore('itemUsage', () => {
  const used = ref<Record<string, boolean>>({})
  const inventory = useInventoryStore()

  const hasUnusedItem = computed(() =>
    Object.entries(inventory.items).some(([id, qty]) => (qty ?? 0) > 0 && !used.value[id]),
  )

  const unusedItemCount = computed(() =>
    Object.entries(inventory.items)
      .reduce((acc, [id, qty]) => acc + ((qty ?? 0) > 0 && !used.value[id] ? 1 : 0), 0),
  )

  function markUsed(id: string) {
    used.value[id] = true
  }

  function markAllUsed() {
    for (const [id, qty] of Object.entries(inventory.items)) {
      if ((qty ?? 0) > 0)
        used.value[id] = true
    }
  }

  function reset() {
    used.value = {}
  }

  return { used, hasUnusedItem, unusedItemCount, markUsed, markAllUsed, reset }
}, {
  persist: true,
})
