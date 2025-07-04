import type { Trainer } from '~/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
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

  function next() {
    currentIndex.value += 1
  }

  function reset() {
    queue.value = []
    currentIndex.value = 0
  }

  // init with default trainers
  setQueue(trainersData)

  return { queue, current, next, add, setQueue, reset, levelUpHealPercent }
})
