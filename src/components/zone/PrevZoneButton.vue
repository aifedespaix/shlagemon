<script setup lang="ts">
const zone = useZoneStore()
const dex = useShlagedexStore()
const { accessibleZones } = useZoneAccess(toRef(dex, 'highestLevel'))

const disabled = computed(() => accessibleZones.value[0]?.id === zone.currentId)

function goPrev() {
  if (disabled.value)
    return
  const idx = accessibleZones.value.findIndex(z => z.id === zone.currentId)
  if (idx > 0)
    zone.setZone(accessibleZones.value[idx - 1].id)
}
</script>

<template>
  <UiButton
    type="icon"
    class="absolute bottom-2 left-2 z-50"
    :disabled="disabled"
    @click="goPrev"
  >
    <div class="i-carbon:chevron-left text-xl" />
  </UiButton>
</template>
