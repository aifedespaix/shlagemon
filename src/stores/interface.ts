import { defineStore } from 'pinia'

/**
 * User interface preferences.
 * Controls optional UI behaviours.
 */
export const useInterfaceStore = defineStore('interface', () => {
  /** Whether villages are displayed on an interactive map instead of buttons. */
  const showVillagesOnMap = ref(true)

  function setShowVillagesOnMap(value: boolean) {
    showVillagesOnMap.value = value
  }

  return { showVillagesOnMap, setShowVillagesOnMap }
}, {
  persist: true,
})
