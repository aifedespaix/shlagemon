<script setup lang="ts">
import type { DialogNode } from '~/types/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { starters } from '~/data/shlagemons'
import { useShlagedexStore } from '~/stores/shlagedex'

const emit = defineEmits(['done'])
const dex = useShlagedexStore()
const mon = starters[Math.floor(Math.random() * starters.length)]

function imageUrl(id: string) {
  return `/shlagemons/${id}/${id}.png`
}

const dialogTree = [
  {
    id: 'start',
    text: `Bravo pour ta richesse ! Prends donc ce ${mon.name}.`,
    imageUrl: imageUrl(mon.id),
    responses: [
      {
        label: 'Merci professeur !',
        type: 'valid',
        action: () => {
          dex.createShlagemon(mon)
          emit('done')
        },
      },
    ],
  },
] as DialogNode[]
</script>

<template>
  <DialogBox
    speaker="Professeur Merdant"
    avatar-url="/characters/professor/professor.png"
    :dialog-tree="dialogTree"
  />
</template>
