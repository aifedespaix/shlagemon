<script setup lang="ts">
import type { Locale } from '~/constants/locales'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'
import { availableLocales, defaultLocale } from '~/constants/locales'
import { useLocaleStore } from '~/stores/locale'

const router = useRouter()
const store = useLocaleStore()
const isRedirecting = ref(true) // Pour l'affichage du loader

/**
 * Teste si une chaîne est une locale supportée.
 */
function isLocale(value: string | null): value is Locale {
  return value !== null && availableLocales.includes(value as Locale)
}

onMounted(async () => {
  let targetLocale: Locale | undefined

  // 1. Locale stockée explicitement par l'utilisateur (préférence forte)
  const stored = localStorage.getItem('locale')
  if (isLocale(stored)) {
    targetLocale = stored
  }

  // 2. Store Pinia, utile en SSR/hydratation ou session restaurée
  if (!targetLocale && isLocale(store.locale) && store.locale !== defaultLocale) {
    targetLocale = store.locale
  }

  // 3. Détection navigateur (au premier accès)
  if (!targetLocale) {
    const nav = navigator.language.toLowerCase()
    targetLocale = nav.startsWith('fr') ? 'fr' : defaultLocale
  }

  // On enregistre la locale dans le store pour consistance globale
  if (targetLocale !== store.locale)
    store.setLocale(targetLocale)

  // On redirige (petit délai pour l’UX, au cas où)
  setTimeout(async () => {
    await router.replace({ path: `/${targetLocale}` })
    isRedirecting.value = false
  }, 200) // 200ms pour que le loader s’affiche même sur les réseaux rapides
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
  <Loader />
</template>
