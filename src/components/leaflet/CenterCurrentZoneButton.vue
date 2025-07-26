<script setup lang="ts">
import type { Map as LeafletMap } from 'leaflet'
import { useZoneStore } from '~/stores/zone'

const props = defineProps<{ map?: LeafletMap | null }>()

const zone = useZoneStore()
const visible = ref(false)

function isCentered(map: LeafletMap): boolean {
  const pos = zone.current.position
  const center = map.getCenter()
  const threshold = 2
  return Math.abs(center.lat - pos.lat) < threshold && Math.abs(center.lng - pos.lng) < threshold
}

function update() {
  const map = props.map
  if (map)
    visible.value = !isCentered(map)
  else
    visible.value = false
}

watch(
  () => props.map,
  (map, _, onCleanup) => {
    if (!map) {
      visible.value = false
      return
    }
    update()
    map.on('moveend', update)
    onCleanup(() => {
      map.off('moveend', update)
    })
  },
  { immediate: true },
)

watch(() => zone.currentId, () => {
  update()
})

function center() {
  const map = props.map
  if (!map)
    return
  const pos = zone.current.position
  map.panTo([pos.lat, pos.lng])
}
</script>

<template>
  <UiButton
    v-if="visible"
    type="icon"
    class="absolute bottom-0 left-1/2 z-5000 h-10 w-10 rounded-b-0 opacity-75 -translate-x-1/2"
    aria-label="Center on zone"
    @click="center"
  >
    <div class="i-carbon-location text-xl" />
  </UiButton>
</template>
