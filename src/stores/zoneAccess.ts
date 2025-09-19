import type { Ref } from 'vue'
import type { SavageZone, Zone } from '~/type/zone'
import { zonesData } from '~/data/zones'
import { useLaboratoryStore } from '~/stores/laboratory'

export function useZoneAccess(highestLevel: Ref<number>) {
  const progress = useZoneProgressStore()
  const laboratory = useLaboratoryStore()
  const zones = zonesData
  const xpZones = computed(() =>
    zones.filter((z): z is SavageZone => z.type === 'sauvage' && z.maxLevel > 0),
  )

  function canAccess(z: Zone): boolean {
    if (z.requiresLaboratoryUnlock && !unref(laboratory.unlocked))
      return false
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
    accessibleZones.value.filter(
      (z): z is SavageZone => z.type === 'sauvage' && z.maxLevel > 0,
    ),
  )

  return {
    canAccess,
    accessibleZones,
    accessibleXpZones,
  }
}
