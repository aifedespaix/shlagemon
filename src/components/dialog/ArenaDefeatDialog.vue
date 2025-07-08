<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { useArenaStore } from '~/stores/arena'

const emit = defineEmits<{ (e: 'retry'): void, (e: 'quit'): void }>()
const arena = useArenaStore()

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
    :speaker="arena.arenaData?.character.name"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
