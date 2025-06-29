<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div v-if="dex.activeShlagemon" class="flex items-center gap-2">
    <div class="h-16 w-16 flex-shrink-0" md="h-full">
      <img
        :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`"
        :alt="dex.activeShlagemon.name"
        class="h-full w-full object-contain"
      >
    </div>

    <div class="info flex flex-col">
      <span class="font-bold">{{ dex.activeShlagemon.name }}</span>
      <span>Lvl {{ dex.activeShlagemon.lvl }}</span>
      <ShlagemonType :value="dex.activeShlagemon.type" />
    </div>
  </div>
</template>
