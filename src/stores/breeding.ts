import type { EggType } from './egg'
import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'
import { findRootAncestorId } from '~/utils/shlagemon-ancestor'
import { useEggBoxStore } from './eggBox'
import { useShlagedexStore } from './shlagedex'

/**
 * Describes a single breeding job.
 */
export interface BreedingJob {
  /** Type of egg that will be produced. */
  readonly type: EggType
  /** Target rarity applied to the resulting egg. */
  readonly rarity: number
  /** Identifier of the parent Shlagémon base. */
  readonly parentId: string
  /** Identifier of the parent Shlagémon instance. */
  readonly monId: string
  /** Timestamp when the job started in milliseconds. */
  readonly startedAt: number
  /** Timestamp when the job ends in milliseconds. */
  readonly endsAt: number
  /** Current status of the job. */
  status: 'running' | 'completed'
}

/**
 * Shape of the breeding store state.
 */
export interface BreedingState {
  /** Mapping of breeding jobs by egg type. */
  byType: Record<EggType, BreedingJob | undefined>
}

/**
 * Minimal shape of the store used during hydration.
 */
interface HydratedBreedingStore {
  byType: BreedingState['byType']
  completeIfDue: (type: EggType) => boolean
}

export const useBreedingStore = defineStore('breeding', () => {
  const byType = ref<BreedingState['byType']>({})
  const now = ref(Date.now())
  const game = useGameStore()
  const eggBox = useEggBoxStore()
  const dex = useShlagedexStore()

  /**
   * Retrieve the job associated with the given type.
   */
  function getJob(type: EggType): BreedingJob | null {
    return byType.value[type] ?? null
  }

  /**
   * Determine if a breeding job is currently running for the type.
   */
  function isRunning(type: EggType): boolean {
    return byType.value[type]?.status === 'running'
  }

  /**
   * Milliseconds remaining before job completion.
   */
  function remainingMs(type: EggType): number {
    const job = byType.value[type]
    if (!job || job.status !== 'running')
      return 0
    return Math.max(0, job.endsAt - now.value)
  }

  /**
   * Progress ratio of the job in the [0,1] range.
   */
  function progress(type: EggType): number {
    const job = byType.value[type]
    if (!job)
      return 0
    const total = job.endsAt - job.startedAt
    return total > 0 ? 1 - remainingMs(type) / total : 1
  }

  /**
   * Start a breeding job if enough currency is available.
   *
   * @returns `true` when the job started successfully.
   */
  function start(mon: DexShlagemon): boolean {
    const type = mon.base.types[0].id as EggType
    if (byType.value[type])
      return false
    const cost = breedingCost(mon.rarity)
    if (game.shlagidolar < cost)
      return false
    game.addShlagidolar(-cost)
    const startedAt = Date.now()
    byType.value[type] = {
      type,
      rarity: mon.rarity,
      parentId: mon.base.id,
      monId: mon.id,
      startedAt,
      endsAt: startedAt + BREEDING_DURATION_MS,
      status: 'running',
    }
    dex.setBusy(mon.id, true)
    toast.success(i18n.global.t('components.panel.Breeding.toast.started'))
    return true
  }

  /**
   * Hatch the breeding egg when the job has completed.
   */
  function completeIfDue(type: EggType): boolean {
    const job = byType.value[type]
    if (!job || job.status !== 'running')
      return false
    if (now.value < job.endsAt)
      return false
    job.status = 'completed'
    dex.setBusy(job.monId, false)
    return true
  }

  /**
   * Collect the egg from a completed job and move it to the egg box.
   *
   * The resulting egg always references the earliest known ancestor of the
   * selected parent so that breeding an evolved Shlagémon yields the base
   * form's egg.
   */
  function collectEgg(type: EggType): boolean {
    const job = byType.value[type]
    if (!job || job.status !== 'completed')
      return false
    const ancestorId = findRootAncestorId(job.parentId)
    eggBox.addBreedingEgg(ancestorId, job.type, job.rarity)
    delete byType.value[type]
    toast.success(i18n.global.t('components.panel.Breeding.toast.collected'))
    return true
  }

  /**
   * Remove finished jobs from state.
   */
  function clearFinished(): void {
    for (const [key, job] of Object.entries(byType.value)) {
      if (job?.status === 'completed') {
        delete byType.value[key as EggType]
        dex.setBusy(job.monId, false)
      }
    }
  }

  useIntervalFn(() => {
    now.value = Date.now()
    for (const type of Object.keys(byType.value) as EggType[]) {
      if (completeIfDue(type))
        toast.success(i18n.global.t('components.panel.Breeding.toast.finished'))
    }
  }, 1000)

  return {
    byType,
    getJob,
    isRunning,
    remainingMs,
    progress,
    start,
    completeIfDue,
    collectEgg,
    clearFinished,
  }
}, {
  persist: {
    pick: ['byType'],
    afterHydrate(ctx) {
      const store = ctx.store as HydratedBreedingStore
      for (const type of Object.keys(store.byType) as EggType[]) {
        if (store.completeIfDue(type))
          toast.success(i18n.global.t('components.panel.Breeding.toast.finished'))
      }
    },
  },
})
