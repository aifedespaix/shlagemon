<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { useMobileTabStore } from '~/stores/mobileTab'

const mobile = useMobileTabStore()
</script>

<template>
  <nav class="h-12 flex items-center justify-around bg-gray-100 md:hidden dark:bg-gray-800">
    <Button type="icon" :class="mobile.current === 'game' ? 'text-teal-600 dark:text-teal-400' : ''" @click="mobile.set('game')">
      <div class="i-carbon-game-console" />
    </Button>
    <Button type="icon" :class="mobile.current === 'zones' ? 'text-teal-600 dark:text-teal-400' : ''" @click="mobile.set('zones')">
      <div class="i-carbon-map" />
    </Button>
    <Button type="icon" :class="mobile.current === 'dex' ? 'text-teal-600 dark:text-teal-400' : ''" @click="mobile.set('dex')">
      <div class="i-carbon-list" />
    </Button>
    <Button type="icon" :class="mobile.current === 'achievements' ? 'text-teal-600 dark:text-teal-400' : ''" @click="mobile.set('achievements')">
      <div class="i-carbon-trophy" />
    </Button>
  </nav>
</template>
