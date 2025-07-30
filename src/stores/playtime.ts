import { defineStore } from 'pinia'

/**
 * Tracks total play time in minutes.
 *
 * The counter automatically increments every minute while the app is running.
 */
export const usePlaytimeStore = defineStore('playtime', () => {
  const minutes = ref(0)

  // Increment playtime every 60 seconds
  useIntervalFn(() => {
    minutes.value += 1
  }, 60_000)

  function reset() {
    minutes.value = 0
  }

  return { minutes, reset }
}, {
  persist: true,
})
