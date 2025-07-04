import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useShlagedexStore } from './shlagedex'
import { useZoneStore } from './zone'

export type MainPanel = 'village' | 'battle' | 'trainerBattle' | 'shop'

export const useMainPanelStore = defineStore('mainPanel', () => {
  const zone = useZoneStore()
  const dex = useShlagedexStore()
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

  function showShop() {
    current.value = 'shop'
  }

  function showBattle() {
    current.value = 'battle'
  }

  function showTrainerBattle() {
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
    current.value = 'trainerBattle'
  }

  function showVillage() {
    current.value = 'village'
  }

  return { current, showShop, showBattle, showTrainerBattle, showVillage }
})
