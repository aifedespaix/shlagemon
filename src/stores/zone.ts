import type { Trainer } from '~/type/trainer'
import type { SavageZoneId, Zone, ZoneId } from '~/type/zone'
import { defineStore } from 'pinia'
/* eslint-disable node/prefer-global/process */
import { kings as kingsData } from '~/data/kings'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  // Persist the current zone id so the user stays in the same zone after reload
  const currentId = ref<ZoneId>(zones.value[0].id)
  const currentZoneId = computed(() => currentId.value)
  const selectedAt = ref<number>(Date.now())
  const now = process.env.VITEST
    ? ref(new Date())
    : useNow({ interval: 100 })
  const current = computed(() => {
    const zone = zones.value.find(z => z.id === currentId.value)
    return zone ?? zones.value[0]
  })
  const xpZones = computed(() =>
    zones.value.filter(z => (z.maxLevel ?? 0) > 0),
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

  function completeArena(id: string) {
    const z = zones.value.find(z => z.id === id)
    if (z?.arena)
      z.arena.completed = true
  }

  const rewardMultiplier = computed(() => {
    const zone = current.value
    const maxLevel = zone.maxLevel ?? 0
    if (!maxLevel)
      return 1
    const rank = maxLevel / 5
    return rank >= 0 ? 2 ** rank : 1
  })

  function setZone(id: ZoneId) {
    if (zones.value.some(z => z.id === id)) {
      const same = currentId.value === id
      currentId.value = id
      selectedAt.value = Date.now()
      const dex = useShlagedexStore()
      if (dex.activeShlagemon && !same)
        dex.updateCoefficient(dex.activeShlagemon, undefined, true, true)
      const visit = useZoneVisitStore()
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
    completeArena,
    reset,
  }
}, {
  persist: {
    pick: ['currentId'],
  },
})
