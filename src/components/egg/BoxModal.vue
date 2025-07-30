<script setup lang="ts">
import type { EggItemId } from '~/stores/eggBox'
import { allItems } from '~/data/items'

const eggMonsModal = useEggMonsModalStore()

const box = useEggBoxStore()
const { t } = useI18n()

const eggList = computed(() => eggIds.filter(id => box.eggs[id]))

function getItem(id: string) {
  return allItems.find(i => i.id === id)!
}

function openEgg(id: EggItemId) {
  eggMonsModal.open(id, getItem(id))
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
          class="flex cursor-pointer items-center justify-between border-b p-1"
          @click="openEgg(id as EggItemId)"
        >
          <div class="flex items-center gap-1">
            <div v-if="getItem(id).icon" class="h-6 w-6" :class="[getItem(id).icon, getItem(id).iconClass]" />
            <span class="text-sm">{{ t(getItem(id).name) }}</span>
          </div>
          <span class="text-xs font-bold">x{{ box.eggs[id] }}</span>
        </div>
      </div>
      <span v-else class="text-center text-sm">{{ t('components.egg.BoxModal.empty') }}</span>
    </div>
  </UiModal>
  <EggMonsModal />
</template>
