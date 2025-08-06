<script setup lang="ts">
import TypeChart from './TypeChart.vue'

const { t } = useI18n()
const modal = useTypeChartModalStore()
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <UiPanelWrapper :title="t('components.shlagemon.TypeChartModal.title')">
      <template #icon>
        <div class="i-carbon-data-table" />
      </template>
      <TypeChart />
    </UiPanelWrapper>
  </UiModal>
</template>
