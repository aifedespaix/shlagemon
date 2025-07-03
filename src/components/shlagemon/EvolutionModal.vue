<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import { useEvolutionStore } from '~/stores/evolution'

const store = useEvolutionStore()
</script>

<template>
  <!-- We only bind the visibility as a prop because `isVisible` is a
       computed value without a setter. Using `v-model` would attempt to
       write to it and trigger an error. -->
  <Modal :model-value="store.isVisible" :close-on-outside-click="false">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-center text-lg font-bold">
        {{ store.pending?.mon.base.name }} évolue
      </h3>
      <p class="text-center">
        « {{ store.pending?.mon.base.name }} » veut évoluer en « {{ store.pending?.to.name }} », voulez-vous le laisser faire ou l'empêcher de répandre sa... sa schlaguitude ?
      </p>
      <div class="flex gap-2">
        <Button type="valid" class="flex items-center gap-1" @click="store.accept">
          <div i-carbon-checkmark />
          Oui
        </Button>
        <Button type="danger" class="flex items-center gap-1" @click="store.reject">
          <div i-carbon-close />
          Non
        </Button>
      </div>
    </div>
  </Modal>
</template>
