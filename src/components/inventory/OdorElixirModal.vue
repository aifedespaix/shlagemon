<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const store = useOdorElixirStore()
const { t } = useI18n()

const itemName = computed(() => (store.current ? t(store.current.name) : ''))

function select(mon: DexShlagemon) {
  store.useOn(mon)
}
</script>

<template>
  <ShlagemonSelectModal
    v-model="store.isVisible"
    :title="store.current ? t('components.inventory.OdorElixirModal.title', { name: itemName }) : ''"
    @select="select"
  />
</template>
