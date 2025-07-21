<script setup lang="ts">
import type { Zone } from '~/type/zone'

const props = defineProps<{ zone: Zone }>()
const zoneStore = useZoneStore()
const panel = useMainPanelStore()
const arena = useArenaStore()
const progress = useZoneProgressStore()
const dialog = useDialogStore()
const featureLock = useFeatureLockStore()
const visit = useZoneVisitStore()

const zoneButtonsDisabled = computed(
  () =>
    panel.current === 'trainerBattle'
    || panel.current === 'arena'
    || dialog.isDialogVisible
    || arena.inBattle
    || featureLock.areZonesLocked,
)

function buttonDisabled() {
  return zoneButtonsDisabled.value
}

function selectZone() {
  if (buttonDisabled())
    return
  zoneStore.setZone(props.zone.id)
}

function classes() {
  const z = props.zone
  const classes: string[] = []
  if (z.id === zoneStore.current.id) {
    classes.push('bg-primary text-dark dark:bg-light')
    classes.push('border-2 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400')
    return classes.join(' ')
  }
  classes.push('bg-green-300 dark:bg-green-800')
  return classes.join(' ')
}
</script>

<template>
  <button
    class="relative grid grid-rows-2 aspect-square gap-1 rounded px-2 py-1 text-xs"
    :class="[
      classes(),
      buttonDisabled() ? 'opacity-50 cursor-not-allowed' : '',
      props.zone.id !== zoneStore.current.id && !visit.visited[props.zone.id] ? 'animate-pulse-alt  animate-count-infinite' : '',
    ]"
    :disabled="buttonDisabled()"
    @click="selectZone"
  >
    <div class="flex-center">
      <div class="i-game-icons:village h-6 w-6" />
    </div>
    <div class="flex-center">
      <span>{{ props.zone.name }}</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <div v-if="progress.isArenaCompleted(props.zone.id)" class="i-mdi:sword-cross h-4 w-4" />
      <div v-else-if="props.zone.arena" class="i-mdi:sword-cross h-4 w-4 opacity-50 grayscale" />
    </div>
  </button>
</template>
