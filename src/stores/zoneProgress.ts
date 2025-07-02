import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useZoneProgressStore = defineStore('zoneProgress', () => {
  const wins = ref<Record<string, number>>({})
  const fightsBeforeKing = 10
  const kingsDefeated = ref<Record<string, boolean>>({})

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

  function reset() {
    wins.value = {}
    kingsDefeated.value = {}
  }

  return {
    wins,
    addWin,
    getWins,
    canFightKing,
    defeatKing,
    isKingDefeated,
    reset,
  }
}, {
  persist: true,
})
