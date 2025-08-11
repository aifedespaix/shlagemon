<script setup lang="ts">
import type VillageMap from '../village/Map.vue'
import type { SavageZoneId, VillagePOI, VillageZone } from '~/type'
import { storeToRefs } from 'pinia'
import { getArenaByZoneId } from '~/data/arenas'
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
const info = useZoneInfoStore()

const mapRef = ref<InstanceType<typeof VillageMap> | null>(null)
const activePoiId = ref<string | null>(null)
const pois = computed(() => Object.values((zone.current as VillageZone).pois))
const currentIndex = computed(() => pois.value.findIndex(p => p.id === activePoiId.value))

const prevDisabled = computed(() => currentIndex.value <= 0)
const nextDisabled = computed(() =>
  currentIndex.value !== -1 && currentIndex.value >= pois.value.length - 1,
)

function goPrev() {
  if (prevDisabled.value)
    return
  activePoiId.value = pois.value[currentIndex.value - 1].id
}

function goNext() {
  if (currentIndex.value === -1) {
    if (pois.value.length)
      activePoiId.value = pois.value[0].id
    return
  }
  if (nextDisabled.value)
    return
  activePoiId.value = pois.value[currentIndex.value + 1].id
}

watch(() => zone.current.id, () => {
  activePoiId.value = null
})

const hasKing = computed(() =>
  zone.current.type === 'sauvage'
    ? zone.current.hasKing !== false
    : !!(zone.current as VillageZone).pois.king,
)
const currentKing = computed(() =>
  hasKing.value ? zone.getKing(zone.current.id as SavageZoneId) : undefined,
)
const arenaCompleted = computed(() => progress.isArenaCompleted(zone.current.id))
const currentArenaData = computed(() =>
  zone.current.type === 'village' ? getArenaByZoneId(zone.current.id) : undefined,
)

function onPoi(poi: VillagePOI) {
  if (arena.inBattle)
    return
  activePoiId.value = poi.id
  switch (poi.type) {
    case 'shop':
      panel.showShop()
      break
    case 'minigame':
      if (poi.miniGame)
        mini.select(poi.miniGame)
      panel.showMiniGame()
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
    :title="info.hasMultipleZones ? t(zone.current.name) : ''"
    :exit-text="t('components.panel.Village.exit')"
    @exit="leaveVillage"
  >
    <div
      v-if="showVillagesOnMap"
      class="relative w-full flex-1 overflow-hidden"
    >
      <MapArrowButton direction="prev" :disabled="prevDisabled" class="h-12 w-12" @click="goPrev" />
      <MapArrowButton direction="next" :disabled="nextDisabled" class="h-12 w-12" @click="goNext" />
      <VillageMap
        ref="mapRef"
        :village="zone.current as VillageZone"
        :active-poi-id="activePoiId"
        class="w-full flex-1"
        @select="onPoi"
      />
    </div>
    <div v-else class="flex flex-col items-center gap-2">
      <ZoneActions />
    </div>
  </LayoutTitledPanel>
</template>
