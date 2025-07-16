import { defineStore } from 'pinia'

export type DexSort =
  | 'level'
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

  watch(sortBy, (val) => {
    if (val === 'name' || val === 'type' || val === 'date' || val === 'evolution')
      sortAsc.value = true
    else
      sortAsc.value = false
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
