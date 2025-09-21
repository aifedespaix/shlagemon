import { defineStore } from 'pinia'
import { spaceBadge } from '~/data/badges'
import { useBadgeBoxStore } from '~/stores/badgeBox'
import { useDeveloperStore } from '~/stores/developer'
import { usePlayerStore } from '~/stores/player'
import { usePwaEnvironmentStore } from '~/stores/pwaEnvironment'

/**
 * Handle unlock state and persistence for Professeur Merdant's Laboratory.
 */
const RESEARCH_POINT_REWARD = 10

export const useLaboratoryStore = defineStore('laboratory', () => {
  const player = usePlayerStore()
  const badgeBox = useBadgeBoxStore()
  const developer = useDeveloperStore()
  const pwaEnvironment = usePwaEnvironmentStore()
  const unlocked = ref(false)
  const researchProgress = ref(0)

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
  const baseLegendaryThreshold = computed(() => (isMobileApp.value ? 15 : 25))
  const legendaryBattleThreshold = computed(() => (developer.debug.value ? 1 : baseLegendaryThreshold.value))
  /** Reward granted each time laboratory research advances by one point. */
  const researchPointReward = RESEARCH_POINT_REWARD

  const isResearchReady = computed(() => {
    const threshold = legendaryBattleThreshold.value
    if (threshold <= 0)
      return true
    return researchProgress.value >= threshold
  })

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
    return Math.max(threshold - researchProgress.value, 0)
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

  function addResearchProgress(points: number) {
    if (!Number.isFinite(points))
      return { added: 0, reachedThreshold: isResearchReady.value }

    const threshold = legendaryBattleThreshold.value
    if (threshold <= 0)
      return { added: 0, reachedThreshold: true }

    const safePoints = Math.max(0, Math.floor(points))
    if (safePoints === 0)
      return { added: 0, reachedThreshold: isResearchReady.value }

    const previous = researchProgress.value
    const next = Math.min(previous + safePoints, threshold)
    researchProgress.value = next

    return { added: next - previous, reachedThreshold: researchProgress.value >= threshold }
  }

  function addScore(points: number) {
    return addResearchProgress(points)
  }

  function calculateShlagpurReward(sizeMultiplier: number): number {
    const baseReward = shlagpurRewardPerAsteroid.value
    if (!Number.isFinite(sizeMultiplier))
      return baseReward
    const multiplier = Math.round(sizeMultiplier)
    const clampedMultiplier = Math.min(Math.max(multiplier, 1), 5)
    return clampedMultiplier * baseReward
  }

  function resetResearchProgress() {
    researchProgress.value = 0
  }

  function resetScore() {
    resetResearchProgress()
  }

  function consumeResearchCharge() {
    if (!isResearchReady.value)
      return
    researchProgress.value = 0
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
    researchProgress.value = 0
    hits.value = 0
    hitsSinceLegendary.value = 0
    legendaryEncounters.value = 0
    finaleUnlocked.value = false
  }

  watch(legendaryBattleThreshold, (threshold) => {
    if (threshold <= 0) {
      researchProgress.value = 0
      return
    }
    researchProgress.value = Math.min(researchProgress.value, threshold)
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
    researchProgress,
    hits,
    hitsSinceLegendary,
    legendaryEncounters,
    legendaryBattleActive,
    finaleUnlocked,
    isMobileApp,
    shlagpurRewardPerAsteroid,
    legendaryBattleThreshold,
    researchPointReward,
    isResearchReady,
    hitsUntilNextLegendary,
    isLegendaryBattleActive,
    isUnlocked,
    unlock,
    lock,
    unlockFinale,
    addResearchProgress,
    addScore,
    registerHit,
    recordLegendaryEncounter,
    calculateShlagpurReward,
    resetResearchProgress,
    resetScore,
    consumeResearchCharge,
    resetHits,
    setLegendaryBattleActive,
    reset,
  }
}, {
  persist: {
    pick: ['unlocked', 'researchProgress', 'hits', 'hitsSinceLegendary', 'legendaryEncounters', 'finaleUnlocked'],
  },
})
