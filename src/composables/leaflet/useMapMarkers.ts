import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { DivIcon } from 'leaflet'
import { computed, watch } from 'vue'
import { useZoneCompletion } from '~/composables/useZoneCompletion'
import { i18n } from '~/modules/i18n'
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
    const { allCaptured, perfectZone, allShiny, kingDefeated, arenaCompleted } = useZoneCompletion(zone)
    const visit = useZoneVisitStore()
    const visited = computed(() => !!visit.visited[zone.id])
    let locked = inactive
    let clickHandler: (() => void) | null = null

    const iconClassSize = 12
    const markerSize = 60
    const anchorY = 48

    function buildHtml() {
      const highlight = !visited.value && !locked ? 'animate-pulse-alt' : ''

      let iconStyle = ''
      if (zone.type !== 'village') {
        iconStyle = !allCaptured.value
          ? 'filter: grayscale(1) opacity(0.9);'
          : perfectZone.value
            ? 'filter: brightness(1.1) drop-shadow(0 0 2px #facc15) drop-shadow(0 0 4px #facc15) drop-shadow(0 0 6px #facc15);'
            : ''
      }
      const baseIcon = `<img src="${iconPath(zone)}" class="w-${iconClassSize} h-${iconClassSize} block ${highlight}" style="${iconStyle}" />`
      const shiny = zone.type !== 'village' && allShiny.value
        ? '<div class="i-mdi:star h-2 w-2 mask-rainbow absolute -top-1 -right-1"></div>'
        : ''
      const icon = shiny ? `<div class="relative">${baseIcon}${shiny}</div>` : baseIcon

      let icons = ''
      if (zone.type === 'village') {
        const crown = kingDefeated.value ? '<div class="i-game-icons:crown h-3 w-3"></div>' : ''
        let arena = ''
        if (arenaCompleted.value)
          arena = '<div class="i-mdi:sword-cross h-3 w-3"></div>'
        else if (zone.pois?.arena)
          arena = '<div class="i-mdi:sword-cross h-3 w-3 opacity-50 grayscale"></div>'
        icons = [crown, arena].filter(Boolean).join('')
      }

      const iconsContainer = icons
        ? `<div class="flex gap-0.5 -mt-1 bg-dark/75 px-2 py-1 rounded-full">${icons}</div>`
        : ''

      return `<div class="flex flex-col items-center ${locked ? 'grayscale opacity-50' : ''}">
        ${icon}
        ${iconsContainer}
      </div>`
    }

    const marker = useLeafletMarker({
      map,
      position: [zone.position.lat, zone.position.lng] as LatLngExpression,
      html: buildHtml(),
      size: markerSize,
      anchorY,
      interactive: true,
      title: i18n.global.t(zone.name),
    })

    watch([allCaptured, perfectZone, allShiny, kingDefeated, arenaCompleted, visited], () => {
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
