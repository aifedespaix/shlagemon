<script setup lang="ts">
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div
    v-if="dex.activeShlagemon"
    class="h-full w-full flex items-center justify-between gap-2 rounded bg-white dark:bg-gray-900"
  >
    <ShlagemonImage
      v-if="dex.activeShlagemon"
      :id="dex.activeShlagemon.base.id"
      :alt="dex.activeShlagemon.base.name"
      :shiny="dex.activeShlagemon.isShiny"
      class="aspect-square h-full max-h-20"
      md="w-8"
    />
    <span class="font-bold">{{ dex.activeShlagemon.base.name }}</span> -
    <span class="text-sm">lvl {{ dex.activeShlagemon.lvl }}</span>

    <div class="flex-1" />
    <div class="flex gap-1">
      <ShlagemonType
        v-for="t in dex.activeShlagemon.base.types"
        :key="t.id"
        :value="t"
      />
    </div>
  </div>
</template>
