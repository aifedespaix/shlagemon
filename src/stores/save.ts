import { defineStore } from 'pinia'
import { useDialogStore } from './dialog'
import { useGameStore } from './game'
import { useGameStateStore } from './gameState'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'
import { useZoneStore } from './zone'
import { useZoneProgressStore } from './zoneProgress'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()
  const game = useGameStore()
  const inventory = useInventoryStore()
  const dialog = useDialogStore()
  const zone = useZoneStore()
  const zoneProgress = useZoneProgressStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
    dialog.reset()
    inventory.reset()
    zone.reset()
    zoneProgress.reset()
  }

  return { reset }
})
