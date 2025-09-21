<script setup lang="ts">
import { useDexDetailModalStore } from '~/stores/dexDetailModal'

const modal = useDexDetailModalStore()
</script>

<template>
  <UiModal
    v-model="modal.isVisible"
    no-close-button
    content-padding="none"
    :golden-border="modal.mon?.rarity === 100"
    @close="modal.close()"
  >
    <ShlagemonDetail
      :mon="modal.mon"
      @release="modal.close()"
      @active="modal.close()"
    />
  </UiModal>
</template>
