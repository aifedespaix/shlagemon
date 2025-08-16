<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  /** Whether the modal is visible. */
  modelValue: boolean
  /** Opponent currently targeted. */
  mon: DexShlagemon
  /** IDs already selected for the team. */
  selected: string[]
  /**
   * Shlagémon pre-selected when opening the modal.
   */
  initial?: DexShlagemon | null
}

const props = withDefaults(defineProps<Props>(), {
  initial: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const open = useVModel(props, 'modelValue', emit)
const { t } = useI18n()

const candidate = ref<DexShlagemon | null>(props.initial)

watch(
  () => props.initial,
  (val) => {
    candidate.value = val
  },
)

function onSelect(mon: DexShlagemon) {
  candidate.value = mon
}

function confirm() {
  if (!candidate.value)
    return
  emit('select', candidate.value)
  open.value = false
}
</script>

<template>
  <ShlagemonSelectModal
    v-model="open"
    :title="t('components.arena.SelectionModal.title', { name: t(props.mon.base.name) })"
    :selected-ids="props.selected"
    :close-on-select="false"
    @select="onSelect"
  >
    <ArenaEnemyStatsCompact :mon="props.mon" enemy />
    <ArenaEnemyStatsCompact v-if="candidate" :mon="candidate" />
    <UiButton v-if="candidate" class="mt-2" type="primary" @click="confirm">
      {{ t('components.arena.SelectionModal.confirm') }}
    </UiButton>
  </ShlagemonSelectModal>
</template>
