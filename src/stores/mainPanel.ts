import { defineStore } from 'pinia'

export type MainPanel = 'village' | 'battle' | 'trainerBattle' | 'shop' | 'miniGame' | 'arena' | 'poulailler'

export const useMainPanelStore = defineStore('mainPanel', () => {
  const zone = useZoneStore()
  const dex = useShlagedexStore()
  const battle = useBattleStore()
  const arena = useArenaStore()
  const ui = useUIStore()
  const mobile = useMobileTabStore()
  const current = ref<MainPanel>('village')

  const isBattle = computed(() => current.value === 'battle' || current.value === 'trainerBattle')

  // Update the panel when the zone changes
  watch(
    [() => zone.current?.type, () => zone.current?.id],
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
    if (ui.isMobile)
      mobile.set('game')
  }

  function showPoulailler() {
    if (arena.inBattle)
      return
    current.value = 'poulailler'
  }

  function showArena() {
    if (arena.inBattle)
      return
    current.value = 'arena'
    if (ui.isMobile)
      mobile.set('game')
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
    showPoulailler,
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
      const miniGameStore = useMiniGameStore()
      if (store.current === 'arena' && !arenaStore.inBattle)
        store.reset()
      if (store.current === 'trainerBattle' || store.current === 'poulailler')
        store.reset()
      if (store.current === 'miniGame' && !miniGameStore.currentId)
        store.reset()
    },
  },
})
