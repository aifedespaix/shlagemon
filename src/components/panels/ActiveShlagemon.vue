<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div v-if="dex.activeShlagemon" class="flex items-center gap-2">
    <div class="aspect-square bg-red">
      <div class="h-full w-full bg-green">
        <!-- <img :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`" :alt="dex.activeShlagemon.name" class="h-full object-contain"> -->
      </div>
    </div>

    <div class="info flex items-center gap-2">
      <span class="font-bold">{{ dex.activeShlagemon.name }}</span>
      <span>Lvl {{ dex.activeShlagemon.lvl }}</span>
      <ShlagemonType :value="dex.activeShlagemon.type" />
    </div>
  </div>
</template>
