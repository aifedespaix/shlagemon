<script setup lang="ts">
const store = useEvolutionStore()
const dex = useShlagedexStore()

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
        {{ store.pending?.mon.base.name }} évolue
      </h3>
      <p class="text-center">
        « {{ store.pending?.mon.base.name }} » veut évoluer en « {{ store.pending?.to.name }} », voulez-vous le laisser faire ou l'empêcher de répandre sa shlaguitude ?
      </p>
      <p
        v-if="hasEvolution"
        class="text-center text-xs text-red-500 dark:text-red-400"
      >
        Vous possédez déjà l'évolution de ce Shlagémon
      </p>
      <div class="flex gap-2">
        <UiButton type="valid" class="flex items-center gap-1" @click="store.accept">
          <div i-carbon-checkmark />
          Oui
        </UiButton>
        <UiButton type="danger" class="flex items-center gap-1" @click="store.reject">
          <div i-carbon-close />
          Non
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>
