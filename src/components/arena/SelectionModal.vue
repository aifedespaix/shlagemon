<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  mon: DexShlagemon
  selected: string[]
  /**
   * Currently selected Shlagemon for the opened slot.
   */
  initial?: DexShlagemon | null
  /** IDs of Shlagémons that cannot be selected. */
  disabledIds?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  initial: null,
  disabledIds: () => [],
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const { t } = useI18n()

const candidate = ref<DexShlagemon | null>(props.initial)

watch(
  () => props.initial,
  (val) => {
    candidate.value = val
  },
)

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
      {{ t('components.arena.SelectionModal.title', { name: t(props.mon.base.name) }) }}
    </h3>
    <ArenaEnemyStatsCompact :mon="props.mon" enemy />
    <ShlagemonQuickSelect class="flex-1" :selected="props.selected" :disabled-ids="props.disabledIds" @select="onSelect" />
    <ArenaEnemyStatsCompact v-if="candidate" :mon="candidate" />
    <UiButton v-if="candidate" class="mt-2" type="primary" @click="confirm">
      {{ t('components.arena.SelectionModal.confirm') }}
    </UiButton>
  </div>
</template>
