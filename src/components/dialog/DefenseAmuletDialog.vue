<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Incroyable ! Tu as capturé au moins 100 Shlagémons.',
  'Voici un objet unique : defense-amulet.',
  'Il augmente la défense du porteur de 33%.',
  'L\'effet se cumule avec les potions de défense.',
  'Equipe-la sur le Shlagémon de ton choix.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('defense-amulet', 1)
  emit('done', 'defenseAmulet')
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
