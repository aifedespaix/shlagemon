<script setup lang="ts">
import type { EggItemId } from '~/stores/eggBox'
import { eggColorClass } from '~/constants/egg'
import { allItems } from '~/data/items'

const eggMonsModal = useEggMonsModalStore()

const box = useEggBoxStore()
const { t } = useI18n()

const typeEggs = computed(() => eggIds.filter(id => box.eggs[id]))

const breedingEggs = useBreedingEggs()

const hasEggs = computed(() => typeEggs.value.length > 0 || breedingEggs.value.length > 0)

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
      <div v-if="hasEggs" class="flex flex-col gap-1 p-1">
        <UiListItem
          v-for="id in typeEggs"
          :key="id"
          as="div"
          class="cursor-pointer items-center justify-between border-b p-1"
          @click="openEgg(id as EggItemId)"
        >
          <template #left>
            <div class="flex items-center gap-1">
              <div v-if="getItem(id).icon" class="h-6 w-6" :class="[getItem(id).icon, getItem(id).iconClass]" />
              <span class="text-sm">{{ t(getItem(id).name) }}</span>
            </div>
          </template>
          <template #right>
            <span class="text-xs font-bold">x{{ box.eggs[id] }}</span>
          </template>
        </UiListItem>
        <UiListItem
          v-for="entry in breedingEggs"
          :key="entry.id"
          as="div"
          class="items-center justify-between border-b p-1"
        >
          <template #left>
            <div class="flex items-center gap-1">
              <div class="i-game-icons:cosmic-egg h-6 w-6" :class="eggColorClass(entry.type)" />
              <span class="text-sm" :class="eggColorClass(entry.type)">
                {{ t('common.eggOf', { name: t(entry.mon.name) }) }}
              </span>
            </div>
          </template>
        </UiListItem>
      </div>
      <span v-else class="text-center text-sm">{{ t('components.egg.BoxModal.empty') }}</span>
    </div>
  </UiModal>
  <EggMonsModal />
</template>
