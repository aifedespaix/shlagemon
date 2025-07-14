import type { MainPanel } from './mainPanel'
import type { ZoneId } from '~/type/zone'
import { useMediaQuery } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getCharacterTrack, getZoneBattleTrack, getZoneTrack } from '~/data/music'
import { useAchievementsStore } from './achievements'
import { useAudioStore } from './audio'
import { useDialogStore } from './dialog'
import { useGameStateStore } from './gameState'
import { useInventoryStore } from './inventory'
import { useMainPanelStore } from './mainPanel'
import { useShlagedexStore } from './shlagedex'
import { useTrainerBattleStore } from './trainerBattle'
import { useZoneStore } from './zone'

export const useUIStore = defineStore('ui', () => {
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

  const displayZonePanel = computed(() => !isMobile.value && isShlagedexVisible.value)

  const displayGamePanel = computed(() => showMainPanel.value)

  const displayInventory = computed(() => isInventoryVisible.value && !isMobile.value)
  const displayAchievements = computed(() => isAchievementVisible.value && !isMobile.value)
  const displayDex = computed(() => isShlagedexVisible.value && !isMobile.value)

  const group2Classes = computed(() => {
    const classes = ['panel-group']
    if (!isMobile.value || displayGamePanel.value || displayZonePanel.value)
      classes.push('flex-1')
    return classes.join(' ')
  })

  watch<[MainPanel, ZoneId, string | undefined, string], true>(
    () => [
      mainPanel.current,
      zone.current.id,
      trainerBattle.current?.character.id,
      zone.current.type,
    ],
    ([panel, zoneId, trainerCharId, zoneType]) => {
      if (panel === 'shop') {
        audio.fadeToMusic('/audio/musics/shop.ogg')
        return
      }

      if (panel === 'battle') {
        const track = getZoneBattleTrack(zoneId)
        if (track)
          audio.fadeToMusic(track)
        else
          console.warn(`Missing music for battle zone ${zoneId}`)
      }
      else if (panel === 'trainerBattle') {
        const track = getCharacterTrack(trainerCharId)
        if (track)
          audio.fadeToMusic(track)
        else if (trainerCharId)
          console.warn(`Missing music for character ${trainerCharId}`)
      }
      else {
        const track = getZoneTrack(zoneId, zoneType)
        if (track)
          audio.fadeToMusic(track)
        else
          console.warn(`Missing music for zone ${zoneId}`)
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
