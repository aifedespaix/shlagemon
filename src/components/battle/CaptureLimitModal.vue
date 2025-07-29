<script setup lang="ts">
const modal = useCaptureLimitModalStore()
const { t } = useI18n()
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <p class="text-center text-sm">
        {{ t('components.battle.CaptureLimitModal.text', { level: modal.requiredLevel }) }}
      </p>
    </div>
  </UiModal>
</template>
