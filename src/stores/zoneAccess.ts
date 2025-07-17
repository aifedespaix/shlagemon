import type { Ref } from 'vue'
import type { Zone } from '~/type/zone'
import { computed, unref } from 'vue'
import { zonesData } from '~/data/zones'
import { useZoneProgressStore } from './zoneProgress'

export function useZoneAccess(highestLevel: Ref<number>) {
  const progress = useZoneProgressStore()
  const zones = zonesData
  const xpZones = computed(() => zones.filter(z => z.maxLevel > 0))

  function canAccess(z: Zone) {
    if (z.type === 'village')
      return z.minLevel <= unref(highestLevel)
    const idx = xpZones.value.findIndex(x => x.id === z.id)
    if (idx === 0)
      return true
    const prev = xpZones.value[idx - 1]
    return progress.isKingDefeated(prev.id)
  }

  const accessibleZones = computed(() => zones.filter(z => canAccess(z)))
  const accessibleXpZones = computed(() =>
    accessibleZones.value.filter(z => z.maxLevel > 0),
  )

  return {
    canAccess,
    accessibleZones,
    accessibleXpZones,
  }
}
