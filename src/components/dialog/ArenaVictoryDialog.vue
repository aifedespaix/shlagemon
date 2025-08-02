<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { toast } from 'vue3-toastify'
import { getArenaTrack, getZoneTrack } from '~/data/music'

const emit = defineEmits(['done'])

const arena = useArenaStore()
const player = usePlayerStore()
const panel = useMainPanelStore()
const progress = useZoneProgressStore()
const zone = useZoneStore()
const badgeBox = useBadgeBoxStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)
const { t } = useI18n()

function collectBadge() {
  if (!arena.arenaData)
    return
  player.earnBadge(arena.arenaData.id)
  badgeBox.addBadge(arena.arenaData.badge)
  progress.completeArena(zone.current.id)
  zone.completeArena(zone.current.id)
  toast.success(`Badge ${arena.arenaData.badge.name} obtenu !`)
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
  emit('done', 'arenaVictory')
}

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.ArenaVictoryDialog.steps.step1.text'),
    responses: [
      {
        label: t('components.dialog.ArenaVictoryDialog.steps.step1.responses.collect'),
        type: 'valid',
        action: collectBadge,
      },
    ],
  },
])
</script>

<template>
  <DialogBox
    :character="arena.arenaData!.character"
    :dialog-tree="dialogTree"
    :exit-track="exitTrack"
  />
</template>
