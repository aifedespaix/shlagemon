<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: () => t('pages.indexPage.title'),
  meta: [
    { name: 'description', content: t('pages.indexPage.description') },
  ],
})
</script>

<template>
  <div class="mx-auto max-w-160 w-full py-10 text-center">
    <h1 class="mb-4 text-2xl font-bold">
      {{ t('pages.indexPage.welcome') }}
    </h1>
  </div>
</template>
