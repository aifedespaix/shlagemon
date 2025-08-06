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

  /**
   * Queue an evolution request for the given Shlagémon.
   *
   * Duplicate requests for the same target are ignored to prevent multiple
   * prompts in a single sequence.
   *
   * @param mon - The Shlagémon that might evolve.
   * @param to - The target base form after evolution.
   * @returns Promise resolving to `true` when the evolution was accepted by the
   * user, `false` otherwise.
   */
  function requestEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    if (queue.value.some(req => req.mon.id === mon.id && req.to.id === to.id))
      return Promise.resolve(false)
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
