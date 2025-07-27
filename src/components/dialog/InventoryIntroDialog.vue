<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])
const mobile = useMobileTabStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.InventoryIntroDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.InventoryIntroDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.InventoryIntroDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.InventoryIntroDialog.steps.step2.responses.back'), nextId: 'start', type: 'danger' },
      { label: t('components.dialog.InventoryIntroDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.InventoryIntroDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.InventoryIntroDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      {
        label: t('components.dialog.InventoryIntroDialog.steps.step3.responses.valid'),
        type: 'valid',
        action: () => {
          mobile.set('inventory')
          emit('done', 'inventoryIntro')
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
