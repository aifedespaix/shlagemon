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
import { getZoneBattleTrack, trainerTracks, zoneTracks } from '~/data/music'
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
  (!isDexUnderGame.value || !isMobile.value)
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
    if (panel === 'battle') {
      const track = getZoneBattleTrack(zoneId)
      if (track)
        audio.fadeToMusic(track)
      else
        audio.stopMusic()
    }
    else if (panel === 'trainerBattle') {
      audio.fadeToMusic(trainerTracks[trainerId || `king-${zoneId}`])
    }
    else {
      audio.fadeToMusic(zoneTracks[zoneId])
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full select-none overflow-hidden">
    <div
      class="game h-full flex flex-col gap-1 p-1"
      md="flex-row justify-between"
    >
      <div class="panel-group overflow-hidden" md="max-w-80 basis-1/4">
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

      <div :class="group2Classes" class="overflow-hidden" md="basis-1/2">
        <PanelWrapper is-inline>
          <PlayerInfos />
        </PanelWrapper>

        <PanelWrapper v-if="displayGamePanel" class="overflow-hidden">
          <MainPanelView class="flex-1" />
        </PanelWrapper>

        <PanelWrapper v-if="displayZonePanel" title="Zones" class="overflow-hidden" is-mobile-hidable>
          <template #icon>
            <div class="i-carbon-map" />
          </template>
          <ZonePanel />
        </PanelWrapper>
      </div>

      <div v-if="displayDex" class="panel-group flex-1 overflow-hidden" md="max-w-80 basis-1/4">
        <PanelWrapper title="Shlagédex" class="overflow-hidden" is-mobile-hidable>
          <template #icon>
            <SchlagedexIcon class="h-4 w-4" />
          </template>
          <Shlagedex v-if="shlagedex.shlagemons.length" />
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
  @apply gap-1 flex flex-col;
}
</style>
