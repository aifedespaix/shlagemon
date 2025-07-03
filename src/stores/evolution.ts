import type { BaseShlagemon, DexShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface EvolutionRequest {
  mon: DexShlagemon
  to: BaseShlagemon
  resolve: (v: boolean) => void
}

export const useEvolutionStore = defineStore('evolution', () => {
  const pending = ref<EvolutionRequest | null>(null)
  const isVisible = computed(() => pending.value !== null)

  function requestEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    return new Promise<boolean>((resolve) => {
      pending.value = { mon, to, resolve }
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
      pending.value.resolve(false)
      pending.value = null
    }
  }

  return { pending, isVisible, requestEvolution, accept, reject }
})
