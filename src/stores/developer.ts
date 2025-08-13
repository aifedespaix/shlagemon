import type { DeveloperSettings } from '~/type'
import { defineStore } from 'pinia'

export const useDeveloperStore = defineStore('developer', () => {
  const settings = reactive<DeveloperSettings>({
    debug: false,
  })
  const { debug } = toRefs(settings)

  function setDebug(value: boolean) {
    debug.value = value
  }

  function reset() {
    debug.value = false
  }

  return {
    debug,
    setDebug,
    reset,
  }
}, {
  persist: true,
})
