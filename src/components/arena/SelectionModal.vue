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

const candidate = ref<DexShlagemon | null>(null)

function close() {
  emit('update:modelValue', false)
}

function onSelect(mon: DexShlagemon) {
  candidate.value = mon
}

function confirm() {
  if (!candidate.value)
    return
  emit('select', candidate.value)
  close()
}
</script>

<template>
  <div class="h-full flex flex-col gap-2 overflow-hidden">
    <h3 class="mb-2 text-center text-lg font-bold">
      {{ t('components.arena.SelectionModal.title', { name: props.mon.base.name }) }}
    </h3>
    <ArenaEnemyStatsCompact :mon="props.mon" />
    <div class="flex-1 overflow-hidden">
      <ShlagemonQuickSelect :selected="props.selected" @select="onSelect" />
    </div>
    <ArenaEnemyStatsCompact v-if="candidate" :mon="candidate" />
    <UiButton v-if="candidate" class="mt-2" type="primary" @click="confirm">
      {{ t('components.arena.SelectionModal.confirm') }}
    </UiButton>
  </div>
</template>
