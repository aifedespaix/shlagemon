import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createModalStore } from './helpers'

export const useEggHatchModalStore = defineStore('eggHatchModal', () => {
  const { isVisible, open: openModal, close } = createModalStore()
  const mon = ref<DexShlagemon | null>(null)

  function open(newMon: DexShlagemon) {
    mon.value = newMon
    openModal()
  }

  return { isVisible, mon, open, close }
})
