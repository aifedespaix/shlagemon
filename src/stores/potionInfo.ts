import { defineStore } from 'pinia'

export const usePotionInfoStore = defineStore('potionInfo', () => {
  const pending = ref(false)
  const shown = ref(false)

  function trigger() {
    if (!shown.value)
      pending.value = true
  }

  function markShown() {
    pending.value = false
    shown.value = true
  }

  function reset() {
    pending.value = false
    shown.value = false
  }

  return { pending, shown, trigger, markShown, reset }
}, {
  persist: true,
})
