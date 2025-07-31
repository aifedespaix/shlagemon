<script setup lang="ts">
const app = useAppStore()
</script>

<template>
  <div class="relative h-full flex flex-col select-none overflow-hidden">
    <LayoutHeader />
    <LayoutGameGrid class="flex-1" />
    <LayoutMobileMenu />
    <UpdateSnackbar />
    <div
      v-if="!app.isReady"
      class="absolute inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-black/90"
    >
      <UiLoader />
    </div>
  </div>
</template>
