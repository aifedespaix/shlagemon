<script setup lang="ts">
import type { Polyline } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { onMounted, ref, toRef, watch } from 'vue'
import { useLeafletMap } from '~/composables/leaflet/useLeafletMap'
import { useMapMarkers } from '~/composables/leaflet/useMapMarkers'
import { buildSimplePath, buildZigzagPath, useMapPaths } from '~/composables/leaflet/useMapPaths'
import { zonesData } from '~/data/zones'
import { useZoneStore } from '~/stores/zone'
import 'leaflet/dist/leaflet.css'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ zones?: Zone[] }>()
const emit = defineEmits<{
  (e: 'select', id: ZoneId): void
}>()

const { mapRef, map: leafletMap } = useLeafletMap()
const zones = props.zones ?? zonesData
const zoneStore = useZoneStore()

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

  markers.highlightActive(zoneStore.currentId)
  watch(() => zoneStore.currentId, id => markers.highlightActive(id))

  const savageZones = zones.filter(z => z.type === 'sauvage' && z.position)
  const villages = zones.filter(z => z.type === 'village' && z.position)

  const lines = ref<Polyline[]>([])

  function clear() {
    lines.value.forEach(l => l.remove())
    lines.value = []
  }

  function draw() {
    clear()

    const accessibleSavage = savageZones.filter(z =>
      accessibleZones.value.some(a => a.id === z.id),
    )
    const accessibleCount = accessibleSavage.length

    if (accessibleCount < savageZones.length) {
      const start = Math.max(accessibleCount - 1, 0)
      const path = buildZigzagPath(savageZones.slice(start))
      lines.value.push(...drawPolylineWithBorder(path, '#9ca3af'))
    }

    if (accessibleCount > 1) {
      const path = buildZigzagPath(savageZones.slice(0, accessibleCount))
      lines.value.push(...drawPolylineWithBorder(path, '#facc15'))
    }

    villages.forEach((village) => {
      const target = zones.find(z => z.id === village.attachedTo)
      if (!target)
        return
      const idx = savageZones.findIndex(z => z.id === target.id)
      const arrival = idx % 2 === 0 ? 'vertical' : 'horizontal'
      const start = arrival === 'vertical' ? 'horizontal' : 'vertical'
      const path = buildSimplePath(target.position!, village.position!, start)
      const color = canAccess(village) ? '#22c55e' : '#9ca3af'
      lines.value.push(...drawPolylineWithBorder(path, color, 10))
    })
  }

  watch(accessibleZones, draw, { immediate: true })
})
</script>

<template>
  <div class="h-full w-full">
    <LeafletCenterCurrentZoneButton :map="leafletMap" />
    <div ref="mapRef" class="h-full w-full" v-bind="$attrs" />
  </div>
</template>
