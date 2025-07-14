<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profShlag } from '~/data/characters/prof-shlag'
import { useGameStore } from '~/stores/game'

const emit = defineEmits(['done'])
const game = useGameStore()

const dialogTree: DialogNode[] = [
  {
    id: 'step1',
    text: `Oh ! Salut dresseur ! Je suis ${profShlag.name}. Tu as rempli 50% du Shlagedex !`,
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Je dois avouer que je ne m\'attendais pas à sentir ta persévérance aussi longtemps.',
    responses: [
      { label: 'Retour', nextId: 'step1', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Pour célébrer, je t\'offre 10 Shlagédiamants. Ils brillent presque autant que toi.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Ne les dépense pas tous au même endroit... sauf si c\'est pour m\'acheter des parfums.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Allez, file. Le Shlagedex n\'attend que toi pour être complété.',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      {
        label: 'Merci, Professeur !',
        type: 'valid',
        action: () => {
          game.addShlagidiamond(10)
          emit('done', 'halfDex')
        },
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :character="profShlag"
    avatar-url="/characters/prof-merdant/prof-merdant.png"
    :dialog-tree="dialogTree"
  />
</template>
