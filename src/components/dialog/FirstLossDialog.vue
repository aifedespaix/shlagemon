<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Eh ben dis donc, tu viens de perdre ton premier combat !',
    responses: [
      { label: '...', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Faut vraiment être un peu débile pour se faire battre par un Shlagémon.',
    responses: [
      { label: 'Oups', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Pour gagner, clique plein de fois sur le Shlagémon avec ton doigt ou ta souris pour lui enlever de la vie.',
    responses: [
      { label: 'Je vais essayer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Le but est de vaincre la puanteur de tous ces Shlagémon !',
    responses: [
      {
        label: 'Compris, Professeur !',
        type: 'valid',
        action: () => emit('done', 'firstLoss'),
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :speaker="profMerdant.name"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
