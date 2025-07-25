import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { DivIcon } from 'leaflet'
import { watch } from 'vue'
import { useZoneCompletion } from '~/composables/useZoneCompletion'
import { useLeafletMarker } from './useLeafletMarker'

export function useMapMarkers(map: LeafletMap) {
  const markers = new Map<ZoneId, Marker>()

  function highlightActive(id?: ZoneId) {
    markers.forEach((marker, zoneId) => {
      const el = marker.getElement() as HTMLElement | null
      if (!el)
        return
      if (zoneId === id)
        el.style.filter = 'drop-shadow(0 0 8px rgba(59,130,246,0.8))'
      else
        el.style.filter = ''
    })
  }
  function iconPath(zone: Zone): string {
    return zone.type === 'village'
      ? `/map/icons/village-${zone.villageType}.webp`
      : `/map/icons/${zone.id}.webp`
  }

  function addMarker(
    zone: Zone,
    onSelect?: (id: ZoneId) => void,
    inactive = false,
  ) {
    const { allCaptured, perfectZone, kingDefeated, arenaCompleted } = useZoneCompletion(zone)

    function buildHtml() {
      const size = 12
      const icon = `<img src="${iconPath(zone)}" class="w-${size} h-${size} block" />`
      const ball = allCaptured.value
        ? `<img src="/items/shlageball/shlageball.webp" class="h-3 w-3${perfectZone.value ? ' filter-[hue-rotate(60deg)_brightness(1.1)]' : ''}" />`
        : ''
      const crown = kingDefeated.value ? '<div class="i-game-icons:crown h-3 w-3"></div>' : ''
      const arena = arenaCompleted.value
        ? '<div class="i-mdi:sword-cross h-3 w-3"></div>'
        : zone.arena
          ? '<div class="i-mdi:sword-cross h-3 w-3 opacity-50 grayscale"></div>'
          : ''
      const icons = [ball, crown, arena].filter(Boolean).join('')
      return `<div class="flex flex-col items-center ${inactive ? 'grayscale opacity-50' : ''}">
        ${icon}
        <div class="flex gap-0.5 -mt-1 bg-dark/75 px-2 py-1 rounded-full">${icons}</div>
      </div>`
    }

    const marker = useLeafletMarker({
      map,
      position: [zone.position.lat, zone.position.lng] as LatLngExpression,
      html: buildHtml(),
      size: 60,
      anchorY: 48,
      interactive: !inactive,
    })

    watch([allCaptured, perfectZone, kingDefeated, arenaCompleted], () => {
      marker.setIcon(new DivIcon({ html: buildHtml(), iconSize: [60, 60], iconAnchor: [30, 48] }))
    })

    if (onSelect && !inactive)
      marker.on('click', () => onSelect(zone.id))
    markers.set(zone.id, marker)
    return marker
  }

  return { addMarker, highlightActive }
}
