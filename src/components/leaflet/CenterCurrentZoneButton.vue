<script setup lang="ts">
import type { Map as LeafletMap } from 'leaflet'
import type { PropType, Ref } from 'vue'
import { ref, watch, watchEffect } from 'vue'
import { useZoneStore } from '~/stores/zone'

const props = defineProps({
  map: {
    type: Object as PropType<Ref<LeafletMap | null> | null>,
    default: null,
  },
})

const zone = useZoneStore()
const visible = ref(false)

function isCentered(map: LeafletMap): boolean {
  const pos = zone.current.position
  const center = map.getCenter()
  const threshold = 0.0001
  return Math.abs(center.lat - pos.lat) < threshold && Math.abs(center.lng - pos.lng) < threshold
}

function update() {
  const map = props.map?.value ?? null
  if (map)
    visible.value = !isCentered(map)
  else
    visible.value = false
}

watchEffect((onCleanup) => {
  const map = props.map?.value ?? null
  if (!map) {
    visible.value = false
    return
  }
  update()
  map.on('moveend', update)
  onCleanup(() => {
    map.off('moveend', update)
  })
})

watch(() => zone.currentId, () => {
  update()
})

function center() {
  const map = props.map?.value ?? null
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
    class="absolute bottom-2 left-1/2 z-50 -translate-x-1/2"
    aria-label="Center on zone"
    @click="center"
  >
    <div class="i-carbon-location text-xl" />
  </UiButton>
</template>
