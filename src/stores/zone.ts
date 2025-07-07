import type { Trainer } from '~/type/trainer'
import type { Zone } from '~/type/zone'
import { useNow } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { kings as kingsData } from '~/data/kings'
import { zonesData } from '~/data/zones'
import { useArenaStore } from './arena'
import { useShlagedexStore } from './shlagedex'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const currentId = ref<string>(zones.value[0].id)
  const selectedAt = ref<number>(Date.now())
  const arena = useArenaStore()
  const now = useNow({ interval: 100 })
  const current = computed(() => {
    const zone = zones.value.find(z => z.id === currentId.value)
    return zone ?? zones.value[0]
  })
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

  const rewardMultiplier = computed(() => {
    const zone = current.value
    if (!zone.maxLevel)
      return 1
    const rank = zone.maxLevel / 10 - 1
    return rank >= 0 ? 2 ** rank : 1
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
        dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
    }
  }

  function reset() {
    currentId.value = zones.value[0].id
  }

  return {
    zones,
    current,
    selectedAt,
    wildCooldownRemaining,
    rewardMultiplier,
    setZone,
    getKing,
    getZoneRank,
    reset,
  }
}, {
  persist: {
    pick: ['currentId'],
  },
})
