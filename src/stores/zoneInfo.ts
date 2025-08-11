import { defineStore } from 'pinia'

/**
 * Global zone-related flags used to control UI visibility.
 *
 * Flags persist once unlocked because they only evolve forward.
 */
export const useZoneInfoStore = defineStore('zoneInfo', () => {
  const hasMultipleZones = ref(false)
  const showZoneLevels = ref(false)

  const dex = useShlagedexStore()
  const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

  watchEffect(() => {
    if (!hasMultipleZones.value && accessibleZones.value.length > 1)
      hasMultipleZones.value = true
  })

  watchEffect(() => {
    if (!showZoneLevels.value && dex.highestLevel >= 5)
      showZoneLevels.value = true
  })

  function reset() {
    hasMultipleZones.value = false
    showZoneLevels.value = false
  }

  return {
    hasMultipleZones,
    showZoneLevels,
    reset,
  }
}, {
  persist: true,
})
