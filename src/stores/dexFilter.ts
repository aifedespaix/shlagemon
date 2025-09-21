import { defineStore } from 'pinia'

export type DexSort
  = | 'level'
    | 'rarity'
    | 'name'
    | 'type'
    | 'shiny'
    | 'item'
    | 'attack'
    | 'defense'
    | 'count'
    | 'date'
    | 'evolution'
    | 'legendary'

export const useDexFilterStore = defineStore('dexFilter', () => {
  const search = ref('')
  const sortBy = ref<DexSort>('level')
  const sortAsc = ref(false)

  const ascendingSorts: DexSort[] = ['name', 'type', 'date', 'evolution']
  let suppressNextSortAscUpdate = true

  /**
   * Ensure default orientation per sort key while preserving persisted order on hydration.
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
    sortBy.value = 'level'
    sortAsc.value = false
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: {
    afterRestore: () => {
      suppressNextSortAscUpdate = false
    },
  },
})
