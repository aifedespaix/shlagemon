import { defineStore } from 'pinia'

export const useTypeChartModalStore = defineStore('typeChartModal', () => {
  const { isVisible, open: openModal, close } = createModalStore('game')
  const highlight = ref<string | null>(null)

  function open(typeId: string) {
    highlight.value = typeId
    openModal()
  }

  return { isVisible, highlight, open, close }
})
