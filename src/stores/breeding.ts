import type { EggType } from './egg'
import { defineStore } from 'pinia'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'

/**
 * Describes a single breeding job.
 */
export interface BreedingJob {
  /** Type of egg that will be produced. */
  readonly type: EggType
  /** Target rarity applied to the resulting egg. */
  readonly rarity: number
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

export const useBreedingStore = defineStore('breeding', () => {
  const byType = ref<BreedingState['byType']>({})
  const game = useGameStore()
  const eggs = useEggStore()

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
    return Math.max(0, job.endsAt - Date.now())
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
  function start(type: EggType, rarity: number): boolean {
    if (isRunning(type))
      return false
    const cost = breedingCost(rarity)
    if (game.shlagidolar < cost)
      return false
    game.addShlagidolar(-cost)
    const startedAt = Date.now()
    byType.value[type] = {
      type,
      rarity,
      startedAt,
      endsAt: startedAt + BREEDING_DURATION_MS,
      status: 'running',
    }
    return true
  }

  /**
   * Hatch the breeding egg when the job has completed.
   */
  function completeIfDue(type: EggType): boolean {
    const job = byType.value[type]
    if (!job || job.status !== 'running')
      return false
    if (Date.now() < job.endsAt)
      return false
    eggs.startIncubation(type, { isBreeding: true, forcedRarity: job.rarity })
    job.status = 'completed'
    return true
  }

  /**
   * Remove finished jobs from state.
   */
  function clearFinished(): void {
    for (const [key, job] of Object.entries(byType.value)) {
      if (job?.status === 'completed')
        delete byType.value[key as EggType]
    }
  }

  return {
    byType,
    getJob,
    isRunning,
    remainingMs,
    progress,
    start,
    completeIfDue,
    clearFinished,
  }
}, {
  persist: {
    pick: ['byType'],
  },
})
