import { defineStore } from 'pinia'

export type InventorySort = 'name' | 'type' | 'price'

export const useInventoryFilterStore = defineStore('inventoryFilter', () => {
  const search = ref('')
  const sortBy = ref<InventorySort>('name')
  const sortAsc = ref(true)

  watch(sortBy, (val) => {
    if (val === 'price')
      sortAsc.value = false
    else
      sortAsc.value = true
  })

  function reset() {
    search.value = ''
    sortBy.value = 'name'
    sortAsc.value = true
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: true,
})
