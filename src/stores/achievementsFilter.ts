import { defineStore } from 'pinia'

export type AchievementSort = 'name' | 'date' | 'progress'

export type AchievementFilterStatus = 'unlocked' | 'locked' | 'all'

export const useAchievementsFilterStore = defineStore('achievementsFilter', () => {
  const search = ref('')
  const status = ref<AchievementFilterStatus>('unlocked')
  const sortBy = ref<AchievementSort>('name')
  const sortAsc = ref(true)

  const ascendingSorts: AchievementSort[] = ['name']
  let suppressNextSortAscUpdate = true

  /**
   * Align orientation with current sort key while preserving stored preference on load.
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
    status.value = 'unlocked'
    sortBy.value = 'name'
    sortAsc.value = true
  }

  return { search, status, sortBy, sortAsc, reset }
}, {
  persist: {
    afterRestore: () => {
      suppressNextSortAscUpdate = false
    },
  },
})
