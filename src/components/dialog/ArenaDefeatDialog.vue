<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getArenaTrack, getZoneTrack } from '~/data/music'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const dialog = useDialogStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
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
    :exit-track="exitTrack"
  />
</template>
