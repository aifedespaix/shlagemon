import type { Trainer } from '~/types'
import { defineStore } from 'pinia'
import { trainers as trainersData } from '~/data/trainers'

/**
 * Percentage of missing health restored when a shlagemon levels up.
 */
const DEFAULT_LEVEL_UP_HEAL_PERCENT = 15

/**
 * Percentage of missing health restored after defeating a trainer.
 */
const DEFAULT_WIN_HEAL_PERCENT = 15

export type TrainerBattleMode = 'standard' | 'final'

export const useTrainerBattleStore = defineStore('trainerBattle', () => {
  const queue = ref<Trainer[]>([])
  const currentIndex = ref(0)
  const mode = ref<TrainerBattleMode>('standard')
  const levelUpHealPercent = ref(DEFAULT_LEVEL_UP_HEAL_PERCENT)
  const winHealPercent = ref(DEFAULT_WIN_HEAL_PERCENT)

  function setQueue(list: Trainer[], options?: { mode?: TrainerBattleMode }) {
    queue.value = list
    currentIndex.value = 0
    mode.value = options?.mode ?? 'standard'
  }

  function add(trainer: Trainer) {
    queue.value.push(trainer)
  }

  const current = computed(() => queue.value[currentIndex.value] ?? null)
  const isActive = computed(() => Boolean(current.value))
  const isFinalBattle = computed(() => mode.value === 'final')

  function next() {
    currentIndex.value += 1
  }

  function reset() {
    queue.value = []
    currentIndex.value = 0
    mode.value = 'standard'
  }

  // init with default trainers
  setQueue(trainersData)

  return {
    queue,
    current,
    isActive,
    isFinalBattle,
    next,
    add,
    setQueue,
    mode,
    reset,
    levelUpHealPercent,
    winHealPercent,
  }
})
