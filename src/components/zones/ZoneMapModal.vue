<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useMapModalStore } from '~/stores/mapModal'

const mapModal = useMapModalStore()
</script>

<template>
  <Modal v-model="mapModal.isVisible" footer-close>
    <PanelWrapper title="Zones">
      <ZonePanel />
    </PanelWrapper>
  </Modal>
</template>
