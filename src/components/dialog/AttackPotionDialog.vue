<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Félicitations ! Tes Shlagémons deviennent redoutables.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Les potions d\'attaque peuvent temporairement augmenter la puissance de ton Shlagémon.',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Utilise-les pendant un combat pour prendre l\'avantage sur ton adversaire.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Tiens, prends-en une et bonne chance pour la suite !',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      {
        label: 'Merci !',
        type: 'valid',
        action: () => {
          inventory.add('attack-potion', 1)
          emit('done', 'attackPotion')
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
