<script setup lang="ts">
import TypeChart from './TypeChart.vue'

const { t } = useI18n()
const modal = useTypeChartModalStore()
</script>

<template>
  <UiModal v-model="modal.isVisible">
      <h3 class="text-lg font-bold flex items-center gap-2">
        <div class="i-carbon-data-table" />
        <div>{{t('components.shlagemon.TypeChartModal.title')}}</div>
      </h3>
      <TypeChart :highlight="modal.highlight" />
  </UiModal>
</template>
