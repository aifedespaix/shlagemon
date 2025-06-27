<script setup lang="ts">
// future grid logic
</script>

<template>
  <div
    class="game grid grid-cols-12 grid-rows-12 h-full gap-2"
    md="flex flex-col h-auto"
  >
    <div class="zone left col-span-3 row-span-12" md="col-span-12 row-span-1" />
    <div class="zone right col-span-3 row-span-12 col-start-10" md="col-span-12 row-span-1" />
    <div class="zone top col-span-6 row-span-1 col-start-4" md="col-span-12 row-span-1" />
    <div class="zone center col-span-6 row-span-9 col-start-4 row-start-2" md="col-span-12 row-span-1">
      <slot />
    </div>
    <div class="zone bottom col-span-6 row-span-2 col-start-4 row-start-11" md="col-span-12 row-span-1" />
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
}
.game {
  background-color: var(--un-background, theme('colors.white'));
}
</style>
