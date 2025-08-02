<script setup lang="ts">
import type { ZoneId } from '~/type/zone'

const zone = useZoneStore()
const dex = useShlagedexStore()
const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

const selectZone = inject<(id: ZoneId) => void>('selectZone')

const disabled = computed(() =>
  accessibleZones.value[0]?.id === zone.currentId
  || zone.wildCooldownRemaining > 0,
)

function goPrev() {
  if (disabled.value)
    return
  const idx = accessibleZones.value.findIndex(z => z.id === zone.currentId)
  if (idx > 0)
    (selectZone ?? zone.setZone)(accessibleZones.value[idx - 1].id)
}
</script>

<template>
  <MapArrowButton direction="prev" :disabled="disabled" @click="goPrev" />
</template>
