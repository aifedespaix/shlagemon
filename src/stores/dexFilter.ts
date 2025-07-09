import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getSortDirection } from '~/utils/sort'

export type DexSort =
  | 'level'
  | 'rarity'
  | 'name'
  | 'type'
  | 'shiny'
  | 'attack'
  | 'defense'
  | 'count'
  | 'date'

export const useDexFilterStore = defineStore('dexFilter', () => {
  const search = ref('')
  const sortBy = ref<DexSort>('level')
  const sortAsc = computed(() =>
    getSortDirection(sortBy.value, ['name', 'type', 'date']))

  function reset() {
    search.value = ''
    sortBy.value = 'level'
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: true,
})
