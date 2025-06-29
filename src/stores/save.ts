import { defineStore } from 'pinia'
import { useGameStateStore } from './gameState'
import { useShlagedexStore } from './shlagedex'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()

  function reset() {
    dex.clear()
    gameState.reset()
  }

  return { reset }
})
