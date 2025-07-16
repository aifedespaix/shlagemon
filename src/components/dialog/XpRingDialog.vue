<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Incroyable ! Tu as capturé au moins 20 Shlagémons.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Voici un objet unique : l\'Anneau d\'expérience.',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Fais-le tenir à un Shlagémon pour qu\'il gagne 15% d\'expérience supplémentaire à la fin des combats.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Son effet se cumule avec celui des potions d\'expérience, mais il n\'affecte que le porteur.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Je te le confie, bonne chance pour la suite !',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      {
        label: 'Merci !',
        type: 'valid',
        action: () => {
          inventory.add('xp-ring', 1)
          emit('done', 'xpRing')
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
    orientation="col"
  />
</template>
