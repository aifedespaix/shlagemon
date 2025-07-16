import { defineStore } from 'pinia'
import { useArenaStore } from './arena'
import { useBattleStore } from './battle'
import { useShlagedexStore } from './shlagedex'
import { useZoneStore } from './zone'

export type MainPanel = 'village' | 'battle' | 'trainerBattle' | 'shop' | 'miniGame' | 'arena'

export const useMainPanelStore = defineStore('mainPanel', () => {
  const zone = useZoneStore()
  const dex = useShlagedexStore()
  const battle = useBattleStore()
  const arena = useArenaStore()
  const current = ref<MainPanel>('village')

  const isBattle = computed(() => current.value === 'battle' || current.value === 'trainerBattle')

  // Update the panel when the zone changes
  watch(
    () => [zone.current.type, zone.current.id],
    ([type]) => {
      current.value = type === 'village' ? 'village' : 'battle'
    },
    { immediate: true },
  )

  watch(current, (value) => {
    if (value !== 'battle' && value !== 'trainerBattle')
      battle.stopLoop()
  })

  function showShop() {
    if (arena.inBattle)
      return
    current.value = 'shop'
  }

  function showBattle() {
    if (arena.inBattle)
      return
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
    current.value = 'battle'
  }

  function showTrainerBattle() {
    if (arena.inBattle)
      return
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
    current.value = 'trainerBattle'
  }

  function showMiniGame() {
    if (arena.inBattle)
      return
    current.value = 'miniGame'
  }

  function showArena() {
    if (arena.inBattle)
      return
    current.value = 'arena'
  }

  function showVillage() {
    if (arena.inBattle)
      return
    current.value = 'village'
  }

  function reset() {
    current.value = zone.current.type === 'village' ? 'village' : 'battle'
  }

  return {
    current,
    showShop,
    showBattle,
    showTrainerBattle,
    showMiniGame,
    showArena,
    showVillage,
    reset,
    isBattle,
  }
}, {
  persist: {
    pick: ['current'],
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useMainPanelStore>
      const arenaStore = useArenaStore()
      if (store.current === 'arena' && !arenaStore.inBattle)
        store.reset()
      if (store.current === 'trainerBattle')
        store.reset()
    },
  },
})
