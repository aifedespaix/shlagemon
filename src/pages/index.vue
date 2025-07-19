<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: () => t('indexPage.title'),
  meta: [
    { name: 'description', content: t('indexPage.description') },
  ],
})
</script>

<template>
  <div class="mx-auto max-w-160 w-full py-10 text-center">
    <h1 class="mb-4 text-2xl font-bold">
      {{ t('indexPage.welcome') }}
    </h1>
  </div>
</template>
