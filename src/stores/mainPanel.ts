import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useZoneStore } from './zone'

export type MainPanel = 'village' | 'battle' | 'shop'

export const useMainPanelStore = defineStore('mainPanel', () => {
  const zone = useZoneStore()
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

  function showVillage() {
    current.value = 'village'
  }

  return { current, showShop, showBattle, showVillage }
})
