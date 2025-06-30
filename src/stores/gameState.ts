import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useShlagedexStore } from './shlagedex'

export const useGameStateStore = defineStore('gameState', () => {
  const dex = useShlagedexStore()
  const hasPokemon = ref(false)
  const dialogStep = ref(0)
  const activeShlagemon = computed<DexShlagemon | null>(() => dex.activeShlagemon)

  function setHasPokemon(v: boolean) {
    hasPokemon.value = v
  }
  function setDialogStep(step: number) {
    dialogStep.value = step
  }
  function setActiveShlagemon(mon: DexShlagemon | null) {
    if (mon)
      dex.setActiveShlagemon(mon)
  }
  function reset() {
    hasPokemon.value = false
    dialogStep.value = 0
  }

  return { hasPokemon, dialogStep, activeShlagemon, setHasPokemon, setDialogStep, setActiveShlagemon, reset }
}, {
  persist: true,
})
