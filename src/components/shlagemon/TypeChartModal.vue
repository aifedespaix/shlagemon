<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useTypeChartModalStore } from '~/stores/typeChartModal'
import TypeChart from './TypeChart.vue'

const modal = useTypeChartModalStore()
</script>

<template>
  <Modal v-model="modal.isVisible" footer-close>
    <PanelWrapper title="Table des types">
      <template #icon>
        <div class="i-carbon-data-table" />
      </template>
      <TypeChart :highlight="modal.highlight" />
    </PanelWrapper>
  </Modal>
</template>
