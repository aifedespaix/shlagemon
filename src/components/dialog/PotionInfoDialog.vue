<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'

const emit = defineEmits(['done'])

const potionInfo = usePotionInfoStore()

const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.PotionInfoDialog.steps.step1.text'),
    responses: [
      {
        label: t('components.dialog.PotionInfoDialog.steps.step1.responses.valid'),
        type: 'valid',
        action: () => {
          potionInfo.markShown()
          emit('done', 'potionInfo')
        },
      },
    ],
  },
])
</script>

<template>
  <DialogBox :character="profMerdant" :dialog-tree="dialogTree" orientation="col" />
</template>
