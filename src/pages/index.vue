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
    <h1 class="pokemon-title mb-4 text-2xl font-bold">
      {{ t('pages.indexPage.welcome') }}
    </h1>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Pokemon Hollow';
  src: url('/scripts/clip/Pokemon Hollow.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.pokemon-title {
  font-family: 'Pokemon Hollow', sans-serif;
  color: #c7a008;
  -webkit-text-stroke: 2px #2a75bb;
  /* For browsers supporting the standard property */
  text-stroke: 2px #2a75bb;
}
</style>
