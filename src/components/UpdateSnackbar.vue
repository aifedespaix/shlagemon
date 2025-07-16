<script setup lang="ts">
import { usePwaUpdateStore } from '~/stores/pwaUpdate'

const store = usePwaUpdateStore()
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="store.needRefresh" class="pointer-events-none fixed inset-x-0 bottom-4 z-100 flex justify-center">
      <div class="pointer-events-auto flex items-center gap-2 rounded bg-gray-800 px-4 py-2 text-white shadow" dark="bg-gray-200 text-gray-800">
        <span>Nouvelle version disponible</span>
        <UiButton type="primary" variant="solid" @click="store.reload">
          Mettre à jour
        </UiButton>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
