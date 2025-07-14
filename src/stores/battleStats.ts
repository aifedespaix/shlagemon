import { defineStore } from 'pinia'

export const useBattleStatsStore = defineStore('battleStats', () => {
  const losses = ref(0)

  function addLoss() {
    losses.value += 1
  }

  function reset() {
    losses.value = 0
  }

  return { losses, addLoss, reset }
}, {
  persist: true,
})
