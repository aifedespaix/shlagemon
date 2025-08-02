<script setup lang="ts">
import type { VillagePOI, VillageZone } from '~/type'
import { render } from 'vue'
import { useLeafletMap } from '~/composables/leaflet/useLeafletMap'
import { usePoiMarkers } from '~/composables/leaflet/usePoiMarkers'

/**
 * Interactive Leaflet map displaying points of interest for a village.
 *
 * @example
 * <VillageMap :village="village" @select="onPoi" />
 *
 * ```ts
 * const village: VillageZone = {
 *   id: 'village-caca-boudin',
 *   name: 'Village Caca-Boudin',
 *   type: 'village',
 *   villageType: 'basic',
 *   position: { lat: 0, lng: 0 },
 *   mapCenter: { lat: 0, lng: 0 },
 *   actions: [],
 *   minLevel: 1,
 *   pois: [
 *     {
 *       id: 'shop',
 *       type: 'shop',
 *       label: 'Shop du Village',
 *       position: { lat: 0, lng: 0 },
 *       icon: 'i-carbon-shop',
 *     },
 *   ],
 * }
 * ```
 */
const props = defineProps<{ readonly village: VillageZone }>()
const emit = defineEmits<{
  (e: 'select', poi: VillagePOI): void
}>()

const { mapRef, map, setTileLayer } = useLeafletMap({
  center: props.village.mapCenter
    ? [props.village.mapCenter.lat, props.village.mapCenter.lng]
    : [0, 0],
  tileUrl: `/map/${props.village.id}/tiles/{z}/{x}/{y}.webp`,
  zoom: 1,
})
const slots = useSlots()

onMounted(() => {
  const leaflet = map.value!
  const markers = usePoiMarkers(leaflet)

  function buildHtml(poi: VillagePOI): string {
    if (slots.poi) {
      const vnode = slots.poi({ poi })
      const container = document.createElement('div')
      render(vnode[0], container)
      return container.innerHTML
    }
    if (poi.icon.startsWith('i-'))
      return `<div class="${poi.icon} h-8 w-8"></div>`
    return `<img src="${poi.icon}" alt="${poi.label}" class="h-8 w-8" />`
  }

  watch(
    () => props.village,
    (village) => {
      markers.clear()
      setTileLayer(`/map/${village.id}/tiles/{z}/{x}/{y}.webp`)
      village.pois.forEach(poi => markers.add(poi, buildHtml(poi), p => emit('select', p)))
    },
    { immediate: true, deep: true },
  )
})
</script>

<template>
  <div class="relative h-full w-full animate-fade-in animate-duration-300">
    <div ref="mapRef" class="h-full w-full" aria-label="Village map" />
  </div>
</template>
