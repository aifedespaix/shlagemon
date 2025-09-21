<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits<{
  (e: 'done', id: string): void
}>()

const laboratory = useLaboratoryStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'step1',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step1.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
    ],
  },
  {
    id: 'step2',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step2.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step2.responses.back'), nextId: 'step1', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step2.responses.next'), nextId: 'step3', type: 'primary' },
    ],
  },
  {
    id: 'step3',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step3.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step3.responses.back'), nextId: 'step2', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step3.responses.next'), nextId: 'step4', type: 'primary' },
    ],
  },
  {
    id: 'step4',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step4.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step4.responses.back'), nextId: 'step3', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step4.responses.next'), nextId: 'step5', type: 'primary' },
    ],
  },
  {
    id: 'step5',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step5.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step5.responses.back'), nextId: 'step4', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step5.responses.next'), nextId: 'step6', type: 'primary' },
    ],
  },
  {
    id: 'step6',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step6.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step6.responses.back'), nextId: 'step5', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step6.responses.next'), nextId: 'step7', type: 'primary' },
    ],
  },
  {
    id: 'step7',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step7.text'),
    responses: [
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step7.responses.back'), nextId: 'step6', type: 'danger' },
      { label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step7.responses.next'), nextId: 'step8', type: 'primary' },
    ],
  },
  {
    id: 'step8',
    text: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step8.text'),
    responses: [
      {
        label: t('components.dialog.LaboratoryFinaleInvitationDialog.steps.step8.responses.valid'),
        type: 'valid',
        action: () => {
          laboratory.unlockFinale()
          emit('done', 'laboratoryFinaleInvitation')
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
