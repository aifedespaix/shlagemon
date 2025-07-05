<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useInventoryModalStore } from '~/stores/inventoryModal'

const inventoryModal = useInventoryModalStore()
</script>

<template>
  <Modal v-model="inventoryModal.isVisible" footer-close>
    <PanelWrapper title="Inventaire">
      <template #icon>
        <div class="i-carbon-inventory-management" />
      </template>
      <InventoryPanel />
    </PanelWrapper>
  </Modal>
</template>
