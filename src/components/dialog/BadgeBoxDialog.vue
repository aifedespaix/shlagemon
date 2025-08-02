<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { profMerdant } from '~/data/characters/prof-merdant'
import { badgeBox as badgeBoxItem } from '~/data/items'

const emit = defineEmits(['done'])
const badgeBox = useBadgeBoxStore()
const inventory = useInventoryStore()
const { t } = useI18n()

const dialogTree = computed<DialogNode[]>(() => [
  {
    id: 'start',
    text: t('components.dialog.BadgeBoxDialog.steps.step1.text'),
    responses: [
      {
        label: t('components.dialog.BadgeBoxDialog.steps.step1.responses.valid'),
        type: 'valid',
        action: () => {
          badgeBox.unlock()
          inventory.add(badgeBoxItem.id)
          emit('done', 'badgeBox')
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
