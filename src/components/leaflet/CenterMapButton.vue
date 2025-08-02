<script setup lang="ts">
import type { Map as LeafletMap } from 'leaflet'
import type { Position } from '~/type'

const props = defineProps<{ map?: LeafletMap | null, getTarget: () => Position }>()

const visible = ref(false)

function isCentered(map: LeafletMap): boolean {
  const pos = props.getTarget()
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

watchEffect(() => {
  props.getTarget()
  update()
})

function center() {
  const map = props.map
  if (!map)
    return
  const pos = props.getTarget()
  map.panTo([pos.lat, pos.lng])
}
</script>

<template>
  <Transition name="fade-slide">
    <UiButton
      v-if="visible"
      type="icon"
      class="absolute left-1/2 z-500 rounded-b-0 pb-1 opacity-75 -bottom-1 -translate-x-1/2"
      aria-label="Center map"
      @click="center"
    >
      <div class="i-carbon-location text-xl" />
    </UiButton>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
