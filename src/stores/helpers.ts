import type { MobileTab } from './mobileTab'
import { ref } from 'vue'
import { useMobileTabStore } from './mobileTab'

export function createModalStore(options?: { mobileTab?: MobileTab }) {
  const isVisible = ref(false)

  function open() {
    if (options?.mobileTab)
      useMobileTabStore().set(options.mobileTab)
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return { isVisible, open, close }
}
