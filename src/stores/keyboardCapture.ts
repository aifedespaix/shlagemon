import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKeyboardCaptureStore = defineStore('keyboardCapture', () => {
  const capturing = ref(false)
  function start() {
    capturing.value = true
  }
  function stop() {
    capturing.value = false
  }
  return { capturing, start, stop }
})
