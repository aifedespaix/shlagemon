<script setup lang="ts">
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div v-if="dex.activeShlagemon" class="h-full flex items-center justify-center">
    <img :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`" :alt="dex.activeShlagemon.name" class="max-h-40 object-contain">
  </div>
</template>
