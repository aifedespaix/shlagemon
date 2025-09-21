<script setup lang="ts">
import { computed } from 'vue'
const store = useChromaticPotionStore()
const { t } = useI18n()

const title = computed(() => store.current ? t('components.inventory.ChromaticPotionModal.title') : '')
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2 overflow-hidden">
      <h3 class="text-center text-lg font-bold">
        {{ title }}
      </h3>
      <p class="text-center text-sm text-slate-500 dark:text-slate-300">
        {{ t('components.inventory.ChromaticPotionModal.description') }}
      </p>
      <div v-if="store.availableMons.length" class="tiny-scrollbar flex flex-1 flex-col gap-2 overflow-auto p-1">
        <UiListItem
          v-for="mon in store.availableMons"
          :key="mon.id"
          as="div"
          class="items-center justify-between border rounded p-2"
        >
          <template #left>
            <div class="flex items-center gap-2">
              <ShlagemonImage :id="mon.base.id" :alt="t(mon.base.name)" class="aspect-1 max-w-24!" :shiny="mon.isShiny" />
              <div class="flex flex-col">
                <span>{{ t(mon.base.name) }}</span>
                <span class="text-xs opacity-70">lvl {{ mon.lvl }}</span>
              </div>
            </div>
          </template>
          <template #right>
            <UiButton class="text-xs" @click="store.useOn(mon)">
              {{ mon.isShiny ? t('components.inventory.ChromaticPotionModal.makeNormal') : t('components.inventory.ChromaticPotionModal.makeShiny') }}
            </UiButton>
          </template>
        </UiListItem>
      </div>
      <p v-else class="text-center text-sm">
        {{ t('components.inventory.ChromaticPotionModal.empty') }}
      </p>
    </div>
  </UiModal>
</template>
