import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  return { current, set }
})
