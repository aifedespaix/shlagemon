import type { MainPanel } from './mainPanel'
import type { ZoneId } from '~/type/zone'
import { useMediaQuery } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { getZoneBattleTrack, trainerTracks, zoneTracks } from '~/data/music'
import { useAchievementsStore } from './achievements'
import { useAudioStore } from './audio'
import { useDialogStore } from './dialog'
import { useGameStateStore } from './gameState'
import { useInterfaceStore } from './interface'
import { useInventoryStore } from './inventory'
import { useMainPanelStore } from './mainPanel'
import { useMobileTabStore } from './mobileTab'
import { useShlagedexStore } from './shlagedex'
import { useTrainerBattleStore } from './trainerBattle'
import { useZoneStore } from './zone'

export const useUIStore = defineStore('ui', () => {
  const interfaceStore = useInterfaceStore()
  const mobileTab = useMobileTabStore()
  const mainPanel = useMainPanelStore()
  const zone = useZoneStore()
  const trainerBattle = useTrainerBattleStore()
  const audio = useAudioStore()
  const dialogStore = useDialogStore()
  const gameState = useGameStateStore()
  const inventory = useInventoryStore()
  const shlagedex = useShlagedexStore()
  const achievements = useAchievementsStore()

  const isMobile = useMediaQuery('(max-width: 767px)')

  const showMainPanel = computed(() =>
    dialogStore.isDialogVisible
    || gameState.hasPokemon
    || zone.current.type === 'village',
  )
  const isInventoryVisible = computed(() => inventory.list.length > 0)
  const isShlagedexVisible = computed(() => shlagedex.shlagemons.length > 0)
  const isAchievementVisible = computed(() => achievements.hasAny)
  const isDexUnderGame = computed(() => interfaceStore.mobileMainPanel === 'dex')

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

  return {
    isMobile,
    displayDex,
    displayZonePanel,
    displayGamePanel,
    displayInventory,
    displayAchievements,
    group2Classes,
  }
})
