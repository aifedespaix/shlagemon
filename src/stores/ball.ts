import type { BallId } from '~/data/items/shlageball'
import { defineStore } from 'pinia'
import { balls, shlageball } from '~/data/items/shlageball'
import { useAutoEquip } from './helpers'
import { useInventoryStore } from './inventory'

export const useBallStore = defineStore('ball', () => {
  const inventory = useInventoryStore()
  const { current, owned, equip } = useAutoEquip(
    balls,
    id => inventory.items[id] || 0,
    (a, b) => b.catchBonus - a.catchBonus,
  )
  const isVisible = ref(false)

  const currentBall = computed(() =>
    current.value ? balls.find(b => b.id === current.value) || null : null,
  )

  function open() {
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  function equipBall(id: BallId) {
    equip(id)
    close()
  }

  function reset() {
    current.value = shlageball.id
  }

  return {
    current,
    owned,
    currentBall,
    isVisible,
    open,
    close,
    equip: equipBall,
    reset,
  }
}, {
  // only keep the current ball across reloads
  persist: {
    pick: ['current'],
  },
})
