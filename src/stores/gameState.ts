import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { useShlagedexStore } from './shlagedex'

export const useGameStateStore = defineStore('gameState', () => {
  const dex = useShlagedexStore()
  const hasPokemon = ref(false)
  const dialogStep = ref(0)
  const starterId = ref<string | null>(null)
  const activeShlagemon = computed<DexShlagemon | null>(() => dex.activeShlagemon)

  function setHasPokemon(v: boolean) {
    hasPokemon.value = v
  }
  function setDialogStep(step: number) {
    dialogStep.value = step
  }
  function setStarterId(id: string) {
    starterId.value = id
  }
  function setActiveShlagemon(mon: DexShlagemon | null) {
    if (mon)
      dex.setActiveShlagemon(mon)
  }
  function reset() {
    hasPokemon.value = false
    dialogStep.value = 0
    starterId.value = null
  }

  return { hasPokemon, dialogStep, activeShlagemon, starterId, setHasPokemon, setDialogStep, setStarterId, setActiveShlagemon, reset }
}, {
  persist: true,
})
