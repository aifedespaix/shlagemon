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
const zones = props.zones ?? zonesData

function selectZone(id: ZoneId) {
  emit('select', id)
  const zone = zones.find(z => z.id === id)
  const pos = zone?.position
  if (pos)
    leafletMap.value?.panTo([pos.lat, pos.lng])
}

onMounted(() => {
  const map = leafletMap.value!
  const markers = useMapMarkers(map)
  const { drawPolylineWithBorder } = useMapPaths(map)

  zones.forEach((zone) => {
    if (zone.position)
      markers.addMarker(zone, selectZone)
  })

  const allPath = buildZigzagPath(zones.filter(z => z.position))
  drawPolylineWithBorder(allPath)
})
</script>

<template>
  <div ref="mapRef" />
</template>
