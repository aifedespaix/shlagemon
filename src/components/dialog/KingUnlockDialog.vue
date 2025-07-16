<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Félicitations ! Tes victoires ont débloqué l\'accès au combat contre le roi.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Pour progresser, tu devras vaincre ce boss redoutable.',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Je t\'offre une Potion de Défense. Elle s\'utilise dans ton inventaire et booste toute ton équipe.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Attention, son effet dure 10 minutes et ne fonctionne qu\'une seule fois, quel que soit ton Schlagémon actif.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Bonne chance pour le combat contre le roi !',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      {
        label: 'Merci Prof !',
        type: 'valid',
        action: () => {
          inventory.add('defense-potion', 1)
          emit('done', 'kingUnlock')
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
