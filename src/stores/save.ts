import { defineStore } from 'pinia'
import { PERSISTED_STORE_KEYS } from '~/utils/save-code'

export const useSaveStore = defineStore('save', () => {
  const dex = useShlagedexStore()
  const gameState = useGameStateStore()
  const game = useGameStore()
  const battleStats = useBattleStatsStore()
  const inventory = useInventoryStore()
  const dialog = useDialogStore()
  const disease = useDiseaseStore()
  const zone = useZoneStore()
  const zoneProgress = useZoneProgressStore()
  const zoneVisit = useZoneVisitStore()
  const achievements = useAchievementsStore()
  const achievementsFilter = useAchievementsFilterStore()
  const ball = useBallStore()
  const dexFilter = useDexFilterStore()
  const mainPanel = useMainPanelStore()
  const player = usePlayerStore()
  const itemUsage = useItemUsageStore()
  const equipment = useEquipmentStore()
  const eggBox = useEggBoxStore()
  const egg = useEggStore()

  function reset() {
    dex.reset()
    gameState.reset()
    game.reset()
    dialog.reset()
    disease.reset()
    inventory.reset()
    zone.reset()
    zoneVisit.reset()
    zoneProgress.reset()
    achievements.reset()
    achievementsFilter.reset()
    battleStats.reset()
    ball.reset()
    dexFilter.reset()
    mainPanel.reset()
    player.reset()
    itemUsage.reset()
    equipment.reset()
    eggBox.reset()
    egg.reset()
  }

  /**
   * Remove every persisted store value from localStorage.
   */
  function clearPersisted(): void {
    for (const key of PERSISTED_STORE_KEYS)
      window.localStorage.removeItem(key)
  }

  return { reset, clearPersisted }
})
