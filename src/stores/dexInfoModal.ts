import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'

export const useDexInfoModalStore = defineStore('dexInfoModal', () => {
  // Keep the current mobile tab so opening the modal doesn't hide
  // the secondary panel on small screens
  const { isVisible, open: openModal, close } = createModalStore()
  const mon = ref<DexShlagemon | null>(null)

  function open(target: DexShlagemon) {
    mon.value = target
    openModal()
  }

  return { isVisible, mon, open, close }
})
