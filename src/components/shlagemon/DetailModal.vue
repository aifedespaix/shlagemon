<script setup lang="ts">
import { useDexDetailModalStore } from '~/stores/dexDetailModal'

const modal = useDexDetailModalStore()
</script>

<template>
  <Modal
    v-model="modal.isVisible"
    footer-close
    :golden-border="modal.mon?.rarity === 100"
    @close="modal.close()"
  >
    <ShlagemonDetail
      :mon="modal.mon"
      @release="modal.close()"
      @active="modal.close()"
    />
  </Modal>
</template>
