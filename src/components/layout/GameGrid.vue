<script setup lang="ts">
import { storeToRefs } from 'pinia'
// eslint-disable-next-line unused-imports/no-unused-imports
import { KeepAlive } from 'vue'
import AchievementsPanel from '~/components/achievements/AchievementsPanel.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import MainPanelView from '~/components/panels/MainPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import EvolutionModal from '~/components/shlagemon/EvolutionModal.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import TypeChartModal from '~/components/shlagemon/TypeChartModal.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useUIStore } from '~/stores/ui'

const lockStore = useFeatureLockStore()
const shlagedex = useShlagedexStore()
const uiStore = useUIStore()
const mobileTab = useMobileTabStore()
const {
  isMobile,
  displayDex,
  displayZonePanel,
  displayGamePanel,
  displayInventory,
  displayAchievements,
  group2Classes,
} = storeToRefs(uiStore)

const { current: activeTab } = storeToRefs(mobileTab)

const bottomComponent = computed(() => {
  switch (activeTab.value) {
    case 'achievements':
      return AchievementsPanel
    case 'zones':
      return ZonePanel
    case 'dex':
      return shlagedex.shlagemons.length ? Shlagedex : null
    case 'inventory':
      return InventoryPanel
    default:
      return null
  }
})

const bottomTitle = computed(() => {
  switch (activeTab.value) {
    case 'achievements':
      return 'Succès'
    case 'zones':
      return 'Zones'
    case 'dex':
      return 'Shlagédex'
    case 'inventory':
      return 'Inventaire'
    default:
      return ''
  }
})

const bottomLocked = computed(() => {
  switch (activeTab.value) {
    case 'achievements':
      return lockStore.areAchievementsLocked
    case 'zones':
      return lockStore.areZonesLocked
    case 'dex':
      return lockStore.isShlagedexLocked
    case 'inventory':
      return lockStore.isInventoryLocked
    default:
      return false
  }
})
</script>

<template>
  <div class="w-full select-none overflow-hidden">
    <div
      class="game h-full flex flex-col gap-1 p-1"
      md="flex-row justify-between"
    >
      <div v-if="!isMobile && (displayInventory || displayAchievements || displayDex)" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4">
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
          <PanelsPlayerInfos />
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

      <div v-if="!isMobile && displayDex" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4 flex-1 max-h-none">
        <PanelWrapper title="Shlagédex" class="overflow-hidden" is-mobile-hidable :is-locked="lockStore.isShlagedexLocked">
          <template #icon>
            <SchlagedexIcon class="h-4 w-4" />
          </template>
          <Shlagedex v-if="shlagedex.shlagemons.length" />
        </PanelWrapper>
      </div>

      <div v-if="isMobile && bottomComponent" class="panel-group max-h-40vh flex-1 overflow-hidden">
        <PanelWrapper :title="bottomTitle" class="overflow-hidden" :is-locked="bottomLocked">
          <template #icon>
            <div v-if="activeTab === 'achievements'" class="i-carbon-trophy" />
            <div v-else-if="activeTab === 'zones'" class="i-carbon-map" />
            <SchlagedexIcon v-else-if="activeTab === 'dex'" class="h-4 w-4" />
            <div v-else-if="activeTab === 'inventory'" class="i-carbon-inventory-management" />
          </template>
          <KeepAlive>
            <component :is="bottomComponent" :key="activeTab" />
          </KeepAlive>
        </PanelWrapper>
      </div>

      <EvolutionModal />
      <TypeChartModal />
    </div>
  </div>
</template>

<style scoped>
.panel-group {
  @apply gap-1 flex flex-col;
}
</style>
