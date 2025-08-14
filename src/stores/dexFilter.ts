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

export const useDexFilterStore = defineStore('dexFilter', () => {
  const search = ref('')
  const sortBy = ref<DexSort>('level')
  const sortAsc = ref(false)

  const ascendingSorts: DexSort[] = ['name', 'type', 'date', 'evolution']
  const saved = typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem('dexFilter') || '{}') as Partial<{ sortBy: DexSort }>
    : {}
  let skipNext = saved.sortBy && saved.sortBy !== 'level'

  /**
   * Ensure default orientation per sort key while preserving persisted order on hydration.
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
    sortBy.value = 'level'
    sortAsc.value = false
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: true,
})
