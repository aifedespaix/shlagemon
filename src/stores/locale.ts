import type { Locale } from '~/constants/locales'
import { defineStore } from 'pinia'
import { defaultLocale } from '~/constants/locales'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<Locale>(defaultLocale)

  function setLocale(value: Locale) {
    locale.value = value
  }

  return {
    locale,
    setLocale,
  }
}, {
  persist: true,
})
