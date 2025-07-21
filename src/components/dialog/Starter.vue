<script setup lang="ts">
import type { BaseShlagemon } from '~/type'
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import bulgrosboule from '~/data/shlagemons/bulgrosboule'
import carapouffe from '~/data/shlagemons/carapouffe'
import salamiches from '~/data/shlagemons/salamiches'

const emit = defineEmits(['done'])

const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
const gameState = useGameStateStore()
const dex = useShlagedexStore()

function nextId(baseId: string) {
  return `confirm${baseId}`
}

function imageUrl(id: string) {
  return `/shlagemons/${id}/${id}.png`
}

const dialogTree = [
  {
    id: 'start',
    text: `Salut, je suis ${profMerdant.name}, mes amis disent que je sens bon.`,
    responses: [
      { label: 'Tu n\'as pas l\'air très intelligent.', nextId: '2', type: 'primary' },
    ],
  },
  {
    id: '2',
    text: 'Je t\'emmerde mon petit, pour la peine, je vais te forcer à adopter un de mes Shlagémons.',
    responses: [
      { label: 'Ho nooon, pas un Shlagémon, ils sentent trop mauvais !', nextId: 'choice', type: 'primary' },
    ],
  },
  {
    id: 'choice',
    text: 'Je te laisse choisir le moins pire, tu veux quel Shlagémon ?',
    responses: starters.map(s => ({
      label: s.name,
      nextId: nextId(s.id),
      imageUrl: '/items/shlageball/shlageball.png',
      type: 'primary',
    })),
  },
  ...starters.map(s => ({
    id: nextId(s.id),
    text: s.id === 'bulgrosboule'
      ? 'Je te déconseille de choisir celui là, il est horriblement mauvais.'
      : s.id === 'salamiches'
        ? 'Attention, il rote du feu quand il mange du pain.'
        : 'Attention, il ne sait pas nager.',
    imageUrl: imageUrl(s.id),
    responses: [
      { label: 'T\'as pas mieux que cette merde ?', nextId: 'choice', type: 'danger' },
      {
        label: s.id === 'bulgrosboule' ? 'Je l\'aime pas trop mais ok' : `Merci ${profMerdant.name}`,
        type: 'valid',
        action: () => {
          gameState.setStarterId(s.id)
          dex.createShlagemon(s)
          gameState.setHasPokemon(true)
          emit('done', 'starter')
        },
      },
    ],
  })),
] as DialogNode[]
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
