import { defineStore } from 'pinia'
import { spaceBadge } from '~/data/badges'
import { useBadgeBoxStore } from '~/stores/badgeBox'
import { usePlayerStore } from '~/stores/player'

/**
 * Handle unlock state and persistence for Professeur Merdant's Laboratory.
 */
export const useLaboratoryStore = defineStore('laboratory', () => {
  const player = usePlayerStore()
  const badgeBox = useBadgeBoxStore()
  const unlocked = ref(false)
  const score = ref(0)

  const finaleUnlocked = ref(false)

  const hits = ref(0)
  const hitsSinceLegendary = ref(0)
  const legendaryEncounters = ref(0)
  const legendaryBattleActive = ref(false)

  const isUnlocked = computed(() => unlocked.value)

  function unlock() {
    unlocked.value = true
  }

  function lock() {
    unlocked.value = false
  }

  const hitsUntilNextLegendary = computed(() => {
    const remainder = score.value % 25
    return remainder === 0 ? 25 : 25 - remainder
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

  function addScore(points: number) {
    score.value += points
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
    hitsUntilNextLegendary,
    isLegendaryBattleActive,
    isUnlocked,
    unlock,
    lock,
    unlockFinale,
    addScore,
    registerHit,
    recordLegendaryEncounter,
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
