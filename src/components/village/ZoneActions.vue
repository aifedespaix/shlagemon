<script setup lang="ts">
import type { SavageZoneId } from '~/type'
import { getArenaByZoneId } from '~/data/arenas'

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

const kingPoi = computed(() =>
  zone.current.type === 'village'
    ? zone.current.pois.king
    : undefined,
)
const hasKing = computed(() =>
  zone.current.type === 'sauvage'
  || !!kingPoi.value,
)
const arenaPoi = computed(() =>
  zone.current.type === 'village'
    ? zone.current.pois.arena
    : undefined,
)
const hasArena = computed(() => !!arenaPoi.value)
const shopPoi = computed(() =>
  zone.current.type === 'village'
    ? zone.current.pois.shop
    : undefined,
)
const miniGamePoi = computed(() =>
  zone.current.type === 'village'
    ? zone.current.pois.minigame
    : undefined,
)
const poulaillerPoi = computed(() =>
  zone.current.type === 'village'
    ? zone.current.pois.poulailler
    : undefined,
)
const hasPoulailler = computed(() => !!poulaillerPoi.value)
const arenaCompleted = computed(() => progress.isArenaCompleted(zone.current.id))
const currentArenaData = computed(() =>
  zone.current.type === 'village' ? getArenaByZoneId(zone.current.id) : undefined,
)
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

function openMinigame() {
  if (arena.inBattle)
    return
  if (miniGamePoi.value?.miniGame)
    mini.select(miniGamePoi.value.miniGame)
  panel.showMiniGame()
  mobile.set('game')
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
      v-if="shopPoi"
      icon="i-carbon:shopping-bag"
      :label="t('components.village.ZoneActions.shop')"
      class="bg-green-600 text-white dark:bg-green-700"
      hover="bg-green-700 dark:bg-green-800"
      :disabled="arena.inBattle"
      @click="panel.showShop()"
    />
    <UiNavigationButton
      v-if="miniGamePoi"
      icon="i-carbon:game-console"
      :label="t('components.village.ZoneActions.minigame')"
      class="bg-violet-600 text-white dark:bg-violet-700"
      hover="bg-violet-700 dark:bg-violet-800"
      :disabled="arena.inBattle"
      @click="openMinigame"
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
