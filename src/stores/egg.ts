import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { BaseShlagemon, TypeName } from '~/type'
import { defineStore } from 'pinia'
import { baseShlagemons } from '~/data/shlagemons'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { generateRarity } from '~/utils/dexFactory'
import { hatchDurationForRarity } from '~/utils/egg'
import { eggSerializer } from '~/utils/egg-serialize'
import { pickRandom } from '~/utils/spawn'

export type EggType = TypeName

export interface Egg {
  id: number
  type: EggType
  base: BaseShlagemon
  rarity: number
  startedAt: number
  hatchesAt: number
  /**
   * Indicates the egg was created through breeding rather than found in the world.
   */
  isBreeding?: boolean
  /**
   * When provided, forces the egg to hatch into the specified Shlagémon identifier.
   */
  forcedMonId?: string
  /**
   * Overrides the rarity of the hatched Shlagémon. Value is clamped to [1, 100].
   */
  forcedRarity?: number
}

const notifiedReady = new Set<number>()

export const useEggStore = defineStore('egg', () => {
  const incubator = ref<Egg[]>([])
  const dex = useShlagedexStore()
  const now = ref(Date.now())

  interface IncubationConfig {
    isBreeding?: boolean
    forcedMonId?: string
    forcedRarity?: number
  }

  function clampRarity(value: number) {
    return Math.min(100, Math.max(1, value))
  }

  function startIncubation(type: EggType, config: IncubationConfig = {}) {
    if (incubator.value.length >= 4)
      return false

    const { isBreeding, forcedMonId, forcedRarity } = config

    let base: BaseShlagemon | undefined
    if (forcedMonId) {
      const candidate = baseShlagemons.find(b => b.id === forcedMonId)
      if (candidate && candidate.types.some(t => t.id === type) && candidate.speciality !== 'legendary')
        base = candidate
    }
    if (!base) {
      const candidates = baseShlagemons
        .filter(b => b.types.some(t => t.id === type))
        .filter(b => b.speciality !== 'legendary')
      base = pickRandom(candidates)
    }

    const rarity = clampRarity(forcedRarity ?? generateRarity(100))
    const duration = hatchDurationForRarity(rarity)
    const startedAt = Date.now()
    const id = startedAt + Math.random()

    const egg: Egg = {
      id,
      type,
      base,
      rarity,
      startedAt,
      hatchesAt: startedAt + duration,
    }

    if (isBreeding)
      egg.isBreeding = true
    if (forcedMonId)
      egg.forcedMonId = forcedMonId
    if (forcedRarity !== undefined)
      egg.forcedRarity = rarity

    incubator.value.push(egg)
    return true
  }

  function isReady(egg: Egg) {
    return egg.hatchesAt <= now.value
  }

  /**
   * Remaining time before the egg is ready to hatch, in whole seconds.
   */
  function remaining(egg: Egg): number {
    return Math.max(0, Math.ceil((egg.hatchesAt - now.value) / 1000))
  }

  function hatchEgg(id: number) {
    const idx = incubator.value.findIndex(e => e.id === id)
    if (idx === -1)
      return null
    const egg = incubator.value[idx]
    if (egg.hatchesAt > now.value)
      return null
    incubator.value.splice(idx, 1)
    notifiedReady.delete(egg.id)
    const base = egg.forcedMonId
      ? baseShlagemons.find(b => b.id === egg.forcedMonId) ?? egg.base
      : egg.base
    const rarity = clampRarity(egg.forcedRarity ?? egg.rarity)
    return dex.captureShlagemon(base, false, rarity)
  }

  function cancelIncubation(id: number) {
    const idx = incubator.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      notifiedReady.delete(incubator.value[idx].id)
      incubator.value.splice(idx, 1)
    }
  }

  function reset() {
    incubator.value = []
    notifiedReady.clear()
  }

  function notifyReady() {
    now.value = Date.now()
    const readyEggs = incubator.value.filter(egg => isReady(egg) && !notifiedReady.has(egg.id))
    if (!readyEggs.length)
      return
    readyEggs.forEach(egg => notifiedReady.add(egg.id))
    const key = readyEggs.length === 1 ? 'stores.egg.toast.ready' : 'stores.egg.toast.readyMultiple'
    toast.success(i18n.global.t(key, { count: readyEggs.length }))
  }

  useIntervalFn(() => {
    notifyReady()
  }, 1000)

  return { incubator, startIncubation, hatchEgg, cancelIncubation, isReady, remaining, now, reset, notifyReady }
}, {
  persist: {
    pick: ['incubator'],
    serializer: eggSerializer,
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useEggStore>
      if (!Array.isArray(store.incubator))
        store.incubator = []
      store.notifyReady()
    },
  } as PersistedStateOptions,
})
