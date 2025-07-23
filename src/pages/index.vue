<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: () => t('pages.index.title'),
  meta: [
    { name: 'description', content: t('pages.index.description') },
  ],
})
</script>

<template>
  <div class="mx-auto max-w-160 w-full py-10 text-center">
    <h1 class="mb-4 text-2xl font-bold">
      {{ t('pages.index.welcome') }}
    </h1>
  </div>
</template>
