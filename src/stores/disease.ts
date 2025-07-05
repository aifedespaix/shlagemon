import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useEventStore } from './event'

export const useDiseaseStore = defineStore('disease', () => {
  const active = ref(false)
  const remaining = ref(0)
  const events = useEventStore()

  function start() {
    active.value = true
    remaining.value = 100
    toast('Votre Schlagémon est malade !')
  }

  function clear() {
    active.value = false
    remaining.value = 0
  }

  function onBattleEnd() {
    if (active.value) {
      remaining.value -= 1
      if (remaining.value <= 0)
        clear()
    }
    else if (Math.random() < 0.00001) {
      start()
    }
  }

  events.on('battle:end', onBattleEnd)

  return { active, remaining, start }
}, {
  persist: true,
})
