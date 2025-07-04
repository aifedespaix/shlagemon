<script setup lang="ts">
import AchievementsPanel from '~/components/achievements/AchievementsPanel.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import MainPanel from '~/components/panels/MainPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import EvolutionModal from '~/components/shlagemon/EvolutionModal.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useAchievementsStore } from '~/stores/achievements'
import { useDialogStore } from '~/stores/dialog'
import { useGameStateStore } from '~/stores/gameState'
import { useInventoryStore } from '~/stores/inventory'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'

const gameState = useGameStateStore()
const zone = useZoneStore()
const inventory = useInventoryStore()
const shlagedex = useShlagedexStore()
const dialogStore = useDialogStore()
const achievements = useAchievementsStore()
const mainPanel = useMainPanelStore()

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
</script>

<template>
  <div class="w-full select-none overflow-auto" md="overflow-hidden">
    <div
      class="game flex flex-col gap-1 p-1"
      md="grid grid-cols-12 grid-rows-12 w-full h-full gap-2"
    >
      <div v-if="isShlagedexVisible" class="zone zone-big" md="col-span-6 row-span-5  col-start-4 row-start-8">
        <!-- middle C zone -->
        <PanelWrapper title="Zones">
          <ZonePanel />
        </PanelWrapper>
      </div>
      <div class="zone overflow-visible!" md="col-span-6 row-span-1 col-start-4 row-start-1">
        <!-- top zone -->
        <PanelWrapper is-inline>
          <PlayerInfos />
        </PanelWrapper>
      </div>
      <div v-if="showMainPanel" class="zone" md="col-span-6 row-span-6 col-start-4 row-start-2">
        <!-- middle A zone -->
        <PanelWrapper>
          <MainPanel class="flex-1" />
          <ShlagemonXpBar
            v-if="showXpBar && shlagedex.activeShlagemon"
            :mon="shlagedex.activeShlagemon"
          />
        </PanelWrapper>
      </div>
      <!-- <div v-if="shlagedex.activeShlagemon" class="zone" md="col-span-6 row-span-1 col-start-4 row-start-7">
        <PanelWrapper>
          <ActiveShlagemon />
        </PanelWrapper>
      </div> -->
      <div v-if="isInventoryVisible || isAchievementVisible" class="zone" md="col-span-3 row-span-12 col-start-1 row-start-1 flex flex-col gap-2">
        <!-- left zone -->
        <PanelWrapper v-if="isInventoryVisible" title="Inventaire">
          <InventoryPanel />
        </PanelWrapper>
        <PanelWrapper v-if="isAchievementVisible" title="Succès">
          <AchievementsPanel />
        </PanelWrapper>
      </div>
      <div v-if="isShlagedexVisible" class="zone tiny-scrollbar" md="col-span-3 row-span-12 col-start-10 row-start-1  overflow-auto">
        <!-- right zone -->
        <PanelWrapper title="Shlagédex">
          <Shlagedex />
        </PanelWrapper>
      </div>
      <EvolutionModal />
    </div>
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
}
</style>
