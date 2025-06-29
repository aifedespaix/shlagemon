<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div
    v-if="dex.activeShlagemon"
    class="w-full flex items-center gap-2 rounded bg-white p-2 dark:bg-gray-900"
    sm="p-3"
  >
    <div class="h-16 w-16 flex-shrink-0" md="h-full">
      <img
        :src="`/shlagemons/${dex.activeShlagemon.base.id}/${dex.activeShlagemon.base.id}.png`"
        :alt="dex.activeShlagemon.base.name"
        class="h-full w-full object-contain"
      >
    </div>

    <div class="info flex flex-1 flex-col">
      <span class="font-bold">{{ dex.activeShlagemon.base.name }}</span>
      <span>Lvl {{ dex.activeShlagemon.lvl }}</span>
      <ShlagemonType :value="dex.activeShlagemon.base.type" />
    </div>
  </div>
</template>
