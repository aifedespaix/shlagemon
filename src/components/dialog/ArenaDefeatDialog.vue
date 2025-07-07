<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { norman } from '~/data/characters/norman'

const emit = defineEmits<{ (e: 'retry'): void, (e: 'quit'): void }>()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Défaite... Veux-tu retenter ta chance ?',
    responses: [
      { label: 'Réessayer', type: 'valid', action: () => emit('retry') },
      { label: 'Quitter', type: 'danger', action: () => emit('quit') },
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
