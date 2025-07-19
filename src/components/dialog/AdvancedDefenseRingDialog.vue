<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Impressionnant ! Tu as capturé au moins 60 Shlagémons.',
  'Voici un objet unique : advanced-defense-ring.',
  'Il augmente la défense du porteur de 25%.',
  'L\'effet se cumule avec les potions de défense.',
  'Equipe-le sur le Shlagémon de ton choix.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('advanced-defense-ring', 1)
  emit('done', 'advancedDefenseRing')
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
