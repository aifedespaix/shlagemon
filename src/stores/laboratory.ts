import { defineStore } from 'pinia'
import { watch } from 'vue'
import { spaceBadge } from '~/data/badges'
import { useBadgeBoxStore } from '~/stores/badgeBox'
import { usePlayerStore } from '~/stores/player'
import { usePwaEnvironmentStore } from '~/stores/pwaEnvironment'

/**
 * Handle unlock state and persistence for Professeur Merdant's Laboratory.
 */
export const useLaboratoryStore = defineStore('laboratory', () => {
  const player = usePlayerStore()
  const badgeBox = useBadgeBoxStore()
  const pwaEnvironment = usePwaEnvironmentStore()
  const unlocked = ref(false)
  const score = ref(0)

  const finaleUnlocked = ref(false)

  const hits = ref(0)
  const hitsSinceLegendary = ref(0)
  const legendaryEncounters = ref(0)
  const legendaryBattleActive = ref(false)

  /** True when running inside the Trusted Web Activity mobile build. */
  const isMobileApp = computed(() => pwaEnvironment.isTwa.value)
  /**
   * Base amount of ShlagPur awarded for destroying the largest asteroid size tier.
   * Smaller asteroids grant proportionally larger rewards (up to 5x this base).
   */
  const shlagpurRewardPerAsteroid = computed(() => (isMobileApp.value ? 3 : 1))
  /** Taurus count required to trigger the next legendary encounter. */
  const legendaryBattleThreshold = computed(() => (isMobileApp.value ? 15 : 25))

  const isUnlocked = computed(() => unlocked.value)

  function unlock() {
    unlocked.value = true
  }

  function lock() {
    unlocked.value = false
  }

  const hitsUntilNextLegendary = computed(() => {
    const threshold = legendaryBattleThreshold.value
    if (threshold <= 0)
      return 0
    const cappedScore = Math.min(score.value, threshold)
    return Math.max(threshold - cappedScore, 0)
  })

  const isLegendaryBattleActive = computed(() => legendaryBattleActive.value)

  function registerHit(isTarget: boolean): void {
    hits.value += 1
    if (isTarget)
      hitsSinceLegendary.value += 1
  }

  function recordLegendaryEncounter() {
    legendaryEncounters.value += 1
  }

  function addScore(points: number, maxThreshold: number = legendaryBattleThreshold.value): boolean {
    if (!Number.isFinite(points) || points <= 0)
      return false

    if (!Number.isFinite(maxThreshold) || maxThreshold <= 0) {
      score.value = 0
      return false
    }

    const nextValue = Math.min(score.value + points, maxThreshold)
    const hasChanged = nextValue !== score.value
    score.value = nextValue
    return hasChanged
  }

  function clampScore(maxThreshold: number): void {
    if (!Number.isFinite(maxThreshold))
      return
    if (maxThreshold <= 0) {
      score.value = 0
      return
    }
    if (score.value > maxThreshold)
      score.value = maxThreshold
  }

  function calculateShlagpurReward(sizeMultiplier: number): number {
    const baseReward = shlagpurRewardPerAsteroid.value
    if (!Number.isFinite(sizeMultiplier))
      return baseReward
    const multiplier = Math.round(sizeMultiplier)
    const clampedMultiplier = Math.min(Math.max(multiplier, 1), 5)
    return clampedMultiplier * baseReward
  }

  function resetScore() {
    score.value = 0
  }

  function resetHits() {
    hits.value = 0
    hitsSinceLegendary.value = 0
    legendaryEncounters.value = 0
  }

  function unlockFinale() {
    finaleUnlocked.value = true
  }

  function setLegendaryBattleActive(value: boolean) {
    legendaryBattleActive.value = value
  }

  function reset() {
    unlocked.value = false
    score.value = 0
    hits.value = 0
    hitsSinceLegendary.value = 0
    legendaryEncounters.value = 0
    finaleUnlocked.value = false
  }

  watch(legendaryBattleThreshold, (threshold) => {
    if (threshold <= 0)
      score.value = 0
    else if (score.value > threshold)
      score.value = threshold
  })

  watchEffect(() => {
    if (!unlocked.value)
      return
    if (!player.hasBadge(spaceBadge.id)) {
      player.earnBadge(spaceBadge.id)
      badgeBox.addBadge(spaceBadge)
    }
  })

  return {
    unlocked,
    score,
    hits,
    hitsSinceLegendary,
    legendaryEncounters,
    legendaryBattleActive,
    finaleUnlocked,
    isMobileApp,
    shlagpurRewardPerAsteroid,
    legendaryBattleThreshold,
    hitsUntilNextLegendary,
    isLegendaryBattleActive,
    isUnlocked,
    unlock,
    lock,
    unlockFinale,
    addScore,
    clampScore,
    registerHit,
    recordLegendaryEncounter,
    calculateShlagpurReward,
    resetScore,
    resetHits,
    setLegendaryBattleActive,
    reset,
  }
}, {
  persist: {
    pick: ['unlocked', 'score', 'hits', 'hitsSinceLegendary', 'legendaryEncounters', 'finaleUnlocked'],
  },
})
