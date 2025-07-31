import { defineStore } from 'pinia'

/**
 * Global application state.
 * Tracks whether stores have finished hydrating so the UI can display
 * a loading indicator while initializing.
 */
export const useAppStore = defineStore('app', () => {
  const isReady = ref(false)

  function setReady(value = true) {
    isReady.value = value
  }

  return { isReady, setReady }
})
