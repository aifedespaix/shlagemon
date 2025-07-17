import type { ItemCategory } from '~/type/item'
import { defineStore } from 'pinia'

export const useShopFilterStore = defineStore('shopFilter', () => {
  const category = ref<ItemCategory | 'all'>('all')

  function reset() {
    category.value = 'all'
  }

  return { category, reset }
}, {
  persist: true,
})
