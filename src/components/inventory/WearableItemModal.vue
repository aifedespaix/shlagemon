<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { multiExp } from '~/data/items'

const store = useWearableItemStore()
const dex = useShlagedexStore()
const { t } = useI18n()

const itemName = computed(() => (store.current ? t(store.current.name) : ''))
const selectsActive = computed(() => store.current?.id !== multiExp.id)

function select(mon: DexShlagemon) {
  store.setHolder(mon.id)
}
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ store.current ? t('components.inventory.WearableItemModal.title', { name: itemName }) : '' }}
      </h3>
      <ShlagemonQuickSelect
        v-if="dex.shlagemons.length"
        class="max-h-60vh"
        :selected="store.holderId ? [store.holderId] : []"
        :selects-active="selectsActive"
        @select="select"
      />
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.WearableItemModal.noAvailable') }}
      </p>
    </div>
  </UiModal>
</template>
