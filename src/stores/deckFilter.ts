import { defineStore } from 'pinia'

export type DeckSort = 'name' | 'type'

export const useDeckFilterStore = defineStore('deckFilter', () => {
  const search = ref('')
  const sortBy = ref<DeckSort>('name')
  const sortAsc = ref(true)

  function reset() {
    search.value = ''
    sortBy.value = 'name'
    sortAsc.value = true
  }

  return { search, sortBy, sortAsc, reset }
}, {
  persist: true,
})
