<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'step1',
    text: 'Félicitations ! Tu as déjà complété la moitié du Shlagedex.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: `Je suis ${profMerdant.name}. Pour t\'aider, je vais te remettre un objet très spécial : le Multi-UXP.`,
    responses: [
      { label: 'Retour', nextId: 'step1', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Fais-le tenir par un Shlagémon et il recevra la moitié de l\'expérience gagnée en combat.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Un seul Shlagémon peut le porter, alors choisis bien son porteur !',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      {
        label: 'Merci !',
        type: 'valid',
        action: () => {
          inventory.add('multi-exp', 1)
          emit('done', 'halfDex')
        },
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :character="profMerdant"
    avatar-url="/characters/prof-merdant/prof-merdant.png"
    :dialog-tree="dialogTree"
  />
</template>
