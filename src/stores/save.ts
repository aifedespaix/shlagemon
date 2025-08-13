import type { PersistedStoreId } from '~/utils/save-code'
import { defineStore } from 'pinia'
import { PERSISTED_STORE_KEYS } from '~/utils/save-code'

interface ResettableStore { reset?: () => void }

/**
 * Map each persisted store key to its corresponding Pinia store.
 * The `satisfies` clause makes the mapping exhaustive: adding a key to
 * `PERSISTED_STORE_KEYS` requires adding its getter here, otherwise
 * TypeScript raises a compilation error. This prevents silently skipping
 * a store reset when new persisted stores are introduced.
 */
const PERSISTED_STORE_GETTERS = {
  achievements: useAchievementsStore,
  achievementsFilter: useAchievementsFilterStore,
  ball: useBallStore,
  battleStats: useBattleStatsStore,
  deckFilter: useDeckFilterStore,
  dexFilter: useDexFilterStore,
  dialog: useDialogStore,
  disease: useDiseaseStore,
  egg: useEggStore,
  eggBox: useEggBoxStore,
  equipment: useEquipmentStore,
  game: useGameStore,
  gameState: useGameStateStore,
  inventory: useInventoryStore,
  inventoryFilter: useInventoryFilterStore,
  itemUsage: useItemUsageStore,
  kingPotion: useKingPotionStore,
  mainPanel: useMainPanelStore,
  miniGame: useMiniGameStore,
  player: usePlayerStore,
  playtime: usePlaytimeStore,
  potionInfo: usePotionInfoStore,
  shlagedex: useShlagedexStore,
  shopFilter: useShopFilterStore,
  shortcuts: useShortcutsStore,
  zone: useZoneStore,
  zoneProgress: useZoneProgressStore,
  zoneVisit: useZoneVisitStore,
} satisfies Record<PersistedStoreId, () => ResettableStore>

export const useSaveStore = defineStore('save', () => {
  /**
   * Reset every Pinia store that persists its state.
   * Iterates over the list of persisted keys, ensuring that future additions
   * are automatically handled.
   */
  function reset(): void {
    for (const key of PERSISTED_STORE_KEYS) {
      const store = PERSISTED_STORE_GETTERS[key]()
      store.reset?.()
    }
  }

  /**
   * Remove every persisted store value from localStorage.
   */
  function clearPersisted(): void {
    for (const key of PERSISTED_STORE_KEYS)
      useStorage(key, null, undefined, { flush: 'sync' }).value = null
  }

  return { reset, clearPersisted }
})
