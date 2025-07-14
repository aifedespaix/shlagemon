import { defineStore } from 'pinia'

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
