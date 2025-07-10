import type { DeveloperSettings } from '~/type'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useDeveloperStore = defineStore('developer', () => {
  const settings = reactive<DeveloperSettings>({
    debug: false,
  })
  const { debug } = toRefs(settings)

  function setDebug(value: boolean) {
    debug.value = value
  }

  return {
    debug,
    setDebug,
  }
}, {
  persist: true,
})
