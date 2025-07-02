import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useZoneProgressStore = defineStore('zoneProgress', () => {
  const wins = ref<Record<string, number>>({})

  function addWin(id: string) {
    wins.value[id] = (wins.value[id] || 0) + 1
  }

  function getWins(id: string) {
    return wins.value[id] || 0
  }

  function canFightKing(id: string) {
    return getWins(id) >= 20
  }

  function reset() {
    wins.value = {}
  }

  return { wins, addWin, getWins, canFightKing, reset }
}, {
  persist: true,
})
