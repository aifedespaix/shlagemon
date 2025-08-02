<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { etronMuscle } from '~/data/characters/etron-muscle'
import { profMerdant } from '~/data/characters/prof-merdant'
import { cuckRing } from '~/data/items/wearables/cuckRing'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.CuckRingDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.CuckRingDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step2.responses.back'), nextId: 'start', type: 'danger' },
      { label: t('components.dialog.CuckRingDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.CuckRingDialog.steps.step3.text', { name: etronMuscle.name }),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      { label: t('components.dialog.CuckRingDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.CuckRingDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step4.responses.back'), nextId: 'step3', type: 'danger' },
      { label: t('components.dialog.CuckRingDialog.steps.step4.responses.next'), nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: t('components.dialog.CuckRingDialog.steps.step5.text', { name: etronMuscle.name }),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step5.responses.back'), nextId: 'step4', type: 'danger' },
      { label: t('components.dialog.CuckRingDialog.steps.step5.responses.next'), nextId: 'step6', type: 'primary' },
    ],
  },
  {
    id: 'step6',
    text: t('components.dialog.CuckRingDialog.steps.step6.text'),
    responses: [
      { label: t('components.dialog.CuckRingDialog.steps.step6.responses.back'), nextId: 'step5', type: 'danger' },
      {
        label: t('components.dialog.CuckRingDialog.steps.step6.responses.valid'),
        type: 'valid',
        action: () => {
          inventory.add(cuckRing.id, 1)
          emit('done', 'cuckRing')
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
