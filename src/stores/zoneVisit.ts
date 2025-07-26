import { defineStore } from 'pinia'
import { zonesData } from '~/data/zones'

export const useZoneVisitStore = defineStore('zoneVisit', () => {
  const visited = ref<Record<string, boolean>>({ [zonesData[0].id]: true })
  const dex = useShlagedexStore()

  const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

  const hasNewZone = computed(
    () => accessibleZones.value.length > 1
      && accessibleZones.value.some(z => !visited.value[z.id]),
  )

  function markVisited(id: string) {
    visited.value[id] = true
  }

  function markAllAccessibleVisited() {
    accessibleZones.value.forEach(z => markVisited(z.id))
  }

  function reset() {
    visited.value = {}
  }

  return {
    visited,
    hasNewZone,
    markVisited,
    markAllAccessibleVisited,
    reset,
  }
}, {
  persist: true,
})
