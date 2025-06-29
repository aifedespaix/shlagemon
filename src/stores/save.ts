import { defineStore } from 'pinia'
import { useGameStore } from './game'
import { useGameStateStore } from './gameState'
import { useShlagedexStore } from './shlagedex'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()
  const game = useGameStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
  }

  return { reset }
})
