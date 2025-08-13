import type { SfxId } from '~/data/sfx'
import { defineStore } from 'pinia'

export type MainPanel = 'village' | 'battle' | 'trainerBattle' | 'shop' | 'miniGame' | 'arena' | 'poulailler' | 'dojo'

export const useMainPanelStore = defineStore('mainPanel', () => {
  const zone = useZoneStore()
  const dex = useShlagedexStore()
  const battle = useBattleStore()
  const arena = useArenaStore()
  const ui = useUIStore()
  const mobile = useMobileTabStore()
  const audio = useAudioStore()
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

  const transitionSfx = {
    shop: { enter: 'shop-enter', leave: 'shop-leave' },
    miniGame: { enter: 'mini-game-enter', leave: 'mini-game-leave' },
    arena: { enter: 'arena-enter', leave: 'arena-leave' },
    dojo: { enter: 'mini-game-enter', leave: 'mini-game-leave' },
  } as const satisfies Partial<Record<MainPanel, { enter: SfxId, leave: SfxId }>>

  watch(current, (value, oldValue) => {
    if (value !== 'battle' && value !== 'trainerBattle')
      battle.stopLoop()

    const enter = transitionSfx[value]
    if (enter)
      audio.playSfx(enter.enter)

    if (oldValue) {
      const leave = transitionSfx[oldValue]
      if (leave)
        audio.playSfx(leave.leave)
    }
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
    if (ui.isMobile)
      mobile.set('inventory')
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

  function showDojo() {
    if (arena.inBattle)
      return
    current.value = 'dojo'
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
    showDojo,
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
      if (store.current === 'trainerBattle' || store.current === 'poulailler' || store.current === 'dojo')
        store.reset()
      if (store.current === 'miniGame' && !miniGameStore.currentId)
        store.reset()
    },
  },
})
