import type { Item } from '~/type/item'
import { defineStore } from 'pinia'
import { createModalStore } from './helpers'

export const useItemShortcutModalStore = defineStore('itemShortcutModal', () => {
  const { isVisible, open: openModal, close } = createModalStore()
  const current = ref<Item | null>(null)

  function open(item: Item) {
    current.value = item
    openModal()
  }

  return { isVisible, current, open, close }
})
