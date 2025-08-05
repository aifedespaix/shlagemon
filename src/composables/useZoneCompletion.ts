import type { Zone } from '~/type'
import { computed } from 'vue'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneProgressStore } from '~/stores/zoneProgress'

/**
 * Compute completion indicators for a given zone.
 * Includes capture, rarity, shiny, king, and arena status.
 *
 * @param zone - The zone to inspect.
 */
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

  const allShiny = computed(() => {
    const list = zone.shlagemons
    if (!list?.length)
      return false
    return list.every((base) => {
      const mon = dex.shlagemons.find(m => m.base.id === base.id)
      return mon?.isShiny === true
    })
  })

  const kingDefeated = computed(() => {
    const hasKing
        = zone.type === 'sauvage'
          ? zone.hasKing !== false
          : !!zone.pois.king
    return hasKing && progress.isKingDefeated(zone.id)
  })

  const arenaCompleted = computed(() => progress.isArenaCompleted(zone.id))

  return { allCaptured, perfectZone, allShiny, kingDefeated, arenaCompleted }
}
