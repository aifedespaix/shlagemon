<script setup lang="ts">
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
</script>

<template>
  <div v-if="dex.activeShlagemon" class="h-full flex items-center justify-center">
    <ShlagemonImage
      :id="dex.activeShlagemon.base.id"
      :alt="dex.activeShlagemon.base.name"
      :shiny="dex.activeShlagemon.isShiny"
      class="max-h-40 object-contain"
    />
  </div>
</template>
