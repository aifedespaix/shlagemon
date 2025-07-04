import { defineStore } from 'pinia'
import { useAchievementsStore } from './achievements'
import { useBallStore } from './ball'
import { useDexFilterStore } from './dexFilter'
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
  const achievements = useAchievementsStore()
  const ball = useBallStore()
  const dexFilter = useDexFilterStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
    dialog.reset()
    inventory.reset()
    zone.reset()
    zoneProgress.reset()
    achievements.reset()
    ball.reset()
    dexFilter.reset()
  }

  return { reset }
})
