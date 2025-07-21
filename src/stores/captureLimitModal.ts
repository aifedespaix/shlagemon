import { defineStore } from 'pinia'

export const useCaptureLimitModalStore = defineStore('captureLimitModal', () => {
  // Do not change mobile tab when showing this modal
  const { isVisible, open: openModal, close } = createModalStore()
  const requiredLevel = ref(0)

  function open(level: number) {
    requiredLevel.value = level
    openModal()
  }

  return { isVisible, requiredLevel, open, close }
})
