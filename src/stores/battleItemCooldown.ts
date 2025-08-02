import { defineStore } from 'pinia'

/**
 * Global cooldown shared by all battle items.
 * The remaining time is updated every second.
 */
export const useBattleItemCooldownStore = defineStore('battleItemCooldown', () => {
  const remaining = ref(0)
  let timer: ReturnType<typeof useIntervalFn> | null = null

  const isActive = computed(() => remaining.value > 0)

  function start(seconds: number) {
    remaining.value = seconds
    timer?.pause()
    timer = useIntervalFn(() => {
      remaining.value -= 1
      if (remaining.value <= 0) {
        remaining.value = 0
        timer?.pause()
      }
    }, 1000)
  }

  function reset() {
    remaining.value = 0
    timer?.pause()
    timer = null
  }

  return { remaining, isActive, start, reset }
})
