import { defineStore } from 'pinia'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'

export const useGameStore = defineStore('game', () => {
  const shlagidolar = ref(0)
  const shlagidiamond = ref(0)
  const shlagpur = ref(0)

  interface CurrencyOptions {
    toast?: boolean
  }

  function addShlagidolar(amount: number, options: CurrencyOptions = {}) {
    shlagidolar.value = Math.ceil(shlagidolar.value + amount)
    if (amount > 0 && options.toast)
      toast.success(i18n.global.t('stores.game.toast.shlagidolar', { amount }))
  }

  function addShlagidiamond(amount: number, options: CurrencyOptions = {}) {
    shlagidiamond.value += amount
    if (amount > 0 && options.toast)
      toast.success(i18n.global.t('stores.game.toast.shlagidiamond', { amount }))
  }

  function addShlagpur(amount: number, options: CurrencyOptions = {}) {
    shlagpur.value += amount
    if (amount > 0 && options.toast)
      toast.success(i18n.global.t('stores.game.toast.shlagpur', { amount }))
  }

  function reset() {
    shlagidolar.value = 0
    shlagidiamond.value = 0
    shlagpur.value = 0
  }

  return { shlagidolar, shlagidiamond, shlagpur, addShlagidolar, addShlagidiamond, addShlagpur, reset }
}, {
  persist: true,
})
