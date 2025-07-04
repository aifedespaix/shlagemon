import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

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
  const sortAsc = ref(false)

  watch(sortBy, (val) => {
    if (val === 'name' || val === 'type' || val === 'date')
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
