import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { DivIcon } from 'leaflet'
import { computed, watch } from 'vue'
import { useZoneCompletion } from '~/composables/useZoneCompletion'
import { i18n } from '~/modules/i18n'
import { useZoneVisitStore } from '~/stores/zoneVisit'
import { GOLD_FILTER, GREY_FILTER } from '~/utils/iconStyles'
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
    const { allCaptured, perfectZone, allShiny, hasKing, kingDefeated, arenaCompleted } = useZoneCompletion(zone)
    const visit = useZoneVisitStore()
    const visited = computed(() => !!visit.visited[zone.id])
    let locked = inactive
    let clickHandler: (() => void) | null = null

    type CaptureState = 'missing' | 'complete' | 'perfect' | 'shiny'
    const captureState = computed<CaptureState>(() => {
      if (!allCaptured.value)
        return 'missing'
      if (allShiny.value)
        return 'shiny'
      if (perfectZone.value)
        return 'perfect'
      return 'complete'
    })

    type KingState = 'none' | 'undefeated' | 'defeated'
    const kingState = computed<KingState>(() => {
      if (!hasKing.value)
        return 'none'
      return kingDefeated.value ? 'defeated' : 'undefeated'
    })

    const iconClassSize = 12
    const markerSize = 60
    const anchorY = 48
    function buildHtml() {
      const highlight = !visited.value && !locked ? 'animate-pulse-alt' : ''

      // --- Icône principale (zone) ---
      const zoneIconStyle
        = zone.type !== 'village'
          ? (!allCaptured.value
              ? GREY_FILTER
              : perfectZone.value
                ? GOLD_FILTER
                : '')
          : ''
      const baseIcon = `<img src="${iconPath(zone)}" class="w-${iconClassSize} h-${iconClassSize} block ${highlight}" style="${zoneIconStyle}" />`

      // --- Badges / chip sous l'icône ---
      let badges = ''

      if (zone.type === 'village') {
        const hasArena = Boolean(zone.pois?.arena)
        let arena = ''
        if (hasArena)
          arena = `<div class="i-mdi:sword-cross h-3 w-3" style="${arenaCompleted.value ? GOLD_FILTER : GREY_FILTER}"></div>`

        badges = arena
      }
      else {
        const ballStyle = captureState.value === 'missing'
          ? GREY_FILTER
          : perfectZone.value
            ? GOLD_FILTER
            : ''
        const ball = `<img src="/items/shlageball/shlageball.webp" class="h-3 w-3" style="${ballStyle}" />`

        const shinyBadge = allShiny.value
          ? '<div class="i-mdi:star h-2 w-2 mask-rainbow absolute -top-1 -right-1"></div>'
          : ''
        const ballWithBadge = shinyBadge
          ? `<div class="relative">${ball}${shinyBadge}</div>`
          : ball

        let crown = ''
        if (kingState.value !== 'none') {
          const style = kingState.value === 'defeated' ? GOLD_FILTER : GREY_FILTER
          crown = `<div class="i-game-icons:queen-crown h-3 w-3" style="${style}"></div>`
        }

        const items = [ballWithBadge, crown].filter(Boolean).join('')
        badges = `<div class="flex items-center gap-0.5">${items}</div>`
      }

      const hasBadges = Boolean(badges)
      const badgesContainer = hasBadges
        ? `<div class="flex gap-0.5 -mt-1 bg-dark/75 px-2 py-1 rounded-full items-center">${badges}</div>`
        : ''

      return `<div class="flex flex-col items-center ${locked ? 'grayscale opacity-50' : ''}">
    ${baseIcon}
    ${badgesContainer}
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

    watch([captureState, perfectZone, allShiny, kingState, arenaCompleted, visited], () => {
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
