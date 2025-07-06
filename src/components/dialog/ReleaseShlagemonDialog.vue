<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useShlagedexStore } from '~/stores/shlagedex'

const emit = defineEmits(['done'])
const dex = useShlagedexStore()

function imageUrl(id: string) {
  return `/shlagemons/${id}/${id}.png`
}

const dialogTree = computed<DialogNode[]>(() => {
  const start: DialogNode = {
    id: 'start',
    text: `Salut, j'ai une bonne nouvelle pour toi, je vais te débarrasser d'un de tes Shlagémons pour que cela shlage beaucoup moins dans ton shlagidex.`,
    responses: [
      { label: 'Continuer', nextId: 'choice', type: 'primary' },
    ],
  }

  const choice: DialogNode = {
    id: 'choice',
    text: 'Choisis le Shlagémon dont tu veux te débarrasser :',
    responses: dex.shlagemons.map(mon => ({
      label: mon.base.name,
      imageUrl: imageUrl(mon.base.id),
      nextId: `confirm-${mon.id}`,
      type: 'primary',
    })),
  }

  const confirmNodes: DialogNode[] = dex.shlagemons.map(mon => ({
    id: `confirm-${mon.id}`,
    text: `Veux-tu vraiment te débarrasser de ${mon.base.name} ?`,
    imageUrl: imageUrl(mon.base.id),
    responses: [
      { label: 'Non', nextId: 'choice', type: 'danger' },
      {
        label: 'Oui',
        type: 'valid',
        action: () => {
          dex.releaseShlagemon(mon)
          emit('done', 'release')
        },
      },
    ],
  }))

  return [start, choice, ...confirmNodes]
})
</script>

<template>
  <DialogBox
    :speaker="profMerdant.name"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
    orientation="col"
  />
</template>
