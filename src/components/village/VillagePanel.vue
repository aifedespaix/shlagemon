<script setup lang="ts">
import { useZoneStore } from '~/stores/zone'

const zone = useZoneStore()
</script>

<template>
  <div v-if="zone.current.image" class="h-full flex items-center justify-center">
    <img
      :src="zone.current.image"
      :alt="zone.current.name"
      class="max-h-60 w-full object-contain md:max-h-80"
    >
  </div>
</template>
