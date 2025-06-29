<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()

const src = computed(() => dex.activeShlagemon ? `/shlagemons/${dex.activeShlagemon?.base.id}/${dex.activeShlagemon.base.id}.png` : '')
</script>

<template>
  <div
    v-if="dex.activeShlagemon"
    class="w-full flex items-center justify-between gap-2 rounded bg-white dark:bg-gray-900"
  >
    <div class="flex">
      <!-- <img
        :src=""
        :alt="dex.activeShlagemon.base.name"
        class="h-full w-full object-contain"
      > -->
      <ImageByBackground v-if="dex.activeShlagemon" :src="src" class="aspect-square h-full bg-red" />
      <!-- <ImageByBackground v-if="dex.activeShlagemon" :src="src" class="aspect-square h-full" /> -->
      <span class="font-bold">{{ dex.activeShlagemon.base.name }}</span>
    </div>

    <div class="info flex items-center gap-2">
      <ShlagemonType :value="dex.activeShlagemon.base.type" />
      <span>Lvl {{ dex.activeShlagemon.lvl }}</span>
    </div>
  </div>
</template>
