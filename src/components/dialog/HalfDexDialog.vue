<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { profSchlag } from '~/data/characters/prof-schlag'
import { useGameStore } from '~/stores/game'

const emit = defineEmits(['done'])
const game = useGameStore()

const dialogTree: DialogNode[] = [
  {
    id: 'step1',
    text: `Oh ! Salut dresseur ! Je suis ${profSchlag.name}. Tu as rempli 50% du Schlagedex !`,
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
    text: 'Pour célébrer, je t\'offre 10 Schlagediamonds. Ils brillent presque autant que toi.',
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
    text: 'Allez, file. Le Schlagedex n\'attend que toi pour être complété.',
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
    :speaker="profSchlag.name"
    avatar-url="/characters/prof-merdant/prof-merdant.png"
    :dialog-tree="dialogTree"
  />
</template>
