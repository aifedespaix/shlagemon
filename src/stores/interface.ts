import { defineStore } from 'pinia'

/**
 * User interface preferences.
 * Controls optional UI behaviours.
 */
export const useInterfaceStore = defineStore('interface', () => {
  /**
   * Whether villages are displayed on an interactive map instead of buttons.
   * Defaults to the classic button view.
   */
  const showVillagesOnMap = ref(false)

  function setShowVillagesOnMap(value: boolean) {
    showVillagesOnMap.value = value
  }

  return { showVillagesOnMap, setShowVillagesOnMap }
}, {
  persist: true,
})
