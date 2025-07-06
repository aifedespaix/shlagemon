<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree: DialogNode[] = [
  {
    id: 'step1',
    text: `Félicitations, tu poss\xE8des enfin un Shlagémon de niveau 5 !`,
    responses: [
      { label: 'Continuer', nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: 'Plus ils montent en niveau, plus leur odeur devient insupportable.',
    responses: [
      { label: 'Retour', nextId: 'step1', type: 'danger' },
      { label: 'Continuer', nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: 'Nous devons tous les capturer pour comprendre comment stopper ces miasmes.',
    responses: [
      { label: 'Retour', nextId: 'step2', type: 'danger' },
      { label: 'Continuer', nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: 'Je compte sur toi pour remplir le Schlagedex au plus vite.',
    responses: [
      { label: 'Retour', nextId: 'step3', type: 'danger' },
      { label: 'Continuer', nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: 'Pour t\'aider, voici 10 Schlagéballs. Attention, elles sentent fort !',
    responses: [
      { label: 'Retour', nextId: 'step4', type: 'danger' },
      {
        label: 'Merci Professeur !',
        type: 'valid',
        action: () => {
          inventory.add('shlageball', 10)
          emit('done', 'level5')
        },
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
