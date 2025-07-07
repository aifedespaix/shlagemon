<script setup lang="ts">
import type { MainPanel } from '~/stores/mainPanel'
import type { ZoneId } from '~/type/zone'
import { useMediaQuery } from '@vueuse/core'
import { computed, watch } from 'vue'
import AchievementsPanel from '~/components/achievements/AchievementsPanel.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import InventoryModal from '~/components/inventory/InventoryModal.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import MainPanelView from '~/components/panels/MainPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import EvolutionModal from '~/components/shlagemon/EvolutionModal.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import ZoneMapModal from '~/components/zones/ZoneMapModal.vue'
import { trainerTracks, zoneBattleTracks, zoneTracks } from '~/data/music'
import { useAchievementsStore } from '~/stores/achievements'
import { useAudioStore } from '~/stores/audio'
import { useDialogStore } from '~/stores/dialog'
import { useGameStateStore } from '~/stores/gameState'
import { useInterfaceStore } from '~/stores/interface'
import { useInventoryStore } from '~/stores/inventory'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'

const gameState = useGameStateStore()
const zone = useZoneStore()
const inventory = useInventoryStore()
const shlagedex = useShlagedexStore()
const dialogStore = useDialogStore()
const achievements = useAchievementsStore()
const mainPanel = useMainPanelStore()
const audio = useAudioStore()
const trainerBattle = useTrainerBattleStore()
const mobileTab = useMobileTabStore()
const ui = useInterfaceStore()
const isMobile = useMediaQuery('(max-width: 767px)')

const showXpBar = computed(() =>
  ['battle', 'trainerBattle'].includes(mainPanel.current),
)

const showMainPanel = computed(() =>
  dialogStore.isDialogVisible
  || gameState.hasPokemon
  || zone.current.type === 'village',
)
const isInventoryVisible = computed(() => inventory.list.length > 0)
const isShlagedexVisible = computed(() => shlagedex.shlagemons.length > 0)
const isAchievementVisible = computed(() => achievements.hasAny)

const isDexUnderGame = computed(() => ui.mobileMainPanel === 'dex')

const displayZonePanel = computed(() =>
  !isDexUnderGame.value
  && isShlagedexVisible.value
  && (!isMobile.value || mobileTab.current === 'game'),
)
const displayGamePanel = computed(() => showMainPanel.value && (!isMobile.value || mobileTab.current === 'game'))
const displayInventory = computed(() => isInventoryVisible.value && !isMobile.value)
const displayAchievements = computed(() => isAchievementVisible.value && (!isMobile.value || mobileTab.current === 'achievements'))
const displayDex = computed(() => {
  const inGameTab = !isMobile.value || mobileTab.current === 'game'
  const inDexTab = !isMobile.value || mobileTab.current === 'dex'
  return isShlagedexVisible.value && (isDexUnderGame.value ? inGameTab : inDexTab)
})

const group2Classes = computed(() => {
  const classes = ['panel-group']
  if (!isMobile.value || displayGamePanel.value || displayZonePanel.value)
    classes.push('flex-1')
  return classes.join(' ')
})

watch<[MainPanel, ZoneId, string | undefined], true>(
  () => [mainPanel.current, zone.current.id, trainerBattle.current?.id],
  ([panel, zoneId, trainerId]) => {
    if (panel === 'battle')
      audio.fadeToMusic(zoneBattleTracks[zoneId])
    else if (panel === 'trainerBattle')
      audio.fadeToMusic(trainerTracks[trainerId || `king-${zoneId}`])
    else
      audio.fadeToMusic(zoneTracks[zoneId])
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full select-none overflow-hidden">
    <div
      class="game h-full flex flex-col gap-1 p-1"
      md="grid grid-cols-4 grid-rows-1 w-full  gap-2"
      xl="grid-cols-5"
    >
      <div class="panel-group overflow-hidden">
        <PanelWrapper v-if="displayInventory" title="Inventaire" class="overflow-hidden">
          <template #icon>
            <div class="i-carbon-inventory-management" />
          </template>
          <InventoryPanel />
        </PanelWrapper>

        <PanelWrapper v-if="displayAchievements" title="Succès" class="overflow-hidden">
          <template #icon>
            <div class="i-carbon-trophy" />
          </template>
          <AchievementsPanel />
        </PanelWrapper>
      </div>

      <div :class="group2Classes" md="col-span-2 col-start-2" xl="col-span-3">
        <PanelWrapper is-inline>
          <PlayerInfos />
        </PanelWrapper>

        <PanelWrapper v-if="displayGamePanel" class="overflow-hidden">
          <MainPanelView class="flex-1" md="p-4" />
          <ShlagemonXpBar
            v-if="showXpBar && shlagedex.activeShlagemon"
            :mon="shlagedex.activeShlagemon"
          />
        </PanelWrapper>

        <PanelWrapper v-if="displayZonePanel" title="Zones" class="overflow-hidden">
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <ZonePanel />
        </PanelWrapper>
      </div>

      <div v-if="displayDex" class="panel-group flex-1 overflow-hidden">
        <PanelWrapper title="Shlagédex" class="overflow-hidden">
          <template #icon>
            <SchlagedexIcon class="h-4 w-4" />
          </template>
          <Shlagedex />
        </PanelWrapper>
      </div>

      <EvolutionModal />
      <ZoneMapModal />
      <InventoryModal />
    </div>
  </div>
</template>

<style scoped>
.panel-group {
  @apply gap-2 flex flex-col;
}
</style>
