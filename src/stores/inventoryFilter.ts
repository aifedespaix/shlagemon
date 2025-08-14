import type { ItemCategory } from '~/type/item'
import { defineStore } from 'pinia'

export type InventorySort = 'name' | 'type' | 'price'

export const useInventoryFilterStore = defineStore('inventoryFilter', () => {
  const search = ref('')
  const sortBy = ref<InventorySort>('name')
  const sortAsc = ref(true)
  const category = ref<ItemCategory | 'all'>('all')

  const ascendingSorts: InventorySort[] = ['name', 'type']
  let suppressNextSortAscUpdate = true

  /**
   * Adjust default orientation when sort key changes, preserving persisted order on hydration.
   */
  watch(sortBy, (value) => {
    if (suppressNextSortAscUpdate) {
      suppressNextSortAscUpdate = false
      return
    }
    sortAsc.value = ascendingSorts.includes(value)
  })

  function reset() {
    search.value = ''
    sortBy.value = 'name'
    sortAsc.value = true
    category.value = 'all'
  }

  return { search, sortBy, sortAsc, category, reset }
}, {
  persist: {
    afterRestore: () => {
      suppressNextSortAscUpdate = false
    },
  },
})
