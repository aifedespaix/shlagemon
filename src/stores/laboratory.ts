import { defineStore } from 'pinia'

/**
 * Handle unlock state and persistence for Professeur Merdant's Laboratory.
 */
export const useLaboratoryStore = defineStore('laboratory', () => {
  const unlocked = ref(false)
  const activeLegendaryEncounterBaseId = ref<string | null>(null)

  const isUnlocked = computed(() => unlocked.value)
  const hasLegendaryEncounter = computed(() => activeLegendaryEncounterBaseId.value !== null)

  function unlock() {
    unlocked.value = true
  }

  function lock() {
    unlocked.value = false
    activeLegendaryEncounterBaseId.value = null
  }

  function reset() {
    unlocked.value = false
    activeLegendaryEncounterBaseId.value = null
  }

  function beginLegendaryEncounter(baseId: string) {
    activeLegendaryEncounterBaseId.value = baseId
  }

  function clearLegendaryEncounter() {
    activeLegendaryEncounterBaseId.value = null
  }

  function consumeLegendaryEncounter(baseId: string): boolean {
    if (activeLegendaryEncounterBaseId.value !== baseId)
      return false
    activeLegendaryEncounterBaseId.value = null
    return true
  }

  return {
    unlocked,
    isUnlocked,
    hasLegendaryEncounter,
    unlock,
    lock,
    reset,
    beginLegendaryEncounter,
    clearLegendaryEncounter,
    consumeLegendaryEncounter,
  }
}, {
  persist: {
    pick: ['unlocked'],
  },
})
