import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const shlagidolar = ref(0)

  function addShlagidolar(amount: number) {
    shlagidolar.value += amount
  }

  function reset() {
    shlagidolar.value = 0
  }

  return { shlagidolar, addShlagidolar, reset }
}, {
  persist: true,
})
