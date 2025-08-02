import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { CRS, Map, TileLayer } from 'leaflet'
import { onMounted, onUnmounted, ref } from 'vue'

export interface UseLeafletMapOptions {
  center?: LatLngExpression
}

export function useLeafletMap(options: UseLeafletMapOptions = {}) {
  const mapRef = ref<HTMLElement | null>(null)
  const map = ref<LeafletMap | null>(null)
  const tileLayer = ref<TileLayer | null>(null)

  useResizeObserver(mapRef, () => {
    map.value?.invalidateSize()
  })
  useEventListener('resize', () => {
    map.value?.invalidateSize()
  })

  const minLat = 45
  const minLng = -90

  const maxLat = -300
  const maxLng = 280

  onMounted(() => {
    map.value = new Map(mapRef.value!, {
      center: options.center ?? [80, -10],
      zoom: 2,
      minZoom: 2,
      crs: CRS.Simple,
      maxZoom: 2,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [
        [minLat, minLng],
        [maxLat, maxLng],
      ],
    })

    // map.value.on('contextmenu', (e) => {
    //   if (map.value) {
    //     const lat = e.latlng.lat
    //     const lng = e.latlng.lng
    //     // console.log(`position: {lat: ${lat}, lng: ${lng}},`)
    //   }
    // })

    mapRef.value!.style.background = '#508ed7'

    tileLayer.value = new TileLayer('/map/main/tiles/{z}/{x}/{y}.webp', {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 4,
      noWrap: true,
    })

    tileLayer.value.addTo(map.value!)

    onUnmounted(() => {
      map.value?.remove()
      tileLayer.value?.remove()
    })
  })

  return { mapRef, map }
}
