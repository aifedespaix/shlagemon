<script setup lang="ts">
import type { Zone } from '~/type'

const zone = useZoneStore()
const dex = useShlagedexStore()
const progress = useZoneProgressStore()

const xpZones = computed(() =>
  zone.zones.filter(z => (z.maxLevel ?? 0) > 0),
)

const accessibleZones = computed(() => zone.zones.filter(z => canAccess(z)))
const accessibleSavages = computed(() => accessibleZones.value.filter(z => z.type === 'sauvage'))
const accessibleVillages = computed(() => accessibleZones.value.filter(z => z.type === 'village'))

function canAccess(z: Zone) {
  if (z.type === 'village')
    return z.minLevel <= dex.highestLevel
  const idx = xpZones.value.findIndex(x => x.id === z.id)
  if (idx === 0)
    return true
  const prev = xpZones.value[idx - 1]
  return progress.isKingDefeated(prev.id)
}

function onVillageWheel(e: WheelEvent) {
  const el = e.currentTarget as HTMLElement
  el.scrollLeft += e.deltaY
}
</script>

<template>
  <div class="relative flex flex-1 flex-col gap-1 overflow-hidden">
    <ZonePrevButton />
    <ZoneNextButton />
    <div v-if="zone.wildCooldownRemaining > 0" class="absolute bottom-0 left-4 right-4 z-200">
      <UiProgressBar

        :value="1000 - zone.wildCooldownRemaining"
        :max="1000"
        color="bg-blue-600 dark:bg-blue-700"
        class="mb-1 h-1"
      />
    </div>
    <div
      id="savages"
      class="tiny-scrollbar grid h-full snap-y snap-mandatory gap-1 overflow-y-auto p-1"
      style="grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr))"
    >
      <ZoneButtonWild
        v-for="z in accessibleSavages"
        :key="z.id"
        :zone="z"
        class="snap-start"
      />
    </div>

    <div
      id="villages"
      class="tiny-scrollbar flex gap-1 overflow-x-auto overflow-y-hidden"
      @wheel.passive="onVillageWheel"
    >
      <ZoneButtonVillage
        v-for="z in accessibleVillages"
        :key="z.id"
        :zone="z"
        class="aspect-square h-full shrink-0"
      />
    </div>
  </div>
</template>

<style scoped>
.zone-grid {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
