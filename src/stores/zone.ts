import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const current = ref<Zone>(zones.value[0])

  function setZone(id: string) {
    const zone = zones.value.find(z => z.id === id)
    if (zone)
      current.value = zone
  }

  function reset() {
    current.value = zones.value[0]
  }

  return { zones, current, setZone, reset }
}, {
  persist: true,
})
