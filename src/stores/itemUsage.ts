import { defineStore } from 'pinia'

export const useItemUsageStore = defineStore('itemUsage', () => {
  const used = ref<Record<string, boolean>>({})
  const inventory = useInventoryStore()

  const hasUnusedItem = computed(() =>
    Object.entries(inventory.items).some(([id, qty]) => (qty ?? 0) > 0 && !used.value[id]),
  )

  function markUsed(id: string) {
    used.value[id] = true
  }

  function reset() {
    used.value = {}
  }

  return { used, hasUnusedItem, markUsed, reset }
}, {
  persist: true,
})
