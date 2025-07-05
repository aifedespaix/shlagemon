import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

export const useMultiExpStore = defineStore('multiExp', () => {
  const holderId = ref<string | null>(null)
  const isVisible = ref(false)
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()

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
    const previous = holder.value
    if (previous) {
      previous.heldItemId = null
    }
    const mon = dex.shlagemons.find(m => m.id === monId)
    if (mon) {
      mon.heldItemId = 'multi-exp'
      inventory.remove('multi-exp')
    }
    holderId.value = monId
    close()
  }

  function removeHolder() {
    const mon = holder.value
    if (!mon)
      return
    mon.heldItemId = null
    inventory.add('multi-exp')
    holderId.value = null
  }

  return { holderId, holder, isVisible, open, close, setHolder, removeHolder }
}, {
  persist: true,
})
