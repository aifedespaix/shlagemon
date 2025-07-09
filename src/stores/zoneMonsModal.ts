import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useZoneMonsModalStore = defineStore('zoneMonsModal', () => {
  const { isVisible, open, close } = createModalStore({ mobileTab: 'game' })
  return { isVisible, open, close }
})
