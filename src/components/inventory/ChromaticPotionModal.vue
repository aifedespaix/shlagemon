<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { computed } from 'vue'

const store = useChromaticPotionStore()
const { t } = useI18n()

const title = computed(() => (store.current ? t('components.inventory.ChromaticPotionModal.title') : ''))

function handleSelect(mon: DexShlagemon) {
  store.useOn(mon)
}
</script>

<template>
  <ShlagemonSelectModal v-model="store.isVisible" :title="title" @select="handleSelect">
    <template #header>
      <p class="text-center text-sm text-slate-500 dark:text-slate-300">
        {{ t('components.inventory.ChromaticPotionModal.description') }}
      </p>
    </template>
  </ShlagemonSelectModal>
</template>
