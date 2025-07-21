<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'

const props = defineProps<{
  mons: BaseShlagemon[]
  onItemClick?: (mon: BaseShlagemon) => void
}>()

const search = ref('')
const { t } = useI18n()

const displayed = computed(() => {
  const q = search.value.trim().toLowerCase()
  return props.mons
    .filter(m => m.name.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <UiSearchInput v-model="search" :placeholder="t('deckList.search')" />
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
          <ShlagemonImage :id="mon.id" :alt="mon.name" />
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="font-semibold">{{ mon.name }}</span>
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
