import type { Ref } from 'vue'

/**
 * Provides a pulsing flag whenever the level increases.
 */
export function useLevelUpAnimation(level: Ref<number>) {
  const pulsing = ref(false)
  const { start } = useTimeoutFn(() => (pulsing.value = false), 600, { immediate: false })

  watch(level, (val, old) => {
    if (val > old) {
      pulsing.value = true
      start()
    }
  })

  return { pulsing: readonly(pulsing) } as const
}
