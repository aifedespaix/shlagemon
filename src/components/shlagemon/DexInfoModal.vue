<script setup lang="ts">
import { useDexInfoModalStore } from '~/stores/dexInfoModal'

const modal = useDexInfoModalStore()
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close @close="modal.close()">
    <ShlagemonDexInfo v-if="modal.mon" :mon="modal.mon" />
  </UiModal>
</template>
