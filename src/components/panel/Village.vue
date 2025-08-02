<script setup lang="ts">
import type { SavageZoneId, VillagePOI, VillageZone } from '~/type'
import { storeToRefs } from 'pinia'
import ZoneActions from '../village/ZoneActions.vue'

const mobile = useMobileTabStore()

const zone = useZoneStore()
const panel = useMainPanelStore()
const mini = useMiniGameStore()
const progress = useZoneProgressStore()
const trainerBattle = useTrainerBattleStore()
const arena = useArenaStore()
const dialog = useDialogStore()
const player = usePlayerStore()
const interfaceStore = useInterfaceStore()
const { t } = useI18n()
const { showVillagesOnMap } = storeToRefs(interfaceStore)

const currentKing = computed(() =>
  zone.current.hasKing ? zone.getKing(zone.current.id as SavageZoneId) : undefined,
)
const arenaCompleted = computed(() => progress.isArenaCompleted(zone.current.id))
const currentArenaData = computed(() => {
  const data = zone.current.arena?.arena
  if (!data)
    return undefined
  return typeof data === 'function' ? data() : data
})

function onPoi(poi: VillagePOI) {
  if (arena.inBattle)
    return
  switch (poi.type) {
    case 'shop':
      panel.showShop()
      break
    case 'minigame':
      if (zone.current.miniGame)
        mini.select(zone.current.miniGame)
      panel.showMiniGame()
      mobile.set('game')
      break
    case 'arena': {
      const data = currentArenaData.value
      if (!data)
        return
      if (arenaCompleted.value && !useDeveloperStore().debug)
        return
      const required = data.requiredBadgeId
      if (required && !player.hasBadge(required))
        return
      arena.setArena(data)
      dialog.resetArenaDialogs()
      panel.showArena()
      break
    }
    case 'poulailler':
      panel.showPoulailler()
      break
    case 'king': {
      const trainer = currentKing.value
      if (!trainer)
        return
      trainerBattle.setQueue([trainer])
      panel.showTrainerBattle()
      break
    }
    default:
      panel.showTrainerBattle()
  }
}

function leaveVillage() {
  if (zone.current.attachedTo)
    zone.setZone(zone.current.attachedTo)
  panel.showBattle()
  mobile.set('zones')
}
</script>

<template>
  <LayoutTitledPanel
    :title="zone.current.name"
    :exit-text="t('components.panel.Village.exit')"
    @exit="leaveVillage"
  >
    <div class="flex flex-col items-center gap-2">
      <UiImageByBackground
        v-if="!showVillagesOnMap && zone.current.image"
        :src="zone.current.image"
        :alt="zone.current.name"
        class="aspect-video h-full max-h-60 w-full object-contain md:max-h-80"
      />
      <VillageMap
        v-if="showVillagesOnMap"
        :village="zone.current as VillageZone"
        class="w-full flex-1"
        @select="onPoi"
      />
      <ZoneActions v-else />
    </div>
  </LayoutTitledPanel>
</template>
