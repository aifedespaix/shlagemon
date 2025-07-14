import type { Trainer } from '~/types'
import { defineStore } from 'pinia'
import { trainers as trainersData } from '~/data/trainers'

export const useTrainerBattleStore = defineStore('trainerBattle', () => {
  const queue = ref<Trainer[]>([])
  const currentIndex = ref(0)
  const levelUpHealPercent = ref(15)

  function setQueue(list: Trainer[]) {
    queue.value = list
    currentIndex.value = 0
  }

  function add(trainer: Trainer) {
    queue.value.push(trainer)
  }

  const current = computed(() => queue.value[currentIndex.value] ?? null)
  const isActive = computed(() => Boolean(current.value))

  function next() {
    currentIndex.value += 1
  }

  function reset() {
    queue.value = []
    currentIndex.value = 0
  }

  // init with default trainers
  setQueue(trainersData)

  return {
    queue,
    current,
    isActive,
    next,
    add,
    setQueue,
    reset,
    levelUpHealPercent,
  }
})
