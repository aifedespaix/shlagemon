<script setup lang="ts">
import { useAudioStore } from '~/stores/audio'
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

const audio = useAudioStore()

onMounted(() => {
  if (audio.isMusicEnabled)
    audio.playMusic('/audio/ambient.ogg')
})
</script>

<template>
  <RouterView />
</template>
