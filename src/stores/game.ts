import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const shlagidolar = ref(0)

  function addShlagidolar(amount: number) {
    shlagidolar.value += amount
  }

  return { shlagidolar, addShlagidolar }
}, {
  persist: true,
})
