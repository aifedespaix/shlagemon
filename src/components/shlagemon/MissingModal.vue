<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import { allShlagemons } from '~/data/shlagemons'

const { t } = useI18n()
const dex = useShlagedexStore()
const modal = useDexMissingModalStore()

const missing = computed<readonly BaseShlagemon[]>(() => {
  const owned = new Set(dex.shlagemons.map(m => m.base.id))
  return allShlagemons.filter(b => !owned.has(b.id))
})
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <h3 class="mb-2 flex items-center gap-2 text-lg font-bold">
      <div class="i-carbon-search" />
      <div>{{ t('components.shlagemon.MissingModal.title') }}</div>
    </h3>

    <div v-if="missing.length === 0" class="text-sm opacity-70">
      {{ t('components.shlagemon.MissingModal.none') }}
    </div>

    <div v-else class="tiny-scrollbar grid grid-cols-2 gap-2 overflow-auto md:grid-cols-4 sm:grid-cols-3">
      <div
        v-for="mon in missing"
        :key="mon.id"
        class="flex items-center gap-2 border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
      >
        <div class="h-10 w-10 shrink-0">
          <ShlagemonImage :id="mon.id" :alt="t(mon.name)" class="object-contain" />
        </div>
        <div class="truncate text-sm font-medium">
          {{ t(mon.name) }}
        </div>
      </div>
    </div>
  </UiModal>

  <!-- a11y helper for reduced motion users -->
  <div class="sr-only" aria-live="polite">
    {{ missing.length }}
  </div>
</template>
