<script setup lang="ts">
const dex = useShlagedexStore()
</script>

<template>
  <div
    v-if="dex.activeShlagemon"
    class="h-full w-full flex flex-col gap-1 rounded bg-white p-2 dark:bg-gray-900"
  >
    <div class="flex items-center justify-between gap-2">
      <ShlagemonImage
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
          size="xs"
        />
      </div>
    </div>
  </div>
</template>
