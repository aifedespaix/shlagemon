<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { norman } from '~/data/characters/norman'

const emit = defineEmits(['done'])

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: `Bienvenue dans l'ar\u00E8ne ! Choisis six Shlag\u00E9mons et pr\u00E9pare-toi \u00E0 empester la victoire.`,
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
    :speaker="norman.name"
    :avatar-url="`/characters/${norman.id}/${norman.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
