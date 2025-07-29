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

export function useAutoEquip<T extends { id: string }>(
  items: readonly T[],
  getCount: (id: T['id']) => number,
  priority: (a: T, b: T) => number,
) {
  const current = ref<T['id'] | null>(null)

  const owned = computed(() => {
    const list = items.filter(i => getCount(i.id) > 0)
    return list.sort(priority)
  })

  function equip(id: T['id']) {
    if (owned.value.some(i => i.id === id))
      current.value = id
  }

  watch(owned, (list) => {
    if (current.value && list.some(i => i.id === current.value))
      return
    current.value = list.length ? list[0].id : null
  }, { immediate: true })

  return { current, owned, equip }
}
