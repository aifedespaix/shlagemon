import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const shlagidolar = ref(0)
  const shlagidiamond = ref(0)

  function addShlagidolar(amount: number) {
    shlagidolar.value = Math.ceil(shlagidolar.value + amount)
  }

  function addShlagidiamond(amount: number) {
    shlagidiamond.value += amount
  }

  function reset() {
    shlagidolar.value = 0
    shlagidiamond.value = 0
  }

  return { shlagidolar, shlagidiamond, addShlagidolar, addShlagidiamond, reset }
}, {
  persist: true,
})
