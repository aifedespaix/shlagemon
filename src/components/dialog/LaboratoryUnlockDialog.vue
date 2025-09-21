<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { spaceBadge } from '~/data/badges'
import { toast } from '~/modules/toast'
import { useBadgeBoxStore } from '~/stores/badgeBox'
import { useLaboratoryStore } from '~/stores/laboratory'
import { usePlayerStore } from '~/stores/player'

const emit = defineEmits<{
  (e: 'done', id: string): void
}>()

const { t } = useI18n()
const laboratory = useLaboratoryStore()
const badgeBox = useBadgeBoxStore()
const player = usePlayerStore()

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
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step6.responses.next'), nextId: 'step7', type: 'primary' },
    ],
  },
  {
    id: 'step7',
    text: t('components.dialog.LaboratoryUnlockDialog.steps.step7.text'),
    responses: [
      { label: t('components.dialog.LaboratoryUnlockDialog.steps.step7.responses.back'), nextId: 'step6', type: 'danger' },
      {
        label: t('components.dialog.LaboratoryUnlockDialog.steps.step7.responses.valid'),
        type: 'valid',
        action: () => {
          laboratory.unlock()
          badgeBox.addBadge(spaceBadge)
          player.unlockCaptureLevel(spaceBadge.levelCap)
          toast.success(t('components.dialog.LaboratoryUnlockDialog.reward.toast', {
            badge: t(spaceBadge.name),
            level: spaceBadge.levelCap,
          }))
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
