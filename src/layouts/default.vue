<script setup lang="ts">
import HomeFooter from '~/components/layout/HomeFooter.vue'
import HomeHeader from '~/components/layout/HomeHeader.vue'
</script>

<template>
  <div class="h-screen flex flex-col">
    <HomeHeader />
    <main class="w-full flex-1 overflow-auto p-4">
      <RouterView />
      <HomeFooter />
    </main>
  </div>
</template>
