import { defineStore } from 'pinia'
import { useDialogStore } from './dialog'
import { useGameStore } from './game'
import { useGameStateStore } from './gameState'
import { useShlagedexStore } from './shlagedex'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()
  const game = useGameStore()
  const dialog = useDialogStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
    dialog.reset()
  }

  return { reset }
})
