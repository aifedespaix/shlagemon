<script setup lang="ts">
import SelectOption from './SelectOption.vue'

const props = defineProps<{
  sortBy: string | number
  sortAsc: boolean
  options: { label: string, value: string | number }[]
}>()
const emit = defineEmits<{
  (e: 'update:sortBy', value: string | number): void
  (e: 'update:sortAsc', value: boolean): void
}>()

const { t } = useI18n()

function updateSortBy(value: string | number) {
  emit('update:sortBy', value)
}
function toggleAsc() {
  emit('update:sortAsc', !props.sortAsc)
}
</script>

<template>
  <div class="min-w-36 flex flex-1 items-center">
    <SelectOption
      :model-value="props.sortBy"
      class="min-w-24 flex-1"
      :options="props.options"
      @update:model-value="updateSortBy"
    />
    <button
      class="icon-btn ml-1 text-lg"
      :aria-label="props.sortAsc ? t('components.ui.SortControls.ascending') : t('components.ui.SortControls.descending')"
      @click="toggleAsc"
    >
      <div :class="props.sortAsc ? 'i-carbon-sort-ascending' : 'i-carbon-sort-descending'" />
    </button>
  </div>
</template>
