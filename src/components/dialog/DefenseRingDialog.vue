<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Super ! Tu as capturé au moins 20 Shlagémons.',
  'Voici un objet unique : defense-ring.',
  'Equipe-le à un Shlagémon pour augmenter sa défense de 15%.',
  'L\'effet se cumule avec les potions de d\'efense.',
  'Seul le porteur en profite.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('defense-ring', 1)
  emit('done', 'defenseRing')
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
