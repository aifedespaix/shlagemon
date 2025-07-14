<script setup lang="ts">
import { useZoneStore } from '~/stores/zone'
import ZoneActions from './ZoneActions.vue'

const zone = useZoneStore()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <UiImageByBackground
      v-if="zone.current.image"
      :src="zone.current.image"
      :alt="zone.current.name"
      class="aspect-video h-full max-h-60 w-full object-contain md:max-h-80"
    />
    <ZoneActions />
  </div>
</template>
