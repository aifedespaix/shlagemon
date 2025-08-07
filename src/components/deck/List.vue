<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import { useDeckFilterStore } from '~/stores/deckFilter'

const props = defineProps<{
  mons: BaseShlagemon[]
  onItemClick?: (mon: BaseShlagemon) => void
  selectedId?: string | null
}>()

const filter = useDeckFilterStore()
const { t } = useI18n()
const sortOptions = [
  { label: t('components.deck.DeckList.sort.name'), value: 'name' },
  { label: t('components.deck.DeckList.sort.type'), value: 'type' },
]

const displayed = computed(() => {
  const q = filter.search.trim().toLowerCase()
  const result = props.mons.filter(m => t(m.name).toLowerCase().includes(q))
  switch (filter.sortBy) {
    case 'type':
      result.sort((a, b) => {
        return t(a.types[0]?.name || '').localeCompare(t(b.types[0]?.name || ''))
      })
      break
    default:
      result.sort((a, b) => t(a.name).localeCompare(t(b.name)))
  }
  if (!filter.sortAsc)
    result.reverse()
  if (props.selectedId) {
    const idx = result.findIndex(m => m.id === props.selectedId)
    if (idx > 0) {
      const [selected] = result.splice(idx, 1)
      result.unshift(selected)
    }
  }
  return result
})
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <div class="flex gap-2">
        <UiSortControls
          v-model:sort-by="filter.sortBy"
          v-model:sort-asc="filter.sortAsc"
          :options="sortOptions"
        />
        <UiSearchInput
          v-model="filter.search"
          :placeholder="t('components.deck.DeckList.search')"
          class="flex-1"
        />
      </div>
    </template>
    <template #content>
      <div
        v-for="mon in displayed"
        :key="mon.id"
        class="flex cursor-pointer items-center gap-2 border rounded p-1"
        hover="bg-gray-100 dark:bg-gray-800"
        @click="props.onItemClick?.(mon)"
      >
        <div class="h-12 w-12">
          <ShlagemonImage :id="mon.id" :alt="t(mon.name)" />
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="font-semibold">{{ t(mon.name) }}</span>
          <div class="flex gap-1">
            <ShlagemonType
              v-for="typeItem in mon.types"
              :key="typeItem.id"
              :value="typeItem"
              size="xs"
              open-on-click
            />
          </div>
        </div>
      </div>
    </template>
  </LayoutScrollablePanel>
</template>
