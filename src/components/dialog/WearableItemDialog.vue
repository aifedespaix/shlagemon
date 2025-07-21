<script setup lang="ts">
import type { WearableItem } from '~/type/item'
import { profMerdant } from '~/data/characters/prof-merdant'
import { buildDialog } from '~/utils/dialogBuilder'

const props = defineProps<{ item: WearableItem, requiredCount: number, finishId: string }>()
const emit = defineEmits(['done'])
const inventory = useInventoryStore()

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

const dialogTree = buildDialog([
  `Impressionnant ! Tu as capturé au moins ${props.requiredCount} Shlagémons.`,
  `Voici un objet unique : ${props.item.name}.`,
  `Il augmente ${effectText[props.item.effectType]} du porteur de ${props.item.percent}%.`,
  `L'effet se cumule avec les potions ${potionText[props.item.effectType]}.`,
  'Équipe-le sur le Shlagémon de ton choix.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add(props.item.id, 1)
  emit('done', props.finishId)
})
</script>

<template>
  <DialogBox
    :character="profMerdant"
    :avatar-url="`/characters/${profMerdant.id}/${profMerdant.id}.png`"
    :dialog-tree="dialogTree"
    orientation="col"
  />
</template>
