import type { Trainer } from '~/type/trainer'
import type { Zone } from '~/type/zone'
import { useNow } from '@vueuse/core'
import { defineStore } from 'pinia'
import { kings as kingsData } from '~/data/kings'
import { zonesData } from '~/data/zones'
import { useArenaStore } from './arena'
import { useShlagedexStore } from './shlagedex'
import { useZoneVisitStore } from './zoneVisit'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  // Persist the current zone id so the user stays in the same zone after reload
  const currentId = ref<string>(zones.value[0].id)
  const currentZoneId = computed(() => currentId.value)
  const selectedAt = ref<number>(Date.now())
  const arena = useArenaStore()
  const now = useNow({ interval: 100 })
  const current = computed(() => {
    const zone = zones.value.find(z => z.id === currentId.value)
    return zone ?? zones.value[0]
  })
  const visit = useZoneVisitStore()
  visit.markVisited(currentId.value)
  const xpZones = computed(() => zones.value.filter(z => z.maxLevel > 0))

  const wildCooldownRemaining = computed(() => {
    if (current.value.type !== 'sauvage')
      return 0
    return Math.max(0, 1000 - (now.value.getTime() - selectedAt.value))
  })

  const kings = ref<Record<string, Trainer>>({})

  function getKing(id: string): Trainer | undefined {
    const z = zones.value.find(z => z.id === id)
    if (!z)
      throw new Error('Zone not found')
    const hasKing = z.hasKing ?? z.type === 'sauvage'
    if (!hasKing)
      return undefined
    if (!kings.value[id])
      kings.value[id] = kingsData.find(k => k.id === `king-${id}`)!
    return kings.value[id]
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
    if (!zone.maxLevel)
      return 1
    const rank = zone.maxLevel / 5
    return (rank >= 0 ? 2 ** rank : 1)
  })

  function setZone(id: string) {
    if (arena.inBattle)
      return
    if (zones.value.some(z => z.id === id)) {
      const same = currentId.value === id
      currentId.value = id
      selectedAt.value = Date.now()
      const dex = useShlagedexStore()
      if (dex.activeShlagemon && !same)
        dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
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
