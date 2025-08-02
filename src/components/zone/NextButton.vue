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
  <MapArrowButton direction="next" :disabled="disabled" @click="goNext" />
</template>
