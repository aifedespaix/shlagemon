<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Shlagémon - Ça sent très fort',
  meta: [
    {
      name: 'description',
      content: 'Attrapes tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
    },
    {
      name: 'keywords',
      content: 'shlagemon, jeu, pokemon, parodie, capture, combat',
    },
    {
      name: 'author',
      content: 'Shlagémon Team',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#0d9488' : '#ffffff',
    },
    {
      property: 'og:title',
      content: 'Shlagémon - Ça sent très fort',
    },
    {
      property: 'og:description',
      content: 'Attrapes tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://shlagemon.aife.io',
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
      content: 'Shlagémon - Ça sent très fort',
    },
    {
      name: 'twitter:description',
      content: 'Attrapes tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
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
      rel: 'canonical',
      href: 'https://shlagemon.aife.io',
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
