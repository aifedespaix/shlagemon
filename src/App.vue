<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { useI18n } from 'vue-i18n'

const seoHead = useSeoHead()

const { t } = useI18n()
useHead({
  title: t('App.title'),
  meta: [
    {
      name: 'description',
      content: t('App.description'),
    },
    {
      name: 'keywords',
      content: 'shlagemon, jeu, pokemon, parodie, capture, combat',
    },
    {
      name: 'author',
      content: t('App.author'),
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#1865ab' : '#ffffff',
    },
    {
      property: 'og:title',
      content: t('App.title'),
    },
    {
      property: 'og:description',
      content: t('App.description'),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: () => seoHead.canonicalUrl.value,
    },
    {
      property: 'og:image',
      content: 'https://shlagemon.aife.io/items/shlageball/shlageball.png',
    },
    {
      property: 'og:site_name',
      content: 'Shlagémon',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: t('App.title'),
    },
    {
      name: 'twitter:description',
      content: t('App.description'),
    },
    {
      name: 'twitter:image',
      content: 'https://shlagemon.aife.io/items/shlageball/shlageball.png',
    },
    {
      name: 'twitter:site',
      content: '@shlagemon',
    },
    {
      name: 'twitter:creator',
      content: '@shlagemon',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
    {
      rel: 'image_src',
      href: 'https://shlagemon.aife.io/items/shlageball/shlageball.png',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
