import type { ZoneId, ZoneType } from '~/type/zone'
import { defineStore } from 'pinia'
import { getArenaTrack, getCharacterTrack, getZoneBattleTrack, getZoneTrack } from '~/data/music'
import { useZoneAccess } from '~/stores/zoneAccess'

export const useUIStore = defineStore('ui', () => {
  const mainPanel = useMainPanelStore()
  const zone = useZoneStore()
  const trainerBattle = useTrainerBattleStore()
  const arena = useArenaStore()
  const audio = useAudioStore()
  const dialogStore = useDialogStore()
  const gameState = useGameStateStore()
  const inventory = useInventoryStore()
  const shlagedex = useShlagedexStore()
  const achievements = useAchievementsStore()
  const { accessibleZones } = useZoneAccess(toRef(shlagedex, 'highestLevel'))

  const isMobile = useMediaQuery('(max-width: 767px)')

  const showMainPanel = computed(() =>
    dialogStore.isDialogVisible
    || gameState.hasPokemon
    || zone.current.type === 'village',
  )
  const isInventoryVisible = computed(() => inventory.list.length > 0)
  const isShlagedexVisible = computed(() => shlagedex.shlagemons.length > 0)
  const isAchievementVisible = computed(() => achievements.hasAny)

  const displayZonePanel = computed(() => !isMobile.value && isShlagedexVisible.value && accessibleZones.value.length >= 2)

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

  const panelMusics: Partial<Record<MainPanel, string>> = {
    shop: '/audio/musics/shop.ogg',
    poulailler: '/audio/musics/poulailler.ogg',
    dojo: '/audio/musics/dojo.ogg',
    breeding: '/audio/musics/breeding.ogg',
    laboratory: '/audio/musics/laboratory/space.ogg',
  }
  // Explicit tuple typing keeps arguments in sync when adding new sources
  watch<[MainPanel, ZoneId, string | undefined, ZoneType, boolean], true>(
    () => [
      mainPanel.current,
      zone.current.id,
      trainerBattle.current?.character.id,
      zone.current.type,
      arena.inBattle,
    ],
    ([panel, zoneId, trainerCharId, zoneType, inArenaBattle]) => {
      const directTrack = panelMusics[panel]
      if (directTrack) {
        audio.fadeToMusic(directTrack)
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
      else if (panel === 'arena') {
        const track = inArenaBattle
          ? getArenaTrack(arena.arenaData?.id)
          : getArenaTrack('preparation')
        if (track)
          audio.fadeToMusic(track)
        else if (arena.arenaData?.id)
          console.warn(`Missing music for arena ${arena.arenaData.id}`)
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
