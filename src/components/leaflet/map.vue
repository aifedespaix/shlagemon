<script setup lang="ts">
import type { Polyline } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { onMounted, ref, toRef, watch } from 'vue'
import { useLeafletMap } from '~/composables/leaflet/useLeafletMap'
import { useMapMarkers } from '~/composables/leaflet/useMapMarkers'
import { buildSimplePath, useMapPaths } from '~/composables/leaflet/useMapPaths'
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

  function buildSegment(index: number) {
    const from = savageZones[index].position!
    const to = savageZones[index + 1].position!
    const alternate = index % 2 === 0
    return [
      [from.lat, from.lng],
      alternate ? [to.lat, from.lng] : [from.lat, to.lng],
      [to.lat, to.lng],
    ]
  }

  function clear() {
    lines.value.forEach(l => l.remove())
    lines.value = []
  }

  function draw() {
    clear()
    const ids = new Set(accessibleZones.value.map(z => z.id))
    let lastIdx = -1
    for (let i = 0; i < savageZones.length; i++) {
      if (ids.has(savageZones[i].id))
        lastIdx = i
      else
        break
    }

    for (let i = 0; i < savageZones.length - 1; i++) {
      const color = i < lastIdx ? '#ffaa00' : '#404040'
      const seg = buildSegment(i)
      lines.value.push(...drawPolylineWithBorder(seg, color))
    }

    villages.forEach((village) => {
      const target = zones.find(z => z.type === 'sauvage' && z.maxLevel === village.minLevel && z.position)
      if (!target)
        return
      const idx = savageZones.findIndex(z => z.id === target.id)
      const accessible = ids.has(village.id) && lastIdx >= idx
      const path = buildSimplePath(target.position!, village.position!)
      lines.value.push(...drawPolylineWithBorder(path, accessible ? '#ffaa00' : '#404040'))
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
