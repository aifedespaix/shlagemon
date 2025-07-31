<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  mon: DexShlagemon
  selected: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const { t } = useI18n()

function close() {
  emit('update:modelValue', false)
}

function onSelect(mon: DexShlagemon) {
  emit('select', mon)
  close()
}
</script>

<template>
  <div class="h-full flex flex-col">
    <h3 class="mb-2 text-center text-lg font-bold">
      {{ t('components.arena.SelectionModal.title', { name: props.mon.base.name }) }}
    </h3>
    <ArenaEnemyStatsCompact :mon="props.mon" />
    <ShlagemonQuickSelect :selected="props.selected" @select="onSelect" />
  </div>
</template>
