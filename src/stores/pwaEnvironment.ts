import { defineStore } from 'pinia'

/**
 * Store exposing the current PWA environment state.
 */
export const usePwaEnvironmentStore = defineStore('pwaEnvironment', () => {
  const env = usePwaEnvironment()
  return env
})
