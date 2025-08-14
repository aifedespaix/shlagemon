<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { BreedingEggItem, EggItemId } from '~/stores/eggBox'
import { allItems } from '~/data/items'
import { baseShlagemons } from '~/data/shlagemons'

const eggMonsModal = useEggMonsModalStore()

const box = useEggBoxStore()
const { t } = useI18n()

const typeEggs = computed(() => eggIds.filter(id => box.eggs[id]))

interface BreedingEntry extends BreedingEggItem {
  readonly mon: typeof baseShlagemons[number]
}

/**
 * Breeding eggs that have a matching shlagemon entry.
 * Entries without a corresponding mon are ignored to avoid runtime errors.
 */
const breedingEggs = computed<BreedingEntry[]>(() =>
  box.breeding
    .map((egg) => {
      const mon = baseShlagemons.find(b => b.id === egg.monId)
      return mon
        ? {
            ...egg,
            mon,
          }
        : null
    })
    .filter((entry): entry is BreedingEntry => entry !== null),
)

const hasEggs = computed(() => typeEggs.value.length > 0 || breedingEggs.value.length > 0)

const colorMap: Record<EggType, string> = {
  feu: 'text-orange-500 dark:text-orange-400',
  eau: 'text-blue-500 dark:text-blue-400',
  plante: 'text-green-500 dark:text-green-400',
  electrique: 'text-yellow-500 dark:text-yellow-400',
  psy: 'text-pink-500 dark:text-pink-400',
}

function colorClass(type: EggType): string {
  return colorMap[type] ?? ''
}

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
              <div class="i-ph:egg-fill h-6 w-6" :class="colorClass(entry.type)" />
              <span class="text-sm">{{ t('common.eggOf', { name: t(entry.mon.name) }) }}</span>
            </div>
          </template>
        </UiListItem>
      </div>
      <span v-else class="text-center text-sm">{{ t('components.egg.BoxModal.empty') }}</span>
    </div>
  </UiModal>
  <EggMonsModal />
</template>
