import { defineStore } from 'pinia'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'

/**
 * Parameters for a dojo training job.
 */
export interface DojoTrainingJob {
  readonly monId: string
  readonly startedAt: number
  readonly endsAt: number
  readonly fromRarity: number
  readonly points: number
  readonly targetRarity: number
  readonly paid: number
  readonly status: 'running'
}

const COST_A = 1000
const COST_B = 10000 ** (1 / 98)

/**
 * Compute the total training cost for increasing rarity.
 *
 * @param rarity Current rarity before training.
 * @param points Desired rarity points.
 */
export function dojoTrainingCost(rarity: number, points: number): number {
  const r = Math.max(1, rarity)
  const k = Math.max(0, points)
  const cost = COST_A * COST_B ** (r - 1) * (COST_B ** k - 1) / (COST_B - 1)
  return Math.ceil(cost)
}

export const useDojoStore = defineStore('dojo', () => {
  const byMonId = ref<Record<string, DojoTrainingJob | undefined>>({})
  const game = useGameStore()
  const dex = useShlagedexStore()
  /** Current timestamp used to compute progress for running jobs. */
  const now = ref<number>(Date.now())

  useIntervalFn(() => {
    now.value = Date.now()
    for (const id of Object.keys(byMonId.value))
      completeIfDue(id)
  }, 1000)

  function getJob(monId: string): DojoTrainingJob | null {
    return byMonId.value[monId] ?? null
  }

  function isTraining(monId: string): boolean {
    return Boolean(byMonId.value[monId])
  }

  function remainingMs(monId: string): number {
    const job = byMonId.value[monId]
    if (!job)
      return 0
    return Math.max(0, job.endsAt - now.value)
  }

  function progressRatio(monId: string): number {
    const job = byMonId.value[monId]
    if (!job)
      return 0
    const total = job.endsAt - job.startedAt
    return total > 0 ? 1 - Math.max(0, job.endsAt - now.value) / total : 1
  }

  function startTraining(monId: string, fromRarity: number, points: number) {
    if (points < 1 || fromRarity >= 100)
      return { ok: false as const, reason: 'invalid_points' as const }
    if (isTraining(monId))
      return { ok: false as const, reason: 'already_training' as const }
    const capped = Math.min(points, 100 - fromRarity)
    if (capped < 1)
      return { ok: false as const, reason: 'invalid_points' as const }
    const cost = dojoTrainingCost(fromRarity, capped)
    if (game.shlagidolar < cost)
      return { ok: false as const, reason: 'insufficient_funds' as const }
    game.addShlagidolar(-cost)
    const startedAt = Date.now()
    now.value = startedAt
    byMonId.value[monId] = {
      monId,
      startedAt,
      endsAt: startedAt + capped * 60_000,
      fromRarity,
      points: capped,
      targetRarity: Math.min(100, fromRarity + capped),
      paid: cost,
      status: 'running',
    }
    toast.success(i18n.global.t('components.panel.Dojo.toast.started'))
    return { ok: true as const }
  }

  function completeIfDue(monId: string): boolean {
    const job = byMonId.value[monId]
    if (!job)
      return false
    if (now.value < job.endsAt)
      return false
    const mon = dex.shlagemons.find(m => m.id === monId)
    if (mon)
      mon.rarity = Math.min(100, job.targetRarity)
    delete byMonId.value[monId]
    toast.success(i18n.global.t('components.panel.Dojo.toast.finished'))
    return true
  }

  function clearFinished(): void {
    for (const [id, job] of Object.entries(byMonId.value)) {
      if (job && now.value >= job.endsAt)
        delete byMonId.value[id]
    }
  }

  return {
    byMonId,
    getJob,
    isTraining,
    remainingMs,
    progressRatio,
    startTraining,
    completeIfDue,
    clearFinished,
    now,
  }
}, {
  persist: {
    pick: ['byMonId'],
  },
})
