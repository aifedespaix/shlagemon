import { defineStore } from 'pinia'

export type AchievementSort = 'name' | 'date' | 'progress'

export type AchievementFilterStatus = 'unlocked' | 'locked' | 'all'

export const useAchievementsFilterStore = defineStore('achievementsFilter', () => {
  const search = ref('')
  const status = ref<AchievementFilterStatus>('unlocked')
  const sortBy = ref<AchievementSort>('name')
  const sortAsc = ref(true)

  const ascendingSorts: AchievementSort[] = ['name']
  const saved = typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem('achievementsFilter') || '{}') as Partial<{ sortBy: AchievementSort }>
    : {}
  let skipNext = saved.sortBy && saved.sortBy !== 'name'

  /**
   * Align orientation with current sort key while preserving stored preference on load.
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
    status.value = 'unlocked'
    sortBy.value = 'name'
    sortAsc.value = true
  }

  return { search, status, sortBy, sortAsc, reset }
}, {
  persist: true,
})
