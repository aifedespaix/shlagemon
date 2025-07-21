import { defineStore } from 'pinia'

export const useZoneMonsModalStore = defineStore('zoneMonsModal', () => {
  // Keep the current mobile tab when opening this modal so the secondary panel
  // stays visible on mobile
  const { isVisible, open, close } = createModalStore()

  return { isVisible, open, close }
})
