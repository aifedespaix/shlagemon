<script setup lang="ts">
import { availableLocales, defaultLocale } from '~/constants/locales'
import { useLocaleStore } from '~/stores/locale'

const router = useRouter()
const store = useLocaleStore()

onMounted(() => {
  const stored = store.locale || localStorage.getItem('locale')
  const nav = navigator.language.toLowerCase()
  const fallback = nav.startsWith('fr') ? 'fr' : defaultLocale
  const target = availableLocales.includes(stored as any) ? stored as string : fallback
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
