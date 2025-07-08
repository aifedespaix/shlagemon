<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import { useCaptureLimitModalStore } from '~/stores/captureLimitModal'

const modal = useCaptureLimitModalStore()
</script>

<template>
  <Modal v-model="modal.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <p class="text-center text-sm">
        Pour pouvoir attraper ce Schlagémon de niveau {{ modal.requiredLevel }}, il vous faut un badge.
        Rendez-vous dans le village pour défier la reine et remporter ce droit.
      </p>
    </div>
  </Modal>
</template>
