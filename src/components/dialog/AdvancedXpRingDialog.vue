<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Impressionnant ! Tu as capturé au moins 80 Shlagémons.',
  'Voici un objet unique : advanced-xp-ring.',
  'Il augmente l\'expérience gagnée de 25%.',
  'L\'effet se cumule avec les potions d\'expérience.',
  'Equipe-le sur le Shlagémon de ton choix.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('advanced-xp-ring', 1)
  emit('done', 'advancedXpRing')
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
