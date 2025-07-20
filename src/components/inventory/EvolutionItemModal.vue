<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useEvolutionItemStore } from '~/stores/evolutionItem'

const store = useEvolutionItemStore()
const { t } = useI18n()
</script>

<template>
  <Modal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.inventory.EvolutionItemModal.title', { name: store.current?.name }) }}
      </h3>
      <div v-if="store.availableMons.length" class="flex flex-col gap-2">
        <div
          v-for="mon in store.availableMons"
          :key="mon.id"
          class="flex items-center justify-between border rounded p-2"
        >
          <div class="flex items-center gap-2">
            <ShlagemonImage :id="mon.base.id" :alt="mon.base.name" class="aspect-1" />
            <span>{{ mon.base.name }} (lvl {{ mon.lvl }})</span>
          </div>
          <UiButton class="text-xs" @click="store.useOn(mon)">
            {{ t('components.inventory.EvolutionItemModal.evolve') }}
          </UiButton>
        </div>
      </div>
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.EvolutionItemModal.noCompatible') }}
      </p>
    </div>
  </Modal>
</template>
