import { defineStore } from 'pinia'

export const useTypeChartModalStore = defineStore('typeChartModal', () => {
  // Avoid switching mobile tabs to keep panels visible when opening the modal
  const { isVisible, open: openModal, close } = createModalStore()
  const highlight = ref<string | null>(null)

  function open(typeId: string) {
    highlight.value = typeId
    openModal()
  }

  return { isVisible, highlight, open, close }
})
