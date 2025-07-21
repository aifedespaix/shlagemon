/**
 * Simple utility to manage modal visibility.
 * Optionally switches the mobile tab when opened.
 */
export function createModalStore(tab?: MobileTab) {
  const isVisible = ref(false)
  const mobile = tab ? useMobileTabStore() : undefined

  function open() {
    if (tab)
      mobile!.set(tab)
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return { isVisible, open, close }
}
