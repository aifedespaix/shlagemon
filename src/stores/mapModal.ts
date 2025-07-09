import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useMapModalStore = defineStore('mapModal', () => {
  const { isVisible, open, close } = createModalStore({ mobileTab: 'game' })
  return { isVisible, open, close }
})
