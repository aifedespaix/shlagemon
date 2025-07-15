import type { BaseShlagemon, DexShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { useAudioStore } from './audio'

interface EvolutionRequest {
  mon: DexShlagemon
  to: BaseShlagemon
  resolve: (v: boolean) => void
}

export const useEvolutionStore = defineStore('evolution', () => {
  const pending = ref<EvolutionRequest | null>(null)
  const isVisible = computed(() => pending.value !== null)
  const audio = useAudioStore()

  function requestEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    return new Promise<boolean>((resolve) => {
      pending.value = { mon, to, resolve }
      audio.playSfx('/audio/sfx/evolution.ogg')
    })
  }

  function accept() {
    if (pending.value) {
      pending.value.resolve(true)
      pending.value = null
    }
  }

  function reject() {
    if (pending.value) {
      pending.value.mon.allowEvolution = false
      pending.value.resolve(false)
      pending.value = null
    }
  }

  return { pending, isVisible, requestEvolution, accept, reject }
})
