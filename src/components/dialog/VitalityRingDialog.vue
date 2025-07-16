<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Félicitations ! Tu as capturé au moins 15 Shlagémons.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: `Voici un objet unique : la Bague Vitalesque.`,
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Fais-la porter à un Shlagémon pour augmenter ses PV maximum de 15%.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Cet effet est cumulable avec les potions de vitalité mais ne concerne qu\'un seul porteur.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Je te la confie, bonne chance pour la suite !',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      {
        label: 'Merci !',
        type: 'valid',
        action: () => {
          inventory.add('vitality-ring', 1)
          emit('done', 'vitalityRing')
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
