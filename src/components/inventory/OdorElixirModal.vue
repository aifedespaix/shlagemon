<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const store = useOdorElixirStore()
const { t } = useI18n()

const itemName = computed(() => store.current ? t(store.current.name) : '')

function select(mon: DexShlagemon) {
  store.useOn(mon)
}
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ store.current ? t('components.inventory.OdorElixirModal.title', { name: itemName }) : '' }}
      </h3>
      <ShlagemonQuickSelect
        v-if="store.availableMons.length"
        class="max-h-60vh"
        @select="select"
      />
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.OdorElixirModal.noAvailable') }}
      </p>
    </div>
  </UiModal>
</template>
