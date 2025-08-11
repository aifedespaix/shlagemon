import { defineStore } from 'pinia'

/**
 * Tracks total play time in seconds.
 *
 * The counter automatically increments every second while the app is running.
 */
export const usePlaytimeStore = defineStore('playtime', () => {
  const seconds = ref(0)

  // Increment playtime every second
  useIntervalFn(() => {
    seconds.value += 1
  }, 1_000)

  const minutes = computed(() => Math.floor(seconds.value / 60))

  function reset() {
    seconds.value = 0
  }

  return { seconds, minutes, reset }
}, {
  persist: {
    paths: ['seconds'],
    afterRestore: (ctx) => {
      if (!ctx.store.seconds) {
        try {
          const raw = ctx.storage?.getItem(ctx.key)
          if (raw) {
            const data = JSON.parse(raw) as { minutes?: number }
            if (typeof data.minutes === 'number')
              ctx.store.seconds = data.minutes * 60
          }
        }
        catch {}
        ctx.store.$persist()
      }
    },
  },
})
