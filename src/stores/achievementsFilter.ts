import { defineStore } from 'pinia'

export type AchievementFilterStatus = 'unlocked' | 'locked' | 'all'

export const useAchievementsFilterStore = defineStore('achievementsFilter', () => {
  const search = ref('')
  const status = ref<AchievementFilterStatus>('unlocked')

  function reset() {
    search.value = ''
    status.value = 'unlocked'
  }

  return { search, status, reset }
}, {
  persist: true,
})
