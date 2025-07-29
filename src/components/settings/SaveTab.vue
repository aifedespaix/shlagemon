<script setup lang="ts">
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-center">
      Voulez-vous supprimer toutes vos progressions et votre sauvegarde ?
    </p>
    <UiButton type="danger" class="mx-auto flex items-center gap-1" @click="emit('remove')">
      <div i-carbon-trash-can />
      Supprimer
    </UiButton>
  </div>
</template>
