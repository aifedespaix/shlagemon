import { defineStore } from 'pinia'

export const useGameStateStore = defineStore('gameState', () => {
  const hasPokemon = ref(false)
  const dialogStep = ref(0)
  const activeShlagemonId = ref<string | null>(null)

  function setHasPokemon(v: boolean) {
    hasPokemon.value = v
  }
  function setDialogStep(step: number) {
    dialogStep.value = step
  }
  function setActiveShlagemonId(id: string | null) {
    activeShlagemonId.value = id
  }
  function reset() {
    hasPokemon.value = false
    dialogStep.value = 0
    activeShlagemonId.value = null
  }

  return { hasPokemon, dialogStep, activeShlagemonId, setHasPokemon, setDialogStep, setActiveShlagemonId, reset }
}, {
  persist: true,
})
