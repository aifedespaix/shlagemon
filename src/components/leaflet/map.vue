<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { Map, Polyline, TileLayer } from 'leaflet'
// import L from 'leaflet'
import { onMounted, ref } from 'vue'
import { useLeafletMarker } from '~/composables/leaflet/useLeafletMarker'
import { zonesData } from '~/data/zones'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{ zones?: Zone[] }>()
const emit = defineEmits<{
  (e: 'select', id: ZoneId): void
}>()

const mapRef = ref<HTMLElement | null>(null)
const leafletMap = ref<Map | null>(null)

function iconPath(name: ZoneId): string {
  return `/map/icons/${name}.webp`
}

function buildZigzagPath(zones: Zone[]): LatLngExpression[] {
  const path: LatLngExpression[] = []
  let alternate = true // alterne V→H puis H→V

  for (let i = 0; i < zones.length - 1; i++) {
    const from = zones[i].position
    const to = zones[i + 1].position

    if (i === 0)
      path.push([from.lat, from.lng])

    if (alternate) {
      path.push([to.lat, from.lng]) // vertical
      path.push([to.lat, to.lng]) // horizontal
    }
    else {
      path.push([from.lat, to.lng]) // horizontal
      path.push([to.lat, to.lng]) // vertical
    }

    alternate = !alternate
  }

  return path
}

function drawPolylineWithBorder(path: LatLngExpression[]) {
  // Trait de fond = "bordure"
  new Polyline(path, {
    color: '#000000', // bordure noire
    weight: 18, // un peu plus gros que le trait principal
    opacity: 1,
    smoothFactor: 4,
  }).addTo(leafletMap.value!)

  // Trait principal
  new Polyline(path, {
    color: '#ffaa00', // ta vraie couleur
    weight: 14,
    opacity: 1,
    smoothFactor: 4,
  }).addTo(leafletMap.value!)
}

function placeMaker(zone: Zone) {
  const marker = useLeafletMarker({
    map: leafletMap.value!,
    position: [zone.position.lat, zone.position.lng],
    iconUrl: iconPath(zone.id),
    size: 48,
  })
  marker.on('click', () => emit('select', zone.id))
  return marker
}

const minLat = -90
const minLng = -180
const maxLat = 90
const maxLng = 110

onMounted(() => {
  leafletMap.value = new Map(mapRef.value!, {
    center: [80, -10],
    zoom: 2,
    minZoom: 2,
    maxZoom: 2,
    zoomControl: false,
    attributionControl: false,
    maxBounds: [
      [minLat, minLng], // coin sud-ouest
      [maxLat, maxLng], // coin nord-est
    ],
  })

  leafletMap.value.on('contextmenu', (e) => {
    console.warn(`position: {lat: ${e.latlng.lat}, lng:${e.latlng.lng}},`)
  })
  const tileLayer: TileLayer = new TileLayer('/map/tiles/{z}/{x}/{y}.webp', {
    tileSize: 256,
    minZoom: 0,
    maxZoom: 4,
    noWrap: true,
  })
  mapRef.value!.style.background = '#508ed7'

  tileLayer.addTo(leafletMap.value!)
  const zones = props.zones ?? zonesData
  zones.forEach((zone) => {
    if (zone.position)
      placeMaker(zone)
  })
  const allPath = buildZigzagPath(zones.filter(z => z.position))
  drawPolylineWithBorder(allPath)
})
</script>

<template>
  <div ref="mapRef" />
</template>
