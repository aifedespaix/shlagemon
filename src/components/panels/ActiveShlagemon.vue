<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()

const src = computed(() => {
  const id = dex.activeShlagemon?.base?.id
  return id ? `/shlagemons/${id}/${id}.png` : ''
})
</script>

<template>
  <div
    v-if="dex.activeShlagemon"
    class="h-full w-full flex items-center justify-between gap-2 rounded bg-white dark:bg-gray-900"
  >
    <ImageByBackground v-if="dex.activeShlagemon" :src="src" class="aspect-square h-full" md="w-8" />
    <span class="font-bold">{{ dex.activeShlagemon.base.name }}</span> -
    <span class="text-sm">niveau {{ dex.activeShlagemon.lvl }}</span>

    <div class="flex-1" />
    <ShlagemonType :value="dex.activeShlagemon.base.type" />
  </div>
</template>
