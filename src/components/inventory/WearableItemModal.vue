<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { multiExp } from '~/data/items'

const store = useWearableItemStore()
const { t } = useI18n()

const itemName = computed(() => (store.current ? t(store.current.name) : ''))
const selectsActive = computed(() => store.current?.id !== multiExp.id)

function select(mon: DexShlagemon) {
  store.setHolder(mon.id)
}
</script>

<template>
  <ShlagemonSelectModal
    v-model="store.isVisible"
    :title="store.current ? t('components.inventory.WearableItemModal.title', { name: itemName }) : ''"
    :selected-ids="store.holderId ? [store.holderId] : []"
    :selects-active="selectsActive"
    @select="select"
  />
</template>
