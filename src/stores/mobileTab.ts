import { defineStore } from 'pinia'

export type MobileTab
  = | 'game'
    | 'achievements'
    | 'zones'
    | 'dex'
    | 'inventory'

export const useMobileTabStore = defineStore('mobileTab', () => {
  const current = ref<MobileTab>('game')
  const last = ref<Exclude<MobileTab, 'game'> | null>(null)

  function set(tab: MobileTab) {
    if (tab !== 'game')
      last.value = tab
    current.value = tab
  }

  function toggle(tab: MobileTab) {
    if (current.value === tab)
      set('game')
    else
      set(tab)
  }

  /**
   * Toggles between the game view and the previously active secondary tab.
   * Optionally checks if the stored tab can be reopened.
   *
   * @param canOpen - Predicate returning true when the tab is allowed.
   */
  function toggleGame(canOpen?: (tab: Exclude<MobileTab, 'game'>) => boolean) {
    if (current.value === 'game') {
      if (last.value && (!canOpen || canOpen(last.value)))
        current.value = last.value
    }
    else {
      current.value = 'game'
    }
  }

  return { current, last, set, toggle, toggleGame }
}, {
  persist: true,
})
