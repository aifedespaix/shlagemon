import type { TypeName } from '~/data/shlagemons-type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { bulgrosboule } from '~/data/shlagemons/bulgrosboule'
import { carapouffe } from '~/data/shlagemons/carapouffe'
import { salamiches } from '~/data/shlagemons/salamiches'
import { useShlagedexStore } from './shlagedex'

export type EggType = TypeName

export interface Egg {
  id: number
  type: EggType
  hatchesAt: number
}

export const useEggStore = defineStore('egg', () => {
  const incubator = ref<Egg | null>(null)
  const dex = useShlagedexStore()

  function startIncubation(type: EggType, duration = 60_000) {
    if (incubator.value)
      return false
    const id = Date.now() + Math.random()
    incubator.value = { id, type, hatchesAt: Date.now() + duration }
    return true
  }

  const isReady = computed(() =>
    incubator.value ? incubator.value.hatchesAt <= Date.now() : false,
  )

  function hatchEgg() {
    const egg = incubator.value
    if (!egg || egg.hatchesAt > Date.now())
      return null
    incubator.value = null
    switch (egg.type) {
      case 'feu':
        return dex.captureShlagemon(salamiches)
      case 'eau':
        return dex.captureShlagemon(carapouffe)
      case 'plante':
        return dex.captureShlagemon(bulgrosboule)
    }
    return null
  }

  function reset() {
    incubator.value = null
  }

  return { incubator, startIncubation, hatchEgg, isReady, reset }
}, {
  persist: true,
})
