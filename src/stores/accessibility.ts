import { defineStore } from 'pinia'

/**
 * Accessibility preferences controlling optional UI behaviours.
 */
export const useAccessibilityStore = defineStore('accessibility', () => {
  /**
   * Whether tooltips automatically close after a delay.
   * Defaults to true for classic behaviour.
   */
  const autoHideTooltips = ref(true)

  function setAutoHideTooltips(value: boolean) {
    autoHideTooltips.value = value
  }

  return { autoHideTooltips, setAutoHideTooltips }
}, {
  persist: true,
})
