import type { Zone } from '~/type'
import { computed } from 'vue'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneProgressStore } from '~/stores/zoneProgress'

export function useZoneCompletion(zone: Zone) {
  const dex = useShlagedexStore()
  const progress = useZoneProgressStore()

  const allCaptured = computed(() => {
    const list = zone.shlagemons
    if (!list?.length)
      return false
    return list.every(base => dex.shlagemons.some(mon => mon.base.id === base.id))
  })

  const perfectZone = computed(() => {
    const list = zone.shlagemons
    if (!list?.length)
      return false
    return list.every((base) => {
      const mon = dex.shlagemons.find(m => m.base.id === base.id)
      return mon?.rarity === 100
    })
  })

  const kingDefeated = computed(() => {
    const hasKing = zone.hasKing ?? zone.type === 'sauvage'
    return hasKing && progress.isKingDefeated(zone.id)
  })

  const arenaCompleted = computed(() => progress.isArenaCompleted(zone.id))

  return { allCaptured, perfectZone, kingDefeated, arenaCompleted }
}
