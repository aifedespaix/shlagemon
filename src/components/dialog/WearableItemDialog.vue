<script setup lang="ts">
import type { WearableItem } from '~/type/item'
import { profMerdant } from '~/data/characters/prof-merdant'
import { buildDialog } from '~/utils/dialogBuilder'

const props = defineProps<{ item: WearableItem, requiredCount: number, finishId: string }>()
const emit = defineEmits(['done'])
const inventory = useInventoryStore()
const { t } = useI18n()

const effectText: Record<WearableItem['effectType'], string> = {
  attack: 'l\'attaque',
  defense: 'la défense',
  vitality: 'les PV max',
  xp: 'l\'expérience gagnée',
}

const potionText: Record<WearableItem['effectType'], string> = {
  attack: 'd\'attaque',
  defense: 'de défense',
  vitality: 'de vitalité',
  xp: 'd\'expérience',
}

const dialogTree = computed(() =>
  buildDialog([
    t('components.dialog.WearableItemDialog.steps.step1.text', { count: props.requiredCount }),
    t('components.dialog.WearableItemDialog.steps.step2.text', { name: t(props.item.name) }),
    t('components.dialog.WearableItemDialog.steps.step3.text', { stat: effectText[props.item.effectType], percent: props.item.percent }),
    t('components.dialog.WearableItemDialog.steps.step4.text', { potion: potionText[props.item.effectType] }),
    t('components.dialog.WearableItemDialog.steps.step5.text'),
    t('components.dialog.WearableItemDialog.steps.step6.text'),
  ], () => {
    inventory.add(props.item.id, 1, { toast: true })
    emit('done', props.finishId)
  }),
)
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :dialog-tree="dialogTree"
    orientation="col"
  />
</template>
