<script setup lang="ts">
import type { BaseShlagemon } from '~/type'
import type { ButtonType } from '~/type/button'
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import bulgrosboule from '~/data/shlagemons/bulgrosboule'
import carapouffe from '~/data/shlagemons/carapouffe'
import salamiches from '~/data/shlagemons/salamiches'

const emit = defineEmits(['done'])

const { t } = useI18n()

const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
const gameState = useGameStateStore()
const dex = useShlagedexStore()

function nextId(baseId: string) {
  return `confirm${baseId}`
}

function imageUrl(id: string) {
  return `/shlagemons/${id}/${id}.png`
}

const dialogTree = computed((): DialogNode[] => [
  {
    id: 'start',
    text: t('components.dialog.Starter.steps.start.text', { name: profMerdant.name }),
    responses: [
      { label: t('components.dialog.Starter.steps.start.responses.next'), nextId: '2', type: 'primary' as ButtonType },
    ],
  },
  {
    id: '2',
    text: t('components.dialog.Starter.steps.step2.text'),
    responses: [
      { label: t('components.dialog.Starter.steps.step2.responses.next'), nextId: 'choice', type: 'primary' as ButtonType },
    ],
  },
  {
    id: 'choice',
    text: t('components.dialog.Starter.steps.choice.text'),
    responses: starters.map(s => ({
      label: s.name,
      nextId: nextId(s.id),
      imageUrl: '/items/shlageball/shlageball.png',
      type: 'primary' as ButtonType,
    })),
  },
  ...starters.map(s => ({
    id: nextId(s.id),
    text: t(`components.dialog.Starter.steps.${s.id}.text`),
    imageUrl: imageUrl(s.id),
    responses: [
      { label: t('components.dialog.Starter.steps.common.responses.back'), nextId: 'choice', type: 'danger' as ButtonType },
      {
        label: t(`components.dialog.Starter.steps.${s.id}.responses.valid`, { name: profMerdant.name }),
        type: 'valid' as ButtonType,
        action: () => {
          gameState.setStarterId(s.id)
          const mon = dex.createShlagemon(s)
          mon.rarityFollowsLevel = true
          mon.rarity = 1
          gameState.setHasPokemon(true)
          emit('done', 'starter')
        },
      },
    ],
  })),
])
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :dialog-tree="dialogTree"
  />
</template>
