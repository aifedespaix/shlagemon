<script setup lang="ts">
const store = usePwaUpdateStore()
const { t } = useI18n()
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="store.needRefresh" class="pointer-events-none absolute fixed inset-x-0 bottom-4 z-100 z-20000 flex justify-center p-1" md="p-2">
      <div class="pointer-events-auto flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-gray-800 shadow" dark="bg-gray-800 text-white">
        <span>{{ t('components.UpdateSnackbar.updateAvailable') }}</span>
        <UiButton type="primary" variant="solid" @click="store.reload">
          {{ t('components.UpdateSnackbar.reload') }}
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
