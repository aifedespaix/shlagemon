<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PanelAchievements from '~/components/panel/Achievements.vue'
import PanelInventory from '~/components/panel/Inventory.vue'
import PanelShlagedex from '~/components/panel/Shlagedex.vue'
import PanelZone from '~/components/panel/Zone.vue'

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
      return PanelAchievements
    case 'zones':
      return PanelZone
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
        <UiPanelWrapper v-if="displayInventory" title="Inventaire" class="overflow-hidden" :is-locked="lockStore.isInventoryLocked">
          <template #icon>
            <div class="i-carbon-inventory-management" />
          </template>
          <PanelInventory />
        </UiPanelWrapper>

        <UiPanelWrapper v-if="displayAchievements" title="Succès" class="overflow-hidden" :is-locked="lockStore.areAchievementsLocked">
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

        <UiPanelWrapper v-if="displayZonePanel" title="Zones" class="overflow-hidden" is-mobile-hidable :is-locked="lockStore.areZonesLocked">
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <PanelZone />
        </UiPanelWrapper>
      </div>

      <div v-if="!isMobile && displayDex" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4 flex-1 max-h-none">
        <UiPanelWrapper title="Shlagédex" class="overflow-hidden" is-mobile-hidable :is-locked="lockStore.isShlagedexLocked">
          <template #icon>
            <IconShlagedex class="h-4 w-4" />
          </template>
          <PanelShlagedex v-if="shlagedex.shlagemons.length" />
        </UiPanelWrapper>
      </div>

      <div v-if="isMobile && bottomComponent" class="panel-group max-h-40vh flex-1 overflow-hidden">
        <UiPanelWrapper :title="bottomTitle" class="overflow-hidden" :is-locked="bottomLocked">
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
    </div>
  </div>
</template>

<style scoped>
.panel-group {
  @apply gap-1 flex flex-col;
}
</style>
