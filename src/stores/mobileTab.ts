import { defineStore } from 'pinia'

export type MobileTab =
  | 'game'
  | 'achievements'
  | 'zones'
  | 'dex'
  | 'inventory'

export const useMobileTabStore = defineStore('mobileTab', () => {
  const current = ref<MobileTab>('game')
  function set(tab: MobileTab) {
    current.value = tab
  }
  function toggle(tab: MobileTab) {
    current.value = current.value === tab ? 'game' : tab
  }
  return { current, set, toggle }
}, {
  persist: true,
})
