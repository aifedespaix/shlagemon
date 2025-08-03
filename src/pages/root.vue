<script setup lang="ts">
import type { Locale } from '~/constants/locales'
import { availableLocales, defaultLocale } from '~/constants/locales'
import { useLocaleStore } from '~/stores/locale'

const router = useRouter()
const store = useLocaleStore()

/**
 * Check whether a given value is a supported locale.
 */
function isLocale(value: string | null): value is Locale {
  return value !== null && availableLocales.includes(value as Locale)
}

onMounted(() => {
  const stored = store.locale || localStorage.getItem('locale')
  const nav = navigator.language.toLowerCase()
  const fallback = nav.startsWith('fr') ? 'fr' : defaultLocale
  const target = isLocale(stored) ? stored : fallback
  router.replace({ path: `/${target}` })
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://shlagemon.aife.io/en' },
    { rel: 'alternate', hreflang: 'en', href: 'https://shlagemon.aife.io/en' },
    { rel: 'alternate', hreflang: 'fr', href: 'https://shlagemon.aife.io/fr' },
  ],
})
</script>

<template>
  <div />
</template>
