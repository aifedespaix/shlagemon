<script setup lang="ts">
import { profMerdant } from '~/data/characters/prof-merdant'
import { useInventoryStore } from '~/stores/inventory'
import { buildDialog } from '~/utils/dialogBuilder'

const emit = defineEmits(['done'])
const inventory = useInventoryStore()

const dialogTree = buildDialog([
  'Formidable ! Tu as capturé au moins 30 Shlagémons.',
  'Voici un objet unique : attack-ring.',
  'Equipe-le à un Shlagémon pour augmenter son attaque de 15%.',
  'L\'effet se cumule avec les potions d\'attaque.',
  'Seul le porteur en profite.',
  'Bonne chance pour la suite !',
], () => {
  inventory.add('attack-ring', 1)
  emit('done', 'attackRing')
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
