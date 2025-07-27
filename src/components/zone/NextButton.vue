<script setup lang="ts">
import type { ZoneId } from '~/type/zone'

const zone = useZoneStore()
const dex = useShlagedexStore()
const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

const selectZone = inject<(id: ZoneId) => void>('selectZone')

const disabled = computed(() =>
  accessibleZones.value[accessibleZones.value.length - 1]?.id === zone.currentId
  || zone.wildCooldownRemaining > 0,
)

function goNext() {
  if (disabled.value)
    return
  const idx = accessibleZones.value.findIndex(z => z.id === zone.currentId)
  if (idx < accessibleZones.value.length - 1)
    (selectZone ?? zone.setZone)(accessibleZones.value[idx + 1].id)
}
</script>

<template>
  <Transition name="fade-slide">
    <UiButton
      v-if="!disabled"
      type="icon"
      class="absolute bottom-1 right-1 z-500"
      @click="goNext"
    >
      <div class="i-carbon:chevron-right text-xl" />
    </UiButton>
  </Transition>
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
