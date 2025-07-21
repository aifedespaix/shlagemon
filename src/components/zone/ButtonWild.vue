<script setup lang="ts">
import type { SavageZone } from '~/type/zone'

const props = defineProps<{ zone: SavageZone }>()
const zoneStore = useZoneStore()
const dex = useShlagedexStore()
const panel = useMainPanelStore()
const arena = useArenaStore()
const progress = useZoneProgressStore()
const dialog = useDialogStore()
const featureLock = useFeatureLockStore()
const visit = useZoneVisitStore()
const { t } = useI18n()

const zoneButtonsDisabled = computed(
  () =>
    panel.current === 'trainerBattle'
    || panel.current === 'arena'
    || dialog.isDialogVisible
    || arena.inBattle
    || featureLock.areZonesLocked,
)

function buttonDisabled() {
  if (zoneButtonsDisabled.value)
    return true
  return zoneStore.wildCooldownRemaining > 0
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

function allCaptured() {
  const list = props.zone.shlagemons
  if (!list?.length)
    return false
  return list.every(base => dex.shlagemons.some(mon => mon.base.id === base.id))
}

function perfectZone() {
  const list = props.zone.shlagemons
  if (!list?.length)
    return false
  return list.every((base) => {
    const mon = dex.shlagemons.find(m => m.base.id === base.id)
    return mon?.rarity === 100
  })
}

function kingDefeated() {
  const hasKing = props.zone.hasKing ?? props.zone.type === 'sauvage'
  return hasKing && progress.isKingDefeated(props.zone.id)
}

const highlightClasses = 'animate-pulse-alt  animate-count-infinite'
</script>

<template>
  <button
    class="relative grid grid-rows-2 aspect-square gap-1 rounded px-2 py-1 text-xs"
    :class="[
      classes(),
      buttonDisabled() ? 'opacity-50 cursor-not-allowed' : '',
      props.zone.id !== zoneStore.current.id && !visit.visited[props.zone.id] ? highlightClasses : '',
    ]"
    :disabled="buttonDisabled()"
    @click="selectZone"
  >
    <UiBadge
      v-if="props.zone.id === zoneStore.current.id"
      inner
      size="square"
      icon="i-carbon:user-filled"
    />
    <span class="text-2xs absolute left-1 top-0.5">{{ props.zone.minLevel }}</span>
    <span class="text-2xs absolute right-1 top-0.5">{{ props.zone.maxLevel }}</span>
    <div class="flex-center">
      <div class="i-game-icons:forest h-6 w-6" />
    </div>
    <div class="flex-center">
      <span>{{ props.zone.name }}</span>
    </div>
    <div class="flex items-center justify-center gap-2">
      <img
        v-if="allCaptured()"
        src="/items/shlageball/shlageball.png"
        :alt="t('components.panel.Zone.capturedAlt')"
        class="h-4 w-4"
        :style="perfectZone() ? { filter: 'hue-rotate(60deg) brightness(1.1)' } : {}"
      >
      <div
        v-if="kingDefeated()"
        class="i-game-icons:crown h-4 w-4"
      />
    </div>
  </button>
</template>
