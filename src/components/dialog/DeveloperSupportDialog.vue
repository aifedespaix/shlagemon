<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { aife } from '~/data/characters/aife'

const emit = defineEmits(['done'])
const { t } = useI18n()

function end() {
  emit('done', 'developerSupport')
}

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.DeveloperSupportDialog.steps.start.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.start.responses.donate'),
        type: 'valid',
        action: () => window.open('https://google.com', '_blank'),
        nextId: 'donateYes',
      },
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.start.responses.refuse'),
        type: 'danger',
        nextId: 'donateNo',
      },
    ],
  },
  {
    id: 'donateYes',
    text: t('components.dialog.DeveloperSupportDialog.steps.donateYes.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.donateYes.responses.next'),
        nextId: 'discord',
        type: 'primary',
      },
    ],
  },
  {
    id: 'donateNo',
    text: t('components.dialog.DeveloperSupportDialog.steps.donateNo.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.donateNo.responses.next'),
        nextId: 'discord',
        type: 'primary',
      },
    ],
  },
  {
    id: 'discord',
    text: t('components.dialog.DeveloperSupportDialog.steps.discord.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.discord.responses.join'),
        type: 'valid',
        action: () => window.open('https://google.com', '_blank'),
        nextId: 'discordYes',
      },
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.discord.responses.skip'),
        type: 'danger',
        nextId: 'discordNo',
      },
    ],
  },
  {
    id: 'discordYes',
    text: t('components.dialog.DeveloperSupportDialog.steps.discordYes.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.discordYes.responses.finish'),
        type: 'valid',
        action: end,
      },
    ],
  },
  {
    id: 'discordNo',
    text: t('components.dialog.DeveloperSupportDialog.steps.discordNo.text'),
    responses: [
      {
        label: t('components.dialog.DeveloperSupportDialog.steps.discordNo.responses.finish'),
        type: 'valid',
        action: end,
      },
    ],
  },
])
</script>

<template>
  <DialogBox
    :character="aife"
    :dialog-tree="dialogTree"
    orientation="col"
  />
</template>
