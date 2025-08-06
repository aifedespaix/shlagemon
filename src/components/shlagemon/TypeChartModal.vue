<script setup lang="ts">
const { t } = useI18n()
const modal = useTypeChartModalStore()
</script>

<template>
  <UiModal v-model="modal.isVisible">
    <h3 class="flex items-center gap-2 text-lg font-bold">
      <div class="i-carbon-data-table" />
      <div>{{ t('components.shlagemon.TypeChartModal.title') }}</div>
    </h3>
    <ShlagemonTypeChart v-model:highlight="modal.highlight" />
  </UiModal>
</template>
