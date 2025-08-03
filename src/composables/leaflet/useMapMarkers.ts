import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { DivIcon } from 'leaflet'
import { computed, watch } from 'vue'
import { useZoneCompletion } from '~/composables/useZoneCompletion'
import { useZoneVisitStore } from '~/stores/zoneVisit'
import { useLeafletMarker } from './useLeafletMarker'

export function useMapMarkers(map: LeafletMap) {
  const markers = new Map<ZoneId, {
    marker: Marker
    update: (inactive: boolean) => void
    hovered: boolean
  }>()
  let active: ZoneId | undefined

  function highlightActive(id?: ZoneId) {
    if (id !== undefined)
      active = id
    markers.forEach((entry, zoneId) => {
      const el = entry.marker.getElement() as HTMLElement | null
      if (!el)
        return

      if (zoneId === active) {
        el.style.filter = `
          drop-shadow(0 0 0px #3b82f6)       /* effet bord net */
          drop-shadow(0 0 6px #3b82f6)       /* halo diffus autour */
          drop-shadow(0 0 16px #3b82f6)      /* aura externe étendue */
        `
      }
      else if (entry.hovered) {
        el.style.filter = `
          drop-shadow(0 0 0px #ffffff)
          drop-shadow(0 0 6px #ffffff)
          drop-shadow(0 0 16px #ffffff)
        `
      }
      else {
        el.style.filter = ''
      }
    })
  }
  function iconPath(zone: Zone): string {
    return zone.type === 'village'
      ? `/map/main/icons/village-${zone.villageType}.webp`
      : `/map/main/icons/${zone.id}.webp`
  }

  function addMarker(
    zone: Zone,
    onSelect?: (id: ZoneId) => void,
    inactive = false,
  ) {
    const { allCaptured, perfectZone, kingDefeated, arenaCompleted } = useZoneCompletion(zone)
    const visit = useZoneVisitStore()
    const visited = computed(() => !!visit.visited[zone.id])
    let locked = inactive
    let clickHandler: (() => void) | null = null

    const iconClassSize = 12
    const markerSize = 60
    const anchorY = 48

    function buildHtml() {
      const highlight = !visited.value && !locked ? 'animate-pulse-alt' : ''
      const icon = `<img src="${iconPath(zone)}" class="w-${iconClassSize} h-${iconClassSize} block ${highlight}" />`
      const ballClasses = allCaptured.value
        ? `h-3 w-3${perfectZone.value ? ' filter-[hue-rotate(60deg)_brightness(1.1)]' : ''}`
        : 'h-3 w-3 opacity-90 grayscale'
      const ball = zone.type !== 'village'
        ? `<img src="/items/shlageball/shlageball.webp" class="${ballClasses}" />`
        : ''
      const crown = kingDefeated.value ? '<div class="i-game-icons:crown h-3 w-3"></div>' : ''
      const arena = arenaCompleted.value
        ? '<div class="i-mdi:sword-cross h-3 w-3"></div>'
        : zone.type === 'village' && zone.pois.arena
          ? '<div class="i-mdi:sword-cross h-3 w-3 opacity-50 grayscale"></div>'
          : ''
      const icons = [ball, crown, arena].filter(Boolean).join('')
      return `<div class="flex flex-col items-center ${locked ? 'grayscale opacity-50' : ''}">
        ${icon}
        <div class="flex gap-0.5 -mt-1 bg-dark/75 px-2 py-1 rounded-full">${icons}</div>
      </div>`
    }

    const marker = useLeafletMarker({
      map,
      position: [zone.position.lat, zone.position.lng] as LatLngExpression,
      html: buildHtml(),
      size: markerSize,
      anchorY,
      interactive: true,
    })

    watch([allCaptured, perfectZone, kingDefeated, arenaCompleted, visited], () => {
      marker.setIcon(new DivIcon({
        html: buildHtml(),
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, anchorY],
      }))
    })

    function update(value: boolean) {
      locked = value
      marker.setIcon(new DivIcon({
        html: buildHtml(),
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, anchorY],
      }))
      if (!onSelect)
        return
      if (!locked && !clickHandler) {
        clickHandler = () => onSelect(zone.id)
        marker.on('click', clickHandler)
      }
      else if (locked && clickHandler) {
        marker.off('click', clickHandler)
        clickHandler = null
      }
    }

    if (onSelect && !locked) {
      clickHandler = () => onSelect(zone.id)
      marker.on('click', clickHandler)
    }

    const entry = { marker, update, hovered: false }

    marker.on('mouseover', () => {
      entry.hovered = true
      highlightActive()
    })

    marker.on('mouseout', () => {
      entry.hovered = false
      highlightActive()
    })

    markers.set(zone.id, entry)
    highlightActive()
    return marker
  }

  function setInactive(id: ZoneId, value: boolean) {
    markers.get(id)?.update(value)
  }

  return { addMarker, highlightActive, setInactive }
}
