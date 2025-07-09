import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getSortDirection } from '~/utils/sort'

export type InventorySort = 'name' | 'type' | 'price'

export const useInventoryFilterStore = defineStore('inventoryFilter', () => {
  const search = ref('')
  const sortBy = ref<InventorySort>('name')
  const sortAsc = computed(() =>
    getSortDirection(sortBy.value, ['name', 'type']))

  function reset() {
    search.value = ''
    sortBy.value = 'name'
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: true,
})
