import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useEventStore } from './event'

export const useDiseaseStore = defineStore('disease', () => {
  const active = ref(false)
  const remaining = ref(0)
  const probability = 1
  // const probability = 0.00001
  const events = useEventStore()

  function start() {
    active.value = true
    remaining.value = Math.round(Math.random() * 10)
    toast(`Votre Schlagémon est malade ! Il reviendra à la normal après avoir gagné ${remaining.value} combats.`)
  }

  function clear() {
    active.value = false
    remaining.value = 0
    toast(`Votre Schlagémon n'est plus malade !`)
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

  return { active, remaining, start }
}, {
  persist: true,
})
