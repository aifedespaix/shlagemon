<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useSchlagedexStore } from '~/stores/schlagedex'

const dex = useSchlagedexStore()
</script>

<template>
  <div v-if="dex.activeShlagemon" class="h-full flex items-center gap-2">
    <img :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`" :alt="dex.activeShlagemon.name" class="h-12 object-contain">
    <div class="info flex items-center gap-2">
      <span class="font-bold">{{ dex.activeShlagemon.name }}</span>
      <span>Lvl {{ dex.activeShlagemon.lvl }}</span>
      <ShlagemonType :value="dex.activeShlagemon.type" />
    </div>
  </div>
</template>
