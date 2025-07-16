<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getArenaTrack } from '~/data/music'
import { useArenaStore } from '~/stores/arena'
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const dialog = useDialogStore()
const panel = useMainPanelStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'

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
  emit('done', 'arenaDefeat')
}

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Défaite... Veux-tu retenter ta chance ?',
    responses: [
      { label: 'Réessayer', type: 'valid', action: retry },
      { label: 'Quitter', type: 'danger', action: quit },
    ],
  },
]
</script>

<template>
  <DialogBox
    :character="arena.arenaData!.character"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :dialog-tree="dialogTree"
    :exit-track="preparationMusic"
  />
</template>
