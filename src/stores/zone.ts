import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const currentId = ref<string>(zones.value[0].id)
  const current = computed(() => zones.value.find(z => z.id === currentId.value)!)

  const rewardMultiplier = computed(() => {
    const zone = current.value
    if (!zone.maxLevel)
      return 1
    const rank = zone.maxLevel / 10 - 1
    return rank >= 0 ? 2 ** rank : 1
  })

  function setZone(id: string) {
    if (zones.value.some(z => z.id === id))
      currentId.value = id
  }

  function reset() {
    currentId.value = zones.value[0].id
  }

  return { zones, current, rewardMultiplier, setZone, reset }
}, {
  persist: {
    pick: ['currentId'],
  },
})
