import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMobileTabStore } from './mobileTab'

export const useCaptureLimitModalStore = defineStore('captureLimitModal', () => {
  const isVisible = ref(false)
  const requiredLevel = ref(0)
  const mobile = useMobileTabStore()

  function open(level: number) {
    requiredLevel.value = level
    mobile.set('game')
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return { isVisible, requiredLevel, open, close }
})
