import { defineStore } from 'pinia'
import { useGameStateStore } from './gameState'
import { useShlagedexStore } from './shlagedex'

export const useSaveStore = defineStore('save', () => {
  const storageKey = 'pinia'
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()

  function reset() {
    if (typeof localStorage !== 'undefined')
      localStorage.removeItem(storageKey)

    dex.clear()
    gameState.reset()
  }

  return { reset }
})
