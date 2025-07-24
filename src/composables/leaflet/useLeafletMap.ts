import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { Map, TileLayer } from 'leaflet'
import { onMounted, ref } from 'vue'

export interface UseLeafletMapOptions {
  center?: LatLngExpression
}

export function useLeafletMap(options: UseLeafletMapOptions = {}) {
  const mapRef = ref<HTMLElement | null>(null)
  const map = ref<LeafletMap | null>(null)

  const minLat = -90
  const minLng = -180
  const maxLat = 90
  const maxLng = 110

  onMounted(() => {
    map.value = new Map(mapRef.value!, {
      center: options.center ?? [80, -10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 2,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [
        [minLat, minLng],
        [maxLat, maxLng],
      ],
    })

    mapRef.value!.style.background = '#508ed7'

    const tileLayer = new TileLayer('/map/tiles/{z}/{x}/{y}.webp', {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 4,
      noWrap: true,
    })

    tileLayer.addTo(map.value!)
  })

  return { mapRef, map }
}
