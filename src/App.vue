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
      name: 'theme-color',
      content: () => isDark.value ? '#0d9488' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
