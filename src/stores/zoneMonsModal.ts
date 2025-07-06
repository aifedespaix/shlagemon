import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMobileTabStore } from './mobileTab'

export const useZoneMonsModalStore = defineStore('zoneMonsModal', () => {
  const isVisible = ref(false)
  const mobile = useMobileTabStore()

  function open() {
    mobile.set('game')
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return { isVisible, open, close }
})
