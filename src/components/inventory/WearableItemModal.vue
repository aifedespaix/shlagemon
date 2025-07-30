<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const store = useWearableItemStore()
const dex = useShlagedexStore()
const { t } = useI18n()

function select(mon: DexShlagemon) {
  store.setHolder(mon.id)
}
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.inventory.WearableItemModal.title', { name: t(store.current?.name || '') }) }}
      </h3>
      <ShlagemonQuickSelect
        v-if="dex.shlagemons.length"
        class="max-h-60vh"
        :selected="store.holderId ? [store.holderId] : []"
        @select="select"
      />
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.WearableItemModal.noAvailable') }}
      </p>
    </div>
  </UiModal>
</template>
