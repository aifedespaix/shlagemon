<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Incroyable ! Tu as capturé au moins 40 Shlagémons.',
  'Voici un objet unique : xp-ring.',
  'Fais-le tenir à un Shlagémon pour qu\'il gagne 15% d\'expérience supplémentaire à la fin des combats.',
  'Son effet se cumule avec celui des potions d\'expérience, mais il n\'affecte que le porteur.',
  'Je te le confie, bonne chance pour la suite !',
  'En avant vers de nouveaux combats !',
], () => {
  inventory.add('xp-ring', 1)
  emit('done', 'xpRing')
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
