import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { TypeName } from '~/data/shlagemons-type'
import type { BaseShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { baseShlagemons } from '~/data/shlagemons'
import { eggSerializer } from '~/utils/egg-serialize'
import { pickRandomByCoefficient } from '~/utils/spawn'

export type EggType = TypeName

export interface Egg {
  id: number
  type: EggType
  base: BaseShlagemon
  startedAt: number
  hatchesAt: number
}

export const useEggStore = defineStore('egg', () => {
  const incubator = ref<Egg[]>([])
  const dex = useShlagedexStore()

  function startIncubation(type: EggType) {
    if (incubator.value.length >= 4)
      return false
    const candidates = baseShlagemons
      .filter(b => b.types.some(t => t.id === type))
      .filter(b => !b.legendary)
    const base = pickRandomByCoefficient(candidates)
    const duration = (base.coefficient / 10) * 60_000
    const startedAt = Date.now()
    const id = startedAt + Math.random()
    incubator.value.push({ id, type, base, startedAt, hatchesAt: startedAt + duration })
    return true
  }

  function isReady(egg: Egg) {
    return egg.hatchesAt <= Date.now()
  }

  function hatchEgg(id: number) {
    const idx = incubator.value.findIndex(e => e.id === id)
    if (idx === -1)
      return null
    const egg = incubator.value[idx]
    if (egg.hatchesAt > Date.now())
      return null
    incubator.value.splice(idx, 1)
    return dex.captureShlagemon(egg.base)
  }

  function cancelIncubation(id: number) {
    const idx = incubator.value.findIndex(e => e.id === id)
    if (idx !== -1)
      incubator.value.splice(idx, 1)
  }

  function reset() {
    incubator.value = []
  }

  return { incubator, startIncubation, hatchEgg, cancelIncubation, isReady, reset }
}, {
  persist: {
    pick: ['incubator'],
    serializer: eggSerializer,
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useEggStore>
      if (!Array.isArray(store.incubator))
        store.incubator = []
    },
  } as PersistedStateOptions,
})
