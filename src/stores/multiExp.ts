import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useShlagedexStore } from './shlagedex'

export const useMultiExpStore = defineStore('multiExp', () => {
  const holderId = ref<string | null>(null)
  const isVisible = ref(false)
  const dex = useShlagedexStore()

  const holder = computed(() =>
    holderId.value ? dex.shlagemons.find(m => m.id === holderId.value) || null : null,
  )

  function open() {
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  function setHolder(monId: string) {
    holderId.value = monId
    close()
  }

  return { holderId, holder, isVisible, open, close, setHolder }
}, {
  persist: true,
})
