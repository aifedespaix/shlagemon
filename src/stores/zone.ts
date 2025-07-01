import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const currentId = ref<string>(zones.value[0].id)
  const current = computed(() => zones.value.find(z => z.id === currentId.value)!)

  function setZone(id: string) {
    if (zones.value.some(z => z.id === id))
      currentId.value = id
  }

  function reset() {
    currentId.value = zones.value[0].id
  }

  return { zones, current, setZone, reset }
}, {
  persist: {
    paths: ['currentId'],
  },
})
