<script setup lang="ts">
import type { Polyline } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { onMounted, ref, toRef, watch } from 'vue'
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

defineExpose({
  selectZone,
})

onMounted(() => {
  const map = leafletMap.value!
  const markers = useMapMarkers(map)
  const { drawPolylineWithBorder } = useMapPaths(map)

  const dex = useShlagedexStore()
  const { canAccess, accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

  zones.forEach((zone) => {
    if (!zone.position)
      return
    const locked = !canAccess(zone)
    markers.addMarker(zone, selectZone, locked)
  })

  const savageZones = zones.filter(z => z.type === 'sauvage' && z.position)
  const villages = zones.filter(z => z.type === 'village' && z.position)

  const lines = ref<Polyline[]>([])

  function clear() {
    lines.value.forEach(l => l.remove())
    lines.value = []
  }

  function draw() {
    clear()
    const mainPath = buildZigzagPath(savageZones)
    lines.value.push(...drawPolylineWithBorder(mainPath, '#facc15'))

    villages.forEach((village) => {
      const target = zones.find(z => z.id === village.attachedTo)
      if (!target)
        return
      const idx = savageZones.findIndex(z => z.id === target.id)
      const arrival = idx % 2 === 0 ? 'vertical' : 'horizontal'
      const start = arrival === 'vertical' ? 'horizontal' : 'vertical'
      const path = buildSimplePath(target.position!, village.position!, start)
      lines.value.push(...drawPolylineWithBorder(path, '#22c55e', 10))
    })
  }

  watch(accessibleZones, draw, { immediate: true })
})
</script>

<template>
  <div class="h-full w-full">
    <div ref="mapRef" class="h-full w-full" v-bind="$attrs" />
    <LeafletCenterCurrentZoneButton :map="leafletMap" />
  </div>
</template>
