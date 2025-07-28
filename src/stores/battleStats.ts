import { defineStore } from 'pinia'

export const useBattleStatsStore = defineStore('battleStats', () => {
  const losses = ref(0)
  const kingLosses = ref(0)

  function addLoss() {
    losses.value += 1
  }

  function addKingLoss() {
    kingLosses.value += 1
    addLoss()
  }

  function reset() {
    losses.value = 0
    kingLosses.value = 0
  }

  return { losses, kingLosses, addLoss, addKingLoss, reset }
}, {
  persist: true,
})
