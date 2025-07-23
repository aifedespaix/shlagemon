<script setup lang="ts">
import { allItems } from '~/data/items/items'

const box = useEggBoxStore()
const { t } = useI18n()

const eggList = computed(() => eggIds.filter(id => box.eggs[id]))

function getItem(id: string) {
  return allItems.find(i => i.id === id)!
}
</script>

<template>
  <UiModal v-model="box.isModalOpen" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.egg.BoxModal.title') }}
      </h3>
      <div v-if="eggList.length" class="flex flex-col gap-1">
        <div
          v-for="id in eggList"
          :key="id"
          class="flex items-center justify-between border-b p-1"
        >
          <div class="flex items-center gap-1">
            <div v-if="getItem(id).icon" class="h-6 w-6" :class="[getItem(id).icon, getItem(id).iconClass]" />
            <span class="text-sm">{{ getItem(id).name }}</span>
          </div>
          <span class="text-xs font-bold">x{{ box.eggs[id] }}</span>
        </div>
      </div>
      <span v-else class="text-center text-sm">{{ t('components.egg.BoxModal.empty') }}</span>
    </div>
  </UiModal>
</template>
