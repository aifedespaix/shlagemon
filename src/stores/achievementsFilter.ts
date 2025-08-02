import { defineStore } from 'pinia'

export type AchievementSort = 'name' | 'date' | 'progress'

export type AchievementFilterStatus = 'unlocked' | 'locked' | 'all'

export const useAchievementsFilterStore = defineStore('achievementsFilter', () => {
  const search = ref('')
  const status = ref<AchievementFilterStatus>('unlocked')
  const sortBy = ref<AchievementSort>('name')
  const sortAsc = ref(true)

  watch(sortBy, (val) => {
    if (val === 'name')
      sortAsc.value = true
    else
      sortAsc.value = false
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
