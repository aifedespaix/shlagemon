<script setup lang="ts">
import type { Zone } from '~/type'
import { computed } from 'vue'
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'

const zone = useZoneStore()
const dex = useShlagedexStore()
const panel = useMainPanelStore()
const progress = useZoneProgressStore()
const dialog = useDialogStore()

const zoneButtonsDisabled = computed(
  () => panel.current === 'trainerBattle' || dialog.isDialogVisible,
)

const xpZones = computed(() => zone.zones.filter(z => z.maxLevel > 0))

const accessibleZones = computed(() => zone.zones.filter(z => canAccess(z)))

function canAccess(z: Zone) {
  if (z.type === 'village')
    return z.minLevel <= dex.highestLevel
  const idx = xpZones.value.findIndex(x => x.id === z.id)
  if (idx === 0)
    return dex.highestLevel >= z.minLevel
  const prev = xpZones.value[idx - 1]
  return dex.highestLevel >= z.minLevel && progress.isKingDefeated(prev.id)
}

function classes(z: Zone) {
  const classes: string[] = []
  if (z.id === zone.current.id) {
    classes.push('bg-primary text-dark dark:bg-light')
    return classes.join(' ')
  }
  if (z.type === 'village') {
    classes.push('bg-green-300 dark:bg-green-800')
    return classes.join(' ')
  }

  const level = dex.activeShlagemon?.lvl || 0
  if (z.maxLevel < level)
    classes.push('bg-blue-200 dark:bg-gray-700')
  else if (level >= z.minLevel && level <= z.maxLevel)
    classes.push('bg-blue-500 dark:bg-blue-600')
  else if (z.minLevel > level && z.minLevel - level <= 5)
    classes.push('bg-orange-400 dark:bg-orange-800')
  else
    classes.push('bg-red-400 dark:bg-red-700')

  return classes.join(' ')
}
</script>

<template>
  <div class="flex flex-col gap-2" md="gap-3">
    <div class="flex flex-wrap justify-center gap-1" md="gap-2">
      <button
        v-for="z in accessibleZones"
        :key="z.id"
        class="rounded px-2 py-1 text-xs"
        :class="`${classes(z)} ${zoneButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`"
        :disabled="zoneButtonsDisabled"
        @click="!zoneButtonsDisabled && zone.setZone(z.id)"
      >
        {{ z.name }}
      </button>
    </div>
  </div>
</template>
