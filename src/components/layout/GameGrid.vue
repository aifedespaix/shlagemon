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

const displayZonePanel = computed(() =>
  isShlagedexVisible.value && (!isMobile.value || mobileTab.current === 'game'),
)
const displayPlayerInfo = computed(() => !isMobile.value || mobileTab.current === 'game')
const displayMainPanel = computed(() => showMainPanel.value && (!isMobile.value || mobileTab.current === 'game'))
const displayInventory = computed(() => isInventoryVisible.value && !isMobile.value)
const displayAchievements = computed(() => isAchievementVisible.value && (!isMobile.value || mobileTab.current === 'achievements'))
const displayDex = computed(() => isShlagedexVisible.value && (!isMobile.value || mobileTab.current === 'dex'))

watch(
  () => [mainPanel.current, zone.current.id, trainerBattle.current?.id] as const,
  ([panel, zoneId, trainerId]: [MainPanel, ZoneId, string | undefined]) => {
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
  <div class="w-full select-none overflow-auto" md="overflow-hidden">
    <div
      class="game h-full flex flex-col gap-1 p-1"
      md="grid grid-cols-12 grid-rows-12 w-full  gap-2"
    >
      <div v-if="displayPlayerInfo" class="zone overflow-visible!" md="col-span-6 row-span-1 col-start-4 row-start-1">
        <PanelWrapper is-inline>
          <PlayerInfos />
        </PanelWrapper>
      </div>

      <div v-if="displayMainPanel" class="zone flex-1" md="col-span-6 row-span-6 col-start-4 row-start-2">
        <PanelWrapper>
          <MainPanelView class="flex-1" />
          <ShlagemonXpBar
            v-if="showXpBar && shlagedex.activeShlagemon"
            :mon="shlagedex.activeShlagemon"
          />
        </PanelWrapper>
      </div>

      <div v-if="displayZonePanel" class="zone flex-1" md="col-span-6 row-span-5 col-start-4 row-start-8">
        <PanelWrapper v-if="displayMainPanel" title="Zones">
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <ZonePanel />
        </PanelWrapper>
      </div>

      <div v-if="displayInventory || displayAchievements" class="zone" md="col-span-3 row-span-12 col-start-1 row-start-1 flex flex-col gap-2">
        <PanelWrapper v-if="displayInventory" title="Inventaire">
          <template #icon>
            <div class="i-carbon-inventory-management" />
          </template>
          <InventoryPanel />
        </PanelWrapper>
        <PanelWrapper v-if="displayAchievements" title="Succès">
          <template #icon>
            <div class="i-carbon-trophy" />
          </template>
          <AchievementsPanel />
        </PanelWrapper>
      </div>

      <div v-if="displayDex" class="zone tiny-scrollbar" md="col-span-3 row-span-12 col-start-10 row-start-1  overflow-auto">
        <PanelWrapper title="Shlagédex">
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
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
}
</style>
