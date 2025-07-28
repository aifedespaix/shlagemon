<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'step1',
    text: t('components.dialog.KingLossDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.KingLossDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.KingLossDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.KingLossDialog.steps.step2.responses.back'), nextId: 'step1', type: 'danger' },
      { label: t('components.dialog.KingLossDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.KingLossDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.KingLossDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      { label: t('components.dialog.KingLossDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.KingLossDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.KingLossDialog.steps.step4.responses.valid'), type: 'valid', action: () => emit('done', 'kingLoss') },
    ],
  },
])
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :dialog-tree="dialogTree"
  />
</template>
