import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useCaptureLimitModalStore = defineStore('captureLimitModal', () => {
  const { isVisible, open: openModal, close } = createModalStore('game')
  const requiredLevel = ref(0)

  function open(level: number) {
    requiredLevel.value = level
    openModal()
  }

  return { isVisible, requiredLevel, open, close }
})
