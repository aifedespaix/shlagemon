import { defineStore } from 'pinia'

export const useWildLevelStore = defineStore('wildLevel', () => {
  const dex = useShlagedexStore()
  const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

  const highestWildLevel = computed(() => {
    const wildZones = accessibleZones.value
      .filter(z => z.type === 'sauvage')
    const last = wildZones[wildZones.length - 1]
    return last?.maxLevel ?? 1
  })

  return { highestWildLevel }
})
