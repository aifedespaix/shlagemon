import type { LatLngExpression, LatLngTuple } from 'leaflet'
import * as L from 'leaflet'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

export interface UseLeafletMapOptions {
  center?: LatLngExpression
  tileUrl?: string
  /**
   * Initial zoom level. The map's zoom is locked to this value to prevent manual zooming.
   * Defaults to {@code 2} which is the base zoom for the world map. Villages typically use {@code 1}.
   */
  zoom?: number
  /** Optional bounds restricting the area navigable in the map. */
  bounds?: {
    /** Minimum latitude/longitude tuple of bounds. */
    min: LatLngTuple
    /** Maximum latitude/longitude tuple of bounds. */
    max: LatLngTuple
  }
}

export function useLeafletMap(options: UseLeafletMapOptions = {}) {
  const mapRef = ref<HTMLElement | null>(null)
  const map = ref<L.Map | null>(null)
  const tileLayer = ref<L.TileLayer | null>(null)
  const { debug } = storeToRefs(useDeveloperStore())

  useResizeObserver(mapRef, () => {
    map.value?.invalidateSize()
  })
  useEventListener('resize', () => {
    map.value?.invalidateSize()
  })

  const minLatLng: LatLngTuple = options.bounds?.min ?? [45, -90]
  const maxLatLng: LatLngTuple = options.bounds?.max ?? [-300, 280]

  onMounted(() => {
    const lockedZoom = options.zoom ?? 2

    map.value = L.map(mapRef.value!, {
      center: options.center ?? [80, -10],
      zoom: lockedZoom,
      minZoom: lockedZoom,
      maxZoom: lockedZoom,
      crs: L.CRS.Simple,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [
        minLatLng,
        maxLatLng,
      ],
    })

    map.value.on('contextmenu', (e) => {
      if (!import.meta.env.DEV || !debug.value)
        return
      const { lat, lng } = e.latlng
      console.warn(`position: { lat: ${lat}, lng: ${lng} },`)
    })

    mapRef.value!.style.background = '#508ed7'

    setTileLayer(options.tileUrl ?? '/map/main/tiles/{z}/{x}/{y}.webp')

    onUnmounted(() => {
      map.value?.remove()
      tileLayer.value?.remove()
    })
  })

  function setTileLayer(url: string) {
    tileLayer.value?.remove()
    tileLayer.value = L.tileLayer(url, {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 4,
      noWrap: true,
    })
    tileLayer.value.addTo(map.value!)
  }

  return { mapRef, map, setTileLayer }
}
