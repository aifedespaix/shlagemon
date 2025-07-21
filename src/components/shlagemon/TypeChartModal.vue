<script setup lang="ts">
import TypeChart from './TypeChart.vue'

const modal = useTypeChartModalStore()
</script>

<template>
  <Modal v-model="modal.isVisible" footer-close>
    <UiPanelWrapper title="Table des types">
      <template #icon>
        <div class="i-carbon-data-table" />
      </template>
      <TypeChart :highlight="modal.highlight" />
    </UiPanelWrapper>
  </Modal>
</template>
