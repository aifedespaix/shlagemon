import { defineStore } from 'pinia'
import { useAchievementsStore } from './achievements'
import { useBallStore } from './ball'
import { useBattleStatsStore } from './battleStats'
import { useDexFilterStore } from './dexFilter'
import { useDialogStore } from './dialog'
import { useGameStore } from './game'
import { useGameStateStore } from './gameState'
import { useInventoryStore } from './inventory'
import { useItemUsageStore } from './itemUsage'
import { useMainPanelStore } from './mainPanel'
import { usePlayerStore } from './player'
import { useShlagedexStore } from './shlagedex'
import { useZoneStore } from './zone'
import { useZoneProgressStore } from './zoneProgress'
import { useZoneVisitStore } from './zoneVisit'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()
  const game = useGameStore()
  const battleStats = useBattleStatsStore()
  const inventory = useInventoryStore()
  const dialog = useDialogStore()
  const zone = useZoneStore()
  const zoneProgress = useZoneProgressStore()
  const zoneVisit = useZoneVisitStore()
  const achievements = useAchievementsStore()
  const ball = useBallStore()
  const dexFilter = useDexFilterStore()
  const mainPanel = useMainPanelStore()
  const player = usePlayerStore()
  const itemUsage = useItemUsageStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
    dialog.reset()
    inventory.reset()
    zone.reset()
    zoneVisit.reset()
    zoneProgress.reset()
    achievements.reset()
    battleStats.reset()
    ball.reset()
    dexFilter.reset()
    mainPanel.reset()
    player.reset()
    itemUsage.reset()
  }

  return { reset }
})
