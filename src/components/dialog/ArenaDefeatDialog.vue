<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getArenaTrack, getZoneTrack } from '~/data/music'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const dialog = useDialogStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const { t } = useI18n()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)

function retry() {
  const data = arena.arenaData
  if (!data)
    return
  dialog.resetArenaDialogs()
  arena.reset()
  arena.setArena(data)
  emit('done', 'arenaDefeat')
}

function quit() {
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
  emit('done', 'arenaDefeat')
}

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.ArenaDefeatDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.ArenaDefeatDialog.steps.step1.responses.retry'), type: 'valid', action: retry },
      { label: t('components.dialog.ArenaDefeatDialog.steps.step1.responses.quit'), type: 'danger', action: quit },
    ],
  },
])
</script>

<template>
  <DialogBox
    :character="arena.arenaData!.character"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :dialog-tree="dialogTree"
    :exit-track="exitTrack"
  />
</template>
