<script setup lang="ts">
const modal = useEggHatchModalStore()
const { t } = useI18n()
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.egg.HatchModal.message', { name: modal.mon ? t(modal.mon.base.name) : '' }) }}
      </h3>
      <div
        class="h-24 w-24"
      >
        <ShlagemonImage
          v-if="modal.mon"
          :id="modal.mon.base.id"
          :alt="t(modal.mon.base.name)"
        />
      </div>
    </div>
  </UiModal>
</template>
