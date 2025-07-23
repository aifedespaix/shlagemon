<script setup lang="ts">
const modal = useCaptureLimitModalStore()
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <p class="text-center text-sm">
        Pour pouvoir attraper ce Shlagémon de niveau {{ modal.requiredLevel }}, il vous faut un badge.
        Rendez-vous dans le village pour défier l'arène et remporter ce droit.
      </p>
    </div>
  </UiModal>
</template>
