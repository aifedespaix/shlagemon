<script setup lang="ts">
import type { SavageZoneId } from '~/type'

const zone = useZoneStore()
const panel = useMainPanelStore()
const mini = useMiniGameStore()
const mobile = useMobileTabStore()
const progress = useZoneProgressStore()
const trainerBattle = useTrainerBattleStore()
const arena = useArenaStore()
const dialog = useDialogStore()
const player = usePlayerStore()
const { t } = useI18n()

const hasKing = computed(() =>
  zone.current.hasKing ?? zone.current.type === 'sauvage',
)
const hasArena = computed(() => !!zone.current.arena)
const hasPoulailler = computed(() => !!zone.current.village?.poulailler)
const arenaCompleted = computed(() => progress.isArenaCompleted(zone.current.id))
const currentArenaData = computed(() => {
  const data = zone.current.arena?.arena
  if (!data)
    return undefined
  return typeof data === 'function' ? data() : data
})
const canOpenArena = computed(() => {
  if (!currentArenaData.value)
    return false
  if (arenaCompleted.value && !useDeveloperStore().debug)
    return false
  const required = currentArenaData.value.requiredBadgeId
  return !required || player.hasBadge(required)
})
const currentKing = computed(() =>
  hasKing.value ? zone.getKing(zone.current.id as SavageZoneId) : undefined,
)
const kingLabel = computed(() =>
  currentKing.value?.character.gender === 'female' ? 'reine' : 'roi',
)

function actionIcon(id: string) {
  switch (id) {
    case 'shop':
      return 'i-carbon:shopping-bag'
    case 'explore':
      return 'i-mdi:compass'
    case 'minigame':
      return 'i-carbon:game-console'
    default:
      return ''
  }
}

function onAction(id: string) {
  if (arena.inBattle)
    return
  if (id === 'shop') {
    panel.showShop()
  }
  else if (id === 'explore') {
    panel.showTrainerBattle()
  }
  else if (id === 'minigame') {
    if (zone.current.miniGame)
      mini.select(zone.current.miniGame)
    panel.showMiniGame()
    mobile.set('game')
  }
}

function openArena() {
  if (arena.inBattle || !currentArenaData.value)
    return
  if (currentArenaData.value.requiredBadgeId && !player.hasBadge(currentArenaData.value.requiredBadgeId))
    return
  arena.setArena(currentArenaData.value)
  dialog.resetArenaDialogs()
  panel.showArena()
}

function fightKing() {
  if (arena.inBattle)
    return
  const trainer = currentKing.value
  if (!trainer)
    return
  trainerBattle.setQueue([trainer])
  panel.showTrainerBattle()
}

function openPoulailler() {
  if (arena.inBattle)
    return
  panel.showPoulailler()
}
</script>

<template>
  <div class="actions-grid grid w-full gap-2 p-1" md="gap-3 p-2">
    <UiNavigationButton
      v-if="zone.current.village?.shop"
      icon="i-carbon:shopping-bag"
      :label="t('components.village.ZoneActions.shop')"
      class="bg-green-600 text-white dark:bg-green-700"
      hover="bg-green-700 dark:bg-green-800"
      :disabled="arena.inBattle"
      @click="panel.showShop()"
    />
    <UiNavigationButton
      v-for="action in zone.current.actions"
      :key="action.id"
      :icon="actionIcon(action.id)"
      :label="action.label"
      :class="action.id === 'minigame' ? 'bg-violet-600 text-white dark:bg-violet-700' : ''"
      :hover="action.id === 'minigame' ? 'bg-violet-700 dark:bg-violet-800' : undefined"
      :disabled="arena.inBattle"
      @click="onAction(action.id)"
    />
    <UiNavigationButton
      v-if="zone.current.miniGame && !zone.current.actions.some(a => a.id === 'minigame')"
      icon="i-carbon:game-console"
      :label="t('components.village.ZoneActions.minigame')"
      class="bg-violet-600 text-white dark:bg-violet-700"
      hover="bg-violet-700 dark:bg-violet-800"
      :disabled="arena.inBattle"
      @click="onAction('minigame')"
    />
    <UiNavigationButton
      v-if="hasArena && canOpenArena"
      icon="i-mdi:sword-cross"
      :label="t('components.village.ZoneActions.arena')"
      class="bg-red-600 text-white dark:bg-red-700"
      hover="bg-red-700 dark:bg-red-800"
      :disabled="arena.inBattle"
      @click="openArena"
    />
    <UiNavigationButton
      v-if="hasPoulailler"
      icon="i-game-icons:bird-house"
      :label="t('components.village.ZoneActions.henhouse')"
      :disabled="arena.inBattle"
      @click="openPoulailler"
    />
    <UiNavigationButton
      v-if="hasKing && !progress.isKingDefeated(zone.current.id) && progress.canFightKing(zone.current.id)"
      icon="i-game-icons:crown"
      :label="t('components.village.ZoneActions.fightKing', { label: kingLabel })"
      :disabled="arena.inBattle"
      @click="fightKing"
    />
    <div
      v-else-if="hasKing && progress.isKingDefeated(zone.current.id)"
      class="flex-center text-xs font-bold"
    >
      {{ t('components.village.ZoneActions.kingDefeated', { label: kingLabel.charAt(0).toUpperCase() + kingLabel.slice(1), suffix: kingLabel === 'reine' ? 'e' : '' }) }}
    </div>
  </div>
</template>

<style scoped>
.actions-grid {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
