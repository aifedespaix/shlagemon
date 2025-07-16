import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useZoneMonsModalStore = defineStore('zoneMonsModal', () => {
  // Keep the current mobile tab when opening this modal so the secondary panel
  // stays visible on mobile
  const { isVisible, open, close } = createModalStore()

  return { isVisible, open, close }
})
