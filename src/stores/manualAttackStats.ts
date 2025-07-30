import { defineStore } from 'pinia'

/**
 * Tracks manual attack clicks for each battle and computes the average
 * clicks per second.
 */
export interface CombatClickStats {
  /** Total number of manual attacks performed in the battle. */
  clicks: number
  /** Duration of the battle in seconds. */
  duration: number
  /** Average clicks per second for the battle. */
  cps: number
}

export const useManualAttackStatsStore = defineStore('manualAttackStats', () => {
  const currentClicks = ref(0)
  const startTime = ref<number | null>(null)
  const history = ref<CombatClickStats[]>([])

  /** Begin tracking a new battle. */
  function startCombat() {
    currentClicks.value = 0
    startTime.value = Date.now()
  }

  /** Register a manual attack click. */
  function registerClick() {
    if (startTime.value !== null)
      currentClicks.value += 1
  }

  /**
   * Stop tracking the current battle and store the results.
   * Does nothing if tracking was not started.
   */
  function endCombat() {
    if (startTime.value === null)
      return
    const duration = (Date.now() - startTime.value) / 1000
    const cps = duration > 0 ? currentClicks.value / duration : 0
    history.value.push({ clicks: currentClicks.value, duration, cps })
    currentClicks.value = 0
    startTime.value = null
  }

  /** Reset all stored statistics. */
  function reset() {
    history.value = []
    currentClicks.value = 0
    startTime.value = null
  }

  /** Last recorded combat statistics or null if none. */
  const last = computed(() => history.value.at(-1) ?? null)

  return {
    currentClicks,
    startTime,
    history,
    last,
    startCombat,
    registerClick,
    endCombat,
    reset,
  }
}, {
  persist: {
    paths: ['history'],
  },
})
