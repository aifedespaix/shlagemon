import { defineStore } from 'pinia'

/**
 * Handle unlock state and persistence for Professeur Merdant's Laboratory.
 */
export const useLaboratoryStore = defineStore('laboratory', () => {
  const unlocked = ref(false)

  const isUnlocked = computed(() => unlocked.value)

  function unlock() {
    unlocked.value = true
  }

  function lock() {
    unlocked.value = false
  }

  function reset() {
    unlocked.value = false
  }

  return {
    unlocked,
    isUnlocked,
    unlock,
    lock,
    reset,
  }
}, {
  persist: {
    pick: ['unlocked'],
  },
})
