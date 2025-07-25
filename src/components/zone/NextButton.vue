<script setup lang="ts">
import type { ZoneId } from '~/type/zone'

const zone = useZoneStore()
const dex = useShlagedexStore()
const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

const selectZone = inject<(id: ZoneId) => void>('selectZone')

const disabled = computed(() => accessibleZones.value[accessibleZones.value.length - 1]?.id === zone.currentId)

function goNext() {
  if (disabled.value)
    return
  const idx = accessibleZones.value.findIndex(z => z.id === zone.currentId)
  if (idx < accessibleZones.value.length - 1)
    (selectZone ?? zone.setZone)(accessibleZones.value[idx + 1].id)
}
</script>

<template>
  <UiButton
    type="icon"
    class="absolute bottom-1 right-1 z-500"
    :disabled="disabled"
    @click="goNext"
  >
    <div class="i-carbon:chevron-right text-xl" />
  </UiButton>
</template>
