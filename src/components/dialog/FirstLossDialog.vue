<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

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
    text: 'Pour gagner, tu peux tabasser le Shlagémon adverse pour aider le tient. Pour ce faire, rien de plus simple, fracasse le avec ton doigt ou ta souris.',
    responses: [
      { label: 'Je vais essayer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Le but est de vaincre la puanteur de tous ces Shlagémon !',
    responses: [
      { label: 'Ok', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Tiens, prends ces 10 Potions Dégueulasses, ça peut servir.',
    responses: [
      {
        label: 'Merci !',
        type: 'valid',
        action: () => {
          inventory.add('potion', 10)
          emit('done', 'firstLoss')
        },
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
