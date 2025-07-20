import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<'en' | 'fr'>('en')

  function setLocale(value: 'en' | 'fr') {
    locale.value = value
  }

  return {
    locale,
    setLocale,
  }
}, {
  persist: true,
})
