<script setup lang="ts">
import AchievementsPanel from '~/components/achievements/AchievementsPanel.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import InventoryModal from '~/components/inventory/InventoryModal.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import MainPanelView from '~/components/panels/MainPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import EvolutionModal from '~/components/shlagemon/EvolutionModal.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import TypeChartModal from '~/components/shlagemon/TypeChartModal.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import ZoneMapModal from '~/components/zones/ZoneMapModal.vue'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useInterfaceStore } from '~/stores/interface'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useUIStore } from '~/stores/ui'

const ui = useInterfaceStore()
const lockStore = useFeatureLockStore()
const shlagedex = useShlagedexStore()
const uiStore = useUIStore()
const { isMobile, displayDex, displayZonePanel, displayGamePanel, displayInventory, displayAchievements, group2Classes } = uiStore
</script>

<template>
  <div class="w-full select-none overflow-hidden">
    <div
      class="game h-full flex flex-col gap-1 p-1"
      md="flex-row justify-between"
    >
      <div v-if="displayInventory || displayAchievements || (!isMobile && displayDex)" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4">
        <PanelWrapper v-if="displayInventory" title="Inventaire" class="overflow-hidden" :is-locked="lockStore.isInventoryLocked">
          <template #icon>
            <div class="i-carbon-inventory-management" />
          </template>
          <InventoryPanel />
        </PanelWrapper>

        <PanelWrapper v-if="displayAchievements" title="Succès" class="overflow-hidden" :is-locked="lockStore.areAchievementsLocked">
          <template #icon>
            <div class="i-carbon-trophy" />
          </template>
          <AchievementsPanel />
        </PanelWrapper>
      </div>

      <div v-if="displayGamePanel || displayZonePanel" :class="group2Classes" class="overflow-hidden" md="basis-1/2">
        <PanelWrapper is-inline>
          <PlayerInfos />
        </PanelWrapper>

        <PanelWrapper v-if="displayGamePanel" class="overflow-hidden">
          <MainPanelView class="flex-1" />
        </PanelWrapper>

        <PanelWrapper v-if="displayZonePanel" title="Zones" class="overflow-hidden" is-mobile-hidable :is-locked="lockStore.areZonesLocked">
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <ZonePanel />
        </PanelWrapper>
      </div>

      <div v-if="displayDex" :class="isMobile && ui.mobileMainPanel === 'zone' ? '' : 'max-h-40vh'" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4 flex-1 max-h-none">
        <PanelWrapper v-if="displayDex" title="Shlagédex" class="overflow-hidden" is-mobile-hidable :is-locked="lockStore.isShlagedexLocked">
          <template #icon>
            <SchlagedexIcon class="h-4 w-4" />
          </template>
          <Shlagedex v-if="shlagedex.shlagemons.length" />
        </PanelWrapper>
      </div>

      <EvolutionModal />
      <ZoneMapModal />
      <InventoryModal />
      <TypeChartModal />
    </div>
  </div>
</template>

<style scoped>
.panel-group {
  @apply gap-1 flex flex-col;
}
</style>
