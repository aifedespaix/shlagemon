import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
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

  // Update the panel when the zone changes
  watch(
    () => zone.current.type,
    (type) => {
      if (type === 'village')
        current.value = 'village'
      else
        current.value = 'battle'
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
    current.value = 'battle'
  }

  function showTrainerBattle() {
    if (arena.inBattle)
      return
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
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

  return {
    current,
    showShop,
    showBattle,
    showTrainerBattle,
    showMiniGame,
    showArena,
    showVillage,
  }
})
