<script setup lang="ts">
const store = useEvolutionItemStore()
const { t } = useI18n()

const itemName = computed(() => store.current ? t(store.current.name) : '')
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ store.current ? t('components.inventory.EvolutionItemModal.title', { name: itemName }) : '' }}
      </h3>
      <div v-if="store.availableMons.length" class="flex flex-col gap-2 p-1">
        <UiListItem
          v-for="mon in store.availableMons"
          :key="mon.id"
          as="div"
          class="items-center justify-between border rounded p-2"
        >
          <template #left>
            <div class="flex items-center gap-2">
              <ShlagemonImage :id="mon.base.id" :alt="mon.base.name" class="aspect-1" />
              <span>{{ mon.base.name }} (lvl {{ mon.lvl }})</span>
            </div>
          </template>
          <template #right>
            <UiButton class="text-xs" @click="store.useOn(mon)">
              {{ t('components.inventory.EvolutionItemModal.evolve') }}
            </UiButton>
          </template>
        </UiListItem>
      </div>
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.EvolutionItemModal.noCompatible') }}
      </p>
    </div>
  </UiModal>
</template>
