<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

/**
 * Modal wrapper to select a Shlagémon from the player's collection.
 * Emits the selected Shlagémon and closes itself.
 */
interface Props {
  /** Whether the modal is visible. */
  modelValue: boolean
  /** Displayed title of the modal. */
  title: string
  /** IDs of pre-selected Shlagémons. */
  selected?: string[]
  /** Disable selection interactions. */
  locked?: boolean
  /** Whether selecting also sets the active combatant. */
  selectsActive?: boolean
  /** Optional ID for the title element (used for aria-labelledby). */
  titleId?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  locked: false,
  selectsActive: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const open = useVModel(props, 'modelValue', emit)
const defaultTitleId = useId()
const headingId = computed(() => props.titleId || defaultTitleId)

function onSelect(mon: DexShlagemon) {
  emit('select', mon)
  open.value = false
}
</script>

<template>
  <UiModal v-model="open" role="dialog" aria-modal="true" :aria-labelledby="headingId">
    <div class="max-w-160 flex flex-col gap-2">
      <h3 :id="headingId" class="text-center text-lg font-bold">
        {{ title }}
      </h3>
      <div class="max-h-80 min-h-0 overflow-y-auto">
        <ShlagemonQuickSelect
          :selected="selected"
          :locked="locked"
          :selects-active="selectsActive"
          @select="onSelect"
        />
      </div>
    </div>
  </UiModal>
</template>
