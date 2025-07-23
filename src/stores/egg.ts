import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { TypeName } from '~/data/shlagemons-type'
import type { BaseShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { allShlagemons } from '~/data/shlagemons'
import { mewteub } from '~/data/shlagemons/mewteub'
import { pickRandomByCoefficient } from '~/utils/spawn'

export type EggType = TypeName

export interface Egg {
  id: number
  type: EggType
  base: BaseShlagemon
  hatchesAt: number
}

export const useEggStore = defineStore('egg', () => {
  const incubator = ref<Egg[]>([])
  const dex = useShlagedexStore()

  function startIncubation(type: EggType) {
    if (incubator.value.length >= 4)
      return false
    let candidates = allShlagemons.filter(b =>
      b.types.some(t => t.id === type),
    )
    if (type === 'psy')
      candidates = candidates.filter(b => b.id !== mewteub.id)
    const base = pickRandomByCoefficient(candidates)
    const duration = (base.coefficient / 10) * 60_000
    const id = Date.now() + Math.random()
    incubator.value.push({ id, type, base, hatchesAt: Date.now() + duration })
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
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useEggStore>
      const raw = (store as any).incubator
      if (Array.isArray(raw))
        store.incubator = [...raw]
      else if (Array.isArray(raw?.value))
        store.incubator = [...raw.value]
      else
        store.incubator = []
    },
  } as PersistedStateOptions,
})
