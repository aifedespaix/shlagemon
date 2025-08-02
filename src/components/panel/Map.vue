<script setup lang="ts">
import type LeafletMap from '~/components/leaflet/map.vue'
import type { ZoneId } from '~/type/zone'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'

const zone = useZoneStore()
const mobileTab = useMobileTabStore()
const { currentZoneId } = storeToRefs(zone)
const { isMobile } = storeToRefs(useUIStore())
const mapRef = ref<InstanceType<typeof LeafletMap> | null>(null)

function onSelect(id: ZoneId) {
  if (id !== currentZoneId.value)
    zone.setZone(id)
}

provide('selectZone', (id: ZoneId) => {
  mapRef.value?.selectZone(id)
})

onMounted(() => {
  mapRef.value?.selectZone(currentZoneId.value)
})

watch(currentZoneId, (id, oldId) => {
  mapRef.value?.selectZone(id)
  if (isMobile.value && id !== oldId)
    mobileTab.set('game')
})
</script>

<template>
  <div class="relative w-full flex-1 overflow-hidden">
    <ZonePrevButton class="h-12 w-12" />
    <ZoneNextButton class="h-12 w-12" />
    <div v-if="zone.wildCooldownRemaining > 0" class="absolute bottom-0 left-4 right-4 z-20000">
      <UiProgressBar
        :value="1000 - zone.wildCooldownRemaining"
        :max="1000"
        color="bg-blue-600 dark:bg-blue-700"
        class="mb-1 h-1"
      />
    </div>
    <LeafletMap ref="mapRef" @select="onSelect" />
  </div>
</template>
