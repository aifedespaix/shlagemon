<script setup lang="ts">
import { useHead } from '@unhead/vue'

useLocaleRedirect('/')

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
