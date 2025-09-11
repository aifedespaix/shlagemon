import { defineStore } from 'pinia'

/**
 * Modal store controlling the visibility of the "missing shlagémons" list.
 */
export const useDexMissingModalStore = defineStore('dexMissingModal', () => {
  const { isVisible, open, close } = createModalStore()
  return { isVisible, open, close }
})
