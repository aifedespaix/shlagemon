import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { CRS, Map, TileLayer } from 'leaflet'
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
    min: LatLngExpression
    max: LatLngExpression
  }
}

export function useLeafletMap(options: UseLeafletMapOptions = {}) {
  const mapRef = ref<HTMLElement | null>(null)
  const map = ref<LeafletMap | null>(null)
  const tileLayer = ref<TileLayer | null>(null)
  const { debug } = storeToRefs(useDeveloperStore())

  useResizeObserver(mapRef, () => {
    map.value?.invalidateSize()
  })
  useEventListener('resize', () => {
    map.value?.invalidateSize()
  })

  const minLatLng = options.bounds?.min ?? [45, -90]
  const maxLatLng = options.bounds?.max ?? [-300, 280]

  onMounted(() => {
    const lockedZoom = options.zoom ?? 2

    map.value = new Map(mapRef.value!, {
      center: options.center ?? [80, -10],
      zoom: lockedZoom,
      minZoom: lockedZoom,
      maxZoom: lockedZoom,
      crs: CRS.Simple,
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
    tileLayer.value = new TileLayer(url, {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 4,
      noWrap: true,
    })
    tileLayer.value.addTo(map.value!)
  }

  return { mapRef, map, setTileLayer }
}
