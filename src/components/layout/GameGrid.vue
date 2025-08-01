<script setup lang="ts">
import type { BadgeColor } from '~/type/badge'
import { storeToRefs } from 'pinia'
import PanelAchievements from '~/components/panel/Achievements.vue'
import PanelInventory from '~/components/panel/Inventory.vue'
import PanelMap from '~/components/panel/Map.vue'
import PanelShlagedex from '~/components/panel/Shlagedex.vue'
import ShlagemonDetailModal from '~/components/shlagemon/DetailModal.vue'

const lockStore = useFeatureLockStore()
const shlagedex = useShlagedexStore()
const uiStore = useUIStore()
const mobileTab = useMobileTabStore()
const usage = useItemUsageStore()
const visit = useZoneVisitStore()

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

const { t } = useI18n()

const bottomComponent = computed(() => {
  switch (activeTab.value) {
    case 'achievements':
      return PanelAchievements
    case 'zones':
      return PanelMap
    case 'dex':
      return shlagedex.shlagemons.length ? PanelShlagedex : null
    case 'inventory':
      return PanelInventory
    default:
      return null
  }
})

const bottomTitle = computed(() => {
  switch (activeTab.value) {
    case 'achievements':
      return t('components.layout.GameGrid.achievements')
    case 'zones':
      return t('components.layout.GameGrid.zones')
    case 'dex':
      return t('components.layout.GameGrid.dex')
    case 'inventory':
      return t('components.layout.GameGrid.inventory')
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

const newItemCount = computed(() => usage.unusedItemCount)
const newZoneCount = computed(() => visit.newZoneCount)
const newDexCount = computed(() => shlagedex.newCount)

const bottomBadge = computed(() => {
  switch (activeTab.value) {
    case 'inventory':
      return newItemCount.value
    case 'zones':
      return newZoneCount.value
    case 'dex':
      return newDexCount.value
    default:
      return 0
  }
})

const bottomBadgeColor = computed<BadgeColor>(() => {
  switch (activeTab.value) {
    case 'zones':
      return 'danger'
    case 'inventory':
    case 'dex':
    default:
      return 'info'
  }
})

const bottomBadgeHandler = computed(() => {
  switch (activeTab.value) {
    case 'inventory':
      return usage.markAllUsed
    case 'zones':
      return visit.markAllAccessibleVisited
    case 'dex':
      return shlagedex.markAllSeen
    default:
      return undefined
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
        <UiPanelWrapper
          v-if="displayInventory"
          :title="t('components.layout.GameGrid.inventory')"
          class="overflow-hidden"
          :is-locked="lockStore.isInventoryLocked"
          :badge="newItemCount"
          badge-color="info"
          :badge-click="usage.markAllUsed"
        >
          <template #icon>
            <div class="i-carbon-inventory-management" />
          </template>
          <PanelInventory />
        </UiPanelWrapper>

        <UiPanelWrapper v-if="displayAchievements" :title="t('components.layout.GameGrid.achievements')" class="overflow-hidden" :is-locked="lockStore.areAchievementsLocked">
          <template #icon>
            <div class="i-carbon-trophy" />
          </template>
          <PanelAchievements />
        </UiPanelWrapper>
      </div>

      <div v-if="displayGamePanel || displayZonePanel" :class="group2Classes" class="overflow-hidden" md="basis-1/2">
        <UiPanelWrapper is-inline>
          <PanelPlayerInfos />
        </UiPanelWrapper>

        <UiPanelWrapper v-if="displayGamePanel" class="overflow-hidden">
          <PanelMain class="flex-1" />
        </UiPanelWrapper>

        <UiPanelWrapper
          v-if="displayZonePanel"
          :title="t('components.layout.GameGrid.zones')"
          class="overflow-hidden"
          is-mobile-hidable
          :is-locked="lockStore.areZonesLocked"
          :badge="newZoneCount"
          badge-color="danger"
          :badge-click="visit.markAllAccessibleVisited"
        >
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <PanelMap />
        </UiPanelWrapper>
      </div>

      <div v-if="!isMobile && displayDex" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4 flex-1 max-h-none">
        <UiPanelWrapper
          :title="t('components.layout.GameGrid.dex')"
          class="overflow-hidden"
          is-mobile-hidable
          :is-locked="lockStore.isShlagedexLocked"
          :badge="newDexCount"
          badge-color="info"
          :badge-click="shlagedex.markAllSeen"
        >
          <template #icon>
            <IconShlagedex class="h-4 w-4" />
          </template>
          <PanelShlagedex v-if="shlagedex.shlagemons.length" />
        </UiPanelWrapper>
      </div>

      <div v-if="isMobile && bottomComponent" class="panel-group max-h-40vh flex-1 overflow-hidden">
        <UiPanelWrapper
          :title="bottomTitle"
          class="overflow-hidden"
          :is-locked="bottomLocked"
          :badge="bottomBadge"
          :badge-color="bottomBadgeColor"
          :badge-click="bottomBadgeHandler"
        >
          <template #icon>
            <div v-if="activeTab === 'achievements'" class="i-carbon-trophy" />
            <div v-else-if="activeTab === 'zones'" class="i-carbon-map" />
            <IconShlagedex v-else-if="activeTab === 'dex'" class="h-4 w-4" />
            <div v-else-if="activeTab === 'inventory'" class="i-carbon-inventory-management" />
          </template>
          <KeepAlive>
            <component :is="bottomComponent" :key="activeTab" />
          </KeepAlive>
        </UiPanelWrapper>
      </div>

      <ShlagemonEvolutionModal />
      <ShlagemonTypeChartModal />
      <ShlagemonWearableEquipModal />
      <ShlagemonDetailModal />
      <ShlagemonDexInfoModal />
    </div>
  </div>
</template>

<style scoped>
.panel-group {
  @apply gap-1 flex flex-col;
}
</style>
