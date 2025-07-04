<script setup lang="ts">
import MobileMenu from '~/components/layout/MobileMenu.vue'
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <Header />
    <GameGrid class="flex-1" />
    <MobileMenu />
  </div>
</template>
