import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useInventoryModalStore = defineStore('inventoryModal', () => {
  const { isVisible, open, close } = createModalStore({ mobileTab: 'game' })
  return { isVisible, open, close }
})
