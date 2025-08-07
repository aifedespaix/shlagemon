<script setup lang="ts">
const store = useEvolutionStore()
const dex = useShlagedexStore()
const { t } = useI18n()

const hasEvolution = computed(() => {
  if (!store.pending)
    return false
  return dex.shlagemons.some(m => m.base.id === store.pending!.to.id)
})
</script>

<template>
  <!-- We only bind the visibility as a prop because `isVisible` is a
       computed value without a setter. Using `v-model` would attempt to
       write to it and trigger an error. -->
  <UiModal
    :model-value="store.isVisible"
    :close-on-outside-click="false"
    @close="store.reject"
  >
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.shlagemon.EvolutionModal.evolveTitle', { name: store.pending ? t(store.pending.mon.base.name) : '' }) }}
      </h3>
      <p class="text-center">
        {{ t('components.shlagemon.EvolutionModal.question', {
          from: store.pending ? t(store.pending.mon.base.name) : '',
          to: store.pending ? t(store.pending.to.name) : '',
        }) }}
      </p>
      <p
        v-if="hasEvolution"
        class="text-center text-xs text-red-500 dark:text-red-400"
      >
        {{ t('components.shlagemon.EvolutionModal.alreadyOwned') }}
      </p>
      <div class="flex gap-2">
        <UiButton type="valid" class="flex items-center gap-1" @click="store.accept">
          <div i-carbon-checkmark />
          {{ t('components.shlagemon.EvolutionModal.yes') }}
        </UiButton>
        <UiButton type="danger" class="flex items-center gap-1" @click="store.reject">
          <div i-carbon-close />
          {{ t('components.shlagemon.EvolutionModal.no') }}
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>
