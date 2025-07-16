<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { ref } from 'vue'
import { getArenaTrack, getZoneTrack } from '~/data/music'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useZoneStore } from '~/stores/zone'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)

function quit() {
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
  emit('done', 'arenaWelcome')
}

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: `Bienvenue dans l'ar\u00E8ne, cette ar\u00E8ne te permet de capturer des Shlagémons jusqu'au niveau ${arena.arenaData?.badge.levelCap ?? ''}. Les combats se d\u00E9roulent en un contre un sans potion ni attaque manuelle. Tous tes bonus de potions seront annulés en entrant. Choisis des Shlag\u00E9mons entra\u00EEn\u00E9s et puissants contre les types oppos\u00E9s.`,
    responses: [
      {
        label: 'C\u0027est parti !',
        type: 'valid',
        action: () => emit('done', 'arenaWelcome'),
      },
      {
        label: 'Quitter',
        type: 'danger',
        action: quit,
      },
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
