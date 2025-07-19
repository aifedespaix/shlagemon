<script setup lang="ts">
import ShlagemonImage from '~/components/shlagemon/Image.vue'
import { useEggHatchModalStore } from '~/stores/eggHatchModal'

const modal = useEggHatchModalStore()
</script>

<template>
  <Modal v-model="modal.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-center text-lg font-bold">
        Vous avez obtenu {{ modal.mon?.base.name }} !
      </h3>
      <ShlagemonImage
        v-if="modal.mon"
        :id="modal.mon.base.id"
        :alt="modal.mon.base.name"
        class="h-24 w-24"
      />
    </div>
  </Modal>
</template>
