import type { TypeName } from '~/type'
import { defineStore } from 'pinia'

/**
 * Modal store controlling visibility of the Type Chart and the highlighted type.
 */
export const useTypeChartModalStore = defineStore('typeChartModal', () => {
  // Avoid switching mobile tabs to keep panels visible when opening the modal
  const { isVisible, open: openModal, close } = createModalStore()
  const highlight = ref<TypeName | null>(null)

  /**
   * Opens the modal and highlights the provided type.
   *
   * @param typeId - Identifier of the type to emphasize.
   */
  function open(typeId: TypeName) {
    highlight.value = typeId
    openModal()
  }

  return { isVisible, highlight, open, close }
})
