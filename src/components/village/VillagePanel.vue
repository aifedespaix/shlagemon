<script setup lang="ts">
import { useZoneStore } from '~/stores/zone'

const zone = useZoneStore()
</script>

<template>
  <ImageByBackground
    v-if="zone.current.image"
    :src="zone.current.image"
    :alt="zone.current.name"
    class="aspect-video h-full max-h-60 w-full object-contain md:max-h-80"
  />
</template>
