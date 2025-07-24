<script setup lang="ts">
import type { Zone, ZoneId } from '~/type'
import { onMounted } from 'vue'
import { useLeafletMap } from '~/composables/leaflet/useLeafletMap'
import { useMapMarkers } from '~/composables/leaflet/useMapMarkers'
import { buildZigzagPath, useMapPaths } from '~/composables/leaflet/useMapPaths'
import { zonesData } from '~/data/zones'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{ zones?: Zone[] }>()
const emit = defineEmits<{
  (e: 'select', id: ZoneId): void
}>()

const { mapRef, map: leafletMap } = useLeafletMap()

onMounted(() => {
  const map = leafletMap.value!
  const markers = useMapMarkers(map)
  const { drawPolylineWithBorder } = useMapPaths(map)

  const zones = props.zones ?? zonesData
  zones.forEach((zone) => {
    if (zone.position)
      markers.addMarker(zone, id => emit('select', id))
  })

  const allPath = buildZigzagPath(zones.filter(z => z.position))
  drawPolylineWithBorder(allPath)
})
</script>

<template>
  <div ref="mapRef" />
</template>
