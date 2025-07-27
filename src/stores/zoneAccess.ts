import type { Zone } from '~/type/zone'
import { zonesData } from '~/data/zones'

export function useZoneAccess(highestLevel: Ref<number>) {
  const progress = useZoneProgressStore()
  const zones = zonesData
  const xpZones = computed(() =>
    zones.filter(z => (z.maxLevel ?? 0) > 0),
  )

  function canAccess(z: Zone): boolean {
    if (z.type === 'village') {
      const attached = zones.find(zone => zone.id === z.attachedTo)
      return z.minLevel <= unref(highestLevel)
        && (!!attached && canAccess(attached))
    }
    const idx = xpZones.value.findIndex(x => x.id === z.id)
    if (idx === 0)
      return true
    const prev = xpZones.value[idx - 1]
    return progress.isKingDefeated(prev.id)
  }

  const accessibleZones = computed(() => zones.filter(z => canAccess(z)))
  const accessibleXpZones = computed(() =>
    accessibleZones.value.filter(z => (z.maxLevel ?? 0) > 0),
  )

  return {
    canAccess,
    accessibleZones,
    accessibleXpZones,
  }
}
