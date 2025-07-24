<script setup lang="ts">
import type { Zone, ZoneId } from '~/type'
import { onMounted } from 'vue'
import { useLeafletMap } from '~/composables/leaflet/useLeafletMap'
import { useMapMarkers } from '~/composables/leaflet/useMapMarkers'
import { buildSimplePath, buildZigzagPath, useMapPaths } from '~/composables/leaflet/useMapPaths'
import { zonesData } from '~/data/zones'
import 'leaflet/dist/leaflet.css'

defineOptions({ inheritAttrs: false })

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

  const savageZones = zones.filter(z => z.type === 'sauvage' && z.position)
  const mainPath = buildZigzagPath(savageZones)
  drawPolylineWithBorder(mainPath)

  const villages = zones.filter(z => z.type === 'village' && z.position)
  villages.forEach((village) => {
    const target = zones.find(z => z.type === 'sauvage' && z.maxLevel === village.minLevel && z.position)
    if (!target)
      return
    const path = buildSimplePath(target.position, village.position)
    drawPolylineWithBorder(path, '#00ff00')
  })
})
</script>

<template>
  <div class="relative">
    <div ref="mapRef" class="absolute inset-0 h-full w-full" v-bind="$attrs" />
    <LeafletCenterCurrentZoneButton :map="leafletMap" />
  </div>
</template>
