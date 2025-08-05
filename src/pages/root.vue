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
  <div
    v-if="isRedirecting"
    class="h-screen w-screen flex flex-col items-center justify-center from-gray-100 to-white bg-gradient-to-b dark:from-gray-950 dark:to-gray-900"
  >
    <div class="flex items-center gap-3">
      <span
        class="inline-block h-6 w-6 animate-pulse rounded-full bg-sky-500/80"
        aria-hidden="true"
      />
      <span class="text-lg text-gray-600 font-medium dark:text-gray-200">Redirection…</span>
    </div>
    <div class="mt-3 text-sm text-gray-400 italic dark:text-gray-500">
      Veuillez patienter, nous adaptons la langue du site.<br>
      Si la redirection est longue, <a class="underline hover:text-sky-700" href="/en">cliquez ici pour l’anglais</a> ou <a class="underline hover:text-sky-700" href="/fr">ici pour le français</a>.
    </div>
  </div>
  <div v-else />
</template>
