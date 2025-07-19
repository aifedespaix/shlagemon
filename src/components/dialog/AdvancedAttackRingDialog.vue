<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Impressionnant ! Tu as capturé au moins 70 Shlagémons.',
  'Voici un objet unique : advanced-attack-ring.',
  'Il augmente l\'attaque du porteur de 25%.',
  'L\'effet se cumule avec les potions d\'attaque.',
  'Equipe-le sur le Shlagémon de ton choix.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('advanced-attack-ring', 1)
  emit('done', 'advancedAttackRing')
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
