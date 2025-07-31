import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'

export const useDexInfoModalStore = defineStore('dexInfoModal', () => {
  const { isVisible, open: openModal, close } = createModalStore('game')
  const mon = ref<DexShlagemon | null>(null)

  function open(target: DexShlagemon) {
    mon.value = target
    openModal()
  }

  return { isVisible, mon, open, close }
})
