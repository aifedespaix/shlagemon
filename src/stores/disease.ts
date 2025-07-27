import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useDiseaseStore = defineStore('disease', () => {
  const active = ref(false)
  const remaining = ref(0)
  const probability = 0.00001
  const events = useEventStore()

  function start() {
    active.value = true
    remaining.value = Math.round(Math.random() * 10)
    toast(`Votre Shlagémon est malade ! Il reviendra à la normal après avoir gagné ${remaining.value} combats.`)
  }

  function clear() {
    active.value = false
    remaining.value = 0
    toast(`Votre Shlagémon n'est plus malade !`)
  }

  function reset() {
    active.value = false
    remaining.value = 0
  }

  function onBattleEnd() {
    if (active.value) {
      remaining.value -= 1
      if (remaining.value <= 0)
        clear()
    }
    else if (Math.random() < probability) {
      start()
    }
  }

  events.on('battle:end', onBattleEnd)

  return { active, remaining, start, reset }
}, {
  persist: {
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useDiseaseStore>
      if (typeof store.active !== 'object')
        store.active.value = Boolean(store.active)
      if (typeof store.remaining !== 'object')
        store.remaining.value = Number(store.remaining) || 0
    },
  },
})
