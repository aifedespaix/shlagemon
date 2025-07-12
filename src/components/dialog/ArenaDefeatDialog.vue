<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { useArenaStore } from '~/stores/arena'
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const dialog = useDialogStore()
const panel = useMainPanelStore()

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
    :speaker="arena.arenaData?.character.name"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :character-id="arena.arenaData?.character.id"
    :dialog-tree="dialogTree"
  />
</template>
