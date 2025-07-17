<script setup lang="ts">
import HomeFooter from '~/components/layout/HomeFooter.vue'
import HomeHeader from '~/components/layout/HomeHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HomeHeader />
    <main class="mx-auto max-w-160 w-full flex-1 p-4">
      <RouterView />
    </main>
    <HomeFooter />
  </div>
</template>
