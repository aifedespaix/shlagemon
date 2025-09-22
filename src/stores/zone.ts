import type { Trainer } from '~/type/trainer'
import type { SavageZone, SavageZoneId, Zone, ZoneId } from '~/type/zone'
import { defineStore } from 'pinia'
import { kings as kingsData } from '~/data/kings'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  // Persist the current zone id so the user stays in the same zone after reload
  const currentId = ref<ZoneId>(zones.value[0].id)
  const currentZoneId = computed(() => currentId.value)
  const selectedAt = ref<number>(Date.now())
  const arena = useArenaStore()
  const now = useNow({ interval: 100 })
  const current = computed(() => {
    const zone = zones.value.find(z => z.id === currentId.value)
    return zone ?? zones.value[0]
  })
  const xpZones = computed(() =>
    zones.value.filter(
      (z): z is SavageZone => z.type === 'sauvage' && z.maxLevel > 0,
    ),
  )

  const wildCooldownRemaining = computed(() => {
    if (current.value.type !== 'sauvage')
      return 0
    return Math.max(0, 1000 - (now.value.getTime() - selectedAt.value))
  })

  const kings = toRaw({ ...kingsData })

  function getKing(id: SavageZoneId): Trainer | undefined {
    return kings[id]
  }

  function getZoneRank(id: string): number {
    const idx = xpZones.value.findIndex(z => z.id === id)
    return idx >= 0 ? idx + 1 : 1
  }

  function getZoneForLevel(level: number): Zone | undefined {
    const candidates = xpZones.value.filter(z => level >= z.minLevel)
    return candidates[candidates.length - 1]
  }

  const rewardMultiplier = computed(() => {
    const zone = current.value
    if (zone.type !== 'sauvage')
      return 1
    const { maxLevel } = zone
    const rank = maxLevel / 5
    return rank >= 0 ? 2 ** rank : 1
  })

  function setZone(id: ZoneId) {
    if (arena.inBattle)
      return
    if (zones.value.some(z => z.id === id)) {
      const same = currentId.value === id
      if (!same) {
        // Stop any ongoing battle loop to prevent pending enemy attacks from
        // damaging the player's Shlagémon after the zone switch.
        const battle = useBattleStore()
        battle.stopLoop()

        // Leaving a zone should always end any legendary battle state so the
        // Shlagédex regains the ability to switch the active Shlagémon.
        const laboratory = useLaboratoryStore()
        if (laboratory.isLegendaryBattleActive)
          laboratory.setLegendaryBattleActive(false)
      }
      currentId.value = id
      selectedAt.value = Date.now()
      const dex = useShlagedexStore()
      if (dex.activeShlagemon && !same)
        dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
      const visit = useZoneVisitStore()
      if (typeof visit.markVisited === 'function')
        visit.markVisited(id)
    }
  }

  function reset() {
    currentId.value = zones.value[0].id
  }

  return {
    zones,
    current,
    currentId,
    currentZoneId,
    selectedAt,
    wildCooldownRemaining,
    rewardMultiplier,
    setZone,
    getKing,
    getZoneRank,
    getZoneForLevel,
    reset,
  }
}, {
  persist: {
    pick: ['currentId'],
  },
})
