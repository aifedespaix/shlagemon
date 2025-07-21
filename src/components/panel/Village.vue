<script setup lang="ts">
import ZoneActions from '../village/ZoneActions.vue'

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
    <h2 class="text-center font-bold">
      {{ zone.current.name }}
    </h2>
    <ZoneActions />
  </div>
</template>
