<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { potion } from '~/data/items'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.FirstLossDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.FirstLossDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.FirstLossDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.FirstLossDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.FirstLossDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.FirstLossDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.FirstLossDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.FirstLossDialog.steps.step4.responses.next'), nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: t('components.dialog.FirstLossDialog.steps.step5.text'),
    responses: [
      {
        label: t('components.dialog.FirstLossDialog.steps.step5.responses.valid'),
        type: 'valid',
        action: () => {
          inventory.add(potion.id, 10)
          emit('done', 'firstLoss')
        },
      },
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
