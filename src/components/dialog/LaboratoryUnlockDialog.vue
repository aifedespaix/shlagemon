<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { useLaboratoryStore } from '~/stores/laboratory'

const emit = defineEmits<{
  (e: 'done', id: string): void
}>()

const { t } = useI18n()
const laboratory = useLaboratoryStore()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'step1',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step2.responses.back'), nextId: 'step1', type: 'danger' },
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step4.responses.back'), nextId: 'step3', type: 'danger' },
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step4.responses.next'), nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step5.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step5.responses.back'), nextId: 'step4', type: 'danger' },
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step5.responses.next'), nextId: 'step6', type: 'primary' },
    ],
  },
  {
    id: 'step6',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step6.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step6.responses.back'), nextId: 'step5', type: 'danger' },
      {
        label: t('components.dialog.LaboratoryUnlockDialog.steps.step6.responses.valid'),
        type: 'valid',
        action: () => {
          laboratory.unlock()
          emit('done', 'laboratoryUnlock')
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
