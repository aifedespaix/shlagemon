import { defineStore } from 'pinia'
import { useFeatureLockStore } from './featureLock'
import { createModalStore } from './helpers'

export const useInventoryModalStore = defineStore('inventoryModal', () => {
  const { isVisible, open: openModal, close } = createModalStore('game')
  const lockStore = useFeatureLockStore()

  function open() {
    if (lockStore.isInventoryLocked)
      return
    openModal()
  }

  return { isVisible, open, close }
})
