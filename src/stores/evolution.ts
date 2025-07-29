import type { BaseShlagemon, DexShlagemon } from '~/type'
import { defineStore } from 'pinia'

interface EvolutionRequest {
  mon: DexShlagemon
  to: BaseShlagemon
  resolve: (v: boolean) => void
}

export const useEvolutionStore = defineStore('evolution', () => {
  const queue = ref<EvolutionRequest[]>([])
  const pending = computed(() => queue.value[0] || null)
  const isVisible = computed(() => pending.value !== null)
  const audio = useAudioStore()

  function requestEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    return new Promise<boolean>((resolve) => {
      queue.value.push({ mon, to, resolve })
      if (queue.value.length === 1)
        audio.playSfx('evolution')
    })
  }

  function next() {
    queue.value.shift()
    if (pending.value)
      audio.playSfx('evolution')
  }

  function accept() {
    if (pending.value) {
      audio.playSfx('evolued')
      pending.value.resolve(true)
      next()
    }
  }

  function reject() {
    if (pending.value) {
      pending.value.mon.allowEvolution = false
      pending.value.resolve(false)
      next()
    }
  }

  return { pending, isVisible, requestEvolution, accept, reject }
})
