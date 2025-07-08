<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { useArenaStore } from '~/stores/arena'

const emit = defineEmits(['done'])
const arena = useArenaStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: `Bienvenue dans l'ar\u00E8ne, cette ar\u00E8ne te permet de capturer des Shlagémons jusqu'au niveau ${arena.arenaData?.badge.levelCap ?? ''}. Les combats se d\u00E9roulent en un contre un sans potion ni attaque manuelle. Choisis des Shlag\u00E9mons entra\u00EEn\u00E9s et puissants contre les types oppos\u00E9s.`,
    responses: [
      {
        label: 'C\u0027est parti !',
        type: 'valid',
        action: () => emit('done', 'arenaWelcome'),
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :speaker="arena.arenaData!.character.name"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
