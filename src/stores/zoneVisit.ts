import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { zonesData } from '~/data/zones'
import { useShlagedexStore } from './shlagedex'
import { useZoneProgressStore } from './zoneProgress'

export const useZoneVisitStore = defineStore('zoneVisit', () => {
  const visited = ref<Record<string, boolean>>({})
  const dex = useShlagedexStore()
  const progress = useZoneProgressStore()

  const zones = zonesData
  const xpZones = computed(() => zones.filter(z => z.maxLevel > 0))

  function canAccess(z: Zone) {
    if (z.type === 'village')
      return z.minLevel <= dex.highestLevel
    const idx = xpZones.value.findIndex(x => x.id === z.id)
    if (idx === 0)
      return true
    const prev = xpZones.value[idx - 1]
    return progress.isKingDefeated(prev.id)
  }

  const accessibleZones = computed(() => zones.filter(z => canAccess(z)))

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
