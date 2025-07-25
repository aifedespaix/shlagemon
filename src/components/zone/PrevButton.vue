<script setup lang="ts">
import type { ZoneId } from '~/type/zone'

const zone = useZoneStore()
const dex = useShlagedexStore()
const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

const selectZone = inject<(id: ZoneId) => void>('selectZone')

const disabled = computed(() => accessibleZones.value[0]?.id === zone.currentId)

function goPrev() {
  if (disabled.value)
    return
  const idx = accessibleZones.value.findIndex(z => z.id === zone.currentId)
  if (idx > 0)
    (selectZone ?? zone.setZone)(accessibleZones.value[idx - 1].id)
}
</script>

<template>
  <UiButton
    v-if="!disabled"
    type="icon"
    class="absolute bottom-1 left-1 z-500"
    @click="goPrev"
  >
    <div class="i-carbon:chevron-left text-xl" />
  </UiButton>
</template>
