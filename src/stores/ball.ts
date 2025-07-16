import { defineStore } from 'pinia'
import { balls } from '~/data/items/shlageball'

export type BallId = 'shlageball' | 'super-shlageball' | 'hyper-shlageball'

export const useBallStore = defineStore('ball', () => {
  const current = ref<BallId>('shlageball')
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
    current.value = 'shlageball'
  }

  return { current, currentBall, isVisible, open, close, setBall, reset }
}, {
  // only keep the current ball across reloads
  persist: {
    pick: ['current'],
  },
})
