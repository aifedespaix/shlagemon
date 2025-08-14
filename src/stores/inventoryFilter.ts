import type { ItemCategory } from '~/type/item'
import { defineStore } from 'pinia'

export type InventorySort = 'name' | 'type' | 'price'

export const useInventoryFilterStore = defineStore('inventoryFilter', () => {
  const search = ref('')
  const sortBy = ref<InventorySort>('name')
  const sortAsc = ref(true)
  const category = ref<ItemCategory | 'all'>('all')

  const ascendingSorts: InventorySort[] = ['name', 'type']
  const saved = typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem('inventoryFilter') || '{}') as Partial<{ sortBy: InventorySort }>
    : {}
  let skipNext = saved.sortBy && saved.sortBy !== 'name'

  /**
   * Adjust default orientation when sort key changes, preserving persisted order on hydration.
   */
  watch(sortBy, (val) => {
    if (skipNext) {
      skipNext = false
      return
    }
    sortAsc.value = ascendingSorts.includes(val)
  })

  function reset() {
    search.value = ''
    sortBy.value = 'name'
    sortAsc.value = true
    category.value = 'all'
  }

  return { search, sortBy, sortAsc, category, reset }
}, {
  persist: true,
})
