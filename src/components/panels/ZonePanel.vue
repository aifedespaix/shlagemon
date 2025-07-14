<script setup lang="ts">
import type { Zone } from '~/type'
import { computed } from 'vue'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { useArenaStore } from '~/stores/arena'
import { useDialogStore } from '~/stores/dialog'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { useZoneVisitStore } from '~/stores/zoneVisit'

const zone = useZoneStore()
const dex = useShlagedexStore()
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

function buttonDisabled(z: Zone) {
  if (zoneButtonsDisabled.value)
    return true
  return z.type === 'sauvage' && zone.wildCooldownRemaining > 0
}

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

function selectZone(id: string) {
  const z = zone.zones.find(zz => zz.id === id)
  if (!z || buttonDisabled(z))
    return
  zone.setZone(id)
}

function icon(z: Zone) {
  if (z.type === 'village')
    return 'i-game-icons:village'
  if (z.type === 'grotte')
    return 'i-game-icons:cave-entrance'
  return 'i-game-icons:forest'
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

function allCaptured(z: Zone) {
  const list = z.shlagemons
  if (!list?.length)
    return false
  return list.every(base => dex.shlagemons.some(mon => mon.base.id === base.id))
}

function kingDefeated(z: Zone) {
  const hasKing = z.hasKing ?? z.type === 'sauvage'
  return hasKing && progress.isKingDefeated(z.id)
}

function arenaDefeated(z: Zone) {
  return !!z.arena && progress.isArenaCompleted(z.id)
}

function isNew(z: Zone) {
  return !visit.visited[z.id]
}
const highlightClasses = 'animate-pulse-alt  animate-count-infinite'
</script>

<template>
  <div class="relative flex flex-1 flex-col overflow-hidden">
    <div v-if="zone.wildCooldownRemaining > 0" class="absolute bottom-0 left-4 right-4 z-200">
      <ProgressBar

        :value="1000 - zone.wildCooldownRemaining"
        :max="1000"
        color="bg-blue-600 dark:bg-blue-700"
        class="mb-1 h-1"
      />
    </div>
    <div class="tiny-scrollbar zone-grid grid h-full flex-1 gap-2 overflow-auto p-1" md="gap-3">
      <button
        v-for="z in accessibleZones"
        :key="z.id"
        class="relative grid grid-rows-2 max-h-[120px] gap-1 rounded px-2 py-1 text-xs"
        :class="[
          classes(z),
          buttonDisabled(z) ? 'opacity-50 cursor-not-allowed' : '',
          isNew(z) ? highlightClasses : '',
        ]"
        :disabled="buttonDisabled(z)"
        @click="selectZone(z.id)"
      >
        <UiBadge
          v-if="z.id === zone.current.id"
          inner
          size="square"
          icon="i-carbon:user-filled"
        />
        <div class="flex-center">
          <div class="h-6 w-6" :class="icon(z)" />
        </div>
        <div class="flex-center">
          <span>{{ z.name }}</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <img
            v-if="allCaptured(z)"
            src="/items/shlageball/shlageball.png"
            alt="capturé"
            class="h-4 w-4"
          >
          <div
            v-if="kingDefeated(z)"
            class="i-game-icons:crown h-4 w-4"
          />
          <div
            v-if="arenaDefeated(z)"
            class="i-mdi:sword-cross h-4 w-4"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.zone-grid {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
