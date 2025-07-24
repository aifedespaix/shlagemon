import type { BallId } from '~/data/items/shlageball'
import { defineStore } from 'pinia'
import { balls, shlageball } from '~/data/items/shlageball'

export const useBallStore = defineStore('ball', () => {
  const current = ref<BallId>(shlageball.id)
  const isVisible = ref(false)

  const currentBall = computed(() =>
    balls.find(b => b.id === current.value)!,
  )

  function open() {
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  function setBall(id: BallId) {
    current.value = id
    close()
  }

  function reset() {
    current.value = shlageball.id
  }

  return { current, currentBall, isVisible, open, close, setBall, reset }
}, {
  // only keep the current ball across reloads
  persist: {
    pick: ['current'],
  },
})
