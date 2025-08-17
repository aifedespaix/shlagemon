import type { EggType } from './egg'
import type { DexShlagemon } from '~/type/shlagemon'
import { useIntervalFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'
import { findRootAncestorId } from '~/utils/shlagemon-ancestor'
import { useEggBoxStore } from './eggBox'
import { useGameStore } from './game'
import { useShlagedexStore } from './shlagedex'

export interface BreedingJob {
  readonly type: EggType
  readonly rarity: number
  readonly parentId: string
  readonly monId: string
  readonly startedAt: number
  readonly endsAt: number
  status: 'running' | 'completed'
}

export interface BreedingState {
  byType: Record<EggType, BreedingJob | undefined>
  selectedMonId: string | null
}

interface HydratedBreedingStore {
  byType: BreedingState['byType']
  completeIfDue: (type: EggType) => boolean
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

export const useBreedingStore = defineStore('breeding', () => {
  const state = reactive<BreedingState>({
    byType: {},
    selectedMonId: null,
  })

  const now = ref<number>(Date.now())
  const game = useGameStore()
  const eggBox = useEggBoxStore()
  const dex = useShlagedexStore()

  /** ================= Getters sélection / jobs actifs ================== */
  const allJobs = computed<BreedingJob[]>(() =>
    (Object.values(state.byType).filter(Boolean) as BreedingJob[]),
  )

  /** Job prioritaire (running > premier autre, ex: completed). */
  const activeJob = computed<BreedingJob | null>(() => {
    if (!allJobs.value.length)
      return null
    return allJobs.value.find(j => j.status === 'running') ?? allJobs.value[0]
  })

  const selectedMon = computed<DexShlagemon | null>(() => {
    if (!state.selectedMonId)
      return null
    return dex.shlagemons.find(m => m.id === state.selectedMonId) ?? null
  })

  /** EggType actif (issu du job actif s’il existe, sinon du mon sélectionné). */
  const activeEggType = computed<EggType | null>(() => {
    if (activeJob.value)
      return activeJob.value.type
    const mon = selectedMon.value
    return mon ? (mon.base.types[0].id as EggType) : null
  })

  const selectedJob = computed<BreedingJob | null>(() => {
    const t = activeEggType.value
    return t ? (state.byType[t] ?? null) : null
  })

  const isRunningSelected = computed<boolean>(() => selectedJob.value?.status === 'running')
  const isCompletedSelected = computed<boolean>(() => selectedJob.value?.status === 'completed')

  const selectedCost = computed<number>(() => {
    const mon = selectedMon.value
    return mon ? breedingCost(mon.rarity) : 0
  })

  const selectedRemainingMs = computed<number>(() => {
    const t = activeEggType.value
    if (!t)
      return 0
    const job = state.byType[t]
    if (!job || job.status !== 'running')
      return 0
    return Math.max(0, job.endsAt - now.value)
  })

  const selectedProgress = computed<number>(() => {
    const job = selectedJob.value
    if (!job)
      return 0
    const total = job.endsAt - job.startedAt
    if (total <= 0)
      return 1
    return clamp01(1 - selectedRemainingMs.value / total)
  })

  const selectedProgressPercent = computed<number>(() => Math.round(selectedProgress.value * 100))

  const selectedRemainingLabel = computed<string>(() => {
    const total = Math.ceil(selectedRemainingMs.value / 1000)
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${m}:${String(s).padStart(2, '0')}`
  })

  const durationMin = Math.round(BREEDING_DURATION_MS / 60000)

  const typingText = computed<string>(() => {
    const { t, tm } = i18n.global
    const pickIndex = (key: string, fallback = 0): number => {
      const arr = tm(key)
      return Array.isArray(arr) && arr.length > 0
        ? Math.floor(Math.random() * arr.length)
        : fallback
    }

    if (isCompletedSelected.value) {
      const base = 'components.panel.Breeding.during.completed'
      const i = pickIndex(base)
      return t(`${base}.${i}`)
    }

    if (!selectedMon.value) {
      return t('components.panel.Breeding.during.unselected')
    }

    const base = 'components.panel.Breeding.during.selected'
    const i = pickIndex(base)
    return t(`${base}.${i}`, { shlagemon_name: t(selectedMon.value.base.name) })
  })

  /** ================= Helpers par type (existant) ====================== */
  function getJob(type: EggType): BreedingJob | null {
    return state.byType[type] ?? null
  }
  function isRunning(type: EggType): boolean {
    return state.byType[type]?.status === 'running'
  }
  function remainingMs(type: EggType): number {
    const job = state.byType[type]
    if (!job || job.status !== 'running')
      return 0
    return Math.max(0, job.endsAt - now.value)
  }
  function progress(type: EggType): number {
    const job = state.byType[type]
    if (!job)
      return 0
    const total = job.endsAt - job.startedAt
    if (total <= 0)
      return 1
    return clamp01(1 - remainingMs(type) / total)
  }

  /** ================= Actions ========================================= */
  function setSelected(mon: DexShlagemon | string | null): void {
    if (typeof mon === 'string') {
      state.selectedMonId = mon
      return
    }
    state.selectedMonId = mon?.id ?? null
  }

  /** Aligne la sélection sur le job actif (utile quand on ouvre l’écran). */
  function ensureSelectionFromJobs(): void {
    if (!activeJob.value)
      return
    if (state.selectedMonId !== activeJob.value.monId) {
      state.selectedMonId = activeJob.value.monId
    }
  }

  function start(mon: DexShlagemon): boolean {
    const { t } = i18n.global
    const type = mon.base.types[0].id as EggType
    if (state.byType[type])
      return false

    const cost = breedingCost(mon.rarity)
    if (game.shlagidolar < cost)
      return false

    game.addShlagidolar(-cost)
    const startedAt = Date.now()
    state.byType[type] = {
      type,
      rarity: mon.rarity,
      parentId: mon.base.id,
      monId: mon.id,
      startedAt,
      endsAt: startedAt + BREEDING_DURATION_MS,
      status: 'running',
    }
    dex.setBusy(mon.id, true)
    setSelected(mon) // verrou visuel
    toast.success(t('components.panel.Breeding.toast.started'))
    return true
  }

  function startSelected(): boolean {
    const mon = selectedMon.value
    return mon ? start(mon) : false
  }

  function completeIfDue(type: EggType): boolean {
    const job = state.byType[type]
    if (!job || job.status !== 'running')
      return false
    if (now.value < job.endsAt)
      return false
    job.status = 'completed'
    return true
  }

  function collectEgg(type: EggType): boolean {
    const { t } = i18n.global
    const job = state.byType[type]
    if (!job || job.status !== 'completed')
      return false

    const ancestorId = findRootAncestorId(job.parentId)
    eggBox.addBreedingEgg(ancestorId, job.type, job.rarity)

    dex.setBusy(job.monId, false)
    delete state.byType[type]

    if (state.selectedMonId === job.monId) {
      state.selectedMonId = null
    }

    toast.success(t('components.panel.Breeding.toast.collected'))
    return true
  }

  function clearFinished(): void {
    for (const [key, job] of Object.entries(state.byType)) {
      if (job?.status === 'completed') {
        dex.setBusy(job.monId, false)
        delete state.byType[key as EggType]
      }
    }
  }

  const canStartSelected = computed<boolean>(() => {
    const mon = selectedMon.value
    if (!mon)
      return false
    const type = mon.base.types[0].id as EggType
    if (state.byType[type])
      return false
    return game.shlagidolar >= breedingCost(mon.rarity)
  })

  const canCollectSelected = computed<boolean>(() => isCompletedSelected.value)

  /** ================= Effects / ticks ================================= */
  useIntervalFn(() => {
    now.value = Date.now()
    for (const type of Object.keys(state.byType) as EggType[]) {
      const wasDue = completeIfDue(type)
      if (wasDue) {
        const job = state.byType[type]
        // job existe encore, simplement en "completed"
        const mon = job ? dex.shlagemons.find(m => m.id === job.monId) : null
        const name = mon ? i18n.global.t(mon.base.name) : undefined
        if (name) {
          toast.success(i18n.global.t('components.panel.Breeding.toast.finished', { name }))
        }
        else {
          toast.success(i18n.global.t('components.panel.Breeding.toast.finished'))
        }
      }
    }
  }, 1000)

  // À chaque changement de jobs, on s’assure que la sélection colle au job actif.
  watch(
    () => state.byType,
    () => {
      ensureSelectionFromJobs()
    },
    { deep: true, immediate: true },
  )

  return {
    // state
    byType: state.byType,
    selectedMonId: computed(() => state.selectedMonId),

    // jobs
    allJobs,
    activeJob,
    activeEggType,

    // getters objets
    selectedMon,
    selectedJob,
    isRunningSelected,
    isCompletedSelected,
    selectedCost,
    selectedRemainingMs,
    selectedRemainingLabel,
    selectedProgress,
    selectedProgressPercent,
    durationMin,
    typingText,

    // helpers par type
    getJob,
    isRunning,
    remainingMs,
    progress,

    // actions
    setSelected,
    ensureSelectionFromJobs,
    start,
    startSelected,
    completeIfDue,
    collectEgg,
    clearFinished,

    // guards
    canStartSelected,
    canCollectSelected,
  }
}, {
  persist: {
    pick: ['byType', 'selectedMonId'],
    afterHydrate(ctx) {
      const store = ctx.store as HydratedBreedingStore
      const dex = useShlagedexStore()
      for (const type of Object.keys(store.byType) as EggType[]) {
        const job = store.byType[type]
        const wasDue = store.completeIfDue(type)
        if (wasDue) {
          const mon = job ? dex.shlagemons.find(m => m.id === job.monId) : null
          const name = mon ? i18n.global.t(mon.base.name) : undefined
          if (name) {
            toast.success(i18n.global.t('components.panel.Breeding.toast.finished', { name }))
          }
          else {
            toast.success(i18n.global.t('components.panel.Breeding.toast.finished'))
          }
        }
      }
    },
  },
})
