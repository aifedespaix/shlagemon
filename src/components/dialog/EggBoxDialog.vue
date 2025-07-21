<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const box = useEggBoxStore()

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'Félicitations ! Tu as obtenu ton premier œuf.',
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Pour les conserver, voici une boîte spéciale.',
    responses: [
      { label: 'Retour', nextId: 'start', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Elle stocke tous tes œufs sans encombrer ton inventaire.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Utilise-la pour voir la liste de tes œufs à tout moment.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      {
        label: 'Merci Prof !',
        type: 'valid',
        action: () => {
          box.unlock()
          box.importFromInventory(inventory.items as any)
          inventory.add('egg-box')
          emit('done', 'eggBox')
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
