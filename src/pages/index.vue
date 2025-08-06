<script setup lang="ts">
const { t } = useI18n()
usePageHead({
  title: () => t('pages.index.title'),
  description: () => t('pages.index.description'),
})
const app = useAppStore()
</script>

<template>
  <div class="relative h-full flex flex-col select-none overflow-hidden animate-fade-in">
    <LayoutHeader />
    <LayoutGameGrid class="flex-1" />
    <LayoutMobileMenu />
    <UpdateSnackbar />
    <Loader v-if="!app.isReady"/>
  </div>
</template>
