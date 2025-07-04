import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapModalStore = defineStore('mapModal', () => {
  const isVisible = ref(false)

  function open() {
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return { isVisible, open, close }
})
