<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import pikachiant from '~/data/shlagemons/15-20/pikachiant'

const emit = defineEmits(['done'])
const dex = useShlagedexStore()
const mon = pikachiant

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
          emit('done', 'richReward')
        },
      },
    ],
  },
] as DialogNode[]
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
