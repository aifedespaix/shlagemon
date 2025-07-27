<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { attackPotion } from '~/data/items'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.AttackPotionDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.AttackPotionDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.AttackPotionDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.AttackPotionDialog.steps.step2.responses.back'), nextId: 'start', type: 'danger' },
      { label: t('components.dialog.AttackPotionDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.AttackPotionDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.AttackPotionDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      { label: t('components.dialog.AttackPotionDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.AttackPotionDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.AttackPotionDialog.steps.step4.responses.back'), nextId: 'step3', type: 'danger' },
      {
        label: t('components.dialog.AttackPotionDialog.steps.step4.responses.valid'),
        type: 'valid',
        action: () => {
          inventory.add(attackPotion.id, 1)
          emit('done', 'attackPotion')
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
    orientation="col"
  />
</template>
