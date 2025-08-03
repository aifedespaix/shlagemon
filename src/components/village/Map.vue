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
 *   map: {
 *     center: { lat: 0, lng: 0 },
 *     min: { lat: -10, lng: -10 },
 *     max: { lat: 10, lng: 10 },
 *   },
 *   minLevel: 1,
 *   pois: {
 *     shop: {
 *       id: 'shop',
 *       type: 'shop',
 *       label: 'Shop du Village',
 *       position: { lat: 0, lng: 0 },
 *       items: [],
 *     },
 *     arena: {
 *       id: 'arena',
 *       type: 'arena',
 *       label: 'Arène du Village',
 *       position: { lat: 1, lng: 1 },
 *     },
 *   },
 * }
 * ```
 */
const props = defineProps<{
  readonly village: VillageZone
  readonly activePoiId?: string | null
}>()
const emit = defineEmits<{
  (e: 'select', poi: VillagePOI): void
}>()

const { mapRef, map, setTileLayer } = useLeafletMap({
  center: [props.village.map.center.lat, props.village.map.center.lng],
  tileUrl: `/map/${props.village.id}/tiles/{z}/{x}/{y}.webp`,
  zoom: 2,
  bounds: {
    min: [props.village.map.min.lat, props.village.map.min.lng],
    max: [props.village.map.max.lat, props.village.map.max.lng],
  },
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
    return `<img src="/icons/village/${poi.id}.webp" alt="${poi.label}" class="h-16 w-16" />`
  }

  watch(
    () => props.village,
    (village) => {
      markers.clear()
      setTileLayer(`/map/${village.id}/tiles/{z}/{x}/{y}.webp`)
      map.value?.setView([village.map.center.lat, village.map.center.lng])
      map.value?.setMaxBounds([
        [village.map.min.lat, village.map.min.lng],
        [village.map.max.lat, village.map.max.lng],
      ])
      Object.values(village.pois).forEach(poi => markers.add(poi, buildHtml(poi), p => emit('select', p)))
      markers.highlight(props.activePoiId ?? undefined)
    },
    { immediate: true, deep: true },
  )

  watch(
    () => props.activePoiId,
    (id) => {
      markers.highlight(id ?? undefined)
      if (id) {
        const poi = props.village.pois[id]
        if (poi)
          map.value?.panTo([poi.position.lat, poi.position.lng])
      }
      else {
        map.value?.panTo([props.village.map.center.lat, props.village.map.center.lng])
      }
    },
    { immediate: true },
  )
})

function getTarget() {
  if (props.activePoiId) {
    const poi = props.village.pois[props.activePoiId]
    if (poi)
      return poi.position
  }
  return props.village.map.center
}
</script>

<template>
  <div class="relative h-full w-full animate-fade-in animate-duration-300">
    <LeafletCenterMapButton :map="map" :get-target="getTarget" />
    <div ref="mapRef" class="h-full w-full" aria-label="Village map" />
  </div>
</template>
