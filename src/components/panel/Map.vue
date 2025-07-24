<script setup lang="ts">
const zone = useZoneStore()
</script>

<template>
  <div class="relative flex-1 overflow-hidden">
    <ZonePrevButton />
    <ZoneNextButton />
    <div v-if="zone.wildCooldownRemaining > 0" class="absolute bottom-0 left-4 right-4 z-200">
      <UiProgressBar
        :value="1000 - zone.wildCooldownRemaining"
        :max="1000"
        color="bg-blue-600 dark:bg-blue-700"
        class="mb-1 h-1"
      />
    </div>
    <LeafletMap class="absolute inset-0" @select="zone.setZone" />
  </div>
</template>
