<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getArenaTrack, getZoneTrack } from '~/data/music'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)
const { t } = useI18n()

function quit() {
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
  emit('done', 'arenaWelcome')
}

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.ArenaWelcomeDialog.steps.step1.text', {
      levelCap: arena.arenaData?.badge.levelCap ?? '',
    }),
    responses: [
      {
        label: t('components.dialog.ArenaWelcomeDialog.steps.step1.responses.start'),
        type: 'valid',
        action: () => emit('done', 'arenaWelcome'),
      },
      {
        label: t('components.dialog.ArenaWelcomeDialog.steps.step1.responses.quit'),
        type: 'danger',
        action: quit,
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
