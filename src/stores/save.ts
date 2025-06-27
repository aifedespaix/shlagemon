import { defineStore } from 'pinia'
import { useGameStateStore } from './gameState'
import { useSchlagedexStore } from './schlagedex'

export const useSaveStore = defineStore('save', () => {
  const storageKey = 'pinia'
  const dex = useSchlagedexStore()
  const gameState = useGameStateStore()

  function reset() {
    if (typeof localStorage !== 'undefined')
      localStorage.removeItem(storageKey)

    dex.clear()
    gameState.reset()
  }

  return { reset }
})
