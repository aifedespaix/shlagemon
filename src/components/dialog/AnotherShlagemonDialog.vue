<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import pikachiant from '~/data/shlagemons/15-20/pikachiant'

const emit = defineEmits(['done'])
const { t } = useI18n()
const dex = useShlagedexStore()
const mon = pikachiant

function imageUrl(id: string) {
  return `/shlagemons/${id}/${id}.png`
}

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.AnotherShlagemonDialog.steps.step1.text', { name: t(mon.name) }),
    imageUrl: imageUrl(mon.id),
    responses: [
      {
        label: t('components.dialog.AnotherShlagemonDialog.steps.step1.responses.valid'),
        type: 'valid',
        action: () => {
          dex.createShlagemon(mon)
          emit('done', 'richReward')
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
