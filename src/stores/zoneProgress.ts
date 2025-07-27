import { defineStore } from 'pinia'

export const useZoneProgressStore = defineStore('zoneProgress', () => {
  const wins = ref<Record<string, number>>({})
  const fightsBeforeKing = 10
  const kingsDefeated = ref<Record<string, boolean>>({})
  const arenasCompleted = ref<Record<string, boolean>>({})
  const lastEncounters = ref<Record<string, string[]>>({})
  const encounterCounts = ref<Record<string, number>>({})

  function addWin(id: string) {
    wins.value[id] = (wins.value[id] || 0) + 1
  }

  function getWins(id: string) {
    return wins.value[id] || 0
  }

  function canFightKing(id: string) {
    return getWins(id) >= fightsBeforeKing
  }

  function defeatKing(id: string) {
    kingsDefeated.value[id] = true
  }

  function isKingDefeated(id: string) {
    return !!kingsDefeated.value[id]
  }

  function completeArena(id: string) {
    arenasCompleted.value[id] = true
  }

  function registerEncounter(zoneId: string, monId: string) {
    encounterCounts.value[zoneId] = (encounterCounts.value[zoneId] || 0) + 1
    const list = lastEncounters.value[zoneId] || []
    list.push(monId)
    while (list.length > 3)
      list.shift()
    lastEncounters.value[zoneId] = list
  }

  function getEncounterCount(zoneId: string) {
    return encounterCounts.value[zoneId] || 0
  }

  function streakExceeded(zoneId: string, monId: string) {
    const list = lastEncounters.value[zoneId]
    return list?.length >= 3
      && list[list.length - 1] === monId
      && list[list.length - 2] === monId
      && list[list.length - 3] === monId
  }

  function isArenaCompleted(id: string) {
    return !!arenasCompleted.value[id]
  }

  function reset() {
    wins.value = {}
    kingsDefeated.value = {}
    arenasCompleted.value = {}
  }

  return {
    wins,
    kingsDefeated,
    fightsBeforeKing,
    arenasCompleted,
    encounterCounts,
    lastEncounters,
    addWin,
    getWins,
    canFightKing,
    defeatKing,
    isKingDefeated,
    completeArena,
    isArenaCompleted,
    registerEncounter,
    getEncounterCount,
    streakExceeded,
    reset,
  }
}, {
  persist: true,
})
